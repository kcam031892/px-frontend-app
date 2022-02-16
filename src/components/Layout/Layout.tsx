import React, { Suspense } from 'react';

import { Sidebar } from 'components/Sidebar';
import { LoadingSpinner } from 'components/LoadingSpinner';
import { LayoutWrapper, Main, MainWrapper } from './Layout.styled';

type Props = {
  children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <MainWrapper>
        <Suspense fallback={<LoadingSpinner />}>
          <Main>{children}</Main>
        </Suspense>
      </MainWrapper>
    </LayoutWrapper>
  );
};

export default Layout;
