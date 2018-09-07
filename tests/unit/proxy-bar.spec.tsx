import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import { createReactStub } from 'react-mock-component';
import { IMock, Mock } from 'typemoq';
import ProxyBar, {
  IStorage,
  OnToggleProxy,
  Proxy,
  ProxyBarPosition,
  ProxyIconProps,
  ProxyProps
} from '../../src/proxy-bar';
import { $render, beforeEach, describe, expect, it } from './suite';

describe('ProxyBar', () => {
  let $proxyBar: JQuery;

  const P1 = createReactStub<ProxyProps>();
  const Proxy1: Proxy = {
    id: 'proxy 1',
    Icon: createReactStub<ProxyIconProps>()
      .withProps({})
      .renders(<span>icon 1</span>),
    Proxy: P1
  };

  const P2 = createReactStub<ProxyProps>();
  const Proxy2: Proxy = {
    id: 'proxy 2',
    Icon: createReactStub<ProxyIconProps>()
      .withProps({})
      .renders(<span>icon 2</span>),
    Proxy: P2
  };

  const proxies: Proxy[] = [Proxy1, Proxy2];

  let storage: IMock<IStorage>, onToggleProxy: IMock<OnToggleProxy>;

  beforeEach(() => {
    onToggleProxy = Mock.ofType<OnToggleProxy>();
  });

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
        onToggleProxy={onToggleProxy.object}
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
        onToggleProxy={onToggleProxy.object}
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
        onToggleProxy={onToggleProxy.object}
      />);

      Simulate.click($proxyBar.find('.toggle')[0]);

      storage.verifyAll();
    });
  });

  // TODO: find a better name for this suite
  describe('the rest', () => {
    beforeEach(() => {
      storage = Mock.ofType<IStorage>();

      $proxyBar = $render(<ProxyBar
        proxies={proxies}
        storage={storage.object}
        onToggleProxy={onToggleProxy.object}
      />);
    });

    it('should render by default in the bottom right', () => {
      expect($proxyBar.hasClass('bottom-right')).to.be.true;
    });

    it('should respect the location settings', () => {
      $proxyBar = $render(<ProxyBar
        proxies={proxies}
        storage={storage.object}
        onToggleProxy={onToggleProxy.object}
        position={ProxyBarPosition.TopLeft}
      />);

      expect($proxyBar.hasClass('top-left')).to.be.true;
    });

    it('should render the icons for all proxies', () => {
      expect($proxyBar.text())
        .to.contain('icon 1')
        .and.to.contain('icon 2');
    });

    it('should call when selecting the first proxy', () => {
      onToggleProxy
        .setup(cb => cb('proxy 1'))
        .verifiable();

      Simulate.click($proxyBar.find('.proxy:first')[0]);

      onToggleProxy.verifyAll();
    });

    it('should call when selecting the last proxy', () => {
      onToggleProxy
        .setup(cb => cb('proxy 2'))
        .verifiable();

      Simulate.click($proxyBar.find('.proxy:last')[0]);

      onToggleProxy.verifyAll();
    });
  });
});
