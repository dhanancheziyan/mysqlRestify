var dns = require('dns');

dns.lookup('localhost', function onLookup(err, addresses, family) {
  console.log('addresses:', addresses);
  var d ="m here";
  process.stdout.write(d);
});