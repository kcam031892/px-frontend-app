import { DashboardIcon, ProjectsIcon, TalentsIcon } from 'components/Icons';
import MessaginIcon from 'components/Icons/MessaginIcon';
import { ROUTES } from './ROUTES';

export type SidebarItemProps = {
  key?: number;
  Icon?: React.ReactNode;
  title: string;
  to: string;
  disabled?: boolean;
};
export const SIDEBAR_LIST: SidebarItemProps[] = [
  {
    title: 'Dashboard',
    to: ROUTES.DASHBOARD,
    Icon: <DashboardIcon />,
  },
  {
    title: 'Profile',
    to: ROUTES.PROFILE,
    Icon: <ProjectsIcon />,
  },
  {
    title: 'Talent',
    to: ROUTES.TALENT,
    Icon: <TalentsIcon />,
    disabled: true,
  },
  {
    title: 'Agencies',
    to: ROUTES.AGENCIES,
    disabled: true,
  },
  {
    title: 'Messaging',
    to: ROUTES.MESSAGING,
    Icon: <MessaginIcon />,
    disabled: true,
  },
  {
    title: 'Contacts',
    to: ROUTES.CONTACTS,
    disabled: true,
  },
];
