import Prism from 'prismjs'
import 'prism-svelte'
import { visit } from 'unist-util-visit'
import path from 'upath'
import { fileURLToPath } from 'url'
import { escape } from './util.js'

// Constants
const EXAMPLE_MODULE_PREFIX = '___mdsvexample___'
const EXAMPLE_COMPONENT_PREFIX = 'Mdsvexample___'
const SUPPORTED_LANGUAGES = ['svelte', 'html']

// Regular expressions
const RE = {
    SCRIPT_START: /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/,
    SCRIPT_BLOCK: /(<script[\s\S]*?>)([\s\S]*?)(<\/script>)/g,
    STYLE_BLOCK: /(<style[\s\S]*?>)([\s\S]*?)(<\/style>)/g,
    PARSE_META: /(\w+=\d+|\w+="[^"]*"|\w+=\[[^\]]*\]|\w+)/g
}

// Get directory name safely for both ESM and CJS environments
const _dirname = typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

/**
 * Parse metadata from string into object
 * @param {string} meta - Metadata string to parse
 * @returns {Record<string, any>} Parsed metadata object
 */
function parseMeta(meta) {
    const result = {}
    const metaParts = meta.match(RE.PARSE_META) ?? []

    for (const part of metaParts) {
        const [key, value = 'true'] = part.split('=')

        try {
            result[key] = JSON.parse(value)
        } catch (e) {
            const error = new Error(`Unable to parse meta \`${key}=${value}\` - ${e.message}`)
            error.stack = e.stack
            throw error
        }
    }

    return result
}

/**
 * Format code based on metadata options
 * @param {string} code - Original code
 * @param {Record<string, any>} meta - Metadata options
 * @returns {string} Formatted code
 */
function formatCode(code, meta) {
    let result = code

    if (meta.hideScript) {
        result = result.replace(RE.SCRIPT_BLOCK, '')
    }

    if (meta.hideStyle) {
        result = result.replace(RE.STYLE_BLOCK, '')
    }

    // Remove leading/trailing whitespace and line breaks
    return result.replace(/^\s+|\s+$/g, '')
}

/**
 * Create component markup for the example
 * @param {string} value - Original code
 * @param {Record<string, any>} meta - Metadata options
 * @param {number} index - Example index
 * @returns {string} Component markup
 */
function createExampleComponent(value, meta, index) {
    const componentName = `${EXAMPLE_COMPONENT_PREFIX}${index}`
    const code = formatCode(value, meta)

    const highlighted = typeof meta.highlighter === "function"
        ? meta.highlighter(code, meta)
        : Prism.highlight(code, Prism.languages.svelte, 'svelte')

    const props = {
        __mdsvexample_src: `String.raw\`${escape(value)}\``,
        src: `String.raw\`${escape(code)}\``,
        meta: escape(JSON.stringify(meta))
    }

    return `
  <Example 
    __mdsvexample_src={${props.__mdsvexample_src}} 
    src={${props.src}} 
    meta={${props.meta}}
  >
    {#snippet example()}
      ${meta.csr
            ? createCSRTemplate(componentName, index)
            : `<${componentName} />`
        }
    {/snippet}

    {#snippet code()}
      {@html ${JSON.stringify(highlighted)}}
    {/snippet}
  </Example>`
}

/**
 * Create client-side rendering template
 * @param {string} componentName - Component name
 * @param {number} index - Example index
 * @returns {string} CSR template
 */
function createCSRTemplate(componentName, index) {
    return `
  {#if typeof window !== 'undefined'}
  {#await import("${EXAMPLE_MODULE_PREFIX}${index}.svelte") then module}
    {@const ${componentName} = module.default}
    <${componentName} />
  {/await}
  {/if}`
}

/**
 * Convert Windows paths to POSIX format
 * @param {string} path - Path to convert
 * @returns {string} POSIX path
 */
function toPOSIX(path) {
    return path.replace(/\\/g, '/')
}

/**
 * Process code blocks in the AST
 * @param {object} tree - AST
 * @param {string} filename - Current file name
 * @param {Record<string, any>} defaults - Default options
 * @param {Array} examples - Examples collection
 */
function processCodeBlocks(tree, filename, defaults, examples) {
    visit(tree, 'code', (node) => {
        const meta = {
            Wrapper: path.resolve(_dirname, 'Example.svelte'),
            filename,
            ...defaults,
            ...parseMeta(node.meta || '')
        }

        const { csr, example, Wrapper } = meta

        // Find svelte code blocks with meta to trigger example
        if (example && SUPPORTED_LANGUAGES.includes(node.lang)) {
            const value = createExampleComponent(node.value, meta, examples.length)
            examples.push({ csr, Wrapper: meta.Wrapper || Wrapper })

            // Replace node with example component
            node.type = 'paragaph'
            node.children = [{ type: 'text', value }]
            delete node.lang
            delete node.meta
            delete node.value
        }
    })
}

/**
 * Generate import scripts for examples
 * @param {Array} examples - Examples collection
 * @returns {string} Import scripts
 */
function generateScripts(examples) {
    let scripts = ''
    const importedWrappers = new Set() // Track unique wrappers

    examples.forEach((example, i) => {
        // Add wrapper import if not already added
        const imp = typeof example.Wrapper === 'string'
            ? `import Example from "${example.Wrapper}";\n`
            : `import { ${example.Wrapper[1]} as Example } from "${example.Wrapper[0]}";\n`

        if (!importedWrappers.has(imp)) {
            scripts += imp
            importedWrappers.add(imp)
        }

        // Add component import if not CSR
        if (!example.csr) {
            scripts += `import ${EXAMPLE_COMPONENT_PREFIX}${i} from "${EXAMPLE_MODULE_PREFIX}${i}.svelte";\n`
        }
    })

    return scripts
}

/**
 * Add scripts to the AST
 * @param {object} tree - AST
 * @param {string} scripts - Scripts to add
 */
function addScriptsToTree(tree, scripts) {
    if (!scripts) return

    let scriptFound = false

    // Try to add scripts to existing script block
    visit(tree, 'html', (node) => {
        if (RE.SCRIPT_START.test(node.value)) {
            scriptFound = true
            node.value = node.value.replace(RE.SCRIPT_START, (script) => {
                return `${script}\n${scripts}`
            })
        }
    })

    // Create new script block if needed
    if (!scriptFound) {
        tree.children.push({
            type: 'html',
            value: `<script>\n${scripts}</script>`
        })
    }
}

/**
 * Main transformer function
 * @param {Record<string, any>} options - Plugin options
 * @returns {Function} Transformer function
 */
export default function mdsvexExamplePlugin(options = {}) {
    const { defaults = {} } = options

    // Handle legacy options
    if (options.ExampleComponent) {
        defaults.Wrapper = options.ExampleComponent
        console.warn(`ExampleComponent is deprecated, use defaults.Wrapper instead`)
    }

    return function transformer(tree, file) {
        const examples = []
        const filename = toPOSIX(file.filename).split(toPOSIX(file.cwd)).pop()

        // Process code blocks
        processCodeBlocks(tree, filename, defaults, examples)

        // Add imports for examples
        const scripts = generateScripts(examples)

        // Add scripts to existing script block or create new one
        addScriptsToTree(tree, scripts)
    }
}

// Re-export constants
export { EXAMPLE_COMPONENT_PREFIX, EXAMPLE_MODULE_PREFIX }
