import setupBackgroundScript from '.'

async function main() {
    await setupBackgroundScript({ manifestVersion: 3 })
}

try {
    await main()
} catch (err) {
    console.error('= = = Top level error handler caught unhandled error: = = =')
    throw err
}
