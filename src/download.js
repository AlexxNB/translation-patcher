import log from './log';

const fetchRepoDir = require('fetch-repo-dir');
const fs = require('fs-extra');

export default async function (config) {
    if(fs.existsSync(config.builddir)){
        log.ok(`Deleting existent build folder...`);
        fs.removeSync(config.builddir);
    }

    log.stage(`Started download from ${config.repo} repository`);
    
    await fetchRepoDir({
        src: config.repo,
        dir:'__BUILD',
        onDownloadStart: ()=>log.ok(`Downloading archive...`),
        onUnpackStart: ()=>log.ok(`Unpacking archive...`)
    });
    log.stage(`Download completed...`);
}
