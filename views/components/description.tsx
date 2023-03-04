import { MjmlColumn, MjmlText } from "@faire/mjml-react";
import React from "react";

export const Description = (payload: Record<string, any>) => {
  return (
    <MjmlColumn padding={0}>
      <MjmlText paddingLeft={20} paddingTop={0}>
        <strong>{payload.value}</strong>
      </MjmlText>
    </MjmlColumn>
  );
};
