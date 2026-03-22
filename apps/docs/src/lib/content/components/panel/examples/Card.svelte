<script lang="ts">
    import { Panel, Flexbox, Text, Button } from 'svxui';
</script>

<Panel size="5" variant="solid">
    <Flexbox direction="column" gap="3" style="width: 300px;">
        <Flexbox as="header" direction="column">
            <Text size="8" weight="bold" as="h2" class="m-0">Card title</Text>
            <Text size="5" weight="medium" as="p" muted class="m-0">Card subtitle</Text>
        </Flexbox>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt elit mattis sem mollis,
            sit amet dapibus arcu commodo. Morbi non aliquam sapien. Quisque pretium.
        </div>
        <Flexbox as="footer" justify="end">
            <Button variant="outline">Details</Button>
        </Flexbox>
    </Flexbox>
</Panel>
