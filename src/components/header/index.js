import React from 'react';

import styled from 'styled-components/macro';

const HeaderContainer = styled.header`
  grid-area: header;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  background-color: rgb(63, 81, 181);
`;

const LogoContainer = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: center;
`;

const Logo = styled.a`
  box-sizing: border-box;
  text-decoration: none;
  overflow: visible;

  margin: 0;
  padding: 0 16px;
  outline: 0;
  border: none;
  min-width: 64px;
  line-height: 36px;
  border-radius: 4px;

  font-weight: 500;
  color: rgb(255, 255, 255);
`;

const Header = () => {
  return (
    <HeaderContainer classNames="page-header">
      <LogoContainer>
        <Logo href="https://github.com/volodymyrradchenko">Volodymyr Radchenko</Logo>
      </LogoContainer>
    </HeaderContainer>
  );
};

export default Header;
