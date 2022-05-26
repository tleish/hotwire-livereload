(() => {
  if(window.liveReloadFunction){
    return;
  }

  var debounce = function debounce(callback, wait) {
    var timeoutId = null;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(function () {
        callback.apply(null, args);
      }, wait);
    };
  };

  window.liveReloadFunction = debounce(function(event) {
    let element = event.srcElement.querySelector('template').content.getElementById('hotwire-livereload')
    if (!element) { return; }

    const onErrorPage = document.title === 'Action Controller: Exception caught';

    if (onErrorPage || element.dataset.forceReload === 'true') {
      console.log('[Hotwire::Livereload] Files changed. Force reloading...', JSON.parse(element.dataset.changed));
      document.location.reload();
    } else {
      console.log('[Hotwire::Livereload] Files changed. Reloading...', JSON.parse(element.dataset.changed));
      Turbo.visit(window.location.href, { action: 'replace' });
    }
  }, 300);

  document.addEventListener('turbo:before-stream-render', window.liveReloadFunction);
})();
