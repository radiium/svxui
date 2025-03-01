export * from '@floating-ui/dom';

export { FloatingStateManager } from './floating-state-manager.svelte.js';

export * from './utils/build-arrow-style.js';
export * from './utils/build-floating-middlewares.js';
export * from './utils/build-floating-style.js';
export * from './utils/parse-boolean-or-object.js';
export * from './utils/parse-placement.js';
export * from './utils/round-by-dpr.js';
export * from './utils/style-object-to-string.js';

export { defaultFloatingStateManager } from './props.js';

export type {
    BuildFloatingMiddlewareProps,
    FloatingAlignment,
    FloatingSide,
    FloatingState,
    FloatingStateManagerProps
} from './types.js';
