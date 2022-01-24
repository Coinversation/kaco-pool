//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IBEP20.sol";
import "./SmartChefInitializableV2.sol";

contract SmartChefFactoryV2 is Ownable {
    event NewSmartChefContract(address indexed smartChef);

    constructor() {
        //
    }

    /*
     * @notice Deploy the pool
     * @param _stakedToken: staked token address
     * @param _rewardToken: reward token address
     * @param _startBlock: start block
     * @param _admin: admin address with ownership
     * @return address of new smart chef contract
     */
    function deployPool(
        IBEP20 _stakedToken,
        IBEP20 _rewardToken,
        uint256 _startBlock,
        address _admin
    ) external onlyOwner {
        require(_stakedToken.totalSupply() >= 0);
        require(_rewardToken.totalSupply() >= 0);
        require(_stakedToken != _rewardToken, "Tokens must be be different");

        bytes memory bytecode = type(SmartChefInitializableV2).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_stakedToken, _rewardToken, _startBlock));
        address smartChefAddress;

        assembly {
            smartChefAddress := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        SmartChefInitializableV2(smartChefAddress).initialize(
            _stakedToken,
            _rewardToken,
            _startBlock,
            _admin
        );

        emit NewSmartChefContract(smartChefAddress);
    }
}