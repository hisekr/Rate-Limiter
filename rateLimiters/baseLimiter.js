class BaseLimiter {
  allowRequest(clientId) {
    throw new Error("allowRequest() must be implemented in subclass");
  }
}

module.exports = BaseLimiter;