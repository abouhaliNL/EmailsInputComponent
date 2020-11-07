import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';
import scss from 'rollup-plugin-scss';
import babel from 'rollup-plugin-babel';

export default {
  input: `src/emails-input.ts`,
  output: [{ file: 'dist/emails-input.js', name: 'EmailsInput', format: 'umd' }],
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    scss({
      output: 'dist/main.css',
    }),
    copy({
      targets: [{ src: 'public/prodindex.html', dest: 'dist', rename: 'index.html' }],
    }),
  ],
};
