import log from './log';
import run from './run';

export default async function (config) {
    log.stage(`Install dependencies`);
    log.ok(`Running command: ${log.i(config.setup)}`);
    run(config.setup,config.builddir);
}
