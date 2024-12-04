import MagicString from 'magic-string';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { parse, preprocess, Processed } from 'svelte/compiler';
import { unified } from 'unified';
import { VFile as VFile3 } from 'vfile';
import { MDSX_BLUEPRINT_NAME } from './constants';
import { matter } from './matter';
import { rehypeBuildBlueprint, rehypeRenderCode, rehypeSvelteOverrideComponents } from './plugins/rehype';
import { remarkCleanSvelte } from './plugins/remark';
import { CompileOptions, VFileDataType } from './types';
import { getBlueprintData, logPerf, updateOrCreateSvelteInstance, updateOrCreateSvelteModule } from './utils';

export async function compile(
    source: string,
    { config, filename, preprocessors }: CompileOptions
): Promise<Processed | void> {
    const a = performance.now();
    const remarkPlugins = config?.remarkPlugins ?? [];
    const rehypePlugins = config?.rehypePlugins ?? [];
    const file = new VFile3({
        value: source,
        path: filename,
        data: {
            remarkPlugins,
            rehypePlugins,
            dependencies: [],
            instance: void 0,
            preprocessors,
            matter: {}
        } satisfies VFileDataType
    });
    matter(file, config?.frontmatterParser);
    const data = file.data as VFileDataType;
    const blueprint = getBlueprintData(file, config);
    if (blueprint) {
        data.dependencies.push(blueprint.path);
        data.blueprint = blueprint;
        remarkPlugins.push(...(blueprint.remarkPlugins ?? []));
        rehypePlugins.push(...(blueprint.rehypePlugins ?? []));
    }
    const processed = await unified()
        .use(remarkParse)
        .use(remarkCleanSvelte)
        .use(remarkPlugins)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypePlugins)
        .use(rehypeRenderCode)
        .use(rehypeBuildBlueprint)
        .use(rehypeSvelteOverrideComponents)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(file);

    const { code, dependencies } = await preprocess(String(processed), preprocessors, { filename });

    if (dependencies) data.dependencies.push(...dependencies);

    const ms = new MagicString(code);
    const parsed = parse(code);
    const module = updateOrCreateSvelteModule(parsed.module, data);

    if (blueprint) {
        let cssContent;
        const instance = updateOrCreateSvelteInstance(parsed.instance, file.path, blueprint.path);
        if (parsed.instance) {
            ms.remove(parsed.instance.start, parsed.instance.end);
        }
        if (parsed.module) {
            ms.remove(parsed.module.start, parsed.module.end);
        }
        if (parsed.css) {
            cssContent = ms.original.substring(parsed.css.start, parsed.css.end);
            ms.remove(parsed.css.start, parsed.css.end);
        }
        ms.prepend(`<${MDSX_BLUEPRINT_NAME} {metadata}>
  `);
        ms.append(`</${MDSX_BLUEPRINT_NAME}>
  `);
        if (cssContent) ms.prepend(cssContent);
        ms.prepend(instance.content);
    }
    ms.prepend(module.content);
    logPerf('processMarkdown', a);
    return {
        code: ms.toString(),
        map: ms.generateMap({ source: filename }),
        dependencies: data.dependencies
    };
}
