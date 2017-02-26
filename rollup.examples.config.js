import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import serve from 'rollup-plugin-serve';


export default {
  entry: 'src/examples/hello-world/index.js',
  plugins: [
    babel(babelrc()),
    serve({
      contentBase: 'examples/hello-world/'
    }),
    alias({
      simple: 'src/simple/index.js'
    })
  ],
  //external: external,
  targets: [
    {
      dest: 'examples/hello-world/index.js',
      format: 'umd',
      sourceMap: true
    }
  ]
};