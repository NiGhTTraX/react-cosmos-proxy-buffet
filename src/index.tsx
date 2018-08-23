import React from 'react';

export default () =>
  (props: any) => {
    const { nextProxy, ...rest } = props;
    const { value: NextProxy, next } = nextProxy;

    return <div className="proxy">
      <p>Hello proxy</p>
      <NextProxy {...rest} nextProxy={next()} />
    </div>;
  };
