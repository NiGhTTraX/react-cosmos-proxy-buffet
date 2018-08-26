import React from 'react';
import { describe, it, $render, expect } from './suite';
import ProxyBar from '../../src/proxy-bar';

describe('ProxyBar', () => {
  it('should render by default in the bottom right', () => {
    const $proxyBar = $render(<ProxyBar />);

    expect($proxyBar.hasClass('bottom-right')).to.be.true;
  });
});
