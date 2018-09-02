import React, { Component, ComponentType } from 'react';
import store from 'store';
import { Proxy, ProxyBarProps } from './proxy-bar';

export interface ProxyBuffetState {
  activeProxy: string | null;
}

export interface ProxyBuffetProps {
  ProxyBar: ComponentType<ProxyBarProps>,
  // Whatever Cosmos would have rendered.
  children: JSX.Element,
  proxies: Proxy[],
  cosmosFixture: {
    component: ComponentType,
    props: Object
  },
}

export default class ProxyBuffet extends Component<ProxyBuffetProps, ProxyBuffetState> {
  state = {
    activeProxy: null
  };

  render() {
    const { ProxyBar, proxies } = this.props;

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
    const { children, proxies, cosmosFixture } = this.props;
    const { activeProxy } = this.state;

    if (activeProxy) {
      const foundProxy = proxies.find(proxy => proxy.id === activeProxy);
      // @ts-ignore
      const ActiveProxy = foundProxy.Proxy;

      return <ActiveProxy component={cosmosFixture.component} props={cosmosFixture.props}>
        {children}
      </ActiveProxy>;
    }

    return children;
  }
}
