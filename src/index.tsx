/* eslint-disable no-use-before-define,space-infix-ops */
import React, { Component, ComponentType } from 'react';
import 'reset.css';
import DefaultProxyBar, { Proxy, ProxyBarProps } from './proxy-bar';
import DefaultProxyBuffet, { ProxyBuffetProps } from './proxy-buffet';

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
  ProxyBar?: ComponentType<ProxyBarProps>,
  ProxyBuffet?: ComponentType<ProxyBuffetProps>,
  proxies: Proxy[]
}

export default function createCosmosProxyBuffet({
  ProxyBar = DefaultProxyBar,
  ProxyBuffet = DefaultProxyBuffet,
  proxies
}: ProxyBuffetOptions) {
  return class ComosProxyBuffet extends Component<CosmosProxyProps> {
    render() {
      const { nextProxy, fixture, ...rest } = this.props;
      const { value: NextProxy, next } = nextProxy;

      const NextCosmosProxy = <NextProxy {...rest} fixture={fixture} nextProxy={next()} />;

      return <ProxyBuffet
        ProxyBar={ProxyBar}
        proxies={proxies}
        cosmosFixture={fixture}
      >
        {NextCosmosProxy}
      </ProxyBuffet>;
    }
  };
}
