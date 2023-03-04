import {
  MjmlColumn,
  MjmlImage,
  MjmlSection,
  MjmlSpacer,
} from "@faire/mjml-react";
import React from "react";

{
  /* <mj-section>
<mj-column>
    <mj-spacer height="10px"></mj-spacer>
</mj-column>
</mj-section>
<mj-section css-class="header">
<mj-column>
    <mj-image src="https://d1s70uz4swygev.cloudfront.net/img_small/atadel-logo.png" alt="Atadel Logo"
        align="center" width="200px" padding="0px">
    </mj-image>
</mj-column>
</mj-section> */
}

export const MailmanHeader = (payload: Record<string, any>) => {
  const appLogoSrc = payload.config.appLogoSrc;

  const appName = payload.config.appName;
  return (
    <>
      <MjmlSection>
        <MjmlColumn>
          <MjmlSpacer height={10} />
        </MjmlColumn>
      </MjmlSection>

      <MjmlSection className="header">
        <MjmlColumn>
          <MjmlImage
            src={appLogoSrc}
            alt={appName}
            align="center"
            width={200}
            padding={0}
          />
        </MjmlColumn>
      </MjmlSection>
    </>
  );
};
