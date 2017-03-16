import babel from 'rollup-plugin-babel';
//import babelrc from 'babelrc-rollup';


let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);


export default {
  entry: 'src/Simple.js',

  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: external,
  targets: [
    {
      dest: pkg.main,
      format: 'umd',
      moduleName: 'simple',
      sourceMap: true
    },
    {
      dest: pkg.module,
      format: 'es',
      sourceMap: true,
      interop: false
    }
  ]
};
