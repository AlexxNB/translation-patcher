import log from './log';
import run from './run';

export default async function (config) {
    log.stage(`Install dependencies`);
    log.ok(`Running command: ${log.i(config.install)}`);
    run(config.install,config.builddir);
}
