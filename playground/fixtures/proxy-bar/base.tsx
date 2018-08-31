import ProxyBar, { ProxyBarProps } from '../../../src/proxy-bar';
import DocsProxy from '../../proxies/docs-proxy';

export default {
  component: ProxyBar,
  props: {
    proxies: [DocsProxy]
  } as ProxyBarProps
};
