import { PreprocessorGroup, Processed } from 'svelte/compiler';
import { compile } from './compile';
import { defineConfig } from './defineConfig';
import { loadSvelteConfig } from './loadSvelteConfig';
import { MDSXConfig } from './types';

function mdsx(config: MDSXConfig): PreprocessorGroup {
    return {
        name: 'mdsx',
        async markup({
            content,
            filename
        }: {
            content: string;
            filename?: string;
        }): Promise<Processed | void> {
            const exts = config?.extensions ?? ['.md'];

            const isValidFile = exts.some((ext) => filename?.endsWith(ext));
            if (!isValidFile) {
                return;
            }

            let preprocessors: PreprocessorGroup[] = [];
            try {
                const svelteConfig = await loadSvelteConfig(config?.svelteConfigPath);
                preprocessors = svelteConfig?.preprocess
                    ? Array.isArray(svelteConfig.preprocess)
                        ? svelteConfig.preprocess
                        : [svelteConfig.preprocess]
                    : [];
            } catch (e) {
                console.error(e);
            }
            return compile(content, {
                filename,
                config,
                preprocessors: preprocessors.filter((pp) => pp.name !== 'mdsx')
            });
        }
    };
}
export { compile, defineConfig, mdsx };
