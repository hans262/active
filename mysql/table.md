# table

## 增删改
```sql
  -- 从表中新增数据
  INSERT INTO [表名] ([key1], [key2]) VALUES ([value1], [value2]);
  INSERT INTO user (username, password) VALUES ('hans', '1222');

  -- 从表中删除一条数据
  DELETE FROM [表名] WHERE [条件];
  -- 按照条件删除
  DELETE FROM user WHERE username='jim';
  -- 删除整个表数据
  DELETE FROM user;

  -- 从表中修改数据
  UPDATE [表名] SET [修改字段] WHERE [条件];
  -- 按条件修改
  UPDATE user SET age = 24, password ='333' WHERE username='tom';
  -- 修改整个表age字段
  UPDATE user SET age = 60;

  -- 插入/替换
  -- 如果id = 2 不存在，则插入该条数据，如果id=2存在，则先删除再插入
  REPLACE INTO user (id, username, password, age) VALUES (2, 'tom', '123', 16);

  -- 插入/更新
  -- 如果存在则更新
  INSERT INTO user (id, username, password, age) VALUES (1, 'his', '123', 12) ON DUPLICATE KEY UPDATE username='小明', password= '12', age = 32;
  
  -- 插入/忽略
  -- 如果不存在则插入，存在则不执行任何操作
  INSERT IGNORE INTO user (id, username, password, age) VALUES (1, 'fig', 'qwe', 22);

  -- 拷贝表
  -- 拷贝整个表
  CREATE TABLE user3 SELECT * FROM user;
  -- 对id=1的记录进行拷贝，并存储为新表user2:
  CREATE TABLE user2 SELECT * FROM user WHERE id=1;
  
  -- 显示表的创建代码
  SHOW CREATE TABLE [表名] \G;
  SHOW CREATE TABLE user \G;
```

## WHERE 条件
```sql
  -- 按照条件查询
  -- 字符串使用单引号，数字不要使用引号
  SELECT 列名 FROM [表名] WHERE [条件];
  -- 数值匹配
  SELECT * FROM user WHERE age > 20;
  -- 时间匹配
  WHERE create_at > '2023-03-18 12:55:57';

  -- 操作符
  = != > >= <=
  IS NULL
  IS NOT NULL
  
  -- 范围匹配 BETWEEN / NOT BETWEEN
  WHERE age BETWEEN 20 AND 25;

  -- 模糊匹配 LIKE
  WHERE password LIKE 'a%';
  -- 'a%' 以a开头
  -- '%a' 以a结尾
  -- '%a%' 任意位置有a的

  -- 条件AND OR
  WHERE age > 18 AND create_at > '2023-03-18 12:55:57';
  WHERE (age > 18 OR username = 'tom') AND create_at > '2023-03-18 12:55:57';

  -- 正则匹配 REGEXP
  SELECT * FROM user WHERE username REGEXP '^to';

```

## 排序
```sql
  -- 根据某个字段排序
  SELECT * FROM user ORDER BY age DESC
  -- ORDER BY 根据某个字段排序
  -- DESC 倒序
  
  -- 升序
  SELECT * FROM user ORDER BY age
  -- 降序
  SELECT * FROM user ORDER BY age DESC
```

## 查询 SELECT
```sql
  -- 查询表数据
  SELECT [字段名] FROM [表名];
  -- 查询整个表
  SELECT * FROM user;
  -- 按字段查询表
  SELECT username, age FROM user;
  -- 查询返回去重的列
  SELECT DISTINCT age FROM user;

  -- LIMIT 分页
  -- page = 1, page_size = 2;
  SELECT * FROM user LIMIT (page - 1) * page_size, page_size;
  -- 或者
  SELECT * FROM user LIMIT page_size OFFSET (page - 1) * page_size;

  -- UNION / UNION ALL
  -- 联合两条查询语句，合并成一个结果
  -- 去重的结果
  SELECT country FROM Websites
  UNION 
  SELECT country FROM apps
  ORDER BY country;
  -- 不去重的结果
  SELECT country FROM Websites
  UNION ALL
  SELECT country FROM apps
  ORDER BY country;

```

## 索引
```sql
  指定索引
  ALTER TABLE user ADD INDEX index_name (name);

  指定唯一索引
  ALTER TABLE user ADD UNIQUE INDEX uni_index_name (name);

  查看索引
  SHOW INDEX FROM user;
  
  删除索引
  DROP INDEX index_name ON user;
```

# 常用函数
```sql
  查询表中有多少条数据
  SELECT COUNT(*) num FROM user;
  
  -- 当前日期和时间
  SELECT CURRENT_TIMESTAMP();

  SELECT CURDATE();
  SELECT CURRENT_TIME();

  -- 从表达式提取日期值
  SELECT DATE("2017-06-15");
```