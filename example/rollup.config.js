import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';


export default {
  entry: 'src/main.js',
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  targets: [{
    dest: 'dist/game.js',
    format: 'es',
    sourceMap: true,
    interop: false
  }]
};
