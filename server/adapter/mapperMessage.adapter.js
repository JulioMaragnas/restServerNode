async function MapperMessage(status, response) {
  return {
    status: status(),
    response
  };
}

module.exports = {
  MapperMessage
}