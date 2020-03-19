-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: localhost    Database: seeds_trader_database
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` bigint(20) NOT NULL,
  `balance` float DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (141,-79000,1583945432081,'محمد مشتري','234234234234','مشتري'),(142,-899000,1583945446931,'محمد مورد','1312312312312','مورد'),(146,46000,1583946144928,'محمد مشتري 2','545353564','مشتري'),(153,-9000,1583946625626,'محمد مورد 2','0123123424','مورد'),(160,-50000,1583947262410,'سيد مورد','0123123424','مورد'),(167,0,1583947852008,'مورد جديد','10121204320430430','مورد');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (174),(174),(174),(174);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) NOT NULL,
  `buying_price` float DEFAULT NULL,
  `client_balance` float DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `client_phone` varchar(255) DEFAULT NULL,
  `date` bigint(20) DEFAULT NULL,
  `dofaat_sadera` float DEFAULT NULL,
  `dofaat_wareda` float DEFAULT NULL,
  `haraka` varchar(255) DEFAULT NULL,
  `khasm_moktsb` float DEFAULT NULL,
  `mortgaa` float DEFAULT NULL,
  `moshtryat` float DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `seed_id` bigint(20) DEFAULT NULL,
  `seed_name` varchar(255) DEFAULT NULL,
  `selling_price` float DEFAULT NULL,
  `tahdeen` float DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `unit_price` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (144,900,-89000,141,'محمد مشتري','234234234234',1583945689012,0,90000,'',0,0,0,100,143,'بذرة 1',1000,0,'شراء','كيلو','',900),(145,900,-79000,141,'محمد مشتري','234234234234',1583946123047,0,0,'',0,0,10000,10,143,'بذرة 1',1000,0,'بيع','كيلو','',1000),(147,900,11000,146,'محمد مشتري 2','545353564',1583946255892,0,0,'',0,0,10000,10,143,'بذرة 1',1000,0,'بيع','كيلو','',1000),(148,100,1000,146,'محمد مشتري 2','545353564',1583946336768,0,10000,'',0,0,0,100,143,'بذرة 1',1000,0,'شراء','كيلو','',100),(150,0,-4000,146,'محمد مشتري 2','545353564',1583946414540,5000,0,'',0,0,0,0,149,'غير محدد',0,0,'غير محدد','غير محدد','',NULL),(151,900,46000,146,'محمد مشتري 2','545353564',1583946453104,0,0,'',0,0,50000,50,143,'بذرة 1',1000,0,'بيع','كيلو','',1000),(152,900,-899000,142,'محمد مورد','1312312312312',1583946554515,0,0,'',0,0,900000,1000,143,'بذرة 1',1000,0,'شراء','كيلو','',900),(154,900,-901000,153,'محمد مورد 2','0123123424',1583946653567,0,0,'',0,0,900000,1000,143,'بذرة 1',1000,0,'شراء','كيلو','',900),(156,900,-1000,153,'محمد مورد 2','0123123424',1583946935565,900000,0,'',0,0,0,1000,143,'بذرة 1',900,0,'بيع','كيلو','',900),(157,1000,-16000,153,'محمد مورد 2','0123123424',1583947016359,5000,0,'',0,0,10000,10,143,'بذرة 1',1000,0,'شراء','كيلو','',1000),(158,1000,-12000,153,'محمد مورد 2','0123123424',1583947176446,6000,0,'',0,0,10000,10,143,'بذرة 1',1000,0,'شراء','كيلو','',1000),(159,900,-9000,153,'محمد مورد 2','0123123424',1583947204013,6000,0,'',0,0,9000,10,143,'بذرة 1',1000,0,'شراء','كيلو','',900),(162,900,89000,161,'سيد مورد','0123123424',1583947315533,0,0,'',0,0,90000,100,143,'بذرة 1',1000,0,'شراء','كيلو','',900),(163,900,-91000,160,'سيد مورد','0123123424',1583947408143,0,0,'',0,0,90000,100,143,'بذرة 1',1000,0,'شراء','كيلو','',900),(164,0,-142000,160,'سيد مورد','0123123424',1583947452273,51000,0,'د�?ع',0,0,0,0,149,'غير محدد',0,0,'غير محدد','غير محدد','',NULL),(165,0,-100000,160,'سيد مورد','0123123424',1583947576385,42000,0,'د�?ع',0,0,0,0,149,'غير محدد',0,0,'غير محدد','غير محدد','',NULL),(166,900,-50000,160,'سيد مورد','0123123424',1583947616914,50000,0,'',0,0,0,50,143,'بذرة 1',1000,0,'بيع','كيلو','',1000),(168,1000,-1005000,167,'مورد جديد','10121204320430430',1583947886671,0,0,'',0,0,1000000,1000,143,'بذرة 1',1000,0,'شراء','كيلو','',1000),(169,900,-505000,167,'مورد جديد','10121204320430430',1583947924829,500000,0,'',0,0,0,500,143,'بذرة 1',1000,0,'بيع','كيلو','',1000),(170,0,-455000,167,'مورد جديد','10121204320430430',1583947947574,50000,0,'د�?ع',0,0,0,0,149,'غير محدد',0,0,'غير محدد','غير محدد','',NULL),(171,0,-5000,167,'مورد جديد','10121204320430430',1583948000401,450000,0,'كمالة الد�?ع السابق',0,0,0,0,149,'غير محدد',0,0,'غير محدد','غير محدد','',NULL),(172,900,5000,167,'مورد جديد','10121204320430430',1583948056249,10000,0,'',0,0,0,10,143,'بذرة 1',1000,0,'بيع','كيلو','',1000),(173,0,0,167,'مورد جديد','10121204320430430',1583948090596,0,5000,'استلام',0,0,0,0,149,'غير محدد',0,0,'غير محدد','غير محدد','',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seeds`
--

DROP TABLE IF EXISTS `seeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seeds` (
  `id` bigint(20) NOT NULL,
  `buying_price` float DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `quantity` float DEFAULT NULL,
  `selling_price` float DEFAULT NULL,
  `sold_quantity` float DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `bought_quantity` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seeds`
--

LOCK TABLES `seeds` WRITE;
/*!40000 ALTER TABLE `seeds` DISABLE KEYS */;
INSERT INTO `seeds` VALUES (143,900,'بذرة 1',800,1000,2630,'كيلو',3430),(149,0,'غير محدد',0,0,0,'غير محدد',0);
/*!40000 ALTER TABLE `seeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ahmed abdulhakim','2020-02-09 15:26:05','5678','01286599883','عبد العزيز');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-11 21:21:42
