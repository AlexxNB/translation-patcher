import log from './log';
import run from './run';

const TEMPLATE = 'https://github.com/AlexxNB/translation-patcher/template'

const fetchRepoDir = require('fetch-repo-dir');
const prompts = require('prompts');

export default async function(dirname,noinstall){

    if(!dirname){
        dirname = (await prompts({
            type: 'text',
            name: 'dirname',
            message: 'Name for your new translation project?',
            initial: 'my_translated_site'
        })).dirname;
    }
     
    log.stage(`Downloading translation template...`);
    await fetchRepoDir({
        src: TEMPLATE,
        dir: dirname
    });
    log.stage(`Done!`);

    if(!noinstall){
        log.stage(`Installing dependencies...`);
        await run('npm install',dirname);
        log.stage(`Done!`);
    }

    log.info(``);
    log.ok(`Please read the ${log.i('README.md')} file in your project folder for next steps.`);
}
