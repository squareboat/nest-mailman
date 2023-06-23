import {
  MjmlColumn,
  MjmlSection,
  MjmlTable
} from "@faire/mjml-react";
import React from "react";

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export const MailmanTable = (payload: Record<string, any>) => {
  const headings = Object.keys(payload.value[0]);

  const tableHeader = () => {
    return (
      <thead>
        <tr>
          {headings.map((h) => (
            <th>{toTitleCase(h)}</th>
          ))}
        </tr>
      </thead>
    );
  };
  if (payload.vertical) {
    return (
      <>
        {payload.value.map((obj) => {
          const values = Object.values(obj) as string[];
          return (
            <MjmlSection padding={0}>
              <MjmlColumn>
                <MjmlTable className="styled-table">
                  <tbody>
                    {values.map((v, index) => (
                      <tr>
                        <th>{toTitleCase(headings[index])}</th>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </MjmlTable>
              </MjmlColumn>
            </MjmlSection>
          );
        })}
      </>
    );
  } else {
    return (
      <MjmlSection padding={0}>
        <MjmlColumn>
          <MjmlTable className="styled-table">
            {payload.heading && tableHeader()}
            <tbody>
              {payload.value.map((obj) => {
                const values = Object.values(obj) as string[];
                return (
                  <tr>
                    {values.map((v) => (
                      <td>{v}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </MjmlTable>
        </MjmlColumn>
      </MjmlSection>
    );
  }
};
