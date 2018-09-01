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

export interface IStorage {
  get(key: string): any;
  set(key: string, value: any): void;
}

export interface ProxyBarProps {
  proxies: Proxy[],
  storage: IStorage
}

interface ProxyBarState {
  collapsed: boolean;
}

export default class ProxyBar extends Component<ProxyBarProps, ProxyBarState> {
  private STORAGE_COLLAPSED_KEY = 'proxy_bar_collapsed';

  constructor(props: Readonly<ProxyBarProps>) {
    super(props);

    this.state = {
      collapsed: this.props.storage.get(this.STORAGE_COLLAPSED_KEY)
    };
  }

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
    }, () => {
      this.props.storage.set(
        this.STORAGE_COLLAPSED_KEY,
        this.state.collapsed
      );
    });
  };
}
