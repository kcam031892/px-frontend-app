import styled from 'styled-components';
import { Card as AntCard, Space } from 'antd';

export const PrimaryImageWrapper = styled.div``;

export const CardImage = styled.img`
  padding: 1rem;
`;

export const Card = styled(AntCard)`
  border-radius: 0.5rem;
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainContainer = styled.div`
  margin-top: 1rem;
`;
