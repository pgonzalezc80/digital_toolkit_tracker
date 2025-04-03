import React from 'react';
import styled from 'styled-components';
import ExpedientesList from './ExpedientesList';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header>
        <h1>Dashboard de Expedientes</h1>
      </Header>
      <ExpedientesList />
    </DashboardContainer>
  );
};

export default Dashboard; 