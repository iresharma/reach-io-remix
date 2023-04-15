import {Card, Group, TextInput, Text} from '@mantine/core';
import {IconChecks, IconGripVertical, IconPencil, IconTrash} from "@tabler/icons"
import {useState} from 'react'

function LinkCard(props) {
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(undefined);
    const [link, setLink] = useState(undefined);
    const updateLink = () => {
        setEdit(false);
        props.onChange({name, link});
    }
    return (
        <Card shadow="sm" pt={0} radius="md" mt={10} withBorder>
            <Group position="apart" mt="xs" mb="xs" align="center">
                <div {...props.dragHandleProps}><IconGripVertical/></div>
                <div style={{ width: "90%" }}>
                    <Group position="apart" mt="xs" mb="xs">
                        {!edit && <Text transform="capitalize" weight={500}>{props.name}</Text>}
                        {edit && <TextInput
                            description="This will be displayed on the button"
                            variant="unstyled"
                            radius="xs"
                            size="xs"
                            value={name === undefined ? props.name : name}
                            onChange={e => setName(e.target.value)}
                        />}
                        {!edit && <IconPencil size="18" color="gray" onClick={() => setEdit(true)}/>}
                        {edit && <IconChecks size="18" color="gray" onClick={() => updateLink()}/>}
                        {edit && <IconTrash size="18" color="gray" onClick={props.deleteLink}/>}
                    </Group>

                    <Text size="sm" color="dimmed">
                        {!edit && <Text transform="capitalize" weight={500}>{props.link}</Text>}
                        {edit && <TextInput
                            description="This is where the user is redirected to"
                            variant="unstyled"
                            radius="xs"
                            size="xs"
                            value={link === undefined ? props.link : link}
                            onChange={e => setLink(e.target.value)}
                        />}
                    </Text>
                </div>
            </Group>
        </Card>
    );
}

export default LinkCard;
