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
  SHOW CREATE TABLE my_table;

  -- 删除表
  DROP TABLE my_table;

  -- 创建表
  CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    age INT,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) CHARSET=utf8;
  -- DEFAULT 'Sandnes' 设置默认值
  -- AUTO_INCREMENT 自增属性，一般用于主键
  -- PRIMARY KEY 定义为主键
  -- UNIQUE 唯一索引
  -- NOT NULL 字段不能为空
```

## 修改表结构
```sql
  -- 新增字段
  ALTER TABLE [表名] ADD [字段名] [类型];
  ALTER TABLE my_table ADD age INT;
  
  -- 删除字段
  ALTER TABLE [表名] DROP [字段名];
  ALTER TABLE my_table DROP age;

  -- 修改字段属性
  ALTER TABLE my_table MODIFY age INT NOT NULL;

  -- 修改字段名称
  AlTER TABLE [表名] CHANGE [原名] [新名] [类型];
  ALTER TABLE my_table CHANGE username name VARCHAR;
  AlTER TABLE user CHANGE create_at create_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP();

  -- 修改表编码方式
  ALTER TABLE my_table CHARSET utf8;
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