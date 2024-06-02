export interface BGScriptOptions {
    manifestVersion: 2 | 3
}

export default async function setupBackgroundScript({
    manifestVersion,
}: BGScriptOptions) {
    console.log('hi there BG - mv', manifestVersion)
}
