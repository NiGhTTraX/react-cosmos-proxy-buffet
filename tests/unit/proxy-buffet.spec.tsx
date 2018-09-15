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

  it('should render the chain of proxies', () => {
    const P1 = createReactStub<ProxyProps>();
    const P2 = createReactStub<ProxyProps>();
    const proxies: Proxy[] = [{
      id: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: P1
    }, {
      id: 'proxy 2',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: P2
    }];

    const ProxyBar = createReactStub<ProxyBarFactoryProps>();

    const fixture = {
      component: () => null,
      props: {}
    };

    P1.withProps({
      component: fixture.component,
      props: fixture.props
    }).renders(<span>proxy 1</span>);

    P2.withProps({
      component: fixture.component,
      props: fixture.props
    }).renders(<span>proxy 2</span>);

    const $proxyBuffet = $render(<ProxyBuffet
      ProxyBar={ProxyBar}
      proxies={proxies}
      cosmosFixture={fixture}
    >
      <span>cosmos content</span>
    </ProxyBuffet>);

    expect($proxyBuffet.text()).to.contain('proxy 1');

    const $p1Children = $render(P1.lastProps.children);
    expect($p1Children.text()).to.contain('proxy 2');

    const $p2Children = $render(P2.lastProps.children);
    expect($p2Children.text()).to.contain('cosmos content');
  });

  it('should activate a proxy', () => {
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
      .withProps({ visible: true })
      .renders(<span>visible proxy</span>);

    ProxyBar.lastProps.onToggleProxy('proxy 1');

    expect($proxyBuffet.text()).to.contain('visible proxy');

    const $children = $render(P.lastProps.children);
    expect($children.text()).to.equal('cosmos content');
  });

  it('should deactivate a proxy', () => {
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

    $render(<ProxyBuffet
      ProxyBar={ProxyBar}
      proxies={proxies}
      cosmosFixture={fixture}
    >
      <span>cosmos content</span>
    </ProxyBuffet>);

    ProxyBar.lastProps.onToggleProxy('proxy 1');

    P.sinonStub.reset();

    ProxyBar.lastProps.onToggleProxy('proxy 1');

    expect(P.renderedWith({ visible: false })).to.be.true;
  });
});
