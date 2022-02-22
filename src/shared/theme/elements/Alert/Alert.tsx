import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import React from 'react';

type Props = {
  header: string;
  message?: string;
  status: 'success' | 'information' | 'warning' | 'error';
};

const NOTIFICATION_COLORS: {
  [key: string]: {
    borderColor: string;
    backgroundColor: string;
  };
} = {
  success: {
    borderColor: '#49AA19',
    backgroundColor: '#F6FFED',
  },
  warning: {
    borderColor: '#F7C145',
    backgroundColor: '#FFEDCA',
  },
  error: {
    borderColor: '#E84749',
    backgroundColor: '#FFF1F0',
  },
  information: {
    borderColor: '#006F8A',
    backgroundColor: '#EEF9FE',
  },
};

const NOTIFICATION_ICONS: { [key: string]: any } = {
  success: <CheckCircleOutlined style={{ color: '#49AA19' }} />,
  warning: <ExclamationCircleOutlined style={{ color: '#F7C145' }} />,
  error: <CloseCircleOutlined style={{ color: '#E84749' }} />,
  information: <InfoCircleOutlined style={{ color: '#006F8A' }} />,
};

const useAlert = () => {
  const openNotification = ({ header, message, status }: Props) => {
    const notifColor = NOTIFICATION_COLORS[status];
    const NotificationIcon = NOTIFICATION_ICONS[status];
    notification.open({
      message: header,
      description: message,
      style: {
        backgroundColor: notifColor.backgroundColor,
        border: `1px solid ${notifColor.borderColor}`,
        borderRadius: '3px',
      },
      icon: NotificationIcon,
    });
  };
  return {
    success: (header: string, message?: string) => openNotification({ header, message, status: 'success' }),
    warning: (header: string, message?: string) => openNotification({ header, message, status: 'warning' }),
    error: (header: string, message?: string) => openNotification({ header, message, status: 'error' }),
    information: (header: string, message?: string) => openNotification({ header, message, status: 'information' }),
  };
};

export const Alert = useAlert();
