async function main() {
    console.log('hi there opts')
}

try {
    await main()
} catch (err) {
    console.error('= = = Top level error handler caught unhandled error: = = =')
    throw err
}
