import { MjmlText } from "@faire/mjml-react";
import React from "react";

export const Greeting = (payload: Record<string, any>) => {
  return (
    <MjmlText paddingTop={5} paddingBottom={5}>
      <h2>{payload.value}</h2>
    </MjmlText>
  );
};
