<script lang="ts">
    import { Button, Checkbox, Flex, Input, Panel, Text } from 'svxui';
</script>

<Panel variant="clear" outline p="5">
    <Flex justify="start" direction="column" gap="6" as="form" width="300px">
        <Text size="7">Login</Text>

        <Flex justify="start" direction="column" gap="2">
            <Flex justify="start" as="label" direction="column" gap="1">
                <Text>Email</Text>
                <Input name="email" type="email" required />
            </Flex>

            <Flex justify="start" as="label" direction="column" gap="1">
                <Text>Password</Text>
                <Input name="password" type="password" required />
            </Flex>

            <Flex justify="start" as="label" align="center" gap="2">
                <Checkbox size="3" name="stayConnected" />
                <Text>Stay connected</Text>
            </Flex>
        </Flex>

        <Flex justify="start" direction="column" gap="3">
            <Button fullWidth type="submit">Login</Button>
            <Button fullWidth variant="outline">Forgot password ?</Button>
        </Flex>
    </Flex>
</Panel>
