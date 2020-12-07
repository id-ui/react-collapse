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
    
    button {
      outline: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      border: none;
      cursor: pointer;
      border-radius: 0.5rem;
      padding: 0 1.5rem;
      background-color: #095d25;
      color: #fff;
      height: 3.5rem;
      &:hover {
        background-color: #126e2f;
      }
    }
`;

const Container = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fffcfc;
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
