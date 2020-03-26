const fs = require('fs-extra');
const path = require('path');
const shellexec = require('shelljs.exec');
const waitOn = require('wait-on');

const DEV = process.env.MODE === 'dev';
const TEST_DIR = path.join('test','testrepo');
const BUILD_DIR = path.join(TEST_DIR,'__BUILD');

// cleanup before test
/*fs.removeSync(BUILD_DIR);

console.log("1. RUN trpatcher download");
console.log(trpatcher('download'));*/

console.log("2. RUN trpatcher apply");
console.log(trpatcher('apply'));

/*
waitOn({
    resources: ['http://localhost:5000/'],
    delay: 1000,
    timeout: 10000 
}, function(err) {
    if (err) throw new Error(err);
    // once here, all resources are available
});*/




/// -------------- HELPERS -------------------- ///
function trpatcher(command){
    if(typeof command !== 'string') command = command.join(' ');
    return exec(`node --unhandled-rejections=strict --enable-source-maps ../../bin/patcher.js ${command}`);
}

function exec(command){
    const result = shellexec(command,{cwd:TEST_DIR});
    if(result.ok) return result.stdout;
}