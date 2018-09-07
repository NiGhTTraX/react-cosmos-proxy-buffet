> A [react-cosmos](https://github.com/react-cosmos/react-cosmos) proxy to show a proxy bar


## Usage

```js
// cosmos.proxies.js
import createProxyBuffet from 'react-cosmos-proxy-buffet';
import MyProxy from './my-proxy';

export default [
  createProxyBuffet({
    proxies: [MyProxy]
  })
];
```
