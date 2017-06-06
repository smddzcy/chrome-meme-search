import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import uniqBy from 'lodash/uniqBy';
import SearchBar from '../components/SearchBar';
import MemeList from '../components/MemeList';
import { SHOW_ALL } from '../constants/SearchFilters';
import style from './App.css';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filter: SHOW_ALL,
      lastSearchTerm: '',
      page: 1,
      items: [],
      hasMoreItems: true,
      error: null
    };
  }

  getItems = (searchTerm, page) => new Promise((resolve, reject) => {
    const clearedSearchTerm = searchTerm
                                .trim()
                                .replace(' ', ',')  // Replace spaces with commas
                                .replace(/\s/, '')  // Remove other whitespace
                                .replace(',', ', ') // Put space after commas
                                .trim();

    chrome.runtime.sendMessage({ searchTerm: clearedSearchTerm, page }, (response) => {
      if (response.err) {
        reject(response.err);
      } else {
        resolve(response.data);
      }
    });
  });

  loadItems = () => {
    this.getItems(this.state.lastSearchTerm, this.state.page)
      .then((items) => {
        if (items.length === 0) {
          this.setState({ hasMoreItems: false });
        }
        this.setState({
          items: uniqBy(this.state.items.concat(items), 'id'),
          page: this.state.page + 1
        });
      })
      .catch(error => this.setState({ items: [], error }));
  }

  filterHandler = (filter) => {
    this.setState({ filter });
  };

  searchInputHandler = (event) => {
    // Initially, and possibly, we have more items, and we're on page 1
    this.setState({ hasMoreItems: true, page: 1 });

    const searchTerm = event.target.value;
    this.getItems(searchTerm, 1)
      .then((items) => {
        this.rootNode.lastChild.scrollTop = 0; // Scroll list element to top
        this.setState({ items, lastSearchTerm: searchTerm, error: null, page: 2 });
      })
      .catch(error => this.setState({ items: [], lastSearchTerm: searchTerm, error }));
  }

  render() {
    const debounceInputHandler = (time) => {
      const debounced = debounce(this.searchInputHandler, time);
      return (event) => {
        event.persist();
        debounced(event);
      };
    };

    // TODO: Error handling
    return (
      <div
        className={style.app}
        ref={(node) => { this.rootNode = node; }}
      >
        <SearchBar onInputChange={debounceInputHandler(350)} />
        <MemeList
          items={this.state.items}
          filter={this.state.filter}
          loadFunction={this.loadItems}
          hasMoreItems={this.state.hasMoreItems}
        />
      </div>
    );
  }
}
