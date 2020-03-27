import log from './log';

const fs = require('fs-extra');
const path = require('path');

export default function(config){
    log.stage(`Start patching...`);

    log.info(`Replacing translated files`);
    apply_files('',config.patchdir, config.builddir,[config.strings]);

    log.info(`Replacing strings in files`);
    replace_strings_in_files(config.patchdir, config.builddir, config.strings);

    log.stage(`Patching finished`);
} 

function apply_files(relative,patch_dir,build_dir,skip=[]){
    const files = fs.readdirSync(path.join(patch_dir,relative));

    for (let file of files) {
        const relative_file = path.join(relative,file);

        if(!skip.includes(relative_file)){
            console.log(path.join(patch_dir,relative_file));
            if(isdir(path.join(patch_dir,relative_file)))
                apply_files(relative_file,patch_dir,build_dir,skip);
            else
                replace_file(relative_file,patch_dir,build_dir);

        }
    }
}

export function replace_file(relative, patch_dir, build_dir){
    const saved_path = path.join(build_dir,'__SAVED','__FILES',relative);
    const src_path = path.join(patch_dir,relative);
    const dest_path = path.join(build_dir,relative);

    const is_dest = fs.existsSync(dest_path);

    if(is_dest && !fs.existsSync(saved_path)) fs.copySync(dest_path, saved_path);
    fs.copySync(src_path, dest_path);

    if(!is_dest)
        log.warn(`${log.i(relative)} doesn't exists in original site, translated file copied`);
    else
        log.ok(`Replaced ${log.i(relative)}`)
}

function isdir(file_path){
    return fs.lstatSync(file_path).isDirectory()
}

function replace_strings_in_files(patch_dir,build_dir,srcfile){
    const saved_dir = path.join(build_dir,'__SAVED','__STRINGS');

    const list = fs.readJSONSync(path.join(patch_dir,srcfile));

    for(let file in list){
        replace_in_file(build_dir,saved_dir,file,list[file]);
    }
}

export function replace_in_file(build_dir,saved_dir,file,strings){
    const dest_file = path.join(build_dir,file);
    const saved_file = path.join(saved_dir,file);

    if(Object.keys(strings).length === 0){
        log.error(`No strings provided for ${log.i(file)}. Skipped.`)
        return;
    }

    if(!fs.existsSync(dest_file)){
        log.error(`File ${log.i(file)} doesn't exists. Skipped.`)
        return;
    }

    if(!fs.existsSync(saved_file)) fs.copySync(dest_file, saved_file);

    log.ok(`Replacing strings in ${log.i(file)}:`)

    let source = fs.readFileSync(saved_file,'utf-8');
    for(let find in strings){

        const replace = strings[find];
        const chanks = source.split(find);
        const num = chanks.length-1;

        if(num > 0) {
            source = chanks.join(replace);
            log.ok(`String "${log.i(log.cut(find))}" replaced by "${log.i(log.cut(replace))}". ${num} entry(s).`,1);
        } else log.warn(`String "${log.i(log.cut(find))}" not found. Skipped.`,1); 
    }
    fs.writeFileSync(dest_file,source);
}

export function restore_file(build_dir,file,type='files'){
    if(!['files','strings'].includes(type)) throw new Error('Type should be only "file" or "string"')

    const src_path = path.join(build_dir,'__SAVED',type==='file'? '__FILES':'__STRINGS',file);
    const dest_path = path.join(build_dir,file);

    if(fs.existsSync(src_path)) {
        fs.copyFileSync(src_path,dest_path);
        log.ok(`Recovering file ${log.i(file)}`);
    }
}

