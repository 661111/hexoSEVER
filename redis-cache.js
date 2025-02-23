const Redis = require('ioredis');
const redis = new Redis({
    host: '156.224.23.47',
    port: 6379,
    password: 'sxiaohe'
});

module.exports = function (hexo) {
    return async function (req, res, next) {
        const cacheKey = req.originalUrl;
        try {
            // 尝试从 Redis 中获取缓存数据
            const cachedData = await redis.get(cacheKey);
            if (cachedData) {
                // 如果缓存存在，直接返回缓存数据
                res.send(cachedData);
            } else {
                // 如果缓存不存在，继续处理请求
                const originalSend = res.send;
                res.send = function (body) {
                    // 将响应数据存入 Redis 缓存
                    redis.set(cacheKey, body);
                    originalSend.call(this, body);
                };
                next();
            }
        } catch (error) {
            console.error('Redis 缓存出错:', error);
            next();
        }
    };
};