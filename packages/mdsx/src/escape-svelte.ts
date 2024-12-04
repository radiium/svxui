import { ENTITIES } from './constants';

export function escapeSvelte(str: string): string {
    return str
        .replace(/[{}`]/g, (substring: string) => {
            if (substring === '{') return ENTITIES.LEFT_CURLY;
            if (substring === '}') return ENTITIES.RIGHT_CURLY;
            if (substring === '`') return ENTITIES.BACK_TICK;
            return '';
        })
        .replace(/\\([trn])/g, '&#92;$1');
}
