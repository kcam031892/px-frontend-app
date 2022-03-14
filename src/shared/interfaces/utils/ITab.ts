import React from 'react';

export interface ITab {
  name: string;
  header: string;
  component: React.ReactElement;
  disabled?: boolean;
}
