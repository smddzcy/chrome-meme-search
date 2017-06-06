import React, { Component } from 'react';
import { object } from 'prop-types';
import style from './MemeListItem.css';

export default class MemeListItem extends Component {
  static propTypes = {
    item: object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      animatedVisible: false
    };
  }

  itemMouseOverHandler = (e) => {
    e.stopPropagation();
    this.setState({ animatedVisible: true });
  }

  itemMouseOutHandler = (e) => {
    e.stopPropagation();
    this.setState({ animatedVisible: false });
  }

  render() {
    const item = this.props.item;
    const isGIF = item.type === 'ANIMATED';

    return (
      <div
        key={item.id}
        className={isGIF ? style.gifItem : style.item}
        onMouseOver={this.itemMouseOverHandler}
        onMouseOut={this.itemMouseOutHandler}
      >
        <img
          src={item.imageUrl}
          alt={item.tags}
          style={{
            display: (this.state.animatedVisible && isGIF ? 'none' : 'block')
          }}
        />
        <img
          src={item.animatedUrl}
          alt={item.tags}
          style={{
            display: (this.state.animatedVisible && isGIF ? 'block' : 'none')
          }}
        />
      </div>
    );
  }
}
