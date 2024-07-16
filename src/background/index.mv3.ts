import setupBackgroundScript from '.'

async function main() {
    await setupBackgroundScript({ manifestVersion: 3 })
}

main().catch((err) => {
    console.error('= = = Top level error handler caught unhandled error: = = =')
    throw err
})
