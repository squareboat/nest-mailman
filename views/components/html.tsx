import { MjmlText } from "@faire/mjml-react";
import React from "react";


export const RawHtml = (payload: Record<string, any>) => {
  return (
    <MjmlText dangerouslySetInnerHTML={{ __html: payload.value }} />
  );
};
