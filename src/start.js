import log from './log';
import run from './run';

export default async function (config) {
    log.stage(`Starting site`);
    log.ok(`Running command: ${log.i(config.start)}`);
    run(config.start,config.builddir);
}
