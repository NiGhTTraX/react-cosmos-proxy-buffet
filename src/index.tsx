/* eslint-disable no-use-before-define,space-infix-ops */
import React, { ComponentType } from 'react';
import 'reset.css';
import DefaultProxyBar, { Proxy, ProxyBarProps } from './proxy-bar';

export type ProxyProps = {
  nextProxy: {
    value: ComponentType<ProxyProps>,
    next: Function
  },
  fixture: {
    component: ComponentType
  },
  onComponentRef: Function,
  onFixtureUpdate: Function
};

export default function createProxyBuffet({
  ProxyBar = DefaultProxyBar,
  proxies = []
}: {
ProxyBar?: ComponentType<ProxyBarProps>,
proxies?: Proxy[]
} = {}) {
  return (props: ProxyProps) => {
    const { nextProxy, ...rest } = props;
    const { value: NextProxy, next } = nextProxy;

    return <div className="proxy">
      <ProxyBar proxies={proxies} />
      <NextProxy {...rest} nextProxy={next()} />
    </div>;
  };
}
