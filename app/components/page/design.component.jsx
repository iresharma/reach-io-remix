import {
    Avatar,
    TextInput,
    Textarea,
    Badge,
    Divider,
    Alert,
    Table,
    Select,
    Card,
    Button,
} from "@mantine/core";
import {useState} from "react";
import Axios from "axios";
import {IconAlertCircle, IconRowInsertTop} from "@tabler/icons";
import ColorSelector from "~/components/page/colorSelector.component";
import {useListState} from "@mantine/hooks";

const buttons = [
    "button-1",
    "button-6",
    "button-19",
    "button-23",
    "button-28",
    "button-30",
    "button-35",
    "button-50",
    "button-48",
    "button-56",
    "button-54",
    "button-74",
    "button-85",
    "button-89",
];

const DesignComponent = (props) => {
    const [name, setName] = useState(props.profile?.name ?? "");
    const [desc, setDesc] = useState(props.profile?.desc ?? "");
    const [button, setButton] = useState(props.button ?? buttons[0]);
    const [background, setBackground] = useState(props.background ?? "");
    const [font, setFont] = useState(props.font ?? "");
    const [fontColor, setFontColor] = useState(props.fontColor ?? "#25262b");
    const [metaTags, handlers] = useListState(props.metaTags ?? [{}]);

    const updateTemplate = (buttonVal) => {
        const template = {
            profile: {
                name: name,
                desc: desc,
                image: "",
            },
            button: buttons.includes(buttonVal) ? buttonVal : button, background, font, fontColor, metaTags
        };
        console.log(template);
        Axios.patch("/page/handler", {template}).catch(console.log);
    };

    return (
        <main className="grid">
            <div className="design-preview">
                <iframe src={`https://reach-page-server.vercel.app/${props.route}`}/>
            </div>
            <div className="design">
                <Alert
                    icon={<IconAlertCircle size="1rem"/>}
                    title="Attention!"
                    color="yellow"
                    radius="md"
                >
                    The preview is only a rough representation of the actual page, please
                    visit the page to confirm the design.
                </Alert>
                <div className="header-section">
                    <h1>Profile</h1>
                    <small>Add some information about your page</small>
                    <div className="profile">
                        <Avatar radius="xl" size="xl" mr={10} color="brand">
                            {name !== "" &&
                                name
                                    .split(" ")
                                    .map((el) => (el.length > 0 ? el[0].toUpperCase() : ""))
                                    .join("")}
                        </Avatar>
                        <div className="inputs">
                            <TextInput
                                label="Name"
                                placeholder="Name"
                                variant="filled"
                                radius="md"
                                size="xs"
                                mb={10}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onBlur={updateTemplate}
                            />
                            <Textarea
                                label="Description"
                                placeholder="Description"
                                variant="filled"
                                radius="md"
                                size="xs"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                onBlur={updateTemplate}
                            />
                        </div>
                    </div>
                    <Divider my="xs" label="More Options" labelPosition="center"/>
                    <div className="icons-wrapper">
                        <h3>Social Icons</h3>
                        <Badge component="span" color="red" size="md" variant="filled">
                            Coming Soon
                        </Badge>
                    </div>
                </div>
                <div className="buttons">
                    <h1>Buttons</h1>
                    <small>Here are few button style options available</small>

                    <div className="buttons-list">
                        {buttons.map((el, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setButton(el);
                                    updateTemplate(el);
                                }}
                                className="button-wrapper"
                                id={button === el ? "selected-btn" : ""}
                            >
                                <button className={el}>{el}</button>
                                <span>
                  <code>.{el}</code>
                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="font">
                    <h1>Font</h1>
                    <small>Please select the font for Header section</small>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h5>Font select</h5>

                        <ColorSelector
                            fontColor={fontColor}
                            onChange={(e) => {
                                setFontColor(e);
                                updateTemplate();
                            }}
                        />
                    </div>
                </div>
                <div className="seo">
                    <h1>Custom SEO Tags</h1>
                    <small>Please select the font for Header section</small>
                    <Table>
                        <thead>
                        <tr>
                            <th>Tag</th>
                            <th colSpan={2}>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {metaTags.map((el, index) => (
                            <tr key={index}>
                                <td>
                                    <Select
                                        variant="unstyled"
                                        sx={(theme) => ({width: "250px"})}
                                        placeholder="Pick one"
                                        data={[
                                            {value: "description", label: "meta:desc"},
                                            {value: "robots", label: "meta:robots"},
                                            {value: "og:title", label: "og:title"},
                                            {value: "og:url", label: "og:url"},
                                            {value: "og:image", label: "og:image"},
                                            {value: "og:type", label: "og:type"},
                                            {value: "og:description", label: "og:description"},
                                            {value: "og:locale", label: "og:locale"},
                                        ]}
                                        value={el.type}
                                        onChange={(e) =>
                                            handlers.setItem(index, {
                                                type: e,
                                                value: metaTags[index].value,
                                            })
                                        }
                                    />
                                </td>
                                <td colSpan={2}>
                                    <TextInput
                                        variant="unstyled"
                                        placeholder="value"
                                        value={el.value}
                                        onChange={(e) =>
                                            handlers.setItem(index, {
                                                value: e.target.value,
                                                type: metaTags[index].type,
                                            })
                                        }
                                        onBlur={updateTemplate}
                                    />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <Button
                                variant="subtle"
                                radius="xs"
                                onClick={() =>
                                    handlers.append({type: undefined, value: ""})
                                }
                                mt={20}
                                mb={20}
                            >
                                Add Item
                            </Button>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </main>
    );
};

export default DesignComponent;
