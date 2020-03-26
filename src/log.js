const c = require('ansi-colors');

export default {
    stage,
    info,
    ok,
    warn,
    error,
    cut,
    y,b,g,r,i,d
}

function stage(text,indent=0){
    console.log(b`${prefix(indent)}${text}`);
}

function info(text,indent=0){
    console.log(d`${b`${prefix(indent)}${text}`}`);
}

function ok(text,indent=0){
    console.log(g`${prefix(indent)}${text}`);
}

function warn(text,indent=0){
    console.log(y`${prefix(indent)}${b`(!)`} ${text}`);
}

function error(text,indent=0){
    console.log(r`${prefix(indent)}${b`(!)`} ${text}`);
}


function i(){
    return c.italic(stringify(arguments));
}

function b(){
    return c.bold(stringify(arguments));
}

function g(){
    return c.green(stringify(arguments));
}

function r(){
    return c.red(stringify(arguments));
}

function y(){
    return c.yellow(stringify(arguments));
}

function d(){
    return c.dim(stringify(arguments));
}

function prefix(indent){
    return indent > 0 ?  ' '.repeat(indent*2)+'- ' : '';
}

function cut(str,to=20){
    return str.length > to ? str.substring(0,to)+'...' : str;
}


function stringify(params){
    if(typeof params[0] === 'string') return params[0];
    params = Array.from(params);
    let chanks = params.shift(), result = '';
    params.push(result);
    for(let id in chanks) result += chanks[id]+params[id];
    return result;
}


