import createProxy from '../src/index';
import DocsProxy from './proxies/docs-proxy';

export default [
  createProxy({
    proxies: [DocsProxy]
  })
];
