import { _updateViewportSize } from './modules/_viewport';
import { _fetch } from './modules/_movie';

window.addEventListener('DOMContentLoaded', () => {
  _updateViewportSize();
  _fetch();
});
