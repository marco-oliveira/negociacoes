var ConnectionFactory = (function () {
    

    var connection = null;
    var dbName = 'aluraframe';
    var version = 4;
    var stores = ['negociacoes'];

    class ConnectionFactory{

        constructor(){

            throw new Error('A classe ConnectionFactory não pode ser instanciada!');
        }

        static getConnection(){

            return new Promise((resolve, reject) => {

                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {

                    if (!connection) connection = e.target.result;
                    resolve(connection);
                };

                openRequest.onerror = e => {

                    console.log(e.target.error);
                    reject(e.target.error.name);
                };

            });
        }

        static _createStores(connection){
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store))
                    connection.deleteObjectStore(store);
                connection.createObjectStore(store, { autoIncrement : true });
            })
        }

    }
})();