import { MjmlBody } from "@faire/mjml-react";
import React from "react";

export const MailmanBody = ({ children }: { children: JSX.Element }) => {
  return <MjmlBody className="default-bg">{children}</MjmlBody>;
};
