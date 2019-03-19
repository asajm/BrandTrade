pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'BrandRole' to manage this role - add, remove, check
contract BrandRole {
    using Roles for Roles.Role;

    // Define 2 events, one for Adding, and other for Removing
    event BrandAdded(address indexed account);
    event BrandRemoved(address indexed account);

    // Define a struct 'brands' by inheriting from 'Roles' library, struct Role
    Roles.Role private brands;

    // In the constructor make the address that deploys this contract the 1st brand
    constructor() public {
        _addBrand(msg.sender);
    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyBrand() {
        require(isBrand(msg.sender));
        _;
    }

    // Define a function 'isBrand' to check this role
    function isBrand(address account) public view returns (bool) {
        return brands.has(account);
    }

    // Define a function 'addBrand' that adds this role
    function addBrand(address account) public onlyBrand {
        _addBrand(account);
    }

    // Define a function 'renounceBrand' to renounce this role
    function renounceBrand() public {
        _removeBrand(msg.sender);
    }

    // Define an internal function '_addBrand' to add this role, called by 'addBrand'
    function _addBrand(address account) internal {
        brands.add(account);
        emit BrandAdded(account);
    }

    // Define an internal function '_removeBrand' to remove this role, called by 'removeBrand'
    function _removeBrand(address account) internal {
        brands.remove(account);
        emit BrandRemoved(account);
    }
}