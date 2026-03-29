<script lang="ts">
    import ThemeScope from '$lib/components/theme/components/theme-scope.svelte';
    import Playground from '../../controls/Playground.svelte';
    import SampleForm from './SampleForm.svelte';
</script>

<h1>ThemeScope</h1>

<Playground>
    <!-- Light -->
    <ThemeScope mode="light" class="w-100">
        <SampleForm>
            <!-- Dark -->
            <ThemeScope mode="dark" radius="full" color="blue">
                <SampleForm>
                    <!-- System -->
                    <ThemeScope mode="system" radius="none" color="green">
                        <SampleForm></SampleForm>
                    </ThemeScope>
                </SampleForm>
            </ThemeScope>
        </SampleForm>
    </ThemeScope>
</Playground>
