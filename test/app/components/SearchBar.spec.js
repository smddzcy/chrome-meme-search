import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import SearchBar from '../../../app/components/SearchBar';
import style from '../../../app/components/SearchBar.css';

function setup(propOverrides) {
  const props = {
    onInputChange: sinon.spy(),
    ...propOverrides
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<SearchBar {...props} />);
  const output = renderer.getRenderOutput();

  return { props, output };
}

function getTextContent(elem) {
  const children = Array.isArray(elem.props.children) ?
    elem.props.children : [elem.props.children];

  return children.reduce((out, child) =>
    // Children are either elements or text strings
    out + (child.props ? getTextContent(child) : child)
  , '');
}

describe('app SearchBar component', () => {
  it('should render correctly', () => {
    const { output } = setup();
    expect(output.type).to.equal('div');
    expect(output.props.className).to.equal(style.searchBar);
  });
});
