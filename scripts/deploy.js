// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;

const kaco_bsc_address = "0xf96429A7aE52dA7d07E60BE95A3ece8B042016fB";
const usdt_bsc_address = "0x55d398326f99059fF775485246999027B3197955";
const dot_bsc_address = "0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402";

const official_account = "0xFB83a67784F110dC658B19515308A7a95c2bA33A";

const factory_bsc_address = "0xaD26791c470f7e4d0d52383F8814A0A7198B6310";

async function main() {
  // const SmartChefFactory = await ethers.getContractFactory("SmartChefFactory");
  // const factory = await SmartChefFactory.deploy();
  // await factory.deployed();
  // console.log("factory deployed to:", factory.address);

  // await sleep(30000);
  // await hre.run("verify:verify", {
  //   address: factory.address
  // });
  // console.log("factory verified.")

  // const ERC20PresetFixedSupply = await ethers.getContractFactory("ERC20PresetFixedSupply");
  // const erc20 = await ERC20PresetFixedSupply.deploy("ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A");
  // await erc20.deployed();
  // console.log("erc20 deployed to:", erc20.address);

  // await hre.run("verify:verify", {
  //   address: erc20.address,
  //   constructorArguments: ["ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A"],
  // });
  // console.log("erc20 verified.")

  const SmartChefFactory = await ethers.getContractFactory("SmartChefFactory");
  const factory = SmartChefFactory.attach(factory_bsc_address);

  const startBlock = 12692200;
  const endBlock = startBlock + 432000;
  const rewardPerBlock = "493055555555550";
  const rewardToken = dot_bsc_address;
  // await factory.deployPool(kaco_bsc_address, rewardToken,
  //   rewardPerBlock, startBlock, endBlock, 0, official_account);
  // console.log("chef deployed")

  const salt = ethers.utils.solidityKeccak256(["address", "address", "uint256"],
    [kaco_bsc_address, rewardToken, startBlock]);
  const chef = await ethers.getContractFactory("SmartChefInitializable");
  const chefAddress = ethers.utils.getCreate2Address(factory_bsc_address, salt, ethers.utils.keccak256(chef.bytecode));
  console.log("chef address: ", chefAddress)

  await sleep(30000);

  await hre.run("verify:verify", {
    address: chefAddress,
    contract: "contracts/SmartChefInitializable.sol:SmartChefInitializable"
  });
  console.log("chef verified.")
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
