import { MjmlText } from '@faire/mjml-react';

export const TextLine = (payload: Record<string, any>) => {
  return (
    <>
      <MjmlText>{payload.value}</MjmlText>
    </>
  );
};
