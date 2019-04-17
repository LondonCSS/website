// TODO: remove once PWA features are in place
window.navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});
