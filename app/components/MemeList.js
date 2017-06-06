import React, { Component } from 'react';
import { array, string, func, bool } from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import CopyToClipboard from 'react-copy-to-clipboard';
import AlertContainer from 'react-alert';
import { SHOW_ALL, SHOW_GIF, SHOW_PHOTO } from '../constants/SearchFilters';
import MemeListItem from './MemeListItem';
import { scrollLock, scrollRelease } from '../helpers/ScrollEvents';
import style from './MemeList.css';

const SEARCH_FILTER_FUNCTIONS = {
  [SHOW_ALL]: () => true,
  [SHOW_GIF]: item => item.type === 'ANIMATED',
  [SHOW_PHOTO]: item => item.type === 'PHOTO'
};

export default class MemeList extends Component {
  static propTypes = {
    items: array.isRequired,
    filter: string,
    loadFunction: func,
    hasMoreItems: bool,
  };

  static defaultProps() {
    return { filter: SHOW_ALL, loadFunction: () => {}, hasMoreItems: false };
  }

  componentDidMount() {
    scrollLock(this.scrollElem);
  }

  componentWillUnmount() {
    scrollRelease(this.scrollElem);
  }

  copyNotificationOptions = {
    offset: 15,
    position: 'bottom left',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  }

  showCopyNotification = () => {
    this.msg.show(<span>Copied!</span>, {
      time: 700,
      type: 'success',
      icon: <img role="presentation" />
    });
  }

  render() {
    const { items, filter } = this.props;
    const filteredItems = items.filter(SEARCH_FILTER_FUNCTIONS[filter]);

    return (
      <div
        className={style.list}
        style={{
          paddingTop: filteredItems.length === 0 ? '0' : '10px',
          paddingBottom: filteredItems.length === 0 ? '0' : '10px'
        }}
        ref={(node) => { this.scrollElem = node; }}
      >
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadFunction}
          hasMore={this.props.hasMoreItems}
          // initialLoad={true}
          useWindow={false}
          threshold={250}
        >
          {filteredItems.map(item =>
            <CopyToClipboard text={item.animatedUrl} key={item.id}>
              <div style={{ cursor: 'pointer' }} onClick={this.showCopyNotification}>
                <MemeListItem item={item} />
              </div>
            </CopyToClipboard>
          )}
        </InfiniteScroll>

        <AlertContainer
          ref={(node) => { this.msg = node; }}
          {...this.copyNotificationOptions}
        />
      </div>
    );
  }
}
