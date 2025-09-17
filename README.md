# 🚦 Rate Limiter

A simple **rate limiter for Express.js** using the **Token Bucket algorithm**.  
Each client gets a token bucket that refills over time. If no tokens are available, the request is rejected with **429 Too Many Requests**.

---

## ⚙️ How It Works
- Each client has a bucket with fixed `capacity`.  
- Tokens refill at a given `refillRate`.  
- Each request consumes **1 token**.  
- If empty → request is blocked.  

Example in `server.js`:
```js
const tokensPerMinute = 10;
const refillRate = tokensPerMinute / 60;

const tokenBucketLimiter = new TokenBucketLimiter(tokensPerMinute, refillRate);
app.use(createRateLimiter(tokenBucketLimiter));