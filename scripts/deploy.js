async function main() {
    const Box = await ethers.getContractFactory("Box")
    console.log("Deploying Box, ProxyAdmin, and then Proxy...")
    // const proxy = await upgrades.deployProxy(Box, [42], { initializer: 'store' })
    const proxy = await upgrades.deployProxy(Box, [42], { initializer: 'initialize' })
    console.log("Proxy of Box deployed to:", proxy.address)
    // console.log("Box deployed to:", proxy.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
