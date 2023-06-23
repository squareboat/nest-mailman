import { MjmlColumn, MjmlSection } from "@faire/mjml-react";
import { MailmanButton } from "./button";
import { MailmanDivider } from "./divider";
import { Greeting } from "./greeting";
import { TextLine } from "./text";
import React from "react";
import { MailmanTable } from "./table";
import { RawHtml } from "./html";

export const MailmanBodyBuilder = (payload: Record<string, any>) => {
  return (
    <MjmlSection backgroundColor="#ffffff">
      <MjmlSection padding={0}>
        <MjmlColumn>
          {payload.fields.map((obj) => {
            return ComponentView(obj);
          })}
        </MjmlColumn>
      </MjmlSection>
    </MjmlSection>
  );
};

const ComponentView = (payload: Record<string, any>) => {
  if (payload.greeting) {
    return <Greeting value={payload.greeting} />;
  }

  if (payload.line) {
    return <TextLine value={payload.line} />;
  }

  if (payload.divider) {
    return <MailmanDivider />;
  }

  if (payload.html) {
    return <RawHtml value={payload.html} />;
  }

  if (payload.action) {
    return <MailmanButton value={payload.action} />;
  }

  if (payload.table) {
    return <MailmanTable value={payload.table} header={payload.showHeading} vertical={payload.vertical} />;
  }

  return <></>;
};
