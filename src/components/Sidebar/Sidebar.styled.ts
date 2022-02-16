import styled from 'styled-components';
import { Layout, Menu as AntMenu } from 'antd';
const { Sider } = Layout;

export const SidebarWrapper = styled(Sider)`
  background-color: #333;
  padding: 1.75rem 1rem;
`;

export const Menu = styled(AntMenu)`
  &.ant-menu {
    background-color: transparent;
    border: none;

    padding: 0 !important;
    .ant-menu-sub {
      background-color: transparent;
    }
  }

  .ant-menu-item {
    // padding: 14px !important;
    a {
      color: #fff;
    }
    &.ant-menu-item-disabled {
      .ant-menu-title-content {
        a {
          color: grey !important;
        }
      }
    }
    &.ant-menu-item-selected {
      background-color: #4a4a4a !important;
      .ant-menu-title-content {
        a {
          color: #fff;
        }
      }
      /* .anticon {
        svg {
          background-color: #828285;
        }
      } */
    }
    .anticon {
      svg {
        height: 1.255rem;
        width: 1.25rem;
      }
    }
  }
  .ant-menu-submenu {
    .ant-menu-item {
      padding-left: 24px !important;
    }
    svg {
      height: 1.255rem;
      width: 1.25rem;
    }
  }
  .ant-menu-submenu-title {
    padding: 0 !important;
    /* margin: 0 !important; */
  }
`;
