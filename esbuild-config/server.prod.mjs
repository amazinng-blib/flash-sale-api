import * as esbuild from 'esbuild';

try {
  await esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    sourcemap: false,
    minify: true,
    platform: 'node',
    target: ['node20.12.2'],
    packages: 'external',
    define: {
      'process.env.NODE_ENV': "'production'",
    },
    outfile: 'dist/index.js',
  });

  console.log('Server bundled successfully for production!');
} catch (error) {
  console.error('An error occurred during bundling:', error);
  process.exit(1);
}
