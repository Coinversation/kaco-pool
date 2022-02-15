const hre = require("hardhat");
const ethers = hre.ethers;

const kaco_shiden_address = "0xb12c13e66AdE1F72f71834f2FC5082Db8C091358";
const kacoSDNlp_shiden_address = "0x456C0082DE0048EE883881fF61341177FA1FEF40";

const official_account = "0xFB83a67784F110dC658B19515308A7a95c2bA33A";


async function main() {
  const startBlock = 1200200;
  const rewardToken = kacoSDNlp_shiden_address;

  const KACSDNRewardPool = await ethers.getContractFactory("KACSDNRewardPool");
  const pool = await KACSDNRewardPool.deploy(kaco_shiden_address, kacoSDNlp_shiden_address, startBlock, official_account);
  await pool.deployed();
  console.log("factory deployed to:", pool.address);

//   await sleep(30000);
//   await hre.run("verify:verify", {
//     address: factory.address
//   });
//   console.log("factory verified.")

//   const ERC20PresetFixedSupply = await ethers.getContractFactory("ERC20PresetFixedSupply");
//   const erc20 = await ERC20PresetFixedSupply.deploy("ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A");
//   await erc20.deployed();
//   console.log("erc20 deployed to:", erc20.address);

//   await hre.run("verify:verify", {
//     address: erc20.address,
//     constructorArguments: ["ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A"],
//   });
//   console.log("erc20 verified.")

//   const SmartChefFactory = await ethers.getContractFactory("SmartChefFactory");
//   const factory = SmartChefFactory.attach(factory_bsc_address);

  // const startBlock = 12692200;
  // const rewardToken = kacoSDNlp_shiden_address;
  // await factory.deployPool(kaco_shiden_address, rewardToken,
  //   startBlock, official_account);
  // console.log("chef deployed")
  // const salt = ethers.utils.solidityKeccak256(["address", "address", "uint256"],
  //   [kaco_shiden_address, rewardToken, startBlock]);
  // const chef = await ethers.getContractFactory("SmartChefInitializableV2");
  // const chefAddress = ethers.utils.getCreate2Address(factory.address, salt, ethers.utils.keccak256(chef.bytecode));
  // console.log("chef address: ", chefAddress)

//   await sleep(30000);

//   await hre.run("verify:verify", {
//     address: chefAddress,
//     contract: "contracts/SmartChefInitializable.sol:SmartChefInitializable"
//   });
//   console.log("chef verified.")
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
