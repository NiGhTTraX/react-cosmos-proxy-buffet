import { createReactStub } from 'react-mock-component';
import * as React from 'react';
import { stub } from 'sinon';
import { expect } from 'chai';
import { $render, describe, it } from './suite';
import createProxyBar from '../../src/index';

describe('ProxyBar', () => {
  it('it should render the next proxy', () => {
    const NextProxy = createReactStub();
    const NextNextProxy = createReactStub();
    const Component = createReactStub();
    const next = stub().returns(NextNextProxy);
    const props = {
      nextProxy: {
        value: NextProxy,
        next
      },
      fixture: {
        component: Component
      },
      onFixtureUpdate: () => {},
      onComponentRef: () => {}
    };
    NextProxy
      .withProps({ ...props, nextProxy: NextNextProxy })
      .renders(<span>next proxy</span>);

    const ProxyBar = createProxyBar();
    const $proxyBar = $render(<ProxyBar {...props} />);
    expect($proxyBar.text()).to.contain('next proxy');
  });
});
