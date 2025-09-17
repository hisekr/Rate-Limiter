const BaseLimiter = require("./baseLimiter");

class TokenBucket {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  refill(){
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefill)/1000;
    const tokensToAdd = elapsedSeconds*this.refillRate;

    if(tokensToAdd>0){
      this.tokens = Math.min(this.capacity, this.tokens+ tokensToAdd);
      this.lastRefill = now;
    }
  }

  takeToken(){
    this.refill();
    if(this.tokens>0){
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}

class TokenBucketLimiter extends BaseLimiter {
  constructor(capacity, refillRate) {
    super();
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.buckets = new Map();
  }

  allowRequest(clientId){
    if(!this.buckets.has(clientId)){
      this.buckets.set(
        clientId,
        new TokenBucket(this.capacity, this.refillRate),
      );
    }

    const bucket = this.buckets.get(clientId);
    return bucket.takeToken();
  }
}

module.exports = TokenBucketLimiter;
