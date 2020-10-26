# SQL Prepared Statement

## Prepared Statement 란 무엇인가?

일반 MySql statement와 달리 placeholder '?'를 사용해서 parameter를 넘기는 SQL 문

![mysql2](https://i.imgur.com/dW9NXV3.png)

npm의 mysql2 라이브러리에서 기본적으로 제공

지원하는 DB
- MySQL, Oracle, DB2, Microsoft SQL Server, PostgreSQL

### 일반 Statement와의 차이비교

구분 | Statement | Prepared Statement
-----|-----------|-------------------
Query문 파싱 | 매번 | 1번만
Protocol | Text Protocol | Binary Protocol
WARNING, ERROR | 지원 O | 지원 X
프로토콜 전송 | 1회 | 2회(최초), 1회(이후)
SQL Injection | 노출 | 방어

![text_protocol](https://i.imgur.com/ygkwSR6.png)

![binary_protocol](https://i.imgur.com/uBVnoYB.png)

## 장점

### Syntax
- node.js 관점에서 변수 input 값 분리로 general하게 프로그래밍 가능
  - Query 문의 재사용성 증가
  - String 변환이 필요없어짐

### 속도
- 같은 형태에 value만 다른 반복적인 query를 수행할 경우
- Query의 compile time을 아낄 수 있음

### 보안
- SQL injection에 대응 가능
- Query Template을 보내는 프로토콜과 Value를 보내는 프로토콜이 다름
- 하나를 변조해서 아래와 같은 SQL문의 조작이 불가능

## 단점

하나의 Query를 단독으로 수행할 경우, 두번의 전송이 필요하기 때문에 일반 Statement 보다 느림

## Vanilla mysql에서 prepared statement
```
mysql> PREPARE stmt1 FROM 'SELECT SQRT(POW(?,2) + POW(?,2)) AS hypotenuse';
mysql> SET @a = 3;
mysql> SET @b = 4;
mysql> EXECUTE stmt1 USING @a, @b;
+------------+
| hypotenuse |
+------------+
|          5 |
+------------+
mysql> DEALLOCATE PREPARE stmt1;
```

### PREPARE
```
PREPARE stmt_name FROM preparable_stmt
```
  - 세션단위로 선언, 세션 간 공유되지 않음
  - parameter를 제외한 query문을 미리 한번 파싱하여 캐싱함

### EXECUTE
```
EXECUTE stmt_name
    [USING @var_name [, @var_name] ...]
```
  - 위의 준비된 query를 사용해서 ? 안에 들어갈 Value만을 사용해서 Query 실행
  - 수회 반복 가능

### DEALLOCATE PREPARE
```
{DEALLOCATE | DROP} PREPARE stmt_name
```
  - Prepare 된 query문을 해제시킴
  - 너무 많은 prepared statement를 가지고 있으면 갯수 상한으로 에러 발생가능

### SQL Injection 이란?
- Text Protocol을 이용하는 SQL문을 변조해서 권한이 없는 데이터를 얻어내거나, 타겟의 DB를 파괴할 수 있음
1. 원본 SQL문
```
statement = "SELECT * FROM users WHERE name = '" + userName + "';"
```
- 개발자가 예측한 일반적인 Query
```
userName = "junsu";
statement = "SELECT * FROM users WHERE name = '" + userName + "';"
console.log(statement)
>> SELECT * FROM users WHERE name = 'junsu';
```
2. userName을 문법을 악용하도록 대체
```
' OR '1' = '1
```
3. 대체된 SQL문
```
SELECT * FROM users WHERE name = '' OR '1'='1';
```
4. 특정 사용자의 데이터 대신 모든 데이터를 가져올 수 있음

## 참고자료
- https://dev.mysql.com/doc/refman/8.0/en/sql-prepared-statements.html
- https://www.mysqltutorial.org/mysql-prepared-statement.aspx/
- https://en.wikipedia.org/wiki/Prepared_statement
- https://en.wikipedia.org/wiki/SQL_injection