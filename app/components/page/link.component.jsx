import { Card, Text, Group } from '@mantine/core';
import {IconChecks, IconPencil} from "@tabler/icons"
import {useState} from 'react'

function LinkCard(props) {
    const [edit, setEdit] = useState(false)
    return (
        <Card shadow="sm" pt={0} radius="md" mt={10} withBorder>
            <Group position="apart" mt="xs" mb="xs">
                <Text weight={500}>{props.name}</Text>
                {!edit && <IconPencil size="18" color="gray" onClick={() => setEdit(true)}/>}
                {edit && <IconChecks size="18" color="gray" onClick={() => setEdit(false)}/>}
            </Group>

            <Text size="sm" color="dimmed">
                {props.link}
            </Text>
        </Card>
        );
}
export default LinkCard;
