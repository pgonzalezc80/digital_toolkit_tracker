import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled.div`
  padding: 20px;
  font-size: 1.5em;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 15px 25px;
  color: #ecf0f1;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }

  &.active {
    background-color: #3498db;
    border-left: 4px solid #2ecc71;
  }

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>KD Tracker</Logo>
      <MenuList>
        <MenuItem>
          <StyledNavLink to="/" end>
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/resoluciones">
            <i className="fas fa-file-alt"></i> Resoluciones
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/datos-extraidos">
            <i className="fas fa-database"></i> Datos Extraídos
          </StyledNavLink>
        </MenuItem>
        <MenuItem>
          <StyledNavLink to="/historial">
            <i className="fas fa-history"></i> Historial
          </StyledNavLink>
        </MenuItem>
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar; 