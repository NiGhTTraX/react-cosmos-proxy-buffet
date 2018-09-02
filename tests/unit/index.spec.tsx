import * as React from 'react';
import { createReactStub } from 'react-mock-component';
import { stub } from 'sinon';
import createCosmosProxyBuffet, { CosmosProxyProps } from '../../src/index';
import { Proxy, ProxyBarProps, ProxyIconProps, ProxyProps2 } from '../../src/proxy-bar';
import { ProxyBuffetProps } from '../../src/proxy-buffet';
import { $render, describe, expect, it } from './suite';

describe('CosmosProxyBuffet', () => {
  it('it pass all the Cosmos props to ProxyBuffet', () => {
    const NextProxy = createReactStub<CosmosProxyProps>();
    const nextProxy = {
      value: () => null,
      next: () => null
    };
    const next = stub().returns(nextProxy);

    const props: CosmosProxyProps = {
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

    NextProxy
      .withProps({
        fixture: props.fixture,
        onFixtureUpdate: props.onFixtureUpdate,
        onComponentRef: props.onComponentRef,
        nextProxy
      })
      .renders(<span>next proxy</span>);

    const proxies: Proxy[] = [{
      id: 'proxy 1',
      Icon: createReactStub<ProxyIconProps>(),
      Proxy: createReactStub<ProxyProps2>()
    }];

    const ProxyBar = createReactStub<ProxyBarProps>();

    const ProxyBuffet = createReactStub<ProxyBuffetProps>();
    ProxyBuffet
      .withProps({
        ProxyBar,
        proxies,
        cosmosFixture: props.fixture
      })
      .renders(<span>proxy buffet</span>);

    const CosmosProxyBuffet = createCosmosProxyBuffet({
      ProxyBar,
      ProxyBuffet,
      proxies
    });

    const $cosmosProxyBuffet = $render(<CosmosProxyBuffet {...props} />);

    expect($cosmosProxyBuffet.text()).to.equal('proxy buffet');

    const $children = $render(ProxyBuffet.lastProps.children);
    expect($children.text()).to.equal('next proxy');
  });
});
