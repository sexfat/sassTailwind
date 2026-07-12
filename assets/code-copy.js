(function () {
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }

    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      textarea.remove();
    }
  }

  function enhanceCodeBlocks() {
    document.querySelectorAll('pre').forEach(function (pre) {
      if (!pre.querySelector('code')) return;
      if (pre.closest('.code-copy-wrap')) return;
      if (pre.parentElement && pre.parentElement.classList.contains('code-wrap')) return;

      var wrapper = document.createElement('div');
      wrapper.className = 'code-copy-wrap';

      var toolbar = document.createElement('div');
      toolbar.className = 'code-copy-toolbar';

      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'code-copy-button';
      button.textContent = '複製程式碼';

      toolbar.appendChild(button);
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(toolbar);
      wrapper.appendChild(pre);

      button.addEventListener('click', function () {
        copyText(pre.innerText).then(function () {
          button.textContent = '已複製';
          window.setTimeout(function () {
            button.textContent = '複製程式碼';
          }, 1400);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceCodeBlocks);
  } else {
    enhanceCodeBlocks();
  }
})();
