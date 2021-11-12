
const hre = require("hardhat");

async function main() {

    // const ERC20PresetFixedSupply = await ethers.getContractFactory("ERC20PresetFixedSupply");
    // const erc20 = await ERC20PresetFixedSupply.deploy("ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A");
    // await erc20.deployed();
    // console.log("erc20 deployed to:", erc20.address);

    // sleep(60000);
    // await hre.run("verify:verify", {
    //     address: erc20.address,
    //     constructorArguments: ["ACoin", "ACN", "10000000000000000000000000", "0xFB83a67784F110dC658B19515308A7a95c2bA33A"],
    // });
    // console.log("erc20 verified.")


    const SmartChefFactory = await ethers.getContractFactory("SmartChefFactory");
    const factory = SmartChefFactory.attach("0x0892EaFeB0F7a10265f2e6648a4FA7c0FFd23353");

    const erc20Address = "0x6813067155849bC30cE2C9efDDb813374cdb6373";
    await factory.deployPool("0x0bA819e30016Cf682C7795b44859148C65e62292", erc20Address,
        "1000000000000000000", 12583859, 13403859, 0, "0xFB83a67784F110dC658B19515308A7a95c2bA33A");
    console.log("chef deployed");


    // sleep(60000);
    // await hre.run("verify:verify", {
    //     address: "0x7F075c63219Ee34cd92037b1e2e4F71f8eca1C78",
    //     contract: "contracts/SmartChefInitializable.sol:SmartChefInitializable"
    // });
    // console.log("chef verified.")
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}