import styled from 'styled-components';
import { Card as AntCard, Space } from 'antd';

export const TableCardWrapper = styled.div`
  position: relative;
`;

export const Card = styled(AntCard)`
  .card__space {
    width: 100%;
  }
`;

export const ItemsContainer = styled(Space)`
  width: 100%;
  padding-bottom: 2rem;
`;

export const GridActions = styled(Space)``;

export const ActionContainer = styled.div<{
  isShow?: boolean;
}>`
  position: absolute;
  right: 0;
  top: -52px;
  background: #fff;
  padding: 14px 18px;
  z-index: 10;
  min-height: 48px;
  box-shadow: 0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08),
    0px 10px 48px rgba(55, 71, 79, 0.08);
  border-radius: 8px;
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};

  .action__select {
    width: 100px !important;
  }
`;
