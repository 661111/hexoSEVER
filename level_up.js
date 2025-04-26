const YML = require('yamljs');
const fs = require('fs');

// 读取并解析 YAML 文件
const rawData = fs.readFileSync('source/_data/level_up.yml', 'utf8')
                .replace(/(?<=rss:)\s*\n/g, ' ""\n'); // 处理空值
const data = YML.parse(rawData);

// 初始化存储对象
const result = {
  level_up_group: [],
  length: 0
};

// 遍历 YAML 数据
data.forEach(category => {
  if (category.level_up_group && Array.isArray(category.level_up_group)) {
    result.level_up_group = result.level_up_group.concat(category.level_up_group);
  }
});

// 计算最终长度
result.length = result.level_up_group.length;

// 写入 JSON 文件
fs.writeFileSync(
  './source/level_up.json',
  JSON.stringify(result, null, 2) // 美化输出格式
);

console.log('✅ 升级页面数据文件已生成');