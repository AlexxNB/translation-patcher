import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import builtins from 'builtin-modules';
import pkg from './package.json';

const dev = process.env.MODE === 'dev';

export default  {
    input: 'src/main.js',
    output: { 
        file: pkg.main, 
        banner: '#!/usr/bin/env node',
        sourcemap: true,
        format: 'cjs'        
    },
    external: [
        builtins,
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
    ],
    treeshake: !dev,
    plugins: [
        replace({ 
            __VERSION__: pkg.version 
        }),
        resolve({
            preferBuiltins: true
        }),
        !dev && terser()
    ]
}