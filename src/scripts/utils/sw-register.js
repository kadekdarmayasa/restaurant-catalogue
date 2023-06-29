const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Service worker not supported in this browser');
    return;
  }

  try {
    await navigator.serviceWorker.register('/sw.bundle.js');
    console.log('Service worker registered');
  } catch (error) {
    console.log('Service worker registration failed');
  }
};

export default swRegister;
