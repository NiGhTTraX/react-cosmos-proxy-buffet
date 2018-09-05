import React, { Component, ComponentType } from 'react';

// eslint-disable-next-line space-infix-ops
export type Omit<T, K extends keyof T> = Pick<
  T,
  (
    { [P in keyof T]: P }
    & { [P in K]: never }
    & { [x: string]: never }
  )[keyof T]
>;

/**
 * Create a HOC that binds some props for the wrapped component.
 */
export default function bindComponent<T extends object, K extends keyof T>(
  C: ComponentType<T>,
  boundProps: {[P in K]: T[P]}
): ComponentType<Omit<T, K>> {
  return class BoundComponent extends Component<Omit<T, K>> {
    static displayName = `Bind(${C.displayName})`;

    render() {
      return <C {...this.props} {...boundProps} />;
    }
  };
}
