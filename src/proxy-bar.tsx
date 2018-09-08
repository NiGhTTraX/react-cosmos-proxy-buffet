import classNames from 'classnames';
import React, { Component, ComponentType, ReactElement } from 'react';
import { Omit } from './bind';
import './proxy-bar.less';

export interface ProxyIconProps {
}

export interface ProxyProps {
  component: ComponentType,
  props: Object,
  children: ReactElement<any>
}

export interface Proxy {
  id: string;
  Icon: ComponentType<ProxyIconProps>,
  Proxy: ComponentType<ProxyProps>
}

export interface IStorage {
  get(key: string): any;
  set(key: string, value: any): void;
}

export type OnToggleProxy = (id: string) => void;

export enum ProxyBarPosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
}

export interface ProxyBarProps {
  proxies: Proxy[];
  storage: IStorage;
  onToggleProxy: OnToggleProxy;
  position?: ProxyBarPosition
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
    const {
      proxies,
      position = ProxyBarPosition.BottomRight
    } = this.props;

    const classes = classNames('proxy-bar', {
      'top-left': position === ProxyBarPosition.TopLeft,
      'top-right': position === ProxyBarPosition.TopRight,
      'bottom-left': position === ProxyBarPosition.BottomLeft,
      'bottom-right': position === ProxyBarPosition.BottomRight,
      expanded: !this.state.collapsed
    });

    return <div className={classes}>
      <button className="toggle" onClick={this.onToggle}>
        <svg width={10} height={10} viewBox="0 0 1792 1792">
          <path
            d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"
            fill="#fff"
          />
        </svg>
      </button>
      <ul>
        {proxies.map(({ Icon, id }) => <li key={id}>
          <button className="proxy" onClick={this.onToggleProxy.bind(null, id)}>
            <Icon />
          </button>
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

  private onToggleProxy = (id: string) => {
    this.props.onToggleProxy(id);
  };
}

export type ProxyBarFactoryProps = Omit<ProxyBarProps, 'storage'>;
