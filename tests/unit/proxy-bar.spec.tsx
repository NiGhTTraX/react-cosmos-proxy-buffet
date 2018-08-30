import React from 'react';
import { createReactStub } from 'react-mock-component';
import { describe, it, $render, expect, beforeEach } from './suite';
import ProxyBar, { Proxy, ProxyIconProps } from '../../src/proxy-bar';

describe('ProxyBar', () => {
  let $proxyBar: JQuery;

  const Proxy1: Proxy = {
    name: 'proxy 1',
    Icon: createReactStub<ProxyIconProps>()
      .withProps({})
      .renders(<span>icon 1</span>)
  };

  const Proxy2: Proxy = {
    name: 'proxy 2',
    Icon: createReactStub<ProxyIconProps>()
      .withProps({})
      .renders(<span>icon 2</span>)
  };

  const proxies: Proxy[] = [Proxy1, Proxy2];

  beforeEach(() => {
    $proxyBar = $render(<ProxyBar proxies={proxies} />);
  });

  it('should render by default in the bottom right', () => {
    expect($proxyBar.hasClass('bottom-right')).to.be.true;
  });

  it('should render the icons for all proxies', () => {
    expect($proxyBar.text())
      .to.contain('icon 1')
      .and.to.contain('icon 2');
  });
});
