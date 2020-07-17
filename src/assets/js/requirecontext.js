let files = require.context('../api', true, /\.js$/);
let apiModule = {};
files.keys().map((key) => {
  if (key == './index.js') return;
  let file = files(key);
  console.log('file', file);
  let name = key.split('/')[1];
  // name = camelize(name);
  apiModule[name] = file;
});
export default apiModule;
