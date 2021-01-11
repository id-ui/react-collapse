import React, { Fragment } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Collapse from 'components/Collapse';
import _ from 'lodash';
import { renderHook, act } from '@testing-library/react-hooks';
import { useOpen } from 'components/Collapse/hooks';

const checkIfClosed = (body) =>
  expect(body.style.transform).toBe('scaleY(0) translateZ(0)');
const checkIfOpen = (body) => expect(body.style.transform).toBe('none');

describe('Collapse', () => {
  it('accessible', async () => {
    const { container } = render(
      <Collapse>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('opens/closes on header click', async () => {
    const { getByText, queryByText } = render(
      <Collapse lazy={false}>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    checkIfClosed(queryByText('body'));
    user.click(getByText('header'));
    await waitFor(() => checkIfOpen(getByText('body')));
    user.click(getByText('header'));
    await waitFor(() => checkIfClosed(queryByText('body')));
  });

  it('header function', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <Collapse>
        <Collapse.Header data-testid="header">
          {({ open, close, toggle }) => (
            <Fragment>
              <button data-testid="open" onClick={open}>
                Open
              </button>
              <button data-testid="close" onClick={close}>
                Close
              </button>
              <button data-testid="toggle" onClick={toggle}>
                Toggle
              </button>
            </Fragment>
          )}
        </Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    expect(queryByText('body')).not.toBeInTheDocument();
    user.click(getByTestId('header'));
    expect(queryByText('body')).not.toBeInTheDocument();
    user.click(getByTestId('open'));
    await waitFor(() => checkIfOpen(getByText('body')));
    user.click(getByTestId('close'));
    await waitFor(() => checkIfClosed(getByText('body')));
    user.click(getByTestId('toggle'));
    await waitFor(() => checkIfOpen(getByText('body')));
    user.click(getByTestId('toggle'));
    await waitFor(() => checkIfClosed(getByText('body')));
  });

  it('body function', async () => {
    const { getByText, queryByText } = render(
      <Collapse>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>
          {({ close }) => (
            <div>
              <div>body</div>
              <button data-testid="close" onClick={close}>
                close
              </button>
            </div>
          )}
        </Collapse.Body>
      </Collapse>
    );

    expect(queryByText('body')).not.toBeInTheDocument();
    user.click(getByText('header'));
    await waitFor(() =>
      checkIfOpen(getByText('body').parentElement.parentElement)
    );
    user.click(getByText('close'));
    await waitFor(() =>
      checkIfClosed(getByText('body').parentElement.parentElement)
    );
  });

  it('handles controlled open state', async () => {
    const { getByText, queryByText, rerender } = render(
      <Collapse isOpen={false}>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    expect(queryByText('body')).not.toBeInTheDocument();
    user.click(getByText('header'));
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());

    rerender(
      <Collapse isOpen>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    await waitFor(() => checkIfOpen(getByText('body')));
    user.click(getByText('header'));
    await waitFor(() => checkIfOpen(getByText('body')));

    rerender(
      <Collapse isOpen={false}>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    await waitFor(() => checkIfClosed(getByText('body')));
  });

  it('closes on enter', async () => {
    const { getByText, rerender } = render(
      <Collapse closeOnEnter>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );
    user.click(getByText('header'));
    await waitFor(() => checkIfOpen(getByText('body')));
    fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });
    await waitFor(() => checkIfClosed(getByText('body')));

    rerender(
      <Collapse closeOnEnter={false}>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    user.click(getByText('header'));
    await waitFor(() => checkIfOpen(getByText('body')));
    fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });
    await waitFor(() => checkIfOpen(getByText('body')));
  });

  it('closes on escape', async () => {
    const { getByText } = render(
      <Collapse closeOnEscape>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );
    user.click(getByText('header'));
    await waitFor(() => checkIfOpen(getByText('body')));
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    await waitFor(() => checkIfClosed(getByText('body')));
  });

  it('closes on remote click', async () => {
    const { getByText } = render(
      <Collapse closeOnRemoteClick>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );
    user.click(getByText('header'));
    await waitFor(() => checkIfOpen(getByText('body')));
    const button = document.createElement('button');
    document.body.appendChild(button);
    fireEvent.mouseDown(button, { which: 1 });
    await waitFor(() => checkIfClosed(getByText('body')));

    user.click(getByText('header'));
    fireEvent.mouseDown(button, { which: 0 });
    await waitFor(() => checkIfOpen(getByText('body')));
  });

  it('useOpen: toggle, open, close', async () => {
    const { result } = renderHook(useOpen, {
      initialProps: {
        onClose: _.noop,
        closeOnRemoteClick: true,
        closeOnEscape: true,
        closeOnEnter: false,
        onChangeOpen: _.noop,
        initialIsOpen: false,
      },
    });
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle(false));
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.setOpen(true, true));
    expect(result.current.isOpen).toBe(true);
  });

  it('useOpen: controlled visibility', async () => {
    const { result } = renderHook(useOpen, {
      initialProps: {
        onClose: _.noop,
        onChangeOpen: _.noop,
        initialIsOpen: false,
        isOpen: false,
      },
    });
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });
});
