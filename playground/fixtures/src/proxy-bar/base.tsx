import ProxyBar, { IStorage, ProxyBarPosition, ProxyBarProps } from '../../../../src/proxy-bar';
import DocsProxy from '../../../proxies/docs-proxy';

const blackHoleStorage: IStorage = {
  get: () => null,
  set: () => {}
};

export default Object.values(ProxyBarPosition).map(position => {
  const props: ProxyBarProps = {
    proxies: [DocsProxy],
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
