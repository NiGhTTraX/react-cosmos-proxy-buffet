import ProxyBar, { IStorage, ProxyBarProps } from '../../../../src/proxy-bar';
import DocsProxy from '../../../proxies/docs-proxy';

const blackHoleStorage: IStorage = {
  get: () => null,
  set: () => {}
};

const props: ProxyBarProps = {
  proxies: [DocsProxy],
  storage: blackHoleStorage,
  onToggleProxy: () => {}
};

export default {
  component: ProxyBar,
  props
};
