# Collapse React Component

[![NPM](https://img.shields.io/npm/v/@kaprisa57/react-collapse/.svg)](https://www.npmjs.com/package/@kaprisa57/react-collapse/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/kseniya57/react-collapse/badge.svg?branch=main)](https://coveralls.io/github/kseniya57/react-collapse?branch=main)

- [Docs](https://kseniya57.github.io/react-collapse/?path=/docs/collapse--playground)
- [Playground](https://kseniya57.github.io/react-collapse/?path=/story/collapse--playground)

## Install

```bash
npm install --save @kaprisa57/react-collapse
```

```bash
yarn add @kaprisa57/react-collapse
```

### See props in [Docs](https://kseniya57.github.io/react-collapse/?path=/docs/collapse--playground)


### Basic Example

```jsx
import React from 'react'
import Collapse from '@kaprisa57/react-collapse'

function Example() {
  return <Collapse>
    <Collapse.Header>Open</Collapse.Header>
    <Collapse.Body>:)</Collapse.Body>
  </Collapse>
}
```

### Header Function

```jsx
import React, { Fragment } from 'react'
import Collapse from '@kaprisa57/react-collapse'

function Example() {
  return <Collapse>
      <Header>
        {({ open, close, toggle }) => (
          <Fragment>
            <button onClick={open}>Open</button>
            <button onClick={close}>Close</button>
            <button onClick={toggle}>Toggle</button>
          </Fragment>
        )}
      </Header>
      <Collapse.Body>:)</Collapse.Body>
  </Collapse>
}
```

### Body Function

```jsx
import React from 'react'
import Collapse from '@kaprisa57/react-collapse'

function Example() {
  return <Collapse>
    <Collapse.Header>Open</Collapse.Header>
    <Collapse.Body>
        {({ close }) => (
            <Button onClick={close}>Close</Button>
        )}
    </Collapse.Body>
  </Collapse>
}
```

### Styling

```jsx
import React from 'react'
import styled from 'styled-components';
import Collapse from '@kaprisa57/react-collapse'

const Header = styled(Collapse.Header)`
  padding: 10px;
  line-height: 20px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  width: 100%;
`;

const Body = styled(Collapse.Body)`
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  padding: 20px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 100%;
`;

const Content = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Example() {
  return <Collapse>
    <Header>Open</Header>
    <Body>
        <Content>:)</Content>
    </Body>
  </Collapse>
}
```

### Custom Animation

```jsx
import React from 'react'
import Collapse from '@kaprisa57/react-collapse'

function Example() {
  return  <Collapse>
     <Collapse.Header>Open</Collapse.Header>
     <Collapse.Body animation={{
       initial: {
         opacity: 0,
       },
       animate: {
         opacity: 1
       },
       exit: {
         opacity: 0
       },
       transition: { duration: 0.1, ease: [0.3, 0.6, 0.3, 0.2] },
     }}>
       :)
     </Collapse.Body>
  </Collapse>
}
```

### See more details in [storybook](https://kseniya57.github.io/react-collapse/?path=/docs/collapse--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/kaprisa57@gmail.com)