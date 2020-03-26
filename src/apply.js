import log from './log';

const fs = require('fs-extra');
const path = require('path');

export default function(config){
    log.stage(`Start patching...`);

    log.info(`Replacing translated files`);
    apply_files(config.patchdir, config.builddir,[
        config.strings
    ]);

    log.info(`Replacing strings in files`);
    replace_strings_in_files(config.patchdir, config.builddir, config.strings);

    log.stage(`Patching finished`);
} 

function apply_files(src_dir,dest_dir,skip=[],subdir=''){
    const files = fs.readdirSync(path.join(src_dir,subdir));

    for (let file of files) {
        const relative = path.join(subdir,file);
        const src_path = path.join(src_dir,relative);
        const dest_path = path.join(dest_dir,relative);

        if(!skip.includes(relative)){

            if(isdir(src_path))
                apply_files(src_dir,dest_dir,skip,relative);
            else
                replace_file(src_path,dest_path,relative);

        }
    }
}

function replace_file(src_path,dest_path,relative){
    const is_dest = fs.existsSync(dest_path);

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
    const saved_dir = path.join(build_dir,'__SAVED');

    const list = fs.readJSONSync(path.join(patch_dir,srcfile));

    for(let file in list){
        replace_in_file(build_dir,saved_dir,file,list[file]);
    }
}

function replace_in_file(build_dir,saved_dir,file,strings){
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

