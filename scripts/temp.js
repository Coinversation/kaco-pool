
const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        address: "0x6ED0a0870BD8861B73DfCf939A529dEAA0f5664b",
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
