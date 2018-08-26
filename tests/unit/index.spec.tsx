import { createReactStub } from 'react-mock-component';
import * as React from 'react';
import { stub } from 'sinon';
import { expect } from 'chai';
import { $render, describe, it } from './suite';
import createProxyBar, { ProxyProps } from '../../src/index';

describe('ProxyBar', () => {
  it('it should render the next proxy', () => {
    const NextProxy = createReactStub<ProxyProps>();
    const nextProxy = {
      value: () => null,
      next: () => null
    };
    const next = stub().returns(nextProxy);

    const props: ProxyProps = {
      nextProxy: {
        value: NextProxy,
        next
      },
      fixture: {
        component: () => null
      },
      onFixtureUpdate: () => {},
      onComponentRef: () => {}
    };

    NextProxy
      .withProps({
        fixture: props.fixture,
        onFixtureUpdate: props.onFixtureUpdate,
        onComponentRef: props.onComponentRef,
        nextProxy
      })
      .renders(<span>next proxy</span>);

    const ProxyBar = createProxyBar();
    const $proxyBar = $render(<ProxyBar {...props} />);

    expect($proxyBar.text()).to.contain('next proxy');
  });
});
