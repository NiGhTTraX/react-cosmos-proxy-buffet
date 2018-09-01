/* eslint-disable no-use-before-define,space-infix-ops */
import React, { Component, ComponentType } from 'react';
import 'reset.css';
import store from 'store';
import DefaultProxyBar, { Proxy, ProxyBarProps } from './proxy-bar';

export type ProxyProps = {
  nextProxy: {
    value: ComponentType<ProxyProps>,
    next: Function
  },
  fixture: {
    component: ComponentType,
    props: Object
  },
  onComponentRef: Function,
  onFixtureUpdate: Function
};

interface ProxyBuffetState {
  activeProxy: string | null;
}

export default function createProxyBuffet({
  ProxyBar = DefaultProxyBar,
  proxies = []
}: {
ProxyBar?: ComponentType<ProxyBarProps>,
proxies?: Proxy[]
} = {}) {
  return class ProxyBuffet extends Component<ProxyProps, ProxyBuffetState> {
    state = {
      activeProxy: null
    };

    render() {
      return <div className="proxy-buffet">
        <ProxyBar
          proxies={proxies}
          storage={store}
          onToggleProxy={this.onToggleProxy}
        />
        <div className="proxy">
          {this.wrapProxy()}
        </div>
      </div>;
    }

    private onToggleProxy = (id: string) => {
      this.setState({
        activeProxy: id
      });
    };

    private wrapProxy() {
      const { nextProxy, fixture, ...rest } = this.props;
      const { value: NextProxy, next } = nextProxy;

      const NextCosmosProxy = <NextProxy {...rest} fixture={fixture} nextProxy={next()} />;

      const { activeProxy } = this.state;
      if (activeProxy) {
        // @ts-ignore
        const ActiveProxy = proxies.find(proxy => proxy.id === activeProxy).Proxy;

        return <ActiveProxy component={fixture.component} props={fixture.props}>
          {NextCosmosProxy}
        </ActiveProxy>;
      }

      return NextCosmosProxy;
    }
  };
}
