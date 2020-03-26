const fs = require('fs-extra');

let default_config = {
    patchdir: 'patch',
    builddir: '__BUILD',
    strings: 'strings.json'
}

export default function (file) {
    let config = fs.readJSONSync(file);
    if(!config) config = {};
    return Object.assign(default_config,config);
}