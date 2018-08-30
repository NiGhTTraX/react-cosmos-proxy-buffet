import * as React from 'react';
import ProxyBar, { Proxy, ProxyBarProps } from '../../../src/proxy-bar';

const Proxy1: Proxy = {
  name: 'proxy 1',
  Icon: () => <span>icon</span>
};

export default {
  component: ProxyBar,
  props: {
    proxies: [Proxy1]
  } as ProxyBarProps
};
