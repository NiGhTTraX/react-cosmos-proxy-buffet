/* eslint-disable no-use-before-define,space-infix-ops */
import React, { ComponentType } from 'react';

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

export default () =>
  (props: ProxyProps) => {
    const { nextProxy, ...rest } = props;
    const { value: NextProxy, next } = nextProxy;

    return <div className="proxy">
      <p>Hello proxy</p>
      <NextProxy {...rest} nextProxy={next()} />
    </div>;
  };
