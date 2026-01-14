export interface LongpressOptions {
    /**
     * Called when longpress starts (after delay)
     */
    onLongpressStart?: (event: PointerEvent) => void;
    /**
     * Called when longpress is released
     */
    onLongpressEnd?: (event: PointerEvent) => void;
    /**
     * Enable/disable longpress
     * @default true
     */
    enabled?: boolean;
    /**
     * Time in milliseconds before start longpress
     * @default 800
     */
    delay?: number;
}
