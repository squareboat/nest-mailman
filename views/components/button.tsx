import { MjmlButton } from "@faire/mjml-react";
import React from "react";

export const MailmanButton = (payload: Record<string, any>) => {
  return (
    <>
      <MjmlButton
        backgroundColor="#0275d8"
        color="white"
        borderRadius={8}
        href={payload.value.link}
      >
        <strong>{payload.value.text}</strong>
      </MjmlButton>
    </>
  );
};
