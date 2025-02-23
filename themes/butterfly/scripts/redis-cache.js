const Redis = require('ioredis');
const redis = new Redis(); // 默认连接到本地 Redis 服务器

hexo.extend.filter.register('after_render:html', function (html, data) {
    const key = `hexo:${data.path}`;
    return redis.get(key).then((cachedHtml) => {
        if (cachedHtml) {
            return cachedHtml;
        }
        // 如果缓存中没有，则将生成的 HTML 存入 Redis
        return redis.set(key, html, 'EX', 3600).then(() => html);
    });
});