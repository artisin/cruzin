//install -> only used in production
const runtime = require('offline-plugin/runtime');

runtime.install({
  onUpdating: function () {
    console.log('SW Event:', 'onUpdating');
  },
  onUpdateReady: function () {
    console.log('SW Event:', 'onUpdateReady');
    // Tells to new SW to take control immediately
    runtime.applyUpdate();
  },
  onUpdated: function () {
    console.log('SW Event:', 'onUpdated');
    // Reload the webpage to load into the new version
    window.location.reload();
  },
  onUpdateFailed: function () {
    console.log('SW Event:', 'onUpdateFailed');
  }
});
