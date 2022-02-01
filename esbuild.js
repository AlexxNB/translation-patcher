
const { build } = require('esbuild');
const { replace } = require('esbuild-plugin-replace');
const pkg = require('./package.json');

// CLI
build({
    entryPoints: ['./src/main.js'],
    format: "cjs",
    outfile: pkg.main,
    banner: {js:'#!/usr/bin/env node'},
    external:[...Object.keys(pkg.dependencies || {})],
    minify: true,
    platform: 'node',
    sourcemap: true,
    bundle: true,
    plugins: [
      replace({
          '__VERSION__':  pkg.version,
      })
    ]
});