export function debounce(callback) {
  return function debouncedCallback(...args) {
    if (Boolean(debouncedCallback._requestId)) {
      cancelAnimationFrame(debouncedCallback._requestId);
      debouncedCallback._requestId = null;
    }

    debouncedCallback._requestId = requestAnimationFrame(() => {
      callback.call(window, args);
      debouncedCallback._requestId = null;
    });
  };
}
