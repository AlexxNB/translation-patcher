import log from './log';
import run from './run';
import { replace_file,replace_in_file,restore_file } from './apply';

const watch = require('node-watch');
const path = require('path');
const fs = require('fs-extra');
 

export default async function (config) {
    log.stage(`Run site in development mode`);
    log.ok(`Running command: ${log.i(config.dev)}`);

    run(config.dev,config.builddir);

    const string_file = path.join(config.patchdir,config.strings);
    let oldstrings = fs.readJSONSync(string_file);
    watch(config.patchdir, { recursive: true }, function(evt, file) {
        file = path.relative(config.patchdir,file)

        if(file === config.strings){
            const saved_dir = path.join(config.builddir,'__SAVED','__STRINGS');
            let newstrings = fs.readJSONSync(string_file);
            const changes = get_changed_string_files(oldstrings,newstrings);
            oldstrings = newstrings;
            for(let change of changes){
                if(change.type === 'deleted'){
                    restore_file(config.builddir,change.file,'strings');
                }else{
                    replace_in_file(config.builddir,saved_dir,change.file,change.data);
                }
            }
        }else if(evt === 'update'){
            replace_file(file,config.patchdir,config.builddir);
        }else if(evt === 'remove'){
            restore_file(config.builddir,file,'files');
        }
    });
}




function get_changed_string_files(obj1,obj2){
    const changed = [];

    for(let file in obj1){
      if(!obj2.hasOwnProperty(file)) changed.push({file,type:'deleted',data:null});
    }
    
    for(let file in obj2){
      if( obj1.hasOwnProperty(file) &&
          Object.keys(obj1[file]).length === Object.keys(obj2[file]).length &&
          Object.keys(obj2[file]).filter(str=>obj1[file][str]!==obj2[file][str]).length === 0 ) continue;
      
      changed.push({file,type:'changed',data:obj2[file]});
    }
  
    return changed
}