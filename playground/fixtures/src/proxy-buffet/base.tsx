import * as React from 'react';
import bindComponent from '../../../../src/bind';
import ProxyBar from '../../../../src/proxy-bar';
import ProxyBuffet, { ProxyBuffetProps } from '../../../../src/proxy-buffet';
import DocsProxy from '../../../proxies/docs-proxy';
import { blackHoleStorage } from '../proxy-bar/base';

const props: ProxyBuffetProps = {
  ProxyBar: bindComponent(ProxyBar, { storage: blackHoleStorage }),
  cosmosFixture: {
    component: () => null,
    props: {}
  },
  proxies: [
    Object.assign({}, DocsProxy, { id: 1 }),
    Object.assign({}, DocsProxy, { id: 2 })
  ],
  children: <span>cosmos content</span>
};

export default {
  component: ProxyBuffet,
  props
};
