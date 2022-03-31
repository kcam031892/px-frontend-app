import {
  DashboardIcon,
  MediaIcon,
  MessagingIcon,
  PitchIcon,
  ProfilesIcon,
  ProjectsIcon,
  RepresentationIcon,
  ScheduleIcon,
} from 'components/Icons';

import { ROUTES } from './ROUTES';

interface ISidebarItems {
  name: string;
  icon: React.ReactNode;
  link?: string;
}
export const SIDEBAR_ITEMS: ISidebarItems[] = [
  {
    name: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'Profiles',
    icon: <ProfilesIcon />,
    link: ROUTES.TALENT.PROFILE,
  },
  {
    name: 'Media',
    icon: <MediaIcon />,
    link: `${ROUTES.TALENT.MEDIA}/dashboard`,
  },
  {
    name: 'Projects',
    icon: <ProjectsIcon />,
  },
  {
    name: 'Messaging',
    icon: <MessagingIcon />,
  },
  {
    name: 'Representation',
    icon: <RepresentationIcon />,
  },
  {
    name: 'Pitch',
    icon: <PitchIcon />,
  },
  {
    name: 'Schedule',
    icon: <ScheduleIcon />,
  },
];
