import { _updateViewportSize } from './modules/_viewport';
import { _fetch } from './modules/_movie';
import { _colorMode } from './modules/_color';

window.addEventListener('DOMContentLoaded', () => {
  _updateViewportSize();
  _fetch();
  _colorMode();
});
