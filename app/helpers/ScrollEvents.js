const cancelScrollEvent = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  /* eslint no-param-reassign: 0 */
  e.returnValue = false;
  return false;
};

const onScrollHandler = elem => (e) => {
  const { scrollTop, scrollHeight, clientHeight } = elem;
  const wheelDelta = e.deltaY;
  const isDeltaPositive = wheelDelta > 0;

  if (isDeltaPositive && wheelDelta > scrollHeight - clientHeight - scrollTop) {
    elem.scrollTop = scrollHeight;
    return cancelScrollEvent(e);
  } else if (!isDeltaPositive && -wheelDelta > scrollTop) {
    elem.scrollTop = 0;
    return cancelScrollEvent(e);
  }
};

export const scrollLock = (elem) => {
  elem.addEventListener('wheel', onScrollHandler(elem), false);
};

export const scrollRelease = (elem) => {
  elem.removeEventListener('wheel', onScrollHandler(elem), false);
};
