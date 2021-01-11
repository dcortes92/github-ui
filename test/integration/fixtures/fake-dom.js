import {jsdom} from 'jsdom';

export const createDOM = () => {
  const document = jsdom('<!doctype html><html><body><div id="root"></div></body></html>');
  const window = document.defaultView;
  global.document = document;
  global.window = window;
  return document;
}