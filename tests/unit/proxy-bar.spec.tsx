import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { createReactStub } from 'react-mock-component';
import { IMock, Mock } from 'typemoq';
import { describe, it, $render, expect, beforeEach } from './suite';
import ProxyBar, { IStorage, Proxy, ProxyIconProps } from '../../src/proxy-bar';

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

  let storage: IMock<IStorage>;

  describe('collapsing', () => {
    beforeEach(() => {
      storage = Mock.ofType<IStorage>();
    });

    it('should render by default expanded', () => {
      storage
        .setup(fakeStorage => fakeStorage.get('proxy_bar_collapsed'))
        .returns(() => null)
        .verifiable();

      $proxyBar = $render(<ProxyBar
        proxies={proxies}
        storage={storage.object}
      />);

      expect($proxyBar.hasClass('expanded')).to.be.true;

      storage.verifyAll();
    });

    it('should restore the collapsed state', () => {
      storage
        .setup(fakeStorage => fakeStorage.get('proxy_bar_collapsed'))
        .returns(() => true)
        .verifiable();

      $proxyBar = $render(<ProxyBar
        proxies={proxies}
        storage={storage.object}
      />);

      expect($proxyBar.hasClass('expanded')).to.be.false;

      storage.verifyAll();
    });

    it('should persist the collapsed state', () => {
      storage
        .setup(fakeStorage => fakeStorage.set('proxy_bar_collapsed', true))
        .verifiable();

      $proxyBar = $render(<ProxyBar
        proxies={proxies}
        storage={storage.object}
      />);

      Simulate.click($proxyBar.find('.toggle')[0]);

      storage.verifyAll();
    });
  });

  describe('the rest', () => {
    beforeEach(() => {
      storage = Mock.ofType<IStorage>();

      $proxyBar = $render(<ProxyBar
        proxies={proxies}
        storage={storage.object}
      />);
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
});
