import { css } from 'styled-components';

export type CSSButtonProps = {
  fullwidth?: boolean;
};

export const ButtonBaseStyles = css<CSSButtonProps>`
  width: ${({ fullwidth }) => fullwidth && '100%'};
`;
