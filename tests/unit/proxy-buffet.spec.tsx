import * as React from 'react';
import { createReactStub } from 'react-mock-component';
import { IMock, Mock } from 'typemoq';
import { IStorage, Proxy, ProxyBarProps, ProxyIconProps, ProxyProps } from '../../src/proxy-bar';
import ProxyBuffet from '../../src/proxy-buffet';
import { $render, describe, expect } from './suite';

describe('ProxyBuffet', () => {
  const storage: IMock<IStorage> = Mock.ofType<IStorage>();

  it('should render the bar', () => {
    const proxies: Proxy[] = [];

    const ProxyBar = createReactStub<ProxyBarProps>();
    ProxyBar
      .withProps({ proxies, storage: storage.object })
      .renders(<span>proxy bar</span>);

    const fixture = {
      component: () => null,
      props: {}
    };

    const $proxyBuffet = $render(<ProxyBuffet
      ProxyBar={ProxyBar}
      proxies={proxies}
      cosmosFixture={fixture}
      storage={storage.object}
    >
      <span>cosmos content</span>
    </ProxyBuffet>);

    expect($proxyBuffet.text())
      .to.contain('proxy bar')
      .and.to.contain('cosmos content');
  });

  it('should render the active proxy', () => {
    const P = createReactStub<ProxyProps>();
    const proxies: Proxy[] = [{
      id: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: P
    }];

    const ProxyBar = createReactStub<ProxyBarProps>();
    ProxyBar.withProps({ proxies }).renders(<span>proxy bar</span>);

    const fixture = {
      component: () => null,
      props: {}
    };

    const $proxyBuffet = $render(<ProxyBuffet
      ProxyBar={ProxyBar}
      proxies={proxies}
      cosmosFixture={fixture}
      storage={storage.object}
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
});
