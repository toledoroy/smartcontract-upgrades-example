const { expect } = require('chai')

let Box, box, config

// Start test block
describe('Box (proxy)', function () {

  // beforeEach(async function () {
  before(async function () {
    Box = await ethers.getContractFactory("Box")
    // box = await upgrades.deployProxy(Box, [42], { initializer: 'store' })
    box = await upgrades.deployProxy(Box, [42], { initializer: 'initialize' })
    //Log
    console.log("(i) Box Deployed to", box.address);
  })

  it('retrieve returns a value previously initialized', async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await box.retrieve()).toString()).to.equal('42')
    expect(() => { box.increment() }).to.throw(TypeError)
  })

  it('upgrades', async function () {
    const BoxV2 = await ethers.getContractFactory("BoxV2")
    box = await upgrades.upgradeProxy(box.address, BoxV2)
    await box.increment()
    let result = await box.retrieve()
    expect(result).to.equal(43)
  })

  it('has config', async function () {
    const Config = await ethers.getContractFactory("contracts\\Config1.sol:Config")
    config = await Config.deploy();
    let result = await config.testFunc1()
    expect(result).to.equal("This is testFunc1")
  })

  it('can set config', async function () {
    console.log("Setting Config:"+config.address)
    box.setConfig(config.address)
    expect(await box.CONFIG()).to.equal(config.address)
  })

  it('can use Config', async function () {
    let result = await box.getConfValue()
    expect(result).to.equal("This is testFunc1")
  })

  it('can deploy new config', async function () {
    const Config = await ethers.getContractFactory("contracts\\Config2.sol:Config")
    config = await Config.deploy();
    let result = await config.testFunc2()
    expect(result).to.equal("This is testFunc2")
  })

  it('can upgrade & set new Config', async function () {
    //Update Box
    const BoxV3 = await ethers.getContractFactory("BoxV3")
    box = await upgrades.upgradeProxy(box.address, BoxV3)
    //Use New Config
    console.log("Setting Config:"+config.address)
    box.setConfig(config.address)
    expect(await box.CONFIG()).to.equal(config.address)
  })

  it('can use new Config', async function () {
    let result = await box.getConfValue()
    expect(result).to.equal("This is testFunc2")
  })



})
