// contracts/BoxV2.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./interfaces/IConfig2.sol"; 
 
contract BoxV3 {
    uint256 private value;
    address public CONFIG;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);
 
    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }
    
    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
    
    // Increments the stored value by 1
    function increment() public {
        value = value + 1;
        emit ValueChanged(value);
    }

    
    function setConfig(address value_) external {
        CONFIG = value_;
    }
    function getConfValue() public view returns (string memory) {
        require(CONFIG != address(0), "NO CONFIG FILE");
        return IConfig(CONFIG).testFunc2();
    }
}
