
const AppConfig = {
    PROTOCOL: "wss://",
    // TODO: change to localhost if you wish to run it locally
    HOST: "api.variouscalculators.com",
    PORT: ":9000"
};

const Singleton = (function () {
    let instance;

    function createInstance() {
        // TODO: add +  PORT if you want to run it locally
        return new WebSocket(AppConfig.PROTOCOL + AppConfig.HOST);
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default Singleton;