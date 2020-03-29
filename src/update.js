import download from './download';
import apply from './apply';
import setup from './setup';

export default async function (config,order) {
    await(download(config));

    if(order === 'das') {
        await(apply(config));
        await(setup(config));
    }else{
        await(setup(config));
        await(apply(config));
    }
    
}
