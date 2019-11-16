PRAGMA synchronous = OFF;
PRAGMA journal_mode = MEMORY;
BEGIN TRANSACTION;
CREATE TABLE `files` (
  `id` integer  NOT NULL PRIMARY KEY AUTOINCREMENT
,  `hash` char(32) default NULL
,  `originalname` varchar(255) default NULL
,  `filename` varchar(30) default NULL
,  `size` integer  default NULL
,  `date` date default NULL
,  `expire` date default NULL
,  `delid` char(68) default NULL
,  `user` integer  default '0'
);
CREATE TABLE `apikeys` (
  `key` char(36) NOT NULL PRIMARY KEY
  `name` varchar(255) default NULL
);
END TRANSACTION;
