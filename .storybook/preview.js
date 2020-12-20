import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
      font-size: 10px;
    }
    
    body {
      font-size: 1.4rem;
      font-family: Roboto, sans-serif;
      color: #141414;
    }
    
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      outline: none;
    }
`;

const Container = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f2ff;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const decorators = [
  (Story) => (
    <Fragment>
      <Container>
        <Story />
      </Container>
      <GlobalStyle />
    </Fragment>
  ),
];
