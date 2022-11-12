const fs = require('fs');
const fs = require('fs');
const { ethers } = require('hardhat');
async function main() {
  const [deployer, user1] = await ethers.getSigners();
  // We get the contract factory to deploy
  const DecentratwitterFactory = await ethers.getContractFactory("TwitterClone");
  // Deploy contract
  const decentratwitter = await DecentratwitterFactory.deploy();
  // Save contract address file in project
  const contractsDir = __dirname + "/../src/contractsData";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/TwitterClone-address.json`,
    JSON.stringify({ address: decentratwitter.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync("Decentratwitter");

  fs.writeFileSync(
    contractsDir + `/TwitterClone.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
  console.log("Decentratwitter deployed to:", decentratwitter.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
