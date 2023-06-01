# 数据类型

## 字符串
```sql
  CHAR(n)          固定长度n
  VARCHAR(n)       可变长度，最大长度n
  TEXT             最大长度为65535的字符串
```

## 数字
在括号中规定最大位数。
```sql
  -- 整数
  INT(n) 
  -- -2147483648 ~ 2147483647 | 0 ~ 4294967295
	-- n默认为11。
  
  BIGINT(n)
  -- -9223372036854775808 ~ 9223372036854775807
  -- 0 ~ 18446744073709551615
  -- n默认20

  -- 浮点数
  FLOAT
  DOUBLE

  -- 布尔值
  BIT(1) NOT NULL DEFAULT b'0';
  -- (b'1', b'0')
  -- select * from user where is_admin = 1;
```


## 时间

```sql
  DATE()
  日期。格式：YYYY-MM-DD
  注释：支持的范围是从 '1000-01-01' 到 '9999-12-31'

  DATETIME()
  *日期和时间的组合。格式：YYYY-MM-DD HH:MM:SS
  注释：支持的范围是从 '1000-01-01 00:00:00' 到 '9999-12-31 23:59:59'

  TIMESTAMP
  时间戳
  SELECT CURRENT_TIMESTAMP() 获取当前时间
  SELECT NOW() 可获取当前时间
  INSERT INTO user (username, create_time) VALUES ('hans', NOW());
```