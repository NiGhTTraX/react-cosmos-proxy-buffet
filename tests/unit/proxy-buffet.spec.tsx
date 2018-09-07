import * as React from 'react';
import { createReactStub } from 'react-mock-component';
import {
  Proxy,
  ProxyBarFactoryProps,
  ProxyIconProps,
  ProxyProps
} from '../../src/proxy-bar';
import ProxyBuffet from '../../src/proxy-buffet';
import { $render, describe, expect } from './suite';

describe('ProxyBuffet', () => {
  it('should render the bar', () => {
    const proxies: Proxy[] = [];

    const ProxyBar = createReactStub<ProxyBarFactoryProps>();
    ProxyBar
      .withProps({ proxies })
      .renders(<span>proxy bar</span>);

    const fixture = {
      component: () => null,
      props: {}
    };

    const $proxyBuffet = $render(<ProxyBuffet
      ProxyBar={ProxyBar}
      proxies={proxies}
      cosmosFixture={fixture}
    >
      <span>cosmos content</span>
    </ProxyBuffet>);

    expect($proxyBuffet.text())
      .to.contain('proxy bar')
      .and.to.contain('cosmos content');
  });

  it('should activate the proxy', () => {
    const P = createReactStub<ProxyProps>();
    const proxies: Proxy[] = [{
      id: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: P
    }];

    const ProxyBar = createReactStub<ProxyBarFactoryProps>();
    ProxyBar.withProps({ proxies }).renders(<span>proxy bar</span>);

    const fixture = {
      component: () => null,
      props: {}
    };

    const $proxyBuffet = $render(<ProxyBuffet
      ProxyBar={ProxyBar}
      proxies={proxies}
      cosmosFixture={fixture}
    >
      <span>cosmos content</span>
    </ProxyBuffet>);

    P
      .withProps({ component: fixture.component, props: fixture.props })
      .renders(<span>active proxy</span>);


    ProxyBar.lastProps.onToggleProxy('proxy 1');

    expect($proxyBuffet.text()).to.contain('active proxy');

    const $children = $render(P.lastProps.children);
    expect($children.text()).to.equal('cosmos content');
  });

  it('should deactivate the proxy', () => {
    const P = createReactStub<ProxyProps>();
    const proxies: Proxy[] = [{
      id: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: P
    }];

    const ProxyBar = createReactStub<ProxyBarFactoryProps>();
    ProxyBar.withProps({ proxies }).renders(<span>proxy bar</span>);

    const fixture = {
      component: () => null,
      props: {}
    };

    const $proxyBuffet = $render(<ProxyBuffet
      ProxyBar={ProxyBar}
      proxies={proxies}
      cosmosFixture={fixture}
    >
      <span>cosmos content</span>
    </ProxyBuffet>);

    P
      .withProps({ component: fixture.component, props: fixture.props })
      .renders(<span>active proxy</span>);


    ProxyBar.lastProps.onToggleProxy('proxy 1');
    ProxyBar.lastProps.onToggleProxy('proxy 1');

    expect($proxyBuffet.text()).to.not.contain('active proxy');
  });
});
