import loadconfig from './loadconfig';
import init from './init';
import download from './download';
import apply from './apply';
import update from './update';
import install from './install';
import dev from './dev';
import build from './build';
import start from './start';


require('sade')('trpatcher')

    .version('__VERSION__')
    .describe('Tool to fetch official Svelte site, apply translation patch and run translated site')
    .option('--config, -c', 'Config file','./translation.config.json')

    .command('init [directory]')
    .describe('Setup new directory for your translation project.')
    .option('--noinstall, -n', 'Do not run "npm install"')
    .action(async (dirname,opts) => {
        await init(dirname,opts.n);
    })

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
        await update(loadconfig(opts.config));
    })

    .command('install')
    .describe('Install dependencies for the site')
    .action(async (opts) => {
        await install(loadconfig(opts.config));
    })

    .command('dev')
    .describe('Run site on localhost in dev mode')
    .action(async (opts) => {
        await dev(loadconfig(opts.config));
    })

    .command('build')
    .describe('Build site for production')
    .action(async (opts) => {
        await build(loadconfig(opts.config));
    })

    .command('start')
    .describe('Run builded site on production')
    .action(async (opts) => {
        await start(loadconfig(opts.config));
    })
    
    .parse(process.argv);