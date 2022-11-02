-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: pharmacydb
-- ------------------------------------------------------
-- Server version	8.0.27

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
  `unit_price` decimal(8,2) NOT NULL,
  `unit_in_stock` int NOT NULL DEFAULT '0',
  `discontinued` tinyint NOT NULL DEFAULT '1',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `describe` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uses` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trademark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `medicines_category_id_foreign` (`category_id`),
  CONSTRAINT `medicines_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medicines`
--

LOCK TABLES `medicines` WRITE;
/*!40000 ALTER TABLE `medicines` DISABLE KEYS */;
INSERT INTO `medicines` VALUES (2,'Agilodin 10g',1,350000.00,20,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P20414_1_l.webp','Hộp 10 vỉ x 10 viên','Điều trị viêm mũi dị ứng, viêm kết mạc dị ứng, ngứa và mày đay liên quan đến histamin','Agimexpharm'),(3,'Allerphast',1,17000.00,0,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17627_1_l.webp','Hộp 1 vỉ x 10 viên','Ðiều trị triệu chứng trong viêm mũi dị ứng theo mùa, mày đay mạn tính vô căn ở người lớn và trẻ em trên 6 tuổi','Mebiphar'),(4,'Bilodin 10mg',1,38000.00,100,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P11609_1_l.webp','Hộp 10 vỉ x 10 viên','Điều trị viêm mũi dị ứng, kết mạc dị ứng, ngứa và mày đay liên quan đến histamin','Bidiphar'),(5,'Bostanex',1,60000.00,0,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P13206_1_l.webp','Hộp 3 vỉ x 10 viên','Giảm triệu chứng viêm mũi dị ứng, nổi mày đay','Boston'),(6,'Cetirizin 10mg',1,69000.00,10,10,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P02832_1_l.webp','Hộp 10 vỉ x 10 viên','Điều trị chứng viêm mũi dị ứng dai dẳng, viêm mũi dị ứng theo mùa, mày đay mạn tính vô căn; viêm kết mạc dị ứng','Vidipha'),(7,'Amcinol-Paste',1,10000.00,200,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P19886_1_l.webp','Tuýp 5g','Điều trị các bệnh ngoài da đáp ứng với steroid và các chứng viêm đau ở miệng, lợi và môi.','Công ty Cổ phần Hoá - Dược phẩm Mekophar'),(8,'Loxfen 60mg',2,150000.00,20,8,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14830_1_l.webp','Hộp 10 Vỉ x 10 Viên','Giảm đau và kháng viêm','ông Ty TNHH Dược Phẩm Kovina (Việt Nam)'),(9,'Philcotam 250mg',3,332000.00,30,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16122_1_l.webp','Hộp 10 vỉ x 10 viên','Điều trị viêm khớp dạng thấp, thoái hóa xương khớp, viêm cột sống khớp dính, ...','Phil Inter Pharma'),(10,'Nhiệt Miệng Nhất Nhất',2,95000.00,500,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P05441_1_l.webp','Hộp 2 vỉ x 10 viên','Thanh nhiệt, giải độc, chống viêm, tiêu sưng','Nhất Nhất'),(11,'Pro Avalo',2,25000.00,150,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P18119_1.jpg','Hộp 1 vỉ x 28 viên','Thuốc tránh thai ','Công ty Cổ phần sinh học Dược phẩm Ba Đình (Việt Nam)'),(12,'Regulon',2,180000.00,20,10,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P00122_1_l.webp','Hộp 3 vỉ x 21 viên','Thuốc tránh thai hằng ngày cho phụ nữ','Gedeon Richter'),(13,'Newlevo 0.03mg',2,5500.00,24,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P01356_1.jpg','1 vỉ x 28 viên','Thuốc uống tránh thai','Ba Dinh Pharma'),(14,'Acetylcystein 200 Imexpharm',1,147000.00,100,4,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17315_1_l.webp','10 vỉ x 10 viên','Điều trị các bệnh lý đường hô hấp có đờm nhầy quánh như viêm phế quản cấp và mạn','Imexpharm'),(15,'Agi-Bromhexine 4mg',1,18000.00,50,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14796_1_l.webp','3 vỉ x 10 viên/hộp','Điều trị rối loạn tiết dịch phế quản, nhất là trong viêm phế quản cấp tính, đợt cấp tính của viêm phế quản mạn tính....','Agimexpharm '),(16,'Siro Ambroxol 15mg/5ml',1,30000.00,2000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14742_1_l.webp','Chai 60ml','Điều trị các rối loạn về sự bài tiết ở phế quản','Danaphar ̣(Việt Nam)'),(17,'Becacold-E',1,95000.00,100,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P18113_1_l.webp','Hộp 5 vỉ x 20 viên','Điều trị các triệu chứng cảm thông thường, viêm mũi dị ứng, viêm mũi vận mạch, viêm màng nhầy xuất tiết do cúm và các rối loạn của đường hô hấp trên','ENLIE'),(18,'Befabrol Bến Tre',1,16000.00,5,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P17123_1.jpg','Chai 30ml','Điều trị các bệnh cấp và mạn tính ở đường hô hấp...','Công ty cổ phần dược phẩm Bến Tre'),(19,'Alcool 70 độ',5,48000.00,200,2,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16923_1_l.webp','Chai 1000ml','Sát trùng ngoài da','Chi nhánh Công ty Cổ phần Dược phẩm OPC tại Bình Dương - Nhà máy Dược phẩm OPC (Việt Nam)'),(20,'Alcool 90 OPC',5,60000.00,100,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16922_1_l.webp','Chai 1000ml','Sát trùng ngoài da, vật dụng, đốt tiệt trùng dụng cụ bằng kim loại','OPC'),(21,'Betadine Antiseptic Solution 10%',3,19000.00,10,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P03073_1_l.webp','Hộp 1 chai x 15ml','Dùng để diệt mầm bệnh ở da, vết thương và niêm mạc, sát khuẩn da và niêm mạc trước khi mổ, dự phòng nhiễm khuẩn khi bỏng, vết rách nát, vết mài mòn,....','Mundipharma'),(22,'Calamine Leopard Brand',1,42000.00,0,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P15845_1_l.webp','Chai 60ml','Điều trị dị ứng, ngứa, mẫn đỏ, muỗi đốt hay côn trùng đốt, làm dịu mát da, trị rôm sảy, ngứa do chàm','Leopard'),(23,'Bisbeta 120',3,378000.00,10,20,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P15863_1_l.webp','Hộp 2 vỉ x 21 viên','Giảm calo hỗ trợ trị béo phì, thừa cân','S.P.M'),(24,'Odistad 120mg',3,420000.00,15,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P14147_1_l.webp','Hộp 2 vỉ x 21 viên','Hỗ trợ điều trị cho bệnh nhân thừa cân...','Stella (Việt Nam)'),(25,'Khẩu trang Jomi N95 4D',5,25000.00,1000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P21744_1.jpg','Gói 5 Cái','Khẩu trang Jomi N95 4D với 03 lớp vải không dệt và màng lọc Mellblow giúp lọc không khí ô nhiễm, bụi PM2.5, ngăn 99% vi khuẩn, virus. Ngoài ra, sản phẩm còn giúp che nắng ngăn tia UV với UPF 40.','Jomi'),(26,'Khẩu trang chống ô nhiễm Airphin PM2.5 FFP2 Pollution Fighter',5,36000.00,1000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16698_1.jpg','cỡ L','Van thoát khí. Không mờ kính.','Airphin'),(27,'Khẩu trang y tế Famapro Plus',5,5000.00,1000,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P19025_1_l.webp','Gói 5 cái','Khẩu trang y tế Famapro Plus với 3 lớp kháng khuẩn có khả năng lọc bụi, lọc khuẩn tối ưu đạt tiêu chuẩn ISO 13485:2016.','Famapro Plus'),(28,'Thực phẩm bảo vệ sức khoẻ bảo vệ sức khoẻ hỗ trợ tiêu hoá AB Junior Pre & Pro',3,130000.00,50,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23358_3.jpg','Hộp 10 gói','Làm giảm các triệu chứng rối loạn tiêu hóa do dùng kháng sinh dài ngày hoặc loạn khuẩn đường tiêu hóa gây ra các triệu chứng táo bón, đầy hơi, khó tiêu, phân sống','AB Junior'),(29,'[IMC] Thực phẩm bảo vệ sức khỏe Bình vị Thái Minh',3,163000.00,20,5,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P19531_1_l.webp','Hộp 20 viên','[IMC] Thực phẩm bảo vệ sức khỏe Bình vị Thái Minh giúp hỗ trợ giảm acid dịch vị, giúp bảo vệ niêm mạc dạ dày, hỗ trợ cải thiện và giảm thiểu các biểu hiện của viêm loét dạ dày','IMC'),(30,'Chỉ Khát Vương',4,142500.00,10,0,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P23583_1_l.jpg','Hộp 3 vỉ x 10 viên','Thực phẩm bảo vệ sức khỏe Chỉ Khát Vương hỗ trợ cải thiện chỉ số đường huyết, giảm nguy cơ biến chứng do tiểu đường','Chỉ Khát Vương'),(31,'Hỗ trợ tăng cường đề kháng Costar Garlic Oil',4,194000.00,20,10,'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P24263_1.jpg','Lọ 60 viên','Thực phẩm bảo vệ sức khỏe tinh dầu tỏi hỗ trợ tăng cường đề kháng Costar Garlic Oil giúp tăng cường sức đề kháng. Hỗ trợ giảm các triệu chứng cảm cúm thông thường','Garlic Oil');
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

-- Dump completed on 2022-11-02 13:13:34
