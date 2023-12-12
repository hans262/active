# mysql

## 安装/连接

```sh
  # 确保mysql服务已经启动。
  mysql --version

  # 连接mysql
  mysql -u root -p
  输入密码 -> 回车

  # 安装服务
  mysqld -install

  # 启动服务
  net start mysql

  # 设置新密码
  mysqladmin -u root -p password 新密码
```

## 库

```sql
  -- 显示所有数据库
  SHOW DATABASES;

  -- 选择一个数据库
  USE my_db;

  -- 删除数据库
  DROP DATABASE my_db;

  -- 创建数据库
  CREATE DATABASE my_db;
  -- 创建数据库并设置编码方式
  CREATE DATABASE my_db CHARSET utf8;
  -- 创建数据库，如果不存在才创建
  CREATE DATABASE IF NOT EXISTS my_db;

  -- 查看数据库编码
  SHOW VARIABLES LIKE '%char%';
```

## 表

```sql
  -- 显示所有表
  SHOW TABLES;

  -- 显示表结构
  DESC my_table;
  -- 显示表结构，所有列
  SHOW FULL COLUMNS FROM my_table;

  -- 显示创建表的代码
  -- 查看表的默认信息，引擎、编码等
  SHOW CREATE TABLE my_table;

  -- 删除表
  DROP TABLE my_table;

  -- 创建表
  CREATE TABLE table_name(
    id INT AUTO_INCREMENT PRIMARY KEY,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) DEFAULT 123456,
    age INT DEFAULT 18
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;


  -- DEFAULT 'Sandnes' 默认值约束
  -- AUTO_INCREMENT 自增列，只能是整数类型
  -- PRIMARY KEY 主键，非空且唯一约束
  -- UNIQUE 唯一约束
  -- NOT NULL 非空约束
  -- utf8mb4 可以存储特殊字符和表情，mb3则不行
  -- InnoDB存储引起，支持外键、字增等
  -- CHECK 检查约束，mysql > 8.0支持
  

  -- 不存在才创建
  CREATE TABLE table_name IF NOT EXISTS(
    -- 
  )
  -- 重命名
  RENAME TABLE gorder TO gorder;

  -- 修改表编码到mb4，可以支持特殊字符，表情等😊
  ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE  utf8mb4_unicode_ci;
```

## 修改表结构

```sql
  -- 新增字段
  ALTER TABLE table_name ADD column [类型];

  -- 删除字段
  ALTER TABLE table_name DROP column;

  -- 修改字段数据类型
  ALTER TABLE table_name MODIFY age INT NOT NULL;

  -- 修改字段名称
  ALTER TABLE table_name CHANGE [原名] [新名] [类型];
  AlTER TABLE table_name CHANGE name1 name2 VARCHAR(100);

  -- 修改表编码方式
  ALTER TABLE table_name CHARSET utf8;
```

## 备份

```sh
  # 备份数据库
  mysqldump -u root -p my_db > my_db.sql

  # 恢复数据库
  # CREATE DATABASE test; 先创建一个空数据库
  # 执行恢复
  mysql -u root -p test < my_db.sql

  # 导出表
  mysqldump -u root -p my_db user > user.sql
```
