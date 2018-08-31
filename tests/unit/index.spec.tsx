import * as React from 'react';
import { createReactStub } from 'react-mock-component';
import { stub } from 'sinon';
import createProxyBuffet, { ProxyProps } from '../../src/index';
import { Proxy, ProxyBarProps, ProxyIconProps } from '../../src/proxy-bar';
import { $render, describe, expect, it } from './suite';

describe('ProxyBar', () => {
  it('it should render the next proxy', () => {
    const { NextProxy, nextProxy, ProxyBar, props } = createProxyProps();

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

  it('should accept a list of proxies', () => {
    const { props } = createProxyProps();

    const proxies: Proxy[] = [{
      name: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>()
    }];

    const ProxyBar = createReactStub<ProxyBarProps>();

    const ProxyBuffet = createProxyBuffet({ ProxyBar, proxies });
    $render(<ProxyBuffet {...props} />);

    expect(ProxyBar.renderedWith({ proxies })).to.be.true;
  });
});

function createProxyProps() {
  const NextProxy = createReactStub<ProxyProps>();
  const nextProxy = {
    value: () => null,
    next: () => null
  };
  const next = stub()
    .returns(nextProxy);

  const ProxyBar = createReactStub<ProxyBarProps>();
  ProxyBar.withProps({})
    .renders(<span>proxy bar</span>);

  const props: ProxyProps = {
    nextProxy: {
      value: NextProxy,
      next
    },
    fixture: {
      component: () => null
    },
    onFixtureUpdate: () => {
    },
    onComponentRef: () => {
    }
  };

  return { NextProxy, nextProxy, ProxyBar, props };
}
