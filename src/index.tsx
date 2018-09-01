/* eslint-disable no-use-before-define,space-infix-ops */
import React, { ComponentType } from 'react';
import 'reset.css';
import DefaultProxyBar, { IStorage, Proxy, ProxyBarProps } from './proxy-bar';

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

const blackHoleStorage: IStorage = {
  get() {
    return null;
  },

  set(): void {
  }
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
      <ProxyBar proxies={proxies} storage={blackHoleStorage} />
      <NextProxy {...rest} nextProxy={next()} />
    </div>;
  };
}
