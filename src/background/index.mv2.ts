import setupBackgroundScript from '.'

async function main() {
    await setupBackgroundScript({ manifestVersion: 2 })
}

try {
    await main()
} catch (err) {
    console.error('= = = Top level error handler caught unhandled error: = = =')
    throw err
}
