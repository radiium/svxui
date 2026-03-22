import '$lib/styles/normalize.css';
import '$lib/styles/tokens.css';
import '$lib/styles/utilities.css';
import { type Snippet } from 'svelte';
interface Props {
    children?: Snippet;
}
declare const Wrapper: import('svelte').Component<Props, {}, ''>;
type Wrapper = ReturnType<typeof Wrapper>;
export default Wrapper;
