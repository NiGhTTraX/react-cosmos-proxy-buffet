import React, { Component, ComponentType } from 'react';
import './proxy-bar.less';

export interface ProxyIconProps {
}

export interface Proxy {
  // eslint-disable-next-line no-restricted-globals
  name: string;
  Icon: ComponentType<ProxyIconProps>
}

export interface ProxyBarProps {
  proxies: Proxy[]
}

export default class ProxyBar extends Component<ProxyBarProps> {
  render() {
    const { proxies } = this.props;

    return <ul className="proxy-bar bottom-right">
      {proxies.map(({ Icon, name }) => <li key={name}>
        <Icon />
      </li>)}
    </ul>;
  }
}
