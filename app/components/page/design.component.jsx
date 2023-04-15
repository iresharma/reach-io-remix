import {Avatar, TextInput, Textarea, Badge, Divider} from "@mantine/core";
import { useState } from "react";

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
  const [name, setName] = useState(props.name ?? "");
  const [desc, setDesc] = useState(props.desc ?? "");
  const [button, setButton] = useState(props.button ?? buttons[0]);

  return (
    <main className="grid">
      <div className="design-preview">
        <iframe
          src={"https://iresharma.vercel.app"}
        />
      </div>
      <div className="design">
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
              />
              <Textarea
                label="Description"
                placeholder="Description"
                variant="filled"
                radius="md"
                size="xs"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <Divider my="xs" label="More Options" labelPosition="center" />
          <div className="icons-wrapper">
            <h3>Social Icons</h3>
            <Badge component="span" color="red" size="md" variant="filled">Coming Soon</Badge>
          </div>
        </div>
        <div className="buttons">
          <h1>Buttons</h1>
          <small>Here are few button style options available</small>

          <div className="buttons-list">
            {buttons.map((el, index) => (
              <div className="button-wrapper">
                <button key={index} className={el}>
                  el
                </button>
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
        </div>
      </div>
    </main>
  );
};

export default DesignComponent;
