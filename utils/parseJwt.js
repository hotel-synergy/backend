//to extract payloads from jwt.
const parseJwt = async function(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decoded = Buffer.from(base64, 'base64').toString('utf8');
  return JSON.parse(decoded);
};

module.exports = parseJwt;
