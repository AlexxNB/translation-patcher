const cp = require('child_process');
const test = require('tape');
const fs = require('fs-extra');
const path = require('path');
const c = require('ansi-colors');

const DIRNAME = 'test_site';
const TRPATCHER = 'node '+path.resolve(path.join('bin','patcher.js'));

const TESTDIR = path.join('test',DIRNAME);
const PATCHDIR = path.join('test','patch');
const BUILDDIR = path.join(TESTDIR,'__BUILD');

(async()=>{
   
    
    test('Testing trpatcher', async (t)=>{
        
        await run(`${TRPATCHER} init ${DIRNAME} -n`,'test');
        t.ok(
            fs.existsSync(TESTDIR),
            'Directory created'
        );
        t.ok(
            fs.existsSync(path.join(TESTDIR,'translation.config.json')),
            'Template downloaded'
        );

        fs.copySync(PATCHDIR,path.join(TESTDIR,'patch'));
        t.ok(
            fs.existsSync(path.join(TESTDIR,'patch','src','Unexistent.svelte')),
            'Testing patch directory copied'
        );

        await run(`${TRPATCHER} download`,TESTDIR);
        t.ok(
            fs.existsSync(path.join(TESTDIR,'__BUILD','package.json')),
            'Example site repository downloaded'
        );

        const apply_result = await run(`${TRPATCHER} apply`,TESTDIR);
        t.ok(
            apply_result.includes(`Replaced src/App.svelte`),
            'File replaced info'
        )
        t.ok(
            apply_result.includes(`src/Unexistent.svelte doesn't exists in original site`),
            'Unexistent file warn'
        )
        t.ok(
            apply_result.includes(`String "name: 'world'" replaced by "name: 'Мир'"`),
            'String in a file replaced info'
        )
        t.ok(
            apply_result.includes(`String "unexistent string" not found`),
            'Unexistent sring warn'
        )
        t.ok(
            apply_result.includes(`File src/this_file_is_not_exists.svelte doesn't exists`),
            'Unexistent file for strings warn'
        )
        t.ok(
            apply_result.includes(`No strings provided`),
            'No strings warn'
        )

        const string_file = fs.readFileSync(path.join(BUILDDIR,'src','main.js'),'utf-8');
        t.ok(
            string_file.includes(`name: 'Мир'`),
            'String in file replaced'
        )

        const file = fs.readFileSync(path.join(BUILDDIR,'src','App.svelte'),'utf-8');
        t.ok(
            file.includes(`Привет {name}!`),
            'Whole file replaced'
        )

        fs.removeSync(TESTDIR);
        t.end();
    });
})();


async function run(command,cwd='.') {    
    
    return await new Promise((resolve,reject)=>{
        cp.exec(command, {cwd},(err, stdout)=>{
            if(err) return reject(err);
            return resolve(c.unstyle(stdout));
        });
    });
}