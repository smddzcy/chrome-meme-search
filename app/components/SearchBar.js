import React, { Component } from 'react';
import { func } from 'prop-types';
import style from './SearchBar.css';

export default class SearchBar extends Component {
  static propTypes = {
    onInputChange: func
  };

  static defaultProps = {
    onInputChange: () => {}
  }

  constructor(props) {
    super(props);

    const randomPlaceholder = () => {
      const placeholders = [
        'THAT\'S A PENIS', 'I KNOW THAT FEEL BRO', 'DAMN, GIRL', 'BORN TO FEEL',
        'THANKS CAPTAIN', 'THAT\'S RACIST', 'NOBODY CARES', 'DUDE WHAT',
        'SUCH WOW. MUCH MEME.', 'SHUT UP AND TAKE MY MONEY', 'MIND IF I COMB OVER?',
        'BITCH PLEASE'
      ];
      return placeholders[Math.floor(Math.random() * placeholders.length)];
    };

    this.placeholder = randomPlaceholder();
  }

  keyPressHandler = (event) => {
    if (event.key === 'Enter') {
      this.props.onInputChange(event);
    }
  }

  render() {
    return (
      <div className={style.searchBar}>
        <input
          onChange={this.props.onInputChange}
          onKeyPress={this.keyPressHandler}
          placeholder={this.placeholder}
          /* eslint jsx-a11y/tabindex-no-positive: 0 */
          tabIndex={1}
          autoFocus
          id={'meme-search-input'}
        />
      </div>
    );
  }
}
