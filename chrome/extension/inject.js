import React, { Component } from 'react';
import { render } from 'react-dom';
import App from '../../app/containers/App';
import style from './inject.css';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
    this.mouseIsOnApp = false;
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeydown);
    document.body.addEventListener('click', this.handleClick);
    this.searchInput = document.getElementById('meme-search-input');
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeydown);
    document.body.removeEventListener('click', this.handleClick);
  }

  handleKeydown = (event) => {
    if (event) {
      if (event.ctrlKey && event.code === 'KeyM' && !this.state.isVisible) {
        this.setState({ isVisible: true });
        // Focus to the search input
        setTimeout(() => {
          this.searchInput.focus();
        }, 50);
      } else if (event.key === 'Escape' && this.state.isVisible) {
        this.setState({ isVisible: false });
      }
    }
  }

  handleClick = () => {
    if (!this.rootNode.contains(event.target) && this.state.isVisible) {
      this.setState({ isVisible: false });
    }
  }

  render() {
    return (
      <div
        className={style.injectApp}
        style={{
          visibility: this.state.isVisible ? 'visible' : 'hidden',
          opacity: this.state.isVisible ? 1 : 0
        }}
        ref={(node) => { this.rootNode = node; }}
      >
        <App />
      </div>
    );
  }
}

const injectDOM = document.createElement('div');
injectDOM.id = 'meme-search-frame';
injectDOM.style.width = '100%';
injectDOM.style.height = '100%';
injectDOM.style.position = 'fixed';
injectDOM.style.zIndex = '2147483647';
injectDOM.style.pointerEvents = 'none';
document.body.appendChild(injectDOM);
render(<InjectApp />, injectDOM);
