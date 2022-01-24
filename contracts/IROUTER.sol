//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

interface IROUTER{
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function getAmountsOut(uint amountIn, address[] memory path)
            external
            view
            returns (uint[] memory amounts);

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
}