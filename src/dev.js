import log from './log';
import run from './run';
import apply from './apply';

export default async function (config) {
    log.stage(`Run site in development mode`);
    log.ok(`Running command: ${log.i(config.dev)}`);
    
    run(config.dev,config.builddir);
}
