-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: pharmacydb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medicines`
--

DROP TABLE IF EXISTS `medicines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medicines` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `quantity_per_unit` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit_price` decimal(8,2) NOT NULL,
  `unit_in_stock` int NOT NULL DEFAULT '0',
  `discontinued` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `medicines_category_id_foreign` (`category_id`),
  CONSTRAINT `medicines_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
/*!40000 ALTER TABLE `medicines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2022_10_25_101000_create_categories_table',1),(6,'2022_10_25_101009_create_medicines_table',1),(7,'2022_10_25_105112_create_orders_table',2),(8,'2022_10_25_105442_create_order_details_table',2),(9,'2022_10_25_110820_alter_users_table',3),(10,'2022_10_25_112852_alter_users_table',4);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `medicine_id` bigint unsigned NOT NULL,
  `unit_price` decimal(8,2) NOT NULL,
  `quantity` int unsigned NOT NULL,
  `discount` double(8,2) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_details_order_id_foreign` (`order_id`),
  KEY `order_details_medicine_id_foreign` (`medicine_id`),
  CONSTRAINT `order_details_medicine_id_foreign` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`),
  CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `order_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role` enum('ADMIN','EMPLOYEE') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EMPLOYEE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (21,'quoc2400','$2y$10$hlFBIpEOA4UFS5CB1D/Yeu0N/yGIWMgwpamQGH0KMoJVA5R7pggme','quoc','duong','2022-10-26','019191212','EMPLOYEE','2022-10-25 04:31:53','2022-10-26 03:53:06','nciJ9n30Bz'),(22,'qhudson','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Mariah','Carroll','1991-10-09','+19157846251','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','pUPDAiT28v'),(23,'anastasia.doyle','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Laurine','Leffler','1999-03-13','(551) 687-6474','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','Cze63ty6X2'),(24,'opal83','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Scottie','Turcotte','2017-11-14','(680) 519-4967','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','PIs463aou5'),(25,'esteuber','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Maximillian','Bechtelar','2003-06-06','+1 (623) 598-3061','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','xDaom131ge'),(26,'jody.nicolas','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Ross','Beahan','2018-02-19','614.783.6496','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','05h5JWqUYt'),(27,'lesch.antonina','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Makenzie','Krajcik','1978-12-08','+1 (323) 205-6964','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','vpILufly0d'),(28,'alysson.harvey','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Odell','Sawayn','2009-02-20','1-906-721-2269','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','a6efu4Qvdm'),(29,'christ.jakubowski','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Arthur','Robel','2006-02-04','1-239-299-5260','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','JbmSIeM1tC'),(31,'fbauch','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Bennie','Mueller','2004-10-20','+1-602-367-7137','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','M12c1giQQg'),(32,'isac.koss','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Randi','Huels','2009-03-25','(820) 213-8416','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','0Y5DNguzpC'),(33,'garrett.crooks','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Eugenia','Mosciski','2016-04-09','+17576998384','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','p9sjD9mYK2'),(34,'roob.bernhard','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Deshawn','Osinski','1996-08-01','475-588-5785','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','mJRs6m1IhE'),(35,'amalia.schinner','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Deonte','Haley','1982-04-09','+1 (432) 356-5261','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','UHi2pQt9jf'),(36,'legros.xander','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Kayley','Douglas','2002-07-18','+1.435.973.7928','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','fcIGQq0wPg'),(37,'talon98','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Lawrence','Bailey','1993-01-06','+1-682-991-5117','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','WUkQzfiqND'),(38,'adeline.walsh','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Edwina','O\'Reilly','2022-07-10','757.907.0988','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','x0h2tmuHl4'),(39,'mconnelly','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Kory','Huels','1982-07-06','+1-820-225-8454','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','oxg9bRCH4G'),(40,'aryanna.mohr','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Alice','Wintheiser','1982-06-23','+1-458-749-0966','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53','63E1g4e3dh'),(41,'grant.herminia','123123','Onie','Pouros','1995-04-19','1-251-883-0063','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','DwH3TnlwEA'),(42,'rickie.goldner','123123','Tessie','Larkin','1975-05-31','781-294-5451','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','w9nzCVBUrD'),(43,'jettie.purdy','123123','Antone','Schaden','1988-06-14','586.984.1591','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','kmxqheGrxP'),(44,'rolfson.rubye','123123','Monique','Schaefer','2016-07-17','+1-380-968-5441','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','IYzpw9F3OQ'),(45,'williamson.rogers','123123','Karli','Daugherty','1974-07-16','276-824-1838','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','S0xeU7PEMQ'),(46,'aliya89','123123','River','Ziemann','1994-10-04','678.349.8251','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','QnizuWJHT5'),(47,'greenfelder.misael','123123','Lea','Ortiz','1977-05-14','1-341-332-4120','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','4rNZeKRABn'),(48,'welch.lelah','123123','Concepcion','Haley','1990-11-09','+1 (979) 804-2829','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','j9jJrhpNOS'),(49,'kohler.harmony','123123','Anthony','Grant','1976-07-14','941.665.6291','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','xP57Pim7HX'),(50,'jadon.kuphal','123123','Margret','McDermott','2017-08-03','1-762-798-7317','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','sK1ye7Atmu'),(51,'fletcher.heathcote','123123','Stephon','Kertzmann','1979-10-22','+1 (657) 358-2432','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','ec2PTmhcPY'),(52,'alyson23','123123','August','Hand','2011-05-12','(949) 235-7774','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','7TldgGkpqK'),(53,'mohammed43','123123','Randy','Kirlin','2000-04-28','+1-805-985-9101','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','VZ2PNqSZaq'),(54,'lavon.ziemann','123123','Joesph','Oberbrunner','2018-07-22','937-490-4786','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','gi0gddwbRa'),(55,'lew.runte','123123','Reginald','Hand','2007-04-23','(351) 780-0577','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','7YGppUMuqB'),(56,'hudson.earline','123123','Theodora','Heller','2007-11-20','+1-323-639-8002','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','Gx0hEMTc1P'),(57,'ybeatty','123123','Scottie','Ledner','1995-04-12','+1 (504) 895-9528','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','35NPSh3qrq'),(58,'pagac.enid','123123','Johathan','Konopelski','2021-05-30','530-427-7495','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','qqcSsKGQt1'),(59,'casimir.rodriguez','123123','Rachel','Rowe','1996-01-20','(458) 326-9339','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','D2U3e6oda7'),(60,'ottilie.turcotte','123123','Emiliano','Gutmann','2019-06-25','+13128884372','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10','wxDsjk4aO5'),(61,'quoc2401','123456','quoc','duong','2022-10-26','1231230123','ADMIN','2022-10-26 02:23:26','2022-10-26 02:23:26',NULL),(67,'quoc2402','123456','quoc','duong','2022-10-26','1231230122','EMPLOYEE','2022-10-26 02:29:32','2022-10-26 02:29:32',NULL),(69,'quoc2403','123456','quoc','duong','2022-10-26','12312301225','EMPLOYEE','2022-10-26 02:29:45','2022-10-26 02:29:45',NULL),(70,'quoc2404','123456','quoc','duong','2022-10-26','123123012','EMPLOYEE','2022-10-26 02:33:58','2022-10-26 02:33:58',NULL);
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

-- Dump completed on 2022-10-26 17:54:31
