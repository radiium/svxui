import { PreprocessorGroup } from 'svelte/compiler';
import { PluggableList } from 'unified';

export type MDSXConfig = {
    /** Remark plugins that apply to all documents */
    remarkPlugins?: PluggableList;
    /** Rehype plugins that apply to all documents */
    rehypePlugins?: PluggableList;
    extensions?: string[];
    blueprints?: BlueprintMap;
    /**
     * Path to a svelte config file, either absolute or relative to `process.cwd()`.
     *
     * Set to `false` to ignore the svelte config file.
     */
    svelteConfigPath?: string | false;
    frontmatterParser?: (str: string) => Record<string, unknown> | void;
};

export type BlueprintMap = Record<string, Blueprint> & {
    default: Blueprint;
};

export type Blueprint = {
    /** Path to the blueprint */
    path: string;
    /** Remark plugins that only apply to this blueprint */
    remarkPlugins?: PluggableList;
    /** Rehype plugins that only apply to this blueprint */
    rehypePlugins?: PluggableList;
};

export type CompileOptions = {
    config?: MDSXConfig;
    filename?: string;
    preprocessors: PreprocessorGroup[];
};

export type VFileDataType = {
    remarkPlugins: PluggableList;
    rehypePlugins: PluggableList;
    instance: any;
    dependencies: string[];
    preprocessors: PreprocessorGroup[];
    matter: Record<string, unknown>;
    blueprint?: Blueprint | undefined;
};
