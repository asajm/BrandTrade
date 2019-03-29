App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originBrandID: "0x0000000000000000000000000000000000000000",
    originBrandName: null,
    originBrandInformation: null,
    originBrandLatitude: null,
    originBrandLongitude: null,
    productNotes: null,
    distributorID: "0x0000000000000000000000000000000000000000",
    storeID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",
    state: -1,
    productID: 0,

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originBrandID = $("#originBrandID").val();
        App.originBrandName = $("#originBrandName").val();
        App.originBrandInformation = $("#originBrandInformation").val();
        App.originBrandLatitude = $("#originBrandLatitude").val();
        App.originBrandLongitude = $("#originBrandLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.distributorID = $("#distributorID").val();
        App.storeID = $("#storeID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID,
            App.originBrandID,
            App.originBrandName,
            App.originBrandInformation,
            App.originBrandLatitude,
            App.originBrandLongitude,
            App.productNotes,
            App.distributorID,
            App.storeID,
            App.consumerID,
            App.state,
            App.productID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';

        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);

            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.produceItem(event);
                break;
            case 2:
                return await App.advertiseItem(event);
                break;
            case 3:
                return await App.buyItem(event);
                break;
            case 4:
                return await App.collectItem(event);
                break;
            case 5:
                return await App.sendItem(event);
                break;
            case 6:
                return await App.receiveItem(event);
                break;
            case 7:
                return await App.storeItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            }
    },

    produceItem: function() {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));
        App.readForm()

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.produceItem(
                App.upc,
                App.metamaskAccountID,
                App.originBrandName,
                App.originBrandInformation,
                App.originBrandLatitude,
                App.originBrandLongitude,
                App.productNotes
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('produceItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    advertiseItem: function () {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.advertiseItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('advertiseItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function () {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.buyItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    collectItem: function () {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.collectItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('collectItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sendItem: function () {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.sendItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sendItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: function () {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    storeItem: function () {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.storeItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('storeItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: function () {
        // event.preventDefault();
        // var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
            App.sku = result[0]
            App.upc = result[1]
            App.ownerID = result[2]
            App.originBrandID = result[3]
            App.originBrandName = result[4]
            App.originBrandInformation = result[5]
            App.originBrandLatitude = result[6]
            App.originBrandLongitude = result[7]
            App.updateForm()
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
            App.sku = result[0]
            App.upc = result[1]
            App.productID = result[2]
            App.productNotes = result[3]
            App.state = result[4]
            App.distributorID = result[5]
            App.storeID = result[6]
            App.consumerID = result[7]
            App.updateForm()
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
            console.log('allEvents', log);
        });
        }).catch(function(err) {
          console.log(err.message);
        });

    },

    updateForm: function() {
        $("#sku").val(App.sku);
        $("#upc").val(App.upc);
        $("#ownerID").val(App.ownerID);
        $("#originBrandID").val(App.originBrandID);
        $("#originBrandName").val(App.originBrandName);
        $("#originBrandInformation").val(App.originBrandInformation);
        $("#originBrandLatitude").val(App.originBrandLatitude);
        $("#originBrandLongitude").val(App.originBrandLongitude);
        $("#productNotes").val(App.productNotes);
        $("#distributorID").val(App.distributorID);
        $("#storeID").val(App.storeID);
        $("#consumerID").val(App.consumerID);
        App.clearItem()
    },

    clearItem: function () {
        App.sku = 0
        App.upc = 0
        App.metamaskAccountID = "0x0000000000000000000000000000000000000000"
        App.ownerID = "0x0000000000000000000000000000000000000000"
        App.originBrandID = "0x0000000000000000000000000000000000000000"
        App.originBrandName = null
        App.originBrandInformation = null
        App.originBrandLatitude = null
        App.originBrandLongitude = null
        App.productNotes = null
        App.distributorID = "0x0000000000000000000000000000000000000000"
        App.storeID = "0x0000000000000000000000000000000000000000"
        App.consumerID = "0x0000000000000000000000000000000000000000"
        App.state = -1
        App.productID = 0
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
