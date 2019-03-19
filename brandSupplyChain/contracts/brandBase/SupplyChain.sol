pragma solidity ^0.4.24;

import "../brandAccessControl/BrandRole.sol";
import "../brandAccessControl/DistributorRole.sol";
import "../brandAccessControl/StoreRole.sol";
import "../brandAccessControl/ConsumerRole.sol";
import "../brandCore/Ownable.sol";

// Define a contract 'Supplychain'
contract SupplyChain is BrandRole, DistributorRole, StoreRole, ConsumerRole, Ownable {

    // Define 'owner'
    address owner;

    // Define a variable called 'upc' for Universal Product Code (UPC)
    uint    upc;

    // Define a variable called 'sku' for Stock Keeping Unit (SKU)
    uint    sku;

    // Define a public mapping 'items' that maps the UPC to an Item.
    mapping (uint => Item) items;

    // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash,
    // that track its journey through the supply chain -- to be sent from DApp.
    mapping (uint => string[]) itemsHistory;

    // Define enum 'State' with the following values:
    enum State
    {
        Produced,       // 0
        ForSale,        // 1
        Sold,           // 2
        Collected,      // 3
        Sent,           // 4
        Received,       // 5
        forPurchase,    // 6
        Purchased       // 7
    }

    State constant defaultState = State.Produced;

    // Define a struct 'Item' with the following fields:
    struct Item {
        uint    sku;                    // Stock Keeping Unit (SKU)
        uint    upc;                    // Universal Product Code (UPC), generated by the Brand, goes on the package, can be verified by the Consumer
        address ownerID;                // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        address originBrandID;          // Metamask-Ethereum address of the Brand
        string  originBrandName;        // Brand Name
        string  originBrandInformation; // Brand Information
        string  originBrandLatitude;    // Brand Latitude
        string  originBrandLongitude;   // Brand Longitude
        uint    productID;              // Product ID potentially a combination of upc + sku
        string  productNotes;           // Product Notes
        uint    productPrice;           // Product Price
        State   itemState;              // Product State as represented in the enum above
        address distributorID;          // Metamask-Ethereum address of the Distributor
        address storeID;                // Metamask-Ethereum address of the Store
        address consumerID;             // Metamask-Ethereum address of the Consumer
    }

    // Define 8 events with the same 8 state values and accept 'upc' as input argument
    event Harvested(uint upc);
    event Processed(uint upc);
    event Packed(uint upc);
    event ForSale(uint upc);
    event Sold(uint upc);
    event Shipped(uint upc);
    event Received(uint upc);
    event Purchased(uint upc);

    // Define a modifer that checks to see if msg.sender == owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Define a modifer that verifies the Caller
    modifier verifyCaller (address _address) {
        require(msg.sender == _address);
        _;
    }

    // Define a modifier that checks if the paid amount is sufficient to cover the price
    modifier paidEnough(uint _price) {
        require(msg.value >= _price);
        _;
    }

    // Define a modifier that checks the price and refunds the remaining balance
    modifier checkValue(uint _upc) {
        _;
        uint _price = items[_upc].productPrice;
        uint amountToReturn = msg.value - _price;
        items[_upc].consumerID.transfer(amountToReturn);
    }

    // Define a modifier that checks if an item.state of a upc is Harvested
    modifier harvested(uint _upc) {
        require(items[_upc].itemState == State.Harvested);
        _;
    }

    // Define a modifier that checks if an item.state of a upc is Processed
    modifier processed(uint _upc) {

        _;
    }

    // Define a modifier that checks if an item.state of a upc is Packed
    modifier packed(uint _upc) {

        _;
    }

    // Define a modifier that checks if an item.state of a upc is ForSale
    modifier forSale(uint _upc) {

        _;
    }

    // Define a modifier that checks if an item.state of a upc is Sold
    modifier sold(uint _upc) {

        _;
    }

    // Define a modifier that checks if an item.state of a upc is Shipped
    modifier shipped(uint _upc) {

        _;
    }

    // Define a modifier that checks if an item.state of a upc is Received
    modifier received(uint _upc) {

        _;
    }

    // Define a modifier that checks if an item.state of a upc is Purchased
    modifier purchased(uint _upc) {

        _;
    }

    // In the constructor set 'owner' to the address that instantiated the contract
    // and set 'sku' to 1
    // and set 'upc' to 1
    constructor() public payable {
        owner = msg.sender;
        sku = 1;
        upc = 1;
    }

    // Define a function 'kill' if required
    function kill() public {
        if (msg.sender == owner) {
            selfdestruct(owner);
        }
    }

    // Define a function 'harvestItem' that allows a brand to mark an item 'Harvested'
    function harvestItem(uint _upc, address _originBrandID, string _originBrandName, string _originBrandInformation, string    _originBrandLatitude, string   _originBrandLongitude, string  _productNotes) public
    {
        // Add the new item as part of Harvest

        // Increment sku
        sku = sku + 1;
        // Emit the appropriate event

    }

    // Define a function 'processtItem' that allows a brand to mark an item 'Processed'
    function processItem(uint _upc) public
    // Call modifier to check if upc has passed previous supply chain stage

    // Call modifier to verify caller of this function

    {
        // Update the appropriate fields

        // Emit the appropriate event

    }

    // Define a function 'packItem' that allows a brand to mark an item 'Packed'
    function packItem(uint _upc) public
    // Call modifier to check if upc has passed previous supply chain stage

    // Call modifier to verify caller of this function

    {
        // Update the appropriate fields

        // Emit the appropriate event

    }

    // Define a function 'sellItem' that allows a brand to mark an item 'ForSale'
    function sellItem(uint _upc, uint _price) public
    // Call modifier to check if upc has passed previous supply chain stage

    // Call modifier to verify caller of this function

    {
        // Update the appropriate fields

        // Emit the appropriate event

    }

    // Define a function 'buyItem' that allows the disributor to mark an item 'Sold'
    // Use the above defined modifiers to check if the item is available for sale, if the buyer has paid enough,
    // and any excess ether sent is refunded back to the buyer
    function buyItem(uint _upc) public payable
        // Call modifier to check if upc has passed previous supply chain stage

        // Call modifer to check if buyer has paid enough

        // Call modifer to send any excess ether back to buyer

        {

        // Update the appropriate fields - ownerID, distributorID, itemState

        // Transfer money to brand

        // emit the appropriate event

    }

    // Define a function 'shipItem' that allows the distributor to mark an item 'Shipped'
    // Use the above modifers to check if the item is sold
    function shipItem(uint _upc) public
        // Call modifier to check if upc has passed previous supply chain stage

        // Call modifier to verify caller of this function

        {
        // Update the appropriate fields

        // Emit the appropriate event

    }

    // Define a function 'receiveItem' that allows the store to mark an item 'Received'
    // Use the above modifiers to check if the item is shipped
    function receiveItem(uint _upc) public
        // Call modifier to check if upc has passed previous supply chain stage

        // Access Control List enforced by calling Smart Contract / DApp
        {
        // Update the appropriate fields - ownerID, storeID, itemState

        // Emit the appropriate event

    }

    // Define a function 'purchaseItem' that allows the consumer to mark an item 'Purchased'
    // Use the above modifiers to check if the item is received
    function purchaseItem(uint _upc) public
        // Call modifier to check if upc has passed previous supply chain stage

        // Access Control List enforced by calling Smart Contract / DApp
        {
        // Update the appropriate fields - ownerID, consumerID, itemState

        // Emit the appropriate event

    }

    // Define a function 'fetchItemBufferOne' that fetches the data
    function fetchItemBufferOne(uint _upc) public view returns
    (
    uint    itemSKU,
    uint    itemUPC,
    address ownerID,
    address originBrandID,
    string  originBrandName,
    string  originBrandInformation,
    string  originBrandLatitude,
    string  originBrandLongitude
    )
    {
        // Assign values to the 8 parameters


        return
        (
        itemSKU,
        itemUPC,
        ownerID,
        originBrandID,
        originBrandName,
        originBrandInformation,
        originBrandLatitude,
        originBrandLongitude
        );
    }

    // Define a function 'fetchItemBufferTwo' that fetches the data
    function fetchItemBufferTwo(uint _upc) public view returns
    (
    uint    itemSKU,
    uint    itemUPC,
    uint    productID,
    string  productNotes,
    uint    productPrice,
    uint    itemState,
    address distributorID,
    address storeID,
    address consumerID
    )
    {
        // Assign values to the 9 parameters


        return
        (
        itemSKU,
        itemUPC,
        productID,
        productNotes,
        productPrice,
        itemState,
        distributorID,
        storeID,
        consumerID
        );
    }
}