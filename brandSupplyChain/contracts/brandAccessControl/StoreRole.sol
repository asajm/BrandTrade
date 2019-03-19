pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'StoreRole' to manage this role - add, remove, check
contract StoreRole {

    // Define 2 events, one for Adding, and other for Removing

    // Define a struct 'stores' by inheriting from 'Roles' library, struct Role

    // In the constructor make the address that deploys this contract the 1st store
    constructor() public {

    }

    // Define a modifier that checks to see if msg.sender has the appropriate role
    modifier onlyStore() {

        _;
    }

    // Define a function 'isStore' to check this role
    function isStore(address account) public view returns (bool) {

    }

    // Define a function 'addStore' that adds this role
    function addStore(address account) public onlyStore {

    }

    // Define a function 'renounceStore' to renounce this role
    function renounceStore() public {

    }

    // Define an internal function '_addStore' to add this role, called by 'addStore'
    function _addStore(address account) internal {

    }

    // Define an internal function '_removeStore' to remove this role, called by 'removeStore'
    function _removeStore(address account) internal {

    }
}