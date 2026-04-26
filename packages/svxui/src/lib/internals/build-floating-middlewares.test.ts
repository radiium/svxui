import { flip as flipMw } from '@floating-ui/dom';
import { describe, expect, it } from 'vitest';
import { buildFloatingMiddlewares } from './build-floating-middlewares.js';

describe('buildFloatingMiddlewares', () => {
    it('returns an empty array when no options are provided', () => {
        expect(buildFloatingMiddlewares({})).toEqual([]);
    });

    it('includes offset when offset is true', () => {
        const result = buildFloatingMiddlewares({ offset: true });
        expect(result.some((m) => m.name === 'offset')).toBe(true);
    });

    it('includes offset when offset is 0', () => {
        const result = buildFloatingMiddlewares({ offset: 0 });
        expect(result.some((m) => m.name === 'offset')).toBe(true);
    });

    it('does not include offset when offset is false', () => {
        const result = buildFloatingMiddlewares({ offset: false });
        expect(result.some((m) => m.name === 'offset')).toBe(false);
    });

    it('includes flip when flip is true', () => {
        const result = buildFloatingMiddlewares({ flip: true });
        expect(result.some((m) => m.name === 'flip')).toBe(true);
    });

    it('does not include flip when flip is false', () => {
        const result = buildFloatingMiddlewares({ flip: false });
        expect(result.some((m) => m.name === 'flip')).toBe(false);
    });

    it('includes shift when shift is true', () => {
        const result = buildFloatingMiddlewares({ shift: true });
        expect(result.some((m) => m.name === 'shift')).toBe(true);
    });

    it('includes size when size is true', () => {
        const result = buildFloatingMiddlewares({ size: true });
        expect(result.some((m) => m.name === 'size')).toBe(true);
    });

    it('includes hide when hide is true', () => {
        const result = buildFloatingMiddlewares({ hide: true });
        expect(result.some((m) => m.name === 'hide')).toBe(true);
    });

    it('does not include arrow when arrowEl is missing', () => {
        const result = buildFloatingMiddlewares({ arrow: true });
        expect(result.some((m) => m.name === 'arrow')).toBe(false);
    });

    it('appends extra middleware from the middleware array', () => {
        const custom = flipMw();
        const result = buildFloatingMiddlewares({ middleware: [custom] });
        expect(result.some((m) => m.name === 'flip')).toBe(true);
    });

    it('does not add duplicate middleware when already built-in', () => {
        const result = buildFloatingMiddlewares({ flip: true, middleware: [flipMw()] });
        expect(result.filter((m) => m.name === 'flip')).toHaveLength(1);
    });

    it('ignores falsy values in the middleware array', () => {
        const result = buildFloatingMiddlewares({ middleware: [false, null, undefined] });
        expect(result).toEqual([]);
    });
});
