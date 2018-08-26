import $ from 'jquery';
import ReactDOM from 'react-dom';
import { ReactElement } from 'react';
import { expect } from 'chai';
import {
  runnerAfterEach,
  runnerBeforeEach,
  runnerDescribe,
  runnerIt
} from '../mocha-runner';

export { expect };

let componentContainer: HTMLDivElement;

export function describe(name: string, definition: () => void) {
  runnerDescribe(name, () => {
    runnerBeforeEach(() => {
      componentContainer = document.createElement('div');
    });

    definition();

    runnerAfterEach(unmount);
  });
}

export function it(name: string, definition: () => Promise<any>|void) {
  runnerIt(name, definition);
}

export function beforeEach(definition: () => Promise<any>|void) {
  runnerBeforeEach(definition);
}

export function afterEach(definition: () => Promise<any>|void) {
  runnerAfterEach(definition);
}

/**
 * Render the given component in a freshly created detached DOM container.
 */
export function $render(element: ReactElement<any>): JQuery {
  ReactDOM.render(element, componentContainer);

  // Return the first (and only) child in the container wrapped in jQuery.
  return $(componentContainer).children().eq(0);
}

/**
 * Unmount the currently mounted component.
 */
export function unmount() {
  // unmountComponentAtNode will return `false` if there was no component
  // mounted at the given node. That can happen when the component was
  // unmounted inside a test i.e. to test cleanup logic.
  ReactDOM.unmountComponentAtNode(componentContainer);
}
