import download from './download';
import apply from './apply';

export default async function (config) {
    await(download(config));
    await(apply(config));
}
