export declare class EditorLayoutState {
    isPanelLeftOpen: boolean;
    isPanelRightOpen: boolean;
}
export declare const editorLayoutStore: {
    toggleLeft(): void;
    toggleRight(): void;
    clearStorage(this: void): void;
    set(this: void, value: EditorLayoutState): void;
    update(this: void, updater: import("svelte/store").Updater<EditorLayoutState>): void;
    subscribe(this: void, run: import("svelte/store").Subscriber<EditorLayoutState>, invalidate?: import("svelte/store").Invalidator<EditorLayoutState> | undefined): import("svelte/store").Unsubscriber;
};
