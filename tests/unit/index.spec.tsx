import { createReactStub } from 'react-mock-component';
import * as React from 'react';
import { stub } from 'sinon';
import { ProxyBarProps } from '../../src/proxy-bar';
import { $render, describe, it, expect } from './suite';
import createProxyBuffet, { ProxyProps } from '../../src/index';

describe('ProxyBar', () => {
  it('it should render the next proxy', () => {
    const NextProxy = createReactStub<ProxyProps>();
    const nextProxy = {
      value: () => null,
      next: () => null
    };
    const next = stub().returns(nextProxy);

    const ProxyBar = createReactStub<ProxyBarProps>();
    ProxyBar.withProps({}).renders(<span>proxy bar</span>);

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

    const ProxyBuffet = createProxyBuffet({ ProxyBar });
    const $proxyBar = $render(<ProxyBuffet {...props} />);

    expect($proxyBar.text()).to.contain('next proxy');
    expect($proxyBar.text()).to.contain('proxy bar');
  });
});
