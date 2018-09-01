import * as React from 'react';
import { createReactStub } from 'react-mock-component';
import { stub } from 'sinon';
import createProxyBuffet, { ProxyProps } from '../../src/index';
import { Proxy, ProxyBarProps, ProxyIconProps, ProxyProps2 } from '../../src/proxy-bar';
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
      id: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: () => null
    }];

    const ProxyBar = createReactStub<ProxyBarProps>();

    const ProxyBuffet = createProxyBuffet({ ProxyBar, proxies });
    $render(<ProxyBuffet {...props} />);

    expect(ProxyBar.renderedWith({ proxies })).to.be.true;
  });

  it('should render the active proxy', () => {
    const { props } = createProxyProps();

    const P = createReactStub<ProxyProps2>();
    const proxies: Proxy[] = [{
      id: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: P
    }];

    const ProxyBar = createReactStub<ProxyBarProps>();

    const ProxyBuffet = createProxyBuffet({ ProxyBar, proxies });
    const $x = $render(<ProxyBuffet {...props} />);

    P.withProps(props.fixture).renders(<span>xxx</span>);

    ProxyBar.lastProps.onToggleProxy('proxy 1');

    expect($x.find('.proxy').text()).to.contain('xxx');
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
      component: () => <span>component</span>,
      props: {
        foo: 'bar'
      }
    },
    onFixtureUpdate: () => {
    },
    onComponentRef: () => {
    }
  };

  return { NextProxy, nextProxy, ProxyBar, props };
}
