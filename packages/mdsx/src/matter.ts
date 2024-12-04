import yaml from 'yaml';
import 'vfile';
import { logPerf } from './utils';
import { VFile } from 'vfile';

const regex = /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

export function matter(file: VFile, customParser?: (str: string) => Record<string, unknown> | void) {
    const doc = String(file);
    const a = performance.now();
    if (customParser) {
        const parsed = customParser(doc);
        if (parsed) {
            file.data.matter = parsed;
        } else {
            file.data.matter = {};
        }
        logPerf('matter', a);
        return;
    }
    const match = regex.exec(String(file));
    if (match && match[1]) {
        file.data.matter = yaml.parse(match[1]);
        const stripped = doc.slice(match[0].length);
        file.value =
            file.value && typeof file.value === 'object' ? new TextEncoder().encode(stripped) : stripped;
    } else {
        file.data.matter = {};
    }
    logPerf('matter', a);
}
