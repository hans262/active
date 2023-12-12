# table

## 增删改

```sql
  -- 从表中新增数据
  INSERT INTO table_name (column1, column2) VALUES (value1, value2);
  -- 简单写法
  INSERT INTO table_name SET
  column1 = value1,
  column2 = value2;

  INSERT INTO test SET
  json_arr = JSON_ARRAY(1,2);

  -- 从表中删除一条数据
  DELETE FROM table_name WHERE [条件];
  -- 按照条件删除
  DELETE FROM table_name WHERE id = 2;
  -- 删除整个表数据
  DELETE FROM table_name;

  -- 从表中修改数据
  UPDATE table_name SET
  column1 = value1,
  column2 = value2
  WHERE [条件];
  -- 修改整个表某字段
  UPDATE table_name SET column_name = 60;

  -- 插入/替换
  -- 确保id是唯一主键
  -- 如果id不存在，则插入该条数据，如果存在，则替换数据
  REPLACE INTO test SET
  id = 2,
  json_arr = JSON_ARRAY(1, 4);

  -- 插入/忽略
  -- 如果id不存在则插入，存在则不执行
  INSERT IGNORE INTO test SET
  id = 5,
  json_arr = JSON_ARRAY(1, 1);

  -- 拷贝表
  -- 拷贝整个表，并存储为新表
  CREATE TABLE new_table_name SELECT * FROM table_name;
  -- 对id=1的记录进行拷贝，并存储为新表
  CREATE TABLE new_table_name SELECT * FROM table_name WHERE id=1;

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

## 常用

```sql
  -- ES 搜索

  -- UNIQUE

  -- 通配符
  goods.* 所有字段
  AS 重命名

  -- 连表查询
  SELECT
  goods.id, goods.title,
  user.id AS user_id, user.name
  FROM goods
  INNER JOIN user
  ON goods.user_id = user.id;

  INNER JOIN
  LEFT JOIN
  RIGHT JOIN

  SELECT goods.*,
  user.name AS user_name,
  user.account AS user_account,
  user.avatar AS user_avatar,
  COUNT(c1.id) AS like_count,
  c2.id AS liked_id
  FROM goods
  LEFT JOIN user ON user.id = goods.uid
  LEFT JOIN collect AS c1 ON c1.gid = goods.id AND c1.type = 'like'
  LEFT JOIN collect AS c2 ON c2.gid = goods.id AND c2.type = 'like'
  AND c2.uid = ${token?.uid ?? -1}
  ${uid ? "WHERE goods.uid = " + uid : ""}
  GROUP BY goods.id, c2.id
  ORDER BY goods.create_at DESC
  LIMIT ${(page - 1) * page_size}, ${page_size}

  -- 子查询
  SELECT goods.title,
  (SELECT user.name FROM user WHERE user.id = goods.user_id) AS user_name
  FROM goods;

  select
  goods.id, goods.title, goods.uid,
  (select count(id) as like_count
  from collect
  where collect.gid = goods.id
  group by collect.gid
  ) as like_count
  from goods;

```

## group by

用来做统计好用
分组的意思

```sql
  -- 分组
  -- 把相同的列，并成一行

  id name number
  1 hans 3
  2 hans 5
  3 kent 2
  4 kent 7
  5 bob  3

  ->

  [1, 2] hans [3, 5]
  [3, 4] kent [2, 7]
  [5]      bob   [3]

  然后再用聚合函数来处理组里面的值


先来看下表1，表名为test：

FROM test Group BY name：该句执行后，我们想象生成了虚拟表3，如下所图所示，生成过程是这样的：group by name，那么找name那一列，具有相同name值的行，合并成一行，如对于name值为aa的，那么<1 aa 2>与<2 aa 3>两行合并成1行，所有的id值和number值写到一个单元格里面。

接下来就要针对虚拟表3执行Select语句了：
（1）如果执行select *的话，那么返回的结果应该是虚拟表3，可是id和number中有的单元格里面的内容是多个值的，而关系数据库就是基于关系的，单元格中是不允许有多个值的，所以你看，执行select * 语句就报错了。
（2）我们再看name列，每个单元格只有一个数据，所以我们select name的话，就没有问题了。为什么name列每个单元格只有一个值呢，因为我们就是用name列来group by的。
（3）那么对于id和number里面的单元格有多个数据的情况怎么办呢？答案就是用聚合函数，聚合函数就用来输入多个数据，输出一个数据的。如cout(id)，sum(number)，而每个聚合函数的输入就是每一个多数据的单元格。
（4）例如我们执行select name,sum(number) from test group by name，那么sum就对虚拟表3的number列的每个单元格进行sum操作，例如对name为aa的那一行的number列执行sum操作，即2+3，返回5，最后执行结果如下：

（5）group by 多个字段该怎么理解呢：如group by name,number，我们可以把name和number 看成一个整体字段，以他们整体来进行分组的。

```

/\*
// EXPLAIN 分析 sql 语句

id：查询块的标识符，用于标识查询中的每个步骤。
select_type：表示查询的类型，如简单查询、联接查询等。
table：表示涉及到的表。
type：表示访问表的方式，如全表扫描、索引扫描等。
possible_keys：表示可能使用的索引。
key：表示实际使用的索引。
rows：表示估计的扫描行数。
Extra：提供了其他的附加信息，如使用了临时表、使用了文件排序等。
\*/

## 全文搜索

```sql

  CREATE TABLE test(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) DEFAULT '',
    content VARCHAR(100) DEFAULT '',
    FULLTEXT (title, content) WITH PARSER ngram
  )ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

  ALTER TABLE test ADD FULLTEXT (title, content) WITH PARSER ngram;

  select * from test;
  
  SELECT * FROM test WHERE MATCH(title, content) AGAINST('hans' in boolean mode);

  -- SELECT * FROM test WHERE title LIKE '%hans%';
  insert into test set title = '😊hans我去看去我看我hans';
  
  -- in boolean mode 模式
  -- 该模式可以进行运算，排出或者包含
  -- 下面是包含MySQ，不包含全文的查询
  SELECT * FROM articles WHERE MATCH(title, content) AGAINST('+包含字段 -排出字段' IN BOOLEAN MODE);

  -- WITH QUERY EXPANSION
  -- 该模式先查询出包含关键词的数据，再寻找与关键词内容相同的数据
  -- 然后一起返回

  -- 排序，默认按照出现频率
  SELECT * FROM test WHERE MATCH(title, content) AGAINST('hans');


  -- innodb_ft_min_token_size
```
