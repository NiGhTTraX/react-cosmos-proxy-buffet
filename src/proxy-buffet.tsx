import React, { Component, ComponentType } from 'react';
import { Proxy, ProxyBarFactoryProps } from './proxy-bar';

interface ProxyBuffetState {
  activeProxy: string | null;
}

export interface ProxyBuffetProps {
  ProxyBar: ComponentType<ProxyBarFactoryProps>,
  // Whatever Cosmos would have rendered.
  children: JSX.Element,
  proxies: Proxy[],
  cosmosFixture: {
    component: ComponentType,
    props: Object
  }
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
        onToggleProxy={this.onToggleProxy}
      />
      <div className="proxy">
        {this.proxyChain()}
      </div>
    </div>;
  }

  private onToggleProxy = (id: string) => {
    this.setState({
      activeProxy: this.state.activeProxy === id ? null : id
    });
  };

  private proxyChain() {
    const { children, proxies, cosmosFixture } = this.props;
    const { activeProxy } = this.state;

    let proxyChildren = children; // first the Cosmos one
    for (let i = proxies.length - 1; i >= 0; i--) {
      const { Proxy: CurrentProxy, id } = proxies[i];

      proxyChildren = <CurrentProxy
        component={cosmosFixture.component}
        props={cosmosFixture.props}
        visible={id === activeProxy}
      >
        {proxyChildren}
      </CurrentProxy>;
    }

    return proxyChildren;
  }
}
