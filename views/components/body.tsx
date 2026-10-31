import { MjmlBody } from "@faire/mjml-react";
import React from "react";

export const MailmanBody = ({ children }: { children: React.ReactNode }) => {
  return <MjmlBody className="default-bg">{children}</MjmlBody>;
};
