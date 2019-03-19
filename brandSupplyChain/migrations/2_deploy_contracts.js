// migrating the appropriate contracts
var BrandRole = artifacts.require("./BrandRole.sol");
var DistributorRole = artifacts.require("./DistributorRole.sol");
var StoreRole = artifacts.require("./StoreRole.sol");
var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");

module.exports = function(deployer) {
  deployer.deploy(BrandRole);
  deployer.deploy(DistributorRole);
  deployer.deploy(StoreRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};
