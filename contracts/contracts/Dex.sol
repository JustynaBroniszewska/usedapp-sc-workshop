// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity 0.7.5;

interface ERC20 { 
    function transferFrom(address from, address to, uint256 value) external ;
}
contract Dex {
    address public token0;
    address public token1;
    constructor(address _token0, address _token1) {
        token0 = _token0;
        token1 = _token1;
    }

    function addLiquidity(uint256 value0, uint256 value1) public {
        ERC20(token0).transferFrom(msg.sender, address(this), value0);
        ERC20(token1).transferFrom(msg.sender, address(this), value1);
    }
}
