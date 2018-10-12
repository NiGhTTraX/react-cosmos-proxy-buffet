import createProxy from '../src/index';
import DocsProxy from './proxies/docs-proxy';

// Don't enable the proxy in dev because it overlaps the fixtures for itself.
export default process.env.acceptance ? [
  createProxy({
    proxies: [DocsProxy]
  })
] : [];
