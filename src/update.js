const fetchRepoDir = require('fetch-repo-dir');

export default async function (config) {
    console.log(`Downloading from ${config.repo}...`);
    await fetchRepoDir({
        src: config.repo,
        dir:'__BUILD'
    });
    console.log(`Download completed...`);

    console.log(`Copy translated files...`);
}
