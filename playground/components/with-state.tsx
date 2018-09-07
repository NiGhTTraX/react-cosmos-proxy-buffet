import React, { Component } from 'react';

type State = {
  counter: number;
};

export default class WithState extends Component<{}, State> {
  state = {
    counter: 0
  };

  render() {
    return <button onClick={this._onClick}>
      Clicked {this.state.counter} times
    </button>;
  }

  private _onClick = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
}
