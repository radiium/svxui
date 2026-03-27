import { defineConfig } from 'cz-git';

export default defineConfig({
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'refactor', 'style', 'docs', 'chore', 'build', 'perf', 'revert']
        ],
        'scope-enum': [
            2,
            'always',
            [
                // Packages & apps
                'lib',
                'docs',
                'docgen',
                // Transversal domains
                'theme',
                'styles',
                'vite-plugin',
                'components',
                // Individual components
                'accordion',
                'badge',
                'button',
                'checkbox',
                'dialog',
                'flexbox',
                'floating',
                'input',
                'input-group',
                'input-number',
                'input-range',
                'listbox',
                'panel',
                'portal',
                'radio',
                'select',
                'separator',
                'switch',
                'tabs',
                'text',
                'textarea',
                // Other
                'deps',
                'ci',
                'config'
            ]
        ],
        'scope-empty': [1, 'never'],
        'subject-case': [2, 'always', 'lower-case'],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'header-max-length': [2, 'always', 100]
    },
    prompt: {
        alias: { fd: 'docs: fix typos' },
        messages: {
            type: "Select the type of change that you're committing:",
            scope: 'Denote the SCOPE of this change (optional):',
            customScope: 'Denote the SCOPE of this change:',
            subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
            body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
            breaking: 'List any BREAKING CHANGES (optional). Use "|" to break new line:\n',
            footerPrefixSelect: 'Select the ISSUES type of changeList by this change (optional):',
            customFooterPrefix: 'Input ISSUES prefix:',
            footer: 'List any ISSUES by this change. E.g.: #31, #34:\n',
            confirmCommit: 'Are you sure you want to proceed with the commit above?'
        },
        types: [
            { value: 'feat', name: 'feat:     A new feature' },
            { value: 'fix', name: 'fix:      A bug fix' },
            {
                value: 'refactor',
                name: 'refactor: A code change that neither fixes a bug nor adds a feature'
            },
            {
                value: 'style',
                name: 'style:    Changes that do not affect the meaning of the code'
            },
            { value: 'docs', name: 'docs:     Documentation only changes' },
            {
                value: 'chore',
                name: "chore:    Other changes that don't modify src or test files"
            },
            {
                value: 'build',
                name: 'build:    Changes that affect the build system or external deps'
            },
            { value: 'perf', name: 'perf:     A code change that improves performance' },
            { value: 'revert', name: 'revert:   Reverts a previous commit' }
        ],
        scopes: [
            // Packages & apps
            { value: 'lib', name: 'lib:         Core library (packages/svxui)' },
            { value: 'docs', name: 'docs:        Documentation app (apps/docs)' },
            { value: 'docgen', name: 'docgen:      Doc generator (packages/svxui-docgen)' },
            // Transversal domains
            { value: 'theme', name: 'theme:       Theme system & colors' },
            { value: 'styles', name: 'styles:      CSS/SCSS utilities & tokens' },
            { value: 'vite-plugin', name: 'vite-plugin: Vite theme plugin' },
            { value: 'components', name: 'components:  Shared components changes' },
            // Individual components
            { value: 'accordion' },
            { value: 'badge' },
            { value: 'button' },
            { value: 'checkbox' },
            { value: 'dialog' },
            { value: 'flexbox' },
            { value: 'floating' },
            { value: 'input' },
            { value: 'input-group' },
            { value: 'input-number' },
            { value: 'input-range' },
            { value: 'listbox' },
            { value: 'panel' },
            { value: 'portal' },
            { value: 'radio' },
            { value: 'select' },
            { value: 'separator' },
            { value: 'switch' },
            { value: 'tabs' },
            { value: 'text' },
            { value: 'textarea' },
            // Other
            { value: 'deps', name: 'deps:   Dependency updates' },
            { value: 'ci', name: 'ci:     CI/CD configuration' },
            { value: 'config', name: 'config: Project configuration' }
        ],
        useEmoji: true,
        emojiAlign: 'center',
        useAI: false,
        themeColorCode: '',
        allowCustomScopes: true,
        allowEmptyScopes: true,
        customScopesAlign: 'bottom',
        customScopesAlias: 'custom',
        emptyScopesAlias: 'empty',
        upperCaseSubject: false,
        markBreakingChangeMode: false,
        allowBreakingChanges: ['feat', 'fix'],
        breaklineNumber: 100,
        breaklineChar: '|',
        skipQuestions: [],
        issuePrefixes: [
            { value: 'closed', name: 'closed: ISSUES has been processed' },
            { value: 'fix', name: 'fix:    This commit fixes a known issue' }
        ],
        customIssuePrefixAlign: 'top',
        emptyIssuePrefixAlias: 'skip',
        customIssuePrefixAlias: 'custom',
        allowCustomIssuePrefix: true,
        allowEmptyIssuePrefix: true,
        confirmColorize: true,
        defaultBody: '',
        defaultIssues: '',
        defaultScope: '',
        defaultSubject: ''
    }
});
