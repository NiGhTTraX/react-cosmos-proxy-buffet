import ProxyBar, { IStorage, ProxyBarPosition, ProxyBarProps } from '../../../../src/proxy-bar';
import DocsProxy from '../../../proxies/docs-proxy';

const blackHoleStorage: IStorage = {
  get: () => null,
  set: () => {}
};

export default Object.values(ProxyBarPosition).map(position => {
  const props: ProxyBarProps = {
    proxies: [
      Object.assign({}, DocsProxy, { id: 1 }),
      Object.assign({}, DocsProxy, { id: 2 })
    ],
    storage: blackHoleStorage,
    onToggleProxy: () => {},
    position
  };

  return {
    component: ProxyBar,
    name: position,
    props
  };
});
