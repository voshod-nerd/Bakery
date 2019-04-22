--
-- Скрипт сгенерирован Devart dbForge Studio for MySQL, Версия 7.2.34.0
-- Домашняя страница продукта: http://www.devart.com/ru/dbforge/mysql/studio
-- Дата скрипта: 22.04.2019 12:02:44
-- Версия сервера: 5.7.11
-- Версия клиента: 4.1
--


-- 
-- Отключение внешних ключей
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Установить режим SQL (SQL mode)
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Установка кодировки, с использованием которой клиент будет посылать запросы на сервер
--
SET NAMES 'utf8';

-- 
-- Установка базы данных по умолчанию
--
USE diplom;

--
-- Описание для таблицы goods
--
DROP TABLE IF EXISTS goods;
CREATE TABLE goods (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  actual BIT(1) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  name VARCHAR(255) DEFAULT NULL,
  price INT(11) DEFAULT NULL,
  weight INT(11) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 6
AVG_ROW_LENGTH = 8192
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Описание для таблицы roles
--
DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UK_nb4h0p6txrmfc0xbrd1kglp9t (name)
)
ENGINE = INNODB
AUTO_INCREMENT = 4
AVG_ROW_LENGTH = 5461
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Описание для таблицы staff
--
DROP TABLE IF EXISTS staff;
CREATE TABLE staff (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  adress VARCHAR(255) DEFAULT NULL,
  fio VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(255) DEFAULT NULL,
  place VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Описание для таблицы users
--
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  email VARCHAR(40) DEFAULT NULL,
  name VARCHAR(40) DEFAULT NULL,
  password VARCHAR(100) DEFAULT NULL,
  username VARCHAR(15) DEFAULT NULL,
  adress VARCHAR(200) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX UK6dotkott2kjsp8vw4d0m25fb7 (email),
  UNIQUE INDEX UKr43af9ap4edm43mmtq01oddj6 (username)
)
ENGINE = INNODB
AUTO_INCREMENT = 5
AVG_ROW_LENGTH = 8192
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Описание для таблицы orders
--
DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  dtorder DATETIME DEFAULT NULL,
  number VARCHAR(255) DEFAULT NULL,
  ready BIT(1) DEFAULT NULL,
  totalprice BIGINT(20) DEFAULT NULL,
  iduser BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_orders_users_id FOREIGN KEY (iduser)
    REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION
)
ENGINE = INNODB
AUTO_INCREMENT = 17
AVG_ROW_LENGTH = 1365
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Описание для таблицы user_roles
--
DROP TABLE IF EXISTS user_roles;
CREATE TABLE user_roles (
  user_id BIGINT(20) NOT NULL,
  role_id BIGINT(20) NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT FKh8ciramu9cc9q3qcqiv4ue8a6 FOREIGN KEY (role_id)
    REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FKhfh9dx7w3ubf1co1vdev94g3f FOREIGN KEY (user_id)
    REFERENCES users(id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AVG_ROW_LENGTH = 8192
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

--
-- Описание для таблицы contentorder
--
DROP TABLE IF EXISTS contentorder;
CREATE TABLE contentorder (
  id BIGINT(20) NOT NULL AUTO_INCREMENT,
  count BIGINT(20) DEFAULT NULL,
  idgoods BIGINT(20) DEFAULT NULL,
  idorder BIGINT(20) DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FKbx15pgw91hdftcpriiux9wvg9 FOREIGN KEY (idorder)
    REFERENCES orders(id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT FKf9rw1ejkno6gd7sg1j2nm4wxf FOREIGN KEY (idgoods)
    REFERENCES goods(id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 19
AVG_ROW_LENGTH = 1260
CHARACTER SET utf8
COLLATE utf8_general_ci
ROW_FORMAT = DYNAMIC;

-- 
-- Вывод данных для таблицы goods
--
INSERT INTO goods VALUES
(1, True, 'Традиционный постный пирожок с толченым картофелем и жареными грибами', 'Постный Пирожок с картофелем и грибами', 20, 120),
(2, True, 'Аппетитная самса с начинкой из двух видов отборного мяса, приготовлена по фирменному рецепту. Подходит к качестве самостоятельного блюда или перекуса.', 'Самса с тыквой и мясом', 45, 150),
(3, True, 'Хрустящие чебуреки с сочной начинкой из джусая поджарены на золотистом масле до румяной корочки. При подаче на стол можно дополнить сметанным соусом.', 'Чебуреки с джусаем', 25, 70),
(4, True, 'Внутри румяного татарского пирожка из дрожжевого теста скрыта начинка из сочного мяса и нежной картошки. Вкусное дополнение к чашке горячего чая.', 'Уч-пучмак', 40, 200),
(5, True, 'Аппетитная сосиска снаружи дополнена мягким и пышным дрожжевым тестом, обжаренным до румяного цвета на золотистом масле', 'Сосиски в тесте жареные', 20, 110);

-- 
-- Вывод данных для таблицы roles
--
INSERT INTO roles VALUES
(1, 'ROLE_ADMIN'),
(3, 'ROLE_DRIVER'),
(2, 'ROLE_USER');

-- 
-- Вывод данных для таблицы staff
--

-- Таблица diplom.staff не содержит данных

-- 
-- Вывод данных для таблицы users
--
INSERT INTO users VALUES
(1, '2019-04-20 21:06:27', '2019-04-20 21:06:27', 'nerd_mail@mail.ru', 'Иванов Иван Сергеевич', '$2a$10$i6lfxxwOtqBe.t5tP.yraeWcRK16bH45VucyYpngqoBdkD1BdmPaW', 'user', '5 микрорайон 5-6'),
(2, '2019-04-21 17:56:07', '2019-04-21 17:56:07', 'nerd_mail@mail.lam', 'Ирина Головина', '$2a$10$KXZ4371/6nmfgNTfYPNwVuDoX12tqWGDeHW7cuxSLvT0k0BrZ5.Du', 'user1', 'Янгеля 5-6'),
(3, '2019-04-22 06:02:14', '2019-04-22 06:02:14', 'nerd_mail@mail.com', 'Сайкенова Асель', '$2a$10$1IhTQKUlKWhRwm23qtw9sOWzuNX05m0iGAFkwoxr0g436O2j4j1Ba', 'admin', 'ddd'),
(4, '2019-04-22 06:03:27', '2019-04-22 06:03:27', 'nerd_mail@mail.cim', 'Маржанов Мурат', '$2a$10$Ns7QEZLdkFlfdWhAF4qUQ.yGcErwKiCK6PRKjYHQF54UVk/xfmPaK', 'driver', 'tter');

-- 
-- Вывод данных для таблицы orders
--
INSERT INTO orders VALUES
(1, '2019-04-12 00:00:00', 'b8a279', False, 35, 1),
(2, '2019-04-26 00:00:00', '16491f', False, 25, 1),
(3, '2019-04-28 00:00:00', '8aae02', False, 55, 1),
(4, '2019-04-19 23:11:39', 'a7fede', False, 40, 1),
(5, '2019-04-19 00:00:00', '508e31', False, 45, 1),
(6, '2019-04-19 00:00:00', '508e31', False, 45, 1),
(7, '2019-04-19 00:00:00', '508e31', False, 45, 1),
(8, '2019-04-18 00:00:00', 'e027f5', False, 20, 1),
(9, '2019-04-19 00:00:00', '48df4f', False, 25, 1),
(10, '2019-04-19 00:00:00', '48df4f', False, 25, 1),
(11, '2019-04-13 00:00:00', '337159', False, 15, 1),
(12, '2019-04-30 00:00:00', 'af8432', False, 35, 2),
(13, '2019-04-26 00:00:00', 'a4a2c8', False, 300, 1),
(14, '2019-04-20 00:00:00', '537f07', False, 100, 2),
(15, '2019-04-30 00:00:00', 'aa7180', False, 75, 2),
(16, '2019-04-23 00:00:00', 'b0b5f4', False, 90, 2);

-- 
-- Вывод данных для таблицы user_roles
--
INSERT INTO user_roles VALUES
(3, 1),
(1, 2),
(2, 2),
(4, 3);

-- 
-- Вывод данных для таблицы contentorder
--
INSERT INTO contentorder VALUES
(1, 5, 1, 1),
(2, 5, 2, 2),
(3, 5, 2, 3),
(4, 5, 1, 3),
(5, 3, 2, 4),
(6, 3, 2, 5),
(7, 3, 2, 6),
(8, 3, 2, 7),
(9, 3, 1, 8),
(10, 3, 1, 9),
(11, 3, 1, 10),
(12, 3, 1, 11),
(13, 7, 1, 12),
(14, 15, 1, 13),
(15, 5, 5, 14),
(16, 3, 3, 15),
(17, 2, 3, 16),
(18, 2, 1, 16);

-- 
-- Восстановить предыдущий режим SQL (SQL mode)
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Включение внешних ключей
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;