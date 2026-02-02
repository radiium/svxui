<script lang="ts">
    import { Panel, Flexbox, Text, Input, Checkbox, Button } from 'svxui';
</script>

<Panel variant="clear" outline size="5">
    <Flexbox direction="column" gap="6" style="width: 300px;" as="form">
        <Text size="7">Login</Text>

        <Flexbox direction="column" gap="2">
            <Flexbox as="label" direction="column" gap="1">
                <Text>Email</Text>
                <Input name="email" type="email" required />
            </Flexbox>

            <Flexbox as="label" direction="column" gap="1">
                <Text>Password</Text>
                <Input name="password" type="password" required />
            </Flexbox>

            <Flexbox as="label" align="center" gap="2">
                <Checkbox size="3" name="stayConnected" />
                <Text>Stay connected</Text>
            </Flexbox>
        </Flexbox>

        <Flexbox direction="column" gap="3">
            <Button fullWidth type="submit">Login</Button>
            <Button fullWidth variant="outline">Forgot password ?</Button>
        </Flexbox>
    </Flexbox>
</Panel>
