import * as React from 'react';
import { createReactStub } from 'react-mock-component';
import { stub } from 'sinon';
import createCosmosProxyBuffet, { CosmosProxyProps } from '../../src/index';
import { $render, describe, expect, it } from './suite';

describe('CosmosProxyBuffet', () => {
  it('it render the next Cosmos proxy', () => {
    const NextProxy = createReactStub<CosmosProxyProps>();
    const nextProxy = {
      value: () => null,
      next: () => null
    };
    const next = stub().returns(nextProxy);

    const props: CosmosProxyProps = {
      nextProxy: {
        value: NextProxy,
        next
      },
      fixture: {
        component: () => <span>component</span>,
        props: {
          foo: 'bar'
        }
      },
      onFixtureUpdate: () => {
      },
      onComponentRef: () => {
      }
    };

    NextProxy
      .withProps({
        fixture: props.fixture,
        onFixtureUpdate: props.onFixtureUpdate,
        onComponentRef: props.onComponentRef,
        nextProxy
      })
      .renders(<span>next proxy</span>);

    const CosmosProxyBuffet = createCosmosProxyBuffet({
      proxies: []
    });

    const $cosmosProxyBuffet = $render(<CosmosProxyBuffet {...props} />);

    expect($cosmosProxyBuffet.text()).to.equal('next proxy');
  });
});
