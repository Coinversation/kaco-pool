
const hre = require("hardhat");

async function main() {
    await hre.run("verify:verify", {
        address: "0x7F075c63219Ee34cd92037b1e2e4F71f8eca1C78",
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
