(() => {
  if(window.hotwireLivereloadObserver) { window.hotwireLivereloadObserver.disconnect(); }

  window.hotwireLivereloadObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const addedNode of mutation.addedNodes) {
        if (addedNode.name === 'hotwire-livereload') {
          hotwireLivereload(addedNode);
        }
      }
    }
  });
  window.hotwireLivereloadObserver.observe(document.head, { childList: true });

  const hotwireLivereload = (element) => {
    if (element.dataset.reloaded || element.content.length === 0) { return;}

    element.dataset.reloaded = true;
    const onErrorPage = document.title === 'Action Controller: Exception caught';

    if (onErrorPage || element.dataset.forceReload === 'true') {
      console.log('[Hotwire::Livereload] Files changed. Force reloading...', JSON.parse(element.content));
      document.location.reload();
    } else {
      console.log('[Hotwire::Livereload] Files changed. Reloading...', JSON.parse(element.content));
      Turbo.visit(window.location.href, { action: 'replace' });
    }
  };
})();
