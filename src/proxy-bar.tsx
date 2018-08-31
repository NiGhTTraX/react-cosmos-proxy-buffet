import React, { Component, ComponentType } from 'react';
import classNames from 'classnames';
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

interface ProxyBarState {
  collapsed: boolean;
}

export default class ProxyBar extends Component<ProxyBarProps, ProxyBarState> {
  state = {
    collapsed: false
  };

  render() {
    const { proxies } = this.props;
    const classes = classNames('proxy-bar bottom-right', {
      expanded: !this.state.collapsed
    });

    return <div className={classes}>
      <button className="toggle" onClick={this.onToggle}>
        <svg width={10} height={10} viewBox="0 0 1792 1792">
          {this.state.collapsed ? <path
            d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"
            fill="#fff"
          /> : <path
            d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
            fill="#fff"
          />}
        </svg>
      </button>
      <ul>
        {proxies.map(({ Icon, name }) => <li key={name}>
          <Icon />
        </li>)}
      </ul>
    </div>;
  }

  private onToggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
}
