import React, { Fragment } from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Collapse from 'components/Collapse';
import _ from 'lodash';
import { renderHook, act } from '@testing-library/react-hooks';
import { useOpen } from 'components/Collapse/hooks';

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
      <Collapse>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    expect(queryByText('body')).not.toBeInTheDocument();
    user.click(getByText('header'));
    expect(getByText('body')).toBeInTheDocument();
    user.click(getByText('header'));
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());
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
    expect(getByText('body')).toBeInTheDocument();
    user.click(getByTestId('close'));
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());
    user.click(getByTestId('toggle'));
    expect(getByText('body')).toBeInTheDocument();
    user.click(getByTestId('toggle'));
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());
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
    expect(getByText('body')).toBeInTheDocument();
    user.click(getByText('close'));
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());
  });

  it('handles controlled open state', async () => {
    const { getByText, queryByText, rerender } = render(
      <Collapse isOpenControlled>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    expect(queryByText('body')).not.toBeInTheDocument();
    user.click(getByText('header'));
    expect(queryByText('body')).not.toBeInTheDocument();

    rerender(
      <Collapse isOpenControlled isOpen>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    expect(getByText('body')).toBeInTheDocument();
    user.click(getByText('header'));
    expect(getByText('body')).toBeInTheDocument();

    rerender(
      <Collapse isOpenControlled>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());
  });

  it('closes on enter', async () => {
    const { getByText, queryByText, rerender } = render(
      <Collapse closeOnEnter>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );
    user.click(getByText('header'));
    expect(getByText('body')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());

    rerender(
      <Collapse closeOnEnter={false}>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );

    user.click(getByText('header'));
    expect(getByText('body')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Enter', code: 'Enter' });
    await waitFor(() => expect(getByText('body')).toBeInTheDocument());
  });

  it('closes on escape', async () => {
    const { getByText, queryByText } = render(
      <Collapse closeOnEscape>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );
    user.click(getByText('header'));
    expect(getByText('body')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());
  });

  it('closes on remote click', async () => {
    const { getByText, queryByText } = render(
      <Collapse closeOnRemoteClick>
        <Collapse.Header>header</Collapse.Header>
        <Collapse.Body>body</Collapse.Body>
      </Collapse>
    );
    user.click(getByText('header'));
    expect(getByText('body')).toBeInTheDocument();
    const button = document.createElement('button');
    document.body.appendChild(button);
    fireEvent.mouseDown(button, { which: 1 });
    await waitFor(() => expect(queryByText('body')).not.toBeInTheDocument());

    user.click(getByText('header'));
    fireEvent.mouseDown(button, { which: 0 });
    await waitFor(() => expect(getByText('body')).toBeInTheDocument());
  });

  it('useOpen: toggle, open, close', async () => {
    const { result } = renderHook(useOpen, {
      initialProps: {
        onClose: _.noop,
        closeOnRemoteClick: true,
        closeOnEscape: true,
        closeOnEnter: false,
        onChangeOpen: _.noop,
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
        isOpenControlled: true,
      },
    });
    expect(result.current.isOpen).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });
});
