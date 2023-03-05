import { MjmlText } from "@faire/mjml-react";
import React from "react";

export const TextLine = (payload: Record<string, any>) => {
  return (
    <>
      <MjmlText>{payload.value}</MjmlText>
    </>
  );
};
