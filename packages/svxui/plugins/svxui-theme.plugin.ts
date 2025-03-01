// import merge from 'lodash.merge';

import type { HmrContext, Plugin } from 'vite';
import { ThemeConfig } from './types';
import { generateCssFile } from './utils';

const moduleId = 'virtual:svxui.theme.css';
const resolvedModuleId = '\0' + moduleId;

/**
 * Inject theme css
 *
 * @param config
 * @returns
 */
export function svxuiThemePlugin(config: Partial<ThemeConfig> | undefined = {}): Plugin {
    return {
        name: 'vite-plugin-virtual-css-variables',
        enforce: 'pre',
        buildStart() {
            console.log('========= [buildStart]');
        },
        handleHotUpdate: async (ctx: HmrContext) => {
            console.log('========= [handleHotUpdate]', ctx.timestamp);
        },
        resolveId(id) {
            if (id === moduleId) {
                console.log('========= [resolveId]', id);
                return resolvedModuleId;
            }
        },
        async load(id) {
            if (!config) {
                // Ignore malformed css variables array.
                this.warn({
                    message: `missing theme config`
                });
                return '';
            }
            if (id === resolvedModuleId) {
                const css = generateCssFile(config);
                console.log('========= [load]', id);
                console.log('CSS', css);
                console.log('');
                return css;
            }
        }
    };
}

export default svxuiThemePlugin;
