<script lang="ts">
    type SyncOptions<T> = {
        value?: T;
        onChange?: (value: T | undefined) => void;
        defaultValue?: T;
    };

    class Sync<T> {
        #internalValue: T | undefined = $state();
        #opt: SyncOptions<T>;

        constructor(opt: SyncOptions<T>) {
            this.#opt = opt;
        }

        get current(): T | undefined {
            return 'value' in this.#opt ? this.#opt.value : this.#internalValue;
        }

        set current(newValue: T | undefined) {
            if ('value' in this.#opt) {
                this.#opt.value = newValue;
            } else {
                this.#internalValue = newValue;
            }
            this.#opt.onChange?.(newValue);
        }
    }

    let isOpen = $state(false);
    const open = () => (isOpen = true);
    const close = () => (isOpen = false);

    const sync = new Sync({
        get value() {
            return isOpen;
        },
        onChange(value) {
            console.log('Sync onChange', value);
        }
    });
    const openSync = () => (sync.current = true);
    const closeSync = () => (sync.current = false);
</script>

<button onclick={open}>open</button>
<button onclick={close}>close</button>
<br />
<button onclick={openSync}>openSync</button>
<button onclick={closeSync}>closeSync</button>

<pre>
    isOpen = {isOpen}
    sync = {sync.current}
</pre>
