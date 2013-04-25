-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2013 年 04 月 24 日 01:04
-- 服务器版本: 5.5.25
-- PHP 版本: 5.2.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `videocall`
--
CREATE DATABASE `videocall` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `videocall`;

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `check`
--

CREATE TABLE IF NOT EXISTS `check` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `studentid` int(8) NOT NULL,
  `scheduleid` int(8) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `checkagain` int(1) NOT NULL DEFAULT '0',
  `week` int(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=15 ;

--
-- 转存表中的数据 `check`
--

INSERT INTO `check` (`id`, `studentid`, `scheduleid`, `status`, `checkagain`, `week`) VALUES
(1, 1, 1, 2, 0, 3),
(2, 2, 9, 2, 0, 6),
(3, 1, 6, 2, 1, 13),
(4, 1, 4, 1, 0, 4),
(5, 1, 7, 0, 1, 2),
(6, 3, 7, 0, 0, 2),
(7, 4, 12, 0, 0, 3),
(8, 2, 4, 1, 0, 4),
(9, 1, 4, 3, 0, 4),
(10, 4, 12, 2, 0, 3),
(11, 2, 1, 2, 0, 3),
(12, 1, 1, 2, 0, 5),
(13, 2, 1, 1, 0, 5),
(14, 3, 1, 1, 0, 5);

-- --------------------------------------------------------

--
-- 表的结构 `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `familyid` int(4) NOT NULL,
  `grade` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `class`
--

INSERT INTO `class` (`id`, `name`, `familyid`, `grade`) VALUES
(1, '网络工程1班', 1, '2009'),
(2, '网络工程2班', 1, '2009'),
(3, '软件3班', 1, '2010'),
(4, '中文2班', 2, '2009'),
(5, '物理1班', 3, '2009'),
(6, '国际经济与贸易3班', 6, '2011');

-- --------------------------------------------------------

--
-- 表的结构 `classroom`
--

CREATE TABLE IF NOT EXISTS `classroom` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `video` int(1) NOT NULL DEFAULT '0',
  `people` int(4) NOT NULL,
  `sizex` int(3) NOT NULL,
  `sizey` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- 转存表中的数据 `classroom`
--

INSERT INTO `classroom` (`id`, `name`, `video`, `people`, `sizex`, `sizey`) VALUES
(1, '1-101', 0, 150, 10, 15),
(2, '1-102', 0, 172, 8, 21),
(3, '1-103', 0, 120, 10, 12),
(4, '1-104', 0, 120, 10, 12),
(5, '1-105', 0, 80, 8, 10),
(6, '1-106', 1, 80, 8, 10),
(7, '1-107', 1, 80, 8, 10),
(8, '1-108', 0, 80, 10, 8),
(9, '1-109', 0, 60, 10, 6),
(10, '1-110', 0, 160, 10, 16),
(11, '1-111', 0, 160, 10, 16),
(12, '1-201', 0, 70, 7, 10),
(13, '1-205', 0, 70, 7, 10),
(14, '1-206', 0, 70, 7, 10),
(15, '1-207', 0, 70, 7, 10),
(16, '1-310', 0, 100, 10, 10),
(17, '1-311', 0, 30, 6, 5),
(18, '1-312', 1, 30, 6, 5),
(19, '5-501', 0, 80, 10, 8),
(20, '5-503', 0, 80, 10, 8),
(21, '5-504', 0, 80, 10, 8),
(22, '5-505', 0, 80, 10, 8),
(23, '5-510', 0, 80, 10, 8),
(24, '5-511', 0, 80, 10, 8);

-- --------------------------------------------------------

--
-- 表的结构 `depart`
--

CREATE TABLE IF NOT EXISTS `depart` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `depart`
--

INSERT INTO `depart` (`id`, `name`) VALUES
(1, '计算机科学系'),
(2, '中文系'),
(3, '电子科学系'),
(4, '服装系'),
(5, '化学工程系'),
(6, '经济管理系'),
(7, '教育科学系'),
(8, '建筑与土木工程系'),
(9, '旅游系'),
(10, '美术系'),
(11, '生命科学系'),
(12, '数学系'),
(13, '体育系'),
(14, '外语系'),
(15, '音乐系'),
(16, '政治法律系'),
(17, '思政部'),
(18, '成人教育学院');

-- --------------------------------------------------------

--
-- 表的结构 `family`
--

CREATE TABLE IF NOT EXISTS `family` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `family`
--

INSERT INTO `family` (`id`, `name`) VALUES
(1, '计算机科学系'),
(2, '中文系'),
(3, '电子科学系'),
(4, '服装系'),
(5, '化学工程系'),
(6, '经济管理系'),
(7, '教育科学系'),
(8, '建筑与土木工程系'),
(9, '旅游系'),
(10, '美术系'),
(11, '生命科学系'),
(12, '数学系'),
(13, '体育系'),
(14, '外语系'),
(15, '音乐系'),
(16, '政治法律系'),
(17, '思政部'),
(18, '成人教育学院');

-- --------------------------------------------------------

--
-- 表的结构 `holiday`
--

CREATE TABLE IF NOT EXISTS `holiday` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `year` int(4) NOT NULL,
  `term` int(1) NOT NULL,
  `startweek` int(2) NOT NULL,
  `endweek` int(2) NOT NULL,
  `day` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `modifyclass`
--

CREATE TABLE IF NOT EXISTS `modifyclass` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `scheduleid` int(8) NOT NULL,
  `classroomid` int(6) NOT NULL,
  `day` int(1) NOT NULL,
  `time` int(2) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `comment` text,
  `adminid` int(6) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `teacherid` int(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `modifyclass`
--

INSERT INTO `modifyclass` (`id`, `scheduleid`, `classroomid`, `day`, `time`, `status`, `comment`, `adminid`, `title`, `content`, `teacherid`) VALUES
(7, 1, 1, 1, 1, 0, NULL, NULL, '', '', 1);

-- --------------------------------------------------------

--
-- 表的结构 `modifystudent`
--

CREATE TABLE IF NOT EXISTS `modifystudent` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `scheduleid` int(8) NOT NULL,
  `classroomid` int(6) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `applyecomment` text NOT NULL,
  `verifycomment` text NOT NULL,
  `studentid` int(8) NOT NULL,
  `adminid` int(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `modifyteacher`
--

CREATE TABLE IF NOT EXISTS `modifyteacher` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `scheduleid` int(8) NOT NULL,
  `classroomid` int(6) NOT NULL,
  `status` int(1) NOT NULL,
  `applyecomment` text NOT NULL,
  `verifycomment` text NOT NULL,
  `teacherid` int(8) NOT NULL,
  `studentid` int(8) NOT NULL,
  `adminid` int(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `modstudentinfo`
--

CREATE TABLE IF NOT EXISTS `modstudentinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `modid` int(8) NOT NULL,
  `modname` varchar(20) NOT NULL,
  `modclassid` int(6) NOT NULL,
  `modfamilyid` int(4) NOT NULL,
  `modguardername` varchar(20) NOT NULL,
  `guarderemail` varchar(50) NOT NULL,
  `modguarderphone` varchar(13) NOT NULL,
  `modguarderrelation` varchar(20) NOT NULL,
  `applycomment` text NOT NULL,
  `adminid` int(6) NOT NULL,
  `verifycomment` text NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `modteacherinfo`
--

CREATE TABLE IF NOT EXISTS `modteacherinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `modid` int(8) NOT NULL,
  `modname` varchar(20) NOT NULL,
  `moddepartid` int(4) NOT NULL,
  `modposition` varchar(20) NOT NULL,
  `applycomment` text NOT NULL,
  `adminid` int(6) NOT NULL,
  `verifycomment` text NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `notice`
--

CREATE TABLE IF NOT EXISTS `notice` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `content` text NOT NULL,
  `teacherid` int(6) NOT NULL,
  `time` int(11) NOT NULL,
  `studentid` varchar(12) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `isAll` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1277 ;

--
-- 转存表中的数据 `notice`
--

INSERT INTO `notice` (`id`, `name`, `content`, `teacherid`, `time`, `studentid`, `status`, `isAll`) VALUES
(535, '下周停课', '下周事假​', 144200, 1360816965, '091402116', 0, 0),
(598, '下周停课', '下周事假​', 144200, 1360816976, '091401144', 0, 0),
(1225, 'Checkout you code', 'As the title said!', 144200, 1366600215, '091402130', 0, 0),
(1276, 'Client Development of Classroom Attendan', 'Client Development of Classroom Attendance auto-taking System', 144200, 1366663439, '091402130', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `schedule`
--

CREATE TABLE IF NOT EXISTS `schedule` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `subjectid` int(8) NOT NULL,
  `studentid` int(8) NOT NULL,
  `teacherid` int(8) NOT NULL,
  `classroomid` int(6) NOT NULL,
  `classid` int(6) NOT NULL,
  `familyid` int(3) NOT NULL,
  `year` int(4) NOT NULL,
  `term` int(1) NOT NULL,
  `startweek` int(2) NOT NULL,
  `endweek` int(2) NOT NULL,
  `day` int(1) NOT NULL,
  `time` int(2) NOT NULL,
  `singledouble` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `schedule`
--

INSERT INTO `schedule` (`id`, `subjectid`, `studentid`, `teacherid`, `classroomid`, `classid`, `familyid`, `year`, `term`, `startweek`, `endweek`, `day`, `time`, `singledouble`) VALUES
(1, 1, 1, 1, 2, 1, 1, 2012, 1, 1, 18, 2, 1, 0),
(2, 1, 1, 4, 2, 1, 1, 2012, 1, 1, 18, 2, 2, 0),
(3, 3, 1, 4, 2, 1, 1, 2012, 1, 1, 18, 2, 5, 0),
(4, 3, 1, 4, 2, 1, 1, 2012, 1, 1, 18, 2, 6, 0),
(5, 3, 1, 4, 2, 1, 1, 2012, 1, 1, 18, 2, 7, 0),
(6, 18, 1, 4, 2, 1, 1, 2012, 1, 1, 18, 3, 3, 0),
(7, 18, 1, 4, 2, 1, 1, 2012, 1, 1, 18, 3, 4, 0),
(8, 18, 2, 15, 3, 2, 1, 2012, 1, 1, 18, 5, 3, 0),
(9, 18, 2, 15, 3, 2, 1, 2012, 1, 1, 18, 5, 4, 0),
(10, 18, 2, 15, 3, 2, 1, 2011, 1, 1, 18, 5, 4, 0),
(11, 18, 2, 15, 3, 2, 1, 2012, 2, 1, 18, 5, 4, 0),
(12, 4, 4, 2, 11, 4, 2, 2012, 1, 1, 16, 3, 2, 0);

-- --------------------------------------------------------

--
-- 表的结构 `seat`
--

CREATE TABLE IF NOT EXISTS `seat` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `studentid` int(8) NOT NULL,
  `scheduleid` int(8) NOT NULL,
  `seatx` int(3) DEFAULT NULL,
  `seaty` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `seat`
--

INSERT INTO `seat` (`id`, `studentid`, `scheduleid`, `seatx`, `seaty`) VALUES
(1, 1, 2, 3, 4),
(2, 1, 1, 5, 4);

-- --------------------------------------------------------

--
-- 表的结构 `student`
--

CREATE TABLE IF NOT EXISTS `student` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `number` varchar(12) NOT NULL,
  `password` varchar(32) NOT NULL,
  `sex` int(1) NOT NULL DEFAULT '0',
  `image` varchar(15) DEFAULT NULL,
  `classid` int(6) DEFAULT NULL,
  `familyid` int(4) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `guardername` varchar(20) DEFAULT NULL,
  `guarderemail` varchar(50) DEFAULT NULL,
  `guarderphone` varchar(13) DEFAULT NULL,
  `guarderrelation` varchar(20) DEFAULT NULL,
  `sinaweibo` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=86 ;

--
-- 转存表中的数据 `student`
--

INSERT INTO `student` (`id`, `name`, `number`, `password`, `sex`, `image`, `classid`, `familyid`, `address`, `email`, `phone`, `guardername`, `guarderemail`, `guarderphone`, `guarderrelation`, `sinaweibo`) VALUES
(1, 'eric', '091402116', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 1, 1, '广州', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', '自己', '1791230922'),
(2, '55eric', '091402117', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(3, 'eric', '091402118', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(4, 'eric', '091402119', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 4, 2, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(5, 'eric', '091402120', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(6, 'eric', '091402121', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 3, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(7, 'eric', '091402122', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(8, 'eric', '091402123', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(9, 'eric', '091402124', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(10, 'eric', '091402125', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 3, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(11, 'eric', '091402126', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 3, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(12, 'eric', '091402127', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 3, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(13, 'eric', '091402128', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 3, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(14, 'eric', '091402129', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(15, 'eric', '091402130', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 2, 1, 'guangzhou', '361789273@qq.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(16, 'eric', '091402131', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(17, 'eric', '091402132', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(18, 'eric', '091402133', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(19, 'eric', '091402134', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 2, 1, 'guangzhou', '361789273@qq.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(20, 'eric', '091402135', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(21, 'eric', '091402136', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(22, 'eric', '091402137', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(23, 'eric', '091402138', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 2, 1, 'guangzhou', '361789273@qq.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(24, 'eric', '091402139', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 3, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(25, 'eric', '091402140', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(26, 'eric', '091402141', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(27, 'eric', '091402142', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 2, 1, 'guangzhou', '361789273@qq.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(28, 'eric', '091402143', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 4, 2, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(29, 'eric', '091402144', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(30, 'eric', '091402145', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(31, 'eric', '091402146', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(32, 'eric', '091402147', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(33, 'eric', '091401101', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(34, 'eric', '091401102', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(35, 'eric', '091401103', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(36, 'eric', '091401104', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(37, 'eric', '091401105', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(38, 'eric', '091401106', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(39, 'eric', '091401107', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(40, 'eric', '091401108', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(41, 'eric', '091401109', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(42, 'eric', '091401110', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(43, 'eric', '091401111', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(44, 'eric', '091401112', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(45, 'eric', '091401113', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(46, 'eric', '091401114', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(47, 'eric', '091401115', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(48, 'eric', '091401116', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(49, 'eric', '091401117', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(50, 'eric', '091401118', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(51, 'eric', '091401119', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(52, 'eric', '091401120', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(53, 'eric', '091401121', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(54, 'eric', '091401122', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(55, 'eric', '091401123', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(56, 'eric', '091401124', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(57, 'eric', '091401125', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(58, 'eric', '091401126', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(59, 'eric', '091401127', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(60, 'eric', '091401128', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(61, 'eric', '091401129', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(62, 'eric', '091401130', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(63, 'eric', '091401131', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(64, 'eric', '091401132', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(65, 'eric', '091401133', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(66, 'eric', '091401134', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(67, 'eric', '091401135', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(68, 'eric', '091401136', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(69, 'eric', '091401137', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(70, 'eric', '091401138', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(71, 'eric', '091401139', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(72, 'eric', '091401140', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(73, 'eric', '091401141', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(74, 'eric', '091401142', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(75, 'eric', '091401143', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(76, 'eric', '091401144', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(77, 'eric', '101402116', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(78, 'eric', '101402117', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(79, 'eric', '101402118', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(80, 'eric', '101402119', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(81, 'eric', '101402120', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(82, 'eric', '101402121', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(83, 'eric', '101402122', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(84, 'eric', '101402123', '29988429c481f219b8c5ba8c071440e1', 0, '091402116', 1, 1, 'guangzhou', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', 'myself', NULL),
(85, 'blue', '110401310', '29988429c481f219b8c5ba8c071440e1', 1, '091402116', 6, 6, '广州', 'lowkey361@gmail.com', '13790766810', 'erics father', 'aaaa@qq.com', '18825556695', '自己', '1791230922');

-- --------------------------------------------------------

--
-- 表的结构 `subject`
--

CREATE TABLE IF NOT EXISTS `subject` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `familyid` int(6) NOT NULL,
  `grade` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- 转存表中的数据 `subject`
--

INSERT INTO `subject` (`id`, `name`, `familyid`, `grade`) VALUES
(1, '计算机导论', 1, '2'),
(2, '操作系统', 1, '2'),
(3, '算法分析', 1, '2'),
(4, '大学英语1', 14, '2'),
(5, '大学英语2', 14, '2'),
(6, '公共体育1', 13, '2'),
(7, '大学英语3', 14, '2'),
(8, '大学英语4', 14, '2'),
(9, '公共体育2', 13, '2'),
(10, '公共体育3', 13, '2'),
(11, '公共体育4', 13, '2'),
(12, '毛泽东思想概论', 16, '6'),
(13, '思想道德与修养', 6, '3'),
(14, '高等数学1', 12, '3'),
(15, '高等数学2', 12, '3'),
(16, '线性代数', 12, '2'),
(17, '离散数学', 1, '2'),
(18, 'Java程序设计', 1, '2');

-- --------------------------------------------------------

--
-- 表的结构 `teacher`
--

CREATE TABLE IF NOT EXISTS `teacher` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `number` varchar(12) NOT NULL,
  `password` varchar(32) NOT NULL,
  `departid` int(4) NOT NULL,
  `position` varchar(20) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(15) NOT NULL,
  `nation` varchar(30) NOT NULL,
  `polite` varchar(30) NOT NULL,
  `sex` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

--
-- 转存表中的数据 `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `number`, `password`, `departid`, `position`, `phone`, `email`, `image`, `nation`, `polite`, `sex`) VALUES
(1, 'Eric', '144200', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '1379076681', 'lowkey361@gmail.com', '091402116', '朝鲜族', '中共党员', 0),
(2, 'Eric1', '144201', '29988429c481f219b8c5ba8c071440e1', 2, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '中共党员', 0),
(3, '彭刚', '144202', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无党派', 0),
(4, '杨雄', '144203', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无党派', 0),
(5, '张琉球', '144204', '4a6881130f9b2deee7532f7c52e700e0', 6, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无党派', 0),
(6, '季军杰', '144205', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '共产党', 0),
(7, '赵义霞', '144206', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无党派', 1),
(8, '刘宇芳', '144207', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无党派', 1),
(9, '徐涛', '144208', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '共产党', 0),
(10, '黄震', '144209', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '共产党', 0),
(11, '高蕾', '144210', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '共产党', 1),
(12, '兰远东', '144211', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '共产党', 0),
(13, '曾科翰', '144212', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '共产党', 0),
(14, '刘利', '144213', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无', 0),
(15, '曾少宁', '144214', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无', 0),
(16, '肖锦辉', '144215', '4a6881130f9b2deee7532f7c52e700e0', 1, '教授', '13790766810', 'lowkey361@gmail.com', '091402116', '汉族', '无', 0);

-- --------------------------------------------------------

--
-- 表的结构 `weibo`
--

CREATE TABLE IF NOT EXISTS `weibo` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `studentid` int(8) NOT NULL,
  `ispublish` int(2) NOT NULL DEFAULT '0',
  `isvolient` int(1) NOT NULL DEFAULT '0',
  `isdefine` int(1) NOT NULL DEFAULT '0',
  `timestamp` int(11) DEFAULT '0',
  `type` int(2) NOT NULL DEFAULT '0',
  `content` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `weibo`
--

INSERT INTO `weibo` (`id`, `studentid`, `ispublish`, `isvolient`, `isdefine`, `timestamp`, `type`, `content`) VALUES
(1, 1, 1, 0, 0, 1366128000, 0, 'ORG~~~我居然人品大爆发，起床完了。。不甘堕落啊~~~');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
