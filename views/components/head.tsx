import { MjmlHead, MjmlPreview, MjmlStyle, MjmlTitle } from "@faire/mjml-react";
import { readFileSync } from "fs";
import React from "react";

const css = readFileSync("resources/views/assets/style.css").toString();

export const MailmanHead = (payload: Record<string, any>) => {
  return (
    <MjmlHead>
      <MjmlTitle>{payload.title}</MjmlTitle>
      <MjmlPreview>{payload.preview || payload.title}</MjmlPreview>
      <MjmlStyle>{css}</MjmlStyle>
    </MjmlHead>
  );
};
