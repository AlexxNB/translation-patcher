import loadconfig from './loadconfig';
import download from './download';
import apply from './apply';
import update from './update';


require('sade')('trpatcher')

    .version('__VERSION__')
    .describe('Tool to fetch official Svelte site, apply translation patch and run translated site')
    .option('--config, -c', 'Config file','./translation.config.json')

    .command('download')
    .describe('Download official site content')
    .action(async (opts) => {
        await download(loadconfig(opts.config));
    })

    .command('apply')
    .describe('Apply translation patch to the downloaded site')
    .action(async (opts) => {
        await apply(loadconfig(opts.config));
    })

    .command('update')
    .describe('Download official site content and apply translation patch')
    .action(async (opts) => {
        //await update(loadconfig(opts.config));
    })

    .command('dev')
    .describe('Run site on localhost in dev mode')

    .command('build')
    .describe('Build site for production')

    .command('start')
    .describe('Run builded site on production')
    
    .parse(process.argv);