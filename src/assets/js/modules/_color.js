export const _colorMode = () => {
  const bodyColor = document.querySelector('[data-color-mode]');
  const colorButton = document.querySelector('[data-header-color]');

  colorButton.addEventListener('click', () => {
    // 現在のカラーを確認し、切り替え
    if (bodyColor.getAttribute('data-color-mode') === 'light') {
      bodyColor.setAttribute('data-color-mode', 'dark');
      colorButton.setAttribute('data-header-color', 'dark');
    } else {
      bodyColor.setAttribute('data-color-mode', 'light');
      colorButton.setAttribute('data-header-color', 'light');
    }
  });
};
