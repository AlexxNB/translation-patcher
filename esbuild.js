
const { build } = require('esbuild');
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
});