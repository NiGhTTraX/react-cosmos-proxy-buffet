/* eslint-disable no-use-before-define,space-infix-ops */
import React, { Component, ComponentType } from 'react';
import store from 'store';
import 'reset.css';
import bindComponent from './bind';
import ProxyBar, { Proxy } from './proxy-bar';
import ProxyBuffet from './proxy-buffet';

export type CosmosProxyProps = {
  nextProxy: {
    value: ComponentType<CosmosProxyProps>,
    next: Function
  },
  fixture: {
    component: ComponentType,
    props: Object
  },
  onComponentRef: Function,
  onFixtureUpdate: Function
};

export interface ProxyBuffetOptions {
  proxies: Proxy[]
}

export default function createCosmosProxyBuffet({
  proxies
}: ProxyBuffetOptions) {
  return class ComosProxyBuffet extends Component<CosmosProxyProps> {
    render() {
      const { nextProxy, fixture, ...rest } = this.props;
      const { value: NextProxy, next } = nextProxy;

      const NextCosmosProxy = <NextProxy
        {...rest}
        fixture={fixture}
        nextProxy={next()}
        key="cosmos-proxy" // to not lose state when a proxy is activated
      />;

      return <ProxyBuffet
        ProxyBar={bindComponent(ProxyBar, { storage: store })}
        proxies={proxies}
        cosmosFixture={fixture}
      >
        {NextCosmosProxy}
      </ProxyBuffet>;
    }
  };
}
