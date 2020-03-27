import log from './log';
import run from './run';

export default async function (config) {
    log.stage(`Build site`);
    log.ok(`Running command: ${log.i(config.build)}`);
    run(config.build,config.builddir);
}
