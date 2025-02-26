hexo.extend.generator.register('thePosts', function (locals) {
    const jsonData = locals.posts
      .filter(post => post.random !== false)
      .map(post => {
        return {
          title: post.title || "暂无标题",
          abbrlink: post.abbrlink,
          cover: post.cover,
          description: post.description || "暂无简介"
        };
      });
  
    return {
      path: 'random.json',
      data: JSON.stringify(jsonData)
    };
  });
  