import { Layout } from 'antd';
import styled from 'styled-components';
const { Content } = Layout;
export const LayoutWrapper = styled(Layout)`
  min-height: 100vh;
`;

export const MainWrapper = styled(Layout)`
  padding: 3rem 1.5rem;
  flex: auto;
  position: relative;
`;

export const Main = styled(Content)`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`;
