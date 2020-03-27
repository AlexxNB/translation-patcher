const cp = require('child_process');

export default async function (command,cwd) {    
    const commands = command.trim().split(' ');

    cp.spawn(commands.shift(), commands, {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
        cwd
    });
}
