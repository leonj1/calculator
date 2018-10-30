const AppConfig = {
  PROTOCOL: "ws://",
  // TODO: change to localhost if you wish to run it locally
  //HOST: "api.variouscalculators.com",
  HOST: "localhost",
  PORT: ":9000"
};

const Singleton = (function () {
  let instance;

  function createInstance() {
    // TODO: add +  PORT if you want to run it locally
    return new WebSocket(AppConfig.PROTOCOL + AppConfig.HOST + AppConfig.PORT);
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
    close: function() {
      instance.close();
    }
  };
})();

export default Singleton;