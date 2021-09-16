// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const SmartChefFactory = await ethers.getContractFactory("SmartChefFactory");
  const factory = await SmartChefFactory.deploy();
  await factory.deployed();
  console.log("factory deployed to:", factory.address);

  await hre.run("verify:verify", {
    address: factory.address
  });
  console.log("factory verified.")

  const ERC20PresetFixedSupply = await ethers.getContractFactory("ERC20PresetFixedSupply");
  const erc20 = await ERC20PresetFixedSupply.deploy("ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A");
  await erc20.deployed();
  console.log("erc20 deployed to:", erc20.address);

  await hre.run("verify:verify", {
    address: erc20.address,
    constructorArguments: ["ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A"],
  });
  console.log("erc20 verified.")

  await factory.deployPool("0x0ba819e30016cf682c7795b44859148c65e62292", erc20.address,
    1, 12403859, 13403859, 0, "0xFB83a67784F110dC658B19515308A7a95c2bA33A");
  console.log("chef deployed")

  const salt = ethers.utils.solidityKeccak256(["address", "address", "uint256"],
    ["0x0ba819e30016cf682c7795b44859148c65e62292", erc20.address, 12403859]);
  const chef = await ethers.getContractFactory("SmartChefInitializable");
  const chefAddress = ethers.utils.getCreate2Address(factory.address, salt, ethers.utils.keccak256(chef.bytecode));
  console.log("chef address: ", chefAddress)

  await hre.run("verify:verify", {
    address: chefAddress,
    contract: "contracts/SmartChefInitializable.sol:SmartChefInitializable"
  });
  console.log("chef verified.")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
