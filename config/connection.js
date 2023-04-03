const { connect, connection } = require('mongoose');

connect('mongodb://localhost/social_network_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;