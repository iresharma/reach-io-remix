import { ColorPicker } from "@mantine/core";
import { useState } from "react";

export default function ColorSelector({ fontColor, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "5px",
            backgroundColor: fontColor,
            position: "relative",
            marginTop: "15px",
          }}
          onClick={() => setOpen(!open)}
        ></div>
        <code
          style={{
            backgroundColor: "rgba(207, 207, 207, 1)",
            padding: "13px",
            borderRadius: "10px",
            marginLeft: "10px",
          }}
        >
          {fontColor}
        </code>
      </div>
      <ColorPicker
        style={{
          display: open ? "block" : "none",
        }}
        format="rgba"
        swatchesPerRow={7}
        swatches={[
          "#25262b",
          "#868e96",
          "#fa5252",
          "#e64980",
          "#be4bdb",
          "#7950f2",
          "#4c6ef5",
          "#228be6",
          "#15aabf",
          "#12b886",
          "#40c057",
          "#82c91e",
          "#fab005",
          "#fd7e14",
        ]}
        value={fontColor}
        onChange={onChange}
        onBlur={() => setOpen(false)}
      />
    </>
  );
}
