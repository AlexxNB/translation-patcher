import download from './download';
import apply from './apply';
import setup from './setup';

export default async function (config) {
    await(download(config));
    await(apply(config));
    await(setup(config));
}
