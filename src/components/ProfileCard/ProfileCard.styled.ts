import styled from 'styled-components';
import { Avatar as AntAvatar, Tag as AntTag } from 'antd';

export const ProfileCardWrapper = styled.div`
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  min-height: 250px;
  display: flex;
  flex-direction: column;
`;

export const ProfileCardContent = styled.div`
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  height: 100%;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  flex: 1;
  position: relative;
  cursor: pointer;
`;

export const Avatar = styled(AntAvatar)`
  height: 80px;
  width: 80px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Tag = styled(AntTag)`
  border-radius: 8px;
`;

export const ProfileCardFooter = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const ProfileTextContainer = styled.div``;
