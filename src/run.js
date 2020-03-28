const cp = require('child_process');

export default async function (command,cwd) {    
    const commands = command.trim().split(' ');
    
    return await new Promise((resolve,reject)=>{

        const child = cp.spawn(commands.shift(), commands, {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true,
            detached: true,
            cwd
        });

        child.on('exit',()=>resolve(0));
    
        process.on('uncaughtException',(err)=>{
            kill_subprocess(child);
            reject(err);
            throw err;
        })
    
        process.on('exit',()=>{
            kill_subprocess(child);
            resolve(0);
        })

    });
}


function kill_subprocess(subrocess){
    if(subrocess.connected) process.kill(-subrocess.pid);
}