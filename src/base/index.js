if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configurarBase.prod');
} else {
  module.exports = require('./configurarBase.dev');
}
