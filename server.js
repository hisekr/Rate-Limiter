const express = require('express');
const TokenBucketLimiter = require("./rateLimiters/tokenBucketLimiter");
const createRateLimiter = require("./middleware/rateLimiterMiddleware");

const app = express();

const tokensPerMinute = 10;
const refillRate = tokensPerMinute / 60;

const tokenBucketLimiter = new TokenBucketLimiter(tokensPerMinute,refillRate);
app.use(createRateLimiter(tokenBucketLimiter));

app.get("/", (req,res) => {
    res.send("Rate Limiter Test Successful");
})

app.listen(5000, () => {
    console.log("Server running on port 5000");
})