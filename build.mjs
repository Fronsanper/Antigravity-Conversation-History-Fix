import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

const isWatch = process.argv.includes('--watch');
const siblingSdk = path.resolve('..', 'antigravity-sdk', 'dist', 'index.js');
const hasSiblingSdk = fs.existsSync(siblingSdk);

/** @type {esbuild.BuildOptions} */
const config = {
    entryPoints: ['src/extension.ts'],
    bundle: true,
    outfile: 'dist/extension.js',
    external: ['vscode'],
    format: 'cjs',
    platform: 'node',
    target: 'es2020',
    sourcemap: true,
    minify: false,
    ...(hasSiblingSdk ? { alias: { 'antigravity-sdk': siblingSdk } } : {}),
};

if (!fs.existsSync('dist')) fs.mkdirSync('dist');

const sqlFiles = ['sql-wasm.wasm', 'sql-wasm.js'];
for (const sqlFile of sqlFiles) {
    const searchPaths = [
        path.join('node_modules', 'sql.js', 'dist', sqlFile),
        path.join('..', 'antigravity-sdk', 'node_modules', 'sql.js', 'dist', sqlFile),
    ];
    let copied = false;
    for (const src of searchPaths) {
        if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join('dist', sqlFile));
            console.log(`Copied ${sqlFile} from ${src}`);
            copied = true;
            break;
        }
    }
    if (!copied) {
        console.error(`ERROR: ${sqlFile} not found. Run "npm install" first.`);
        process.exit(1);
    }
}

if (isWatch) {
    const ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('Watching...');
} else {
    await esbuild.build(config);
    console.log('Build complete');
}
