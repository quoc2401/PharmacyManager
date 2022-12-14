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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Treatment (Thuoc chua benh)','Has the effect of curing the cause or symptom of a particular disease'),(2,'Preventive (Thuoc phong ngua benh)','Effective in preventing future diseases'),(3,'Support treatment (Thuoc ho tro chua benh)','There is no direct curative effect but has the effect of increasing, supporting or overcoming the side effects of the treatment drug to achieve greater effectiveness'),(4,'Supplements (Thuc pham bo sung)','Provides vitamins and amino acids ...'),(5,'Equipment (Vat tu y te)','Tools, etc. used to diagnose, monitor, prevent and treat in order to minimize damage, injury or illness. Examines, replaces, corrects or supports anatomy and physiological processes');
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
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `unit_price` decimal(20,0) NOT NULL,
  `unit_in_stock` int NOT NULL DEFAULT '0',
  `discontinued` tinyint NOT NULL DEFAULT '1',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `describe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uses` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `trademark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `medicines_category_id_foreign` (`category_id`),
  CONSTRAINT `medicines_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (2,'Agilodin 10g',1,350000,20,1,'http://localhost:8000/images/3GL0ipBX4ofuwDrEQG1qZYwpRHiaHgA63h9F8O4Irb2saTmSYN.jpg','H???p 10 v??? x 10 vi??n','??i???u tr??? vi??m m??i d??? ???ng, vi??m k???t m???c d??? ???ng, ng???a v?? m??y ??ay li??n quan ?????n histamin','Agimexpharme'),(3,'Allerphast',1,17000,0,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17627_1_l.webp','H???p 1 v??? x 10 vi??n','??i???u tr??? tri???u ch???ng trong vi??m m??i d??? ???ng theo m??a, m??y ??ay m???n t??nh v?? c??n ??? ng?????i l???n v?? tr??? em tr??n 6 tu???i','Mebiphar'),(4,'Bilodin 10mg',1,38000,100,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P11609_1_l.webp','H???p 10 v??? x 10 vi??n','??i???u tr??? vi??m m??i d??? ???ng, k???t m???c d??? ???ng, ng???a v?? m??y ??ay li??n quan ?????n histamin','Bidiphar'),(5,'Bostanex',1,60000,0,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P13206_1_l.webp','H???p 3 v??? x 10 vi??n','Gi???m tri???u ch???ng vi??m m??i d??? ???ng, n???i m??y ??ay','Boston'),(6,'Cetirizin 10mg',1,69000,10,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P02832_1_l.webp','H???p 10 v??? x 10 vi??n','??i???u tr??? ch???ng vi??m m??i d??? ???ng dai d???ng, vi??m m??i d??? ???ng theo m??a, m??y ??ay m???n t??nh v?? c??n; vi??m k???t m???c d??? ???ng','Vidipha'),(7,'Amcinol-Paste',1,10000,200,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P19886_1_l.webp','Tu??p 5g','??i???u tr??? c??c b???nh ngo??i da ????p ???ng v???i steroid v?? c??c ch???ng vi??m ??au ??? mi???ng, l???i v?? m??i.','C??ng ty C??? ph???n Ho?? - D?????c ph???m Mekophar'),(8,'Loxfen 60mg',2,150000,20,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14830_1_l.webp','H???p 10 V??? x 10 Vi??n','Gi???m ??au v?? kh??ng vi??m','??ng Ty TNHH D?????c Ph???m Kovina (Vi???t Nam)'),(9,'Philcotam 250mg',3,332000,30,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16122_1_l.webp','H???p 10 v??? x 10 vi??n','??i???u tr??? vi??m kh???p d???ng th???p, tho??i h??a x????ng kh???p, vi??m c???t s???ng kh???p d??nh, ...','Phil Inter Pharma'),(10,'Nhi???t Mi???ng Nh???t Nh???t',2,95000,500,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P05441_1_l.webp','H???p 2 v??? x 10 vi??n','Thanh nhi???t, gi???i ?????c, ch???ng vi??m, ti??u s??ng','Nh???t Nh???t'),(11,'Pro Avalo',2,25000,150,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P18119_1.jpg','H???p 1 v??? x 28 vi??n','Thu???c tr??nh thai ','C??ng ty C??? ph???n sinh h???c D?????c ph???m Ba ????nh (Vi???t Nam)'),(12,'Regulon',2,180000,20,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P00122_1_l.webp','H???p 3 v??? x 21 vi??n','Thu???c tr??nh thai h???ng ng??y cho ph??? n???','Gedeon Richter'),(13,'Newlevo 0.03mg',2,5500,24,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P01356_1.jpg','1 v??? x 28 vi??n','Thu???c u???ng tr??nh thai','Ba Dinh Pharma'),(14,'Acetylcystein 200 Imexpharm',1,147000,100,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17315_1_l.webp','10 vi?? x 10 vi??n','??i???u tr??? c??c b???nh l?? ???????ng h?? h???p c?? ?????m nh???y qu??nh nh?? vi??m ph??? qu???n c???p v?? m???n','Imexpharm'),(15,'Agi-Bromhexine 4mg',1,18000,50,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14796_1_l.webp','3 v??? x 10 vi??n/h???p','??i???u tr??? r???i lo???n ti???t d???ch ph??? qu???n, nh???t l?? trong vi??m ph??? qu???n c???p t??nh, ?????t c???p t??nh c???a vi??m ph??? qu???n m???n t??nh....','Agimexpharm '),(16,'Siro Ambroxol 15mg/5ml',1,30000,2000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14742_1_l.webp','Chai 60ml','??i???u tr??? c??c r???i lo???n v??? s??? b??i ti???t ??? ph??? qu???n','Danaphar ??(Vi???t Nam)'),(17,'Becacold-E',1,95000,100,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P18113_1_l.webp','H???p 5 v??? x 20 vi??n','??i???u tr??? c??c tri???u ch???ng c???m th??ng th?????ng, vi??m m??i d??? ???ng, vi??m m??i v???n m???ch, vi??m m??ng nh???y xu???t ti???t do c??m v?? c??c r???i lo???n c???a ???????ng h?? h???p tr??n','ENLIE'),(18,'Befabrol B???n Tre',1,16000,5,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17123_1.jpg','Chai 30ml','??i???u tr??? c??c b???nh c???p v?? m???n t??nh ??? ???????ng h?? h???p...','C??ng ty c??? ph???n d?????c ph???m B???n Tre'),(19,'Alcool 70 ?????',5,48000,200,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16923_1_l.webp','Chai 1000ml','S??t tr??ng ngo??i da','Chi nh??nh C??ng ty C??? ph???n D?????c ph???m OPC t???i B??nh D????ng - Nh?? m??y D?????c ph???m OPC (Vi???t Nam)'),(20,'Alcool 90 OPC',5,60000,100,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16922_1_l.webp','Chai 1000ml','S??t tr??ng ngo??i da, v???t d???ng, ?????t ti???t tr??ng d???ng c??? b???ng kim lo???i','OPC'),(21,'Betadine Antiseptic Solution 10%',3,19000,10,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P03073_1_l.webp','H???p 1 chai x 15ml','D??ng ????? di???t m???m b???nh ??? da, v???t th????ng v?? ni??m m???c, s??t khu???n da v?? ni??m m???c tr?????c khi m???, d??? ph??ng nhi???m khu???n khi b???ng, v???t r??ch n??t, v???t m??i m??n,....','Mundipharma'),(22,'Calamine Leopard Brand',1,42000,0,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P15845_1_l.webp','Chai 60ml','??i???u tr??? d??? ???ng, ng???a, m???n ?????, mu???i ?????t hay c??n tr??ng ?????t, l??m d???u m??t da, tr??? r??m s???y, ng???a do ch??m','Leopard'),(23,'Bisbeta 120',3,378000,10,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P15863_1_l.webp','H???p 2 v??? x 21 vi??n','Gi???m calo h??? tr??? tr??? b??o ph??, th???a c??n','S.P.M'),(24,'Odistad 120mg',3,420000,15,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14147_1_l.webp','H???p 2 v??? x 21 vi??n','H??? tr??? ??i???u tr??? cho b???nh nh??n th???a c??n...','Stella (Vi???t Nam)'),(25,'Kh???u trang Jomi N95 4D',5,25000,1000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P21744_1.jpg','G??i 5 C??i','Kh???u trang Jomi N95 4D v???i 03 l???p v???i kh??ng d???t v?? m??ng l???c Mellblow gi??p l???c kh??ng kh?? ?? nhi???m, b???i PM2.5, ng??n 99% vi khu???n, virus. Ngo??i ra, s???n ph???m c??n gi??p che n???ng ng??n tia UV v???i UPF 40.','Jomi'),(26,'Kh???u trang ch???ng ?? nhi???m Airphin PM2.5 FFP2 Pollution Fighter',5,36000,1000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16698_1.jpg','c??? L','Van tho??t kh??. Kh??ng m??? k??nh.','Airphin'),(27,'Kh???u trang y t??? Famapro Plus',5,5000,1000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P19025_1_l.webp','G??i 5 c??i','Kh???u trang y t??? Famapro Plus v???i 3 l???p kh??ng khu???n c?? kh??? n??ng l???c b???i, l???c khu???n t???i ??u ?????t ti??u chu???n ISO 13485:2016.','Famapro Plus'),(28,'Th???c ph???m b???o v??? s???c kho??? b???o v??? s???c kho??? h??? tr??? ti??u ho?? AB Junior Pre & Pro',3,130000,50,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23358_3.jpg','H???p 10 g??i','L??m gi???m c??c tri???u ch???ng r???i lo???n ti??u h??a do d??ng kh??ng sinh d??i ng??y ho???c lo???n khu???n ???????ng ti??u h??a g??y ra c??c tri???u ch???ng t??o b??n, ?????y h??i, kh?? ti??u, ph??n s???ng','AB Junior'),(29,'[IMC] Th???c ph???m b???o v??? s???c kh???e B??nh v??? Th??i Minh',3,163000,20,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P19531_1_l.webp','H???p 20 vi??n','[IMC] Th???c ph???m b???o v??? s???c kh???e B??nh v??? Th??i Minh gi??p h??? tr??? gi???m acid d???ch v???, gi??p b???o v??? ni??m m???c d??? d??y, h??? tr??? c???i thi???n v?? gi???m thi???u c??c bi???u hi???n c???a vi??m lo??t d??? d??y','IMC'),(30,'Chi?? Kha??t V????ng',4,142500,10,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23583_1_l.jpg','H????p 3 vi?? x 10 vi??n','Th???c ph???m b???o v??? s???c kh???e Chi?? Kha??t V????ng h??? tr??? c???i thi???n ch??? s??? ???????ng huy???t, gi???m nguy c?? bi???n ch???ng do ti???u ???????ng','Chi?? Kha??t V????ng'),(31,'H??? tr??? t??ng c?????ng ????? kh??ng Costar Garlic Oil',4,194000,20,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P24263_1.jpg','L??? 60 vi??n','Th???c ph???m b???o v??? s???c kh???e tinh d???u t???i h??? tr??? t??ng c?????ng ????? kh??ng Costar Garlic Oil gi??p t??ng c?????ng s???c ????? kh??ng. H??? tr??? gi???m c??c tri???u ch???ng c???m c??m th??ng th?????ng','Garlic Oil'),(46,'thuoc a',1,10000,10,0,'http://localhost:8000/images/0yCQKHVWvq.jpg','1x 2 hop','chua benh x','Cong ty A'),(47,'thuoc b',1,10000,10,0,'http://localhost:8000/images/EgIPn0aWW4.jpg','1x 2 hop','chua benh y','Cong ty B'),(48,'thuoc b',1,10000,10,0,'http://localhost:8000/images/sGC2UkVv94.jpg','1x 2 hop','chua benh y','Cong ty B'),(49,'thuoc b',1,10000,10,0,'http://localhost:8000/images/ZycmWnFpVL.jpg','1x 2 hop','chua benh y','Cong ty B'),(50,'thuoc b',1,10000,10,0,'http://localhost:8000/images/6HRaaGFeTdZHDOABIxrnIgby956pHrLoYFB47M0nzbKOTASDab.jpg','1x 2 hop','chua benh y','Cong ty B'),(51,'thuoc c',1,100000,10,0,'http://localhost:8000/images/adEMUScjA43LktkV8DMGhxe3NKW2yu45RpU5SPxb8dHlYeKh9O.jpg','1x 2 hop','chua benh y','Cong ty B'),(52,'thuoc d',1,10000,10,1,'http://localhost:8000/images/ppujy2GeKVXIi47o8BY96dV1nEgEmjVgpGlG6v7FX7HEXoSD9S.jpg','1x 2 hop','chua benh x','Cong ty D'),(53,'thuoc aa',1,10000,10,0,'http://localhost:8000/images/7DiaeQtTfaRuJBYKZccfRyYJRe4PQqYYQKwxuMGo2KbyHdLSiv.jpg','1x 2 hop','chua benh x','Cong ty D'),(54,'thuoc a1',2,10000,10,0,'http://localhost:8000/images/jxbaO8WvIzMBVczRe5QYSKj2u7683KNtg26A9txL9H4pA6ucJY.jpg','1x 2 hop','chua benh x','Cong ty B'),(55,'thuoc aq',1,10000,10,0,'http://localhost:8000/images/VlEe7UvIE2j8XPt8VKe43UxNfRcdwhmBwYoae7GWPWooOBrgbn.jpg','1x 2 hop','chua benh x','Cong ty D'),(56,'thuoc aqw',1,10000,10,0,'http://localhost:8000/images/luOZAeiI8BjSU596WXtGNRP1sjkbH7EQvi2BrqJ78caX3kCgdq.jpg','1x 2 hop','chua benh x','Cong ty D'),(57,'thuoc a11',1,10000,10,0,'http://localhost:8000/images/FS7imGkzhcAUHqY0b85ct75JZJzg5S4O4udmAUo8ujqLuMp9Sb.jpg','1x 2 hop','chua benh y','Cong ty A'),(58,'thuoc a112',1,10000,10,0,'http://localhost:8000/images/w0Sk0eEGM4m0Lh9K1E86HJlrLQonFg7id8AAhiVrDkxCyxc4Lr.jpg','1x 2 hop','chua benh y','Cong ty A');
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
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2022_10_25_101000_create_categories_table',1),(6,'2022_10_25_101009_create_medicines_table',1),(7,'2022_10_25_105112_create_orders_table',2),(8,'2022_10_25_105442_create_order_details_table',2),(9,'2022_10_25_110820_alter_users_table',3),(10,'2022_10_25_112852_alter_users_table',4),(11,'2022_10_31_021946_alter_medicines_table',5);
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
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role` enum('ADMIN','EMPLOYEE') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EMPLOYEE',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
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
INSERT INTO `users` VALUES (1,'congsang','$2a$04$x29vGbspT6IV5NobhDMemOJExF2BTtlHvi2bEmcFQ8b6VgmEkNRT2','Sang','Cong','2001-08-15','123456789','EMPLOYEE','2022-10-26 02:33:58','2022-10-26 02:33:58'),(2,'admin1','$2a$04$x29vGbspT6IV5NobhDMemOJExF2BTtlHvi2bEmcFQ8b6VgmEkNRT2','Sang','Cong','2001-08-15','123456788','ADMIN','2022-10-26 02:33:58','2022-10-26 02:33:58'),(3,'quoc2400','$2a$04$x29vGbspT6IV5NobhDMemOJExF2BTtlHvi2bEmcFQ8b6VgmEkNRT2','quoc','duong','2022-10-26','019191212','EMPLOYEE','2022-10-25 04:31:53','2022-10-26 03:53:06'),(22,'qhudson','$2a$04$x29vGbspT6IV5NobhDMemOJExF2BTtlHvi2bEmcFQ8b6VgmEkNRT2','Mariah','Carroll','1991-10-09','+19157846251','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(23,'anastasia.doyle','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Laurine','Leffler','1999-03-13','(551) 687-6474','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(24,'opal83','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Scottie','Turcotte','2017-11-14','(680) 519-4967','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(25,'esteuber','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Maximillian','Bechtelar','2003-06-06','+1 (623) 598-3061','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(26,'jody.nicolas','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Ross','Beahan','2018-02-19','614.783.6496','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(27,'lesch.antonina','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Makenzie','Krajcik','1978-12-08','+1 (323) 205-6964','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(28,'alysson.harvey','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Odell','Sawayn','2009-02-20','1-906-721-2269','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(29,'christ.jakubowski','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Arthur','Robel','2006-02-04','1-239-299-5260','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(31,'fbauch','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Bennie','Mueller','2004-10-20','+1-602-367-7137','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(32,'isac.koss','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Randi','Huels','2009-03-25','(820) 213-8416','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(33,'garrett.crooks','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Eugenia','Mosciski','2016-04-09','+17576998384','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(34,'roob.bernhard','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Deshawn','Osinski','1996-08-01','475-588-5785','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(35,'amalia.schinner','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Deonte','Haley','1982-04-09','+1 (432) 356-5261','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(36,'legros.xander','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Kayley','Douglas','2002-07-18','+1.435.973.7928','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(37,'talon98','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Lawrence','Bailey','1993-01-06','+1-682-991-5117','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(38,'adeline.walsh','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Edwina','O\'Reilly','2022-07-10','757.907.0988','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(39,'mconnelly','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Kory','Huels','1982-07-06','+1-820-225-8454','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(40,'aryanna.mohr','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi','Alice','Wintheiser','1982-06-23','+1-458-749-0966','EMPLOYEE','2022-10-25 04:31:53','2022-10-25 04:31:53'),(41,'grant.herminia','123123','Onie','Pouros','1995-04-19','1-251-883-0063','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(42,'rickie.goldner','123123','Tessie','Larkin','1975-05-31','781-294-5451','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(43,'jettie.purdy','123123','Antone','Schaden','1988-06-14','586.984.1591','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(44,'rolfson.rubye','123123','Monique','Schaefer','2016-07-17','+1-380-968-5441','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(45,'williamson.rogers','123123','Karli','Daugherty','1974-07-16','276-824-1838','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(46,'aliya89','123123','River','Ziemann','1994-10-04','678.349.8251','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(47,'greenfelder.misael','123123','Lea','Ortiz','1977-05-14','1-341-332-4120','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(48,'welch.lelah','123123','Concepcion','Haley','1990-11-09','+1 (979) 804-2829','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(49,'kohler.harmony','123123','Anthony','Grant','1976-07-14','941.665.6291','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(50,'jadon.kuphal','123123','Margret','McDermott','2017-08-03','1-762-798-7317','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(51,'fletcher.heathcote','123123','Stephon','Kertzmann','1979-10-22','+1 (657) 358-2432','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(52,'alyson23','123123','August','Hand','2011-05-12','(949) 235-7774','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(53,'mohammed43','123123','Randy','Kirlin','2000-04-28','+1-805-985-9101','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(54,'lavon.ziemann','123123','Joesph','Oberbrunner','2018-07-22','937-490-4786','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(55,'lew.runte','123123','Reginald','Hand','2007-04-23','(351) 780-0577','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(56,'hudson.earline','123123','Theodora','Heller','2007-11-20','+1-323-639-8002','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(57,'ybeatty','123123','Scottie','Ledner','1995-04-12','+1 (504) 895-9528','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(58,'pagac.enid','123123','Johathan','Konopelski','2021-05-30','530-427-7495','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(59,'casimir.rodriguez','123123','Rachel','Rowe','1996-01-20','(458) 326-9339','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10'),(60,'ottilie.turcotte','123123','Emiliano','Gutmann','2019-06-25','+13128884372','EMPLOYEE','2022-10-25 04:32:10','2022-10-25 04:32:10');
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

-- Dump completed on 2022-11-05 23:04:17
