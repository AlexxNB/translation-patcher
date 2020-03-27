const cp = require('child_process');

export default async function (command,cwd) {    
    const commands = command.trim().split(' ');
    
    const child = cp.spawn(commands.shift(), commands, {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
        detached: true,
        cwd
    });

    process.on('uncaughtException',(err)=>{
        process.kill(-child.pid) ;
        throw err;
    })

    process.on('exit',()=>{
        process.kill(-child.pid) ;
    })
}
