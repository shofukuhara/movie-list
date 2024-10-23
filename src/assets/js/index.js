import { _updateViewportSize } from './modules/_viewport';
import { _colorMode } from './modules/_color';
import { _fetch } from './modules/_movie';

window.addEventListener('DOMContentLoaded', () => {
  _updateViewportSize();
  _fetch();
  _colorMode();
});
