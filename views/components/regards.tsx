import { MjmlColumn, MjmlSection, MjmlText } from "@faire/mjml-react";
import React from "react";

export const MailmanRegards = (payload: Record<string, any>) => {
  return (
    <MjmlSection padding={0}>
      <MjmlColumn>
        <MjmlText>
          For any help or support, please feel free to reach out to us at{" "}
          <strong>support@atadel.ca</strong>
        </MjmlText>

        <MjmlText lineHeight={40} fontSize={15} padding={"5px 20px"}>
          Thank you,
        </MjmlText>

        <MjmlText fontSize={15} padding={"0px 20px"}>
          Team Atadel
        </MjmlText>
      </MjmlColumn>
    </MjmlSection>
  );
};
