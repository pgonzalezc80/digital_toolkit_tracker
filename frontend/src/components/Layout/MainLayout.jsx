import React from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  margin-left: 250px;
  width: calc(100% - 250px);
  min-height: 100vh;
  background-color: #f5f6fa;
  padding: 20px;
`;

const MainLayout = ({ children }) => {
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout; 