/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.32 : Database - chapterlink
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`chapterlink` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `chapterlink`;

/*Table structure for table `autori_knjiga` */

DROP TABLE IF EXISTS `autori_knjiga`;

CREATE TABLE `autori_knjiga` (
  `author_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb3;

/*Data for the table `autori_knjiga` */

insert  into `autori_knjiga`(`author_id`,`name`) values 
(25,''),
(27,'Aa. Vv.'),
(12,'Anthony Reid'),
(45,'Antoine de Saint-Exupéry'),
(22,'Cameron K. McEwan'),
(34,'Cathy Brett'),
(48,'Claire North'),
(38,'Craig DiLouie'),
(36,'D.J. Taylor'),
(19,'David J. Deane'),
(20,'Deon Meyer'),
(43,'Edward Caleb Randall'),
(26,'Emmanuel Carrere'),
(9,'Francis White'),
(3,'Frank Herbert'),
(46,'Friedrich Engels'),
(18,'Gary Russell'),
(4,'George Mann'),
(35,'George Orwell'),
(2,'George R.R. Martin'),
(13,'Hapm Publications Ltd.'),
(11,'Henri Chambert-Loir'),
(31,'Ian R Tizard'),
(21,'International Monetary Fund. Statistics Dept.'),
(1,'J.K. Rowling'),
(37,'James Joyce'),
(16,'Jean-Marc'),
(15,'Jean-Marc Lofficier'),
(47,'Karl Marx'),
(23,'Kate Constable'),
(42,'LLC'),
(7,'Lynnette Porter'),
(14,'M. Radovanović'),
(32,'Marion McPherson Fead Pratt'),
(6,'Marvel Comics'),
(44,'Mike Richardson'),
(28,'Moen Sen'),
(33,'Paul Cornell'),
(41,'Pure Flix Entertainment'),
(17,'Randy Lofficier'),
(10,'Richard Baylie'),
(29,'Robert Kirkman'),
(49,'Sofoklo'),
(39,'Stephen King'),
(5,'Steven Moffat'),
(30,'Tim Vivian'),
(40,'Travis Thrasher'),
(24,'United States. Congress. Senate. Committee on Military Affairs'),
(8,'United States. Federal Aviation Administration');

/*Table structure for table `knjiga_korisnika` */

DROP TABLE IF EXISTS `knjiga_korisnika`;

CREATE TABLE `knjiga_korisnika` (
  `user_book_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `status_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_book_id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `knjiga_korisnika_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `korisnici` (`user_id`),
  CONSTRAINT `knjiga_korisnika_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `knjige` (`book_id`),
  CONSTRAINT `knjiga_korisnika_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `statusi` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;

/*Data for the table `knjiga_korisnika` */

insert  into `knjiga_korisnika`(`user_book_id`,`user_id`,`book_id`,`status_id`,`created_at`) values 
(1,2,1,1,'2024-07-20 19:12:20'),
(2,3,2,2,'2024-07-20 19:12:20'),
(12,4,9,2,'2024-07-30 21:30:42'),
(13,4,10,1,'2024-07-30 21:30:53'),
(19,8,13,1,'2024-07-30 23:07:28'),
(20,8,14,2,'2024-07-30 23:08:08'),
(21,8,15,1,'2024-07-30 23:42:02'),
(22,8,16,1,'2024-07-30 23:42:22'),
(23,8,17,1,'2024-08-03 17:33:51'),
(25,4,6,2,'2024-08-03 19:19:05'),
(27,11,36,1,'2024-08-11 16:01:43'),
(29,13,40,1,'2024-08-11 20:42:13'),
(30,13,42,1,'2024-08-11 21:19:32'),
(33,8,6,1,'2024-08-20 21:30:30'),
(35,8,36,1,'2024-08-20 21:36:10'),
(36,15,46,1,'2024-09-11 19:53:52'),
(37,18,46,1,'2024-09-15 20:39:15'),
(38,19,46,1,'2024-09-15 20:42:49'),
(39,20,46,1,'2024-09-15 20:49:03'),
(40,21,46,1,'2024-09-15 20:52:29'),
(41,23,46,1,'2024-09-15 20:57:59'),
(42,24,46,1,'2024-09-15 21:15:04'),
(43,25,47,1,'2025-02-17 12:13:05'),
(45,29,36,1,'2026-01-11 14:13:22'),
(46,29,49,1,'2026-01-11 14:13:32'),
(47,29,50,3,'2026-01-11 14:14:22');

/*Table structure for table `knjiga_liste` */

DROP TABLE IF EXISTS `knjiga_liste`;

CREATE TABLE `knjiga_liste` (
  `list_book_id` int NOT NULL AUTO_INCREMENT,
  `list_id` int NOT NULL,
  `book_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  PRIMARY KEY (`list_book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `knjiga_liste_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `knjige` (`book_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;

/*Data for the table `knjiga_liste` */

insert  into `knjiga_liste`(`list_book_id`,`list_id`,`book_id`,`created_at`,`description`) values 
(1,1,1,'2024-07-20 19:12:20',NULL),
(2,2,2,'2024-07-20 19:12:20',NULL),
(3,8,30,'2024-08-04 16:35:44','dead'),
(4,8,31,'2024-08-04 16:35:44',''),
(5,9,32,'2024-08-04 16:38:01',''),
(6,10,19,'2024-08-04 17:08:01','da'),
(7,11,33,'2024-08-04 17:09:50',''),
(8,12,16,'2024-08-04 18:03:53','dead'),
(9,12,34,'2024-08-04 18:03:53','fad'),
(10,14,35,'2024-08-04 18:14:04',''),
(11,15,38,'2024-08-11 16:35:46','this book is great'),
(12,15,39,'2024-08-11 16:35:46','also great'),
(13,16,40,'2024-08-11 21:14:25','super knjiga '),
(14,16,41,'2024-08-11 21:14:25','zakon'),
(15,17,43,'2024-08-13 22:42:17','Superr knjiga'),
(16,17,38,'2024-08-13 22:42:17','Zakon knjiga!'),
(17,21,37,'2024-08-15 13:28:37','das'),
(18,22,45,'2024-08-19 18:30:30',''),
(19,23,46,'2024-09-15 20:40:30','super knjiga'),
(20,24,46,'2024-09-15 21:19:40','super knjiga'),
(21,25,37,'2025-02-17 12:13:49','best shit ever'),
(22,26,51,'2026-01-11 14:25:10','Ovo je bitna');

/*Table structure for table `knjige` */

DROP TABLE IF EXISTS `knjige`;

CREATE TABLE `knjige` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `google_books_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `cover_image` varchar(500) DEFAULT NULL,
  `published_date` datetime DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `google_books_id` (`google_books_id`),
  UNIQUE KEY `google_books_id_2` (`google_books_id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb3;

/*Data for the table `knjige` */

insert  into `knjige`(`book_id`,`google_books_id`,`title`,`cover_image`,`published_date`) values 
(1,'1','Harry Potter and the Philosopher\'s Stone','image1.jpg','1997-06-26 00:00:00'),
(2,'2','A Game of Thrones','image2.jpg','1996-08-06 00:00:00'),
(3,'p1MULH7JsTQC','Dune','http://books.google.com/books/content?id=p1MULH7JsTQC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE730S_YQqfAqxdTPQamhn8w91FJEVJieI3rqW-b0C_seNXncWO4aGSosYzHcHA909QLIeRBTLHxpglETdfUcdNRiE2sdu0xRPzHFBdH9-lyTwxKngl1yO1ExZEVfonwNQxlbbijc&source=gbs_api','2003-08-26 00:00:00'),
(4,'e7r6CwAAQBAJ','Doctor Who: The Eighth Doctor Vol. 1: A Matter of Life and Death','http://books.google.com/books/publisher/content?id=e7r6CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71umUnz3Odlhxg4NGusFgvAb3yjN5GT8NffR2saiY-Qq3FNdQONfpawUaLlWi6kaZrqd9K4QqVOjO_pz-isJrdJFOo8FVYNjLLFPyu_h33G4P7t6OEnV5lecmO8D1cbZbYRH8Pq&source=gbs_api','2016-05-18 00:00:00'),
(5,'huy3EAAAQBAJ','Dune (Movie Tie-In)','http://books.google.com/books/publisher/content?id=huy3EAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73vlNPQ61qcvUTAR0i4AaZculri3GDAI4IytTOBpXyj47cDOptis8d4IONdIzCgnThfW9XSFMUEublq9lvNY1zzX0G_ARVvWOLvUoLoo8QVP5IEPVOV2yYoMKHNfi2p4cNLQacC&source=gbs_api','2023-09-26 00:00:00'),
(6,'APWQEAAAQBAJ','Doctor Who: The Day of the Doctor','http://books.google.com/books/publisher/content?id=APWQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71WhjDfQSRbgV2VNntl_m51pT4JX7my61xcSMLtEKEPpIW-QnuD1HmZP18_AIErqiQwVIQre6lcu5B5cuLl575KkNc7ZYmY3PL9MLJ05D4J8wlgxgWkn8NMpQ3PKDhDhi_dEL_J&source=gbs_api','2018-09-25 00:00:00'),
(7,'qoveCgAAQBAJ','Doctor Who: The Eighth Doctor #1','http://books.google.com/books/publisher/content?id=qoveCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71LLI0az4zkddNdwRVbjaZObwhIjt17QRh4VYqITpx9__k33PgySY7-jEGCQQWpACKkACWuJZzedVNONr0aAb6FlpQeM53cgbsFEeBNNhaacnRZmOAkARm1COJmNrlXcjHTm9qk&source=gbs_api','2015-11-04 00:00:00'),
(8,'ixbxCQAAQBAJ','Iron Man 2','http://books.google.com/books/publisher/content?id=ixbxCQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71UapQQeNvLmYNybN7TvKuPG1_QikT2C_5UJfPBk9yb-V7KFdCNTEchoWZasvBRAMZ9YudsMCz5du8lhaPHt4MUpTVUKj7j0GMoy58jXGJNIqdIn4vDShyQEOy1K8R3STJfAGyI&source=gbs_api','2015-04-09 00:00:00'),
(9,'GjI31iwUTKoC','The Doctor Who Franchise','http://books.google.com/books/content?id=GjI31iwUTKoC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70BHqAGq60BsED1HxoBAL8saVv_27_eZqUbWC4MrKPQPbiHYRlivW1qOmRH4240_hQvYsNOZeyDlE0cIG0BamHDFHMPwd2QcV7Tl1FMTNc7GACOtekrwFoA0rHV6j1ad2JUS_Cv&source=gbs_api','2012-09-18 00:00:00'),
(10,'posdspMw10gC','FAA DAR, DAS, and DOA Directory','http://books.google.com/books/content?id=posdspMw10gC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73EjTZGUeZFJkgN_dUp9JnAgDJBatE1FFijhTHPDlO_f0CelOIeJY-JpVJJ7BvZZwiLFrAXgOu8pxthV93LONONbPOgOVj0ee4Z9MbUMLjQVBwWDMISzU-u6wbdDDE8aAC7V3zz&source=gbs_api','1988-01-01 00:00:00'),
(11,'ptVhAAAAcAAJ','A Replie to Iesuit Fishers Answere to Certain Questions Propou[n]ded by His Most Gratious Matie. King Iames','http://books.google.com/books/content?id=ptVhAAAAcAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73TrzFnTMmZ5FWpMaW3mC8O9t0GhkofrpH6HfJTPu1es-II5xkUnkup3r4jfJotg2E7DzHcG7EfSTIFsWoQRXBX7UXdfywzpVMpG75iEX-MObrcIDmoVT30xJXVqpOxHIpiRE-A&source=gbs_api','1624-01-01 00:00:00'),
(12,'ga5sIFcalx0C','Title from Google API','Cover URL','2024-07-30 21:06:03'),
(13,'I6wE_BhBAM4C','HAPM Component Life Manual','http://books.google.com/books/content?id=I6wE_BhBAM4C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71ams7cAWteCnoKfYH7dr4X8uHod6Nq4RRmTV2HVH9vmikfLubaAdvtX-DL-7XFR6Tg0NOShec9Zre2x0hJRORFNGyOSYQEopIAt2b6Ag0NMO97bve6iBAGPy_ab-bEhRQn9wmc&source=gbs_api','1992-11-19 00:00:00'),
(14,'EmvySWcqs3AC','Fluidized Bed Combustion','http://books.google.com/books/content?id=EmvySWcqs3AC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72fid8ne9WAp_9Es5A3B3fMEGW-RbOCvmVw-YgNkZ1465RxZxRoXoJSb_PT39Z4ZGIDnYiK54uuaV2Sc5u3PBymesORn8lDASUMml8PwMgX1NC-JvJcaFPfd9fqQvBbFKSq5Kc1&source=gbs_api','1986-01-01 00:00:00'),
(15,'Z75JDwAAQBAJ','Doctor Who: The Day of the Doctor (Target Collection)','http://books.google.com/books/publisher/content?id=Z75JDwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73RQFuUepVR1zCDHRIWhH-fqJdvy-fai4It2Vpc6--xaH62f106XWQP7hwTyJ8o5NigovCetDLgQfJVmWCh1bIOyXx6QHQ7iOX8akZeGVUDNn4fz_yIF9EL5LZGfLavnDjfTMzL&source=gbs_api','2018-04-05 00:00:00'),
(16,'267plnl2E5YC','The Doctor Who Programme Guide','http://books.google.com/books/content?id=267plnl2E5YC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73MCyRMZcfFVekNbifU6jMGuu38jBGZf47a9sBigVoKC_Q1zvau7B7YSlAjSo2gjTR7kVypBPao47nGvAIu25V3aSFzqzLPiDUBqVER0whgFV64Q0-BtEUDVsWQ7bpBscO-gXCd&source=gbs_api','2003-05-01 00:00:00'),
(17,'3QrOQ9jDT3sC','The Encyclopedia','http://books.google.com/books/content?id=3QrOQ9jDT3sC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73MfyEadxMK98UL5SPWupAXSXdiZMO_KNmniIJbT0IFxxfDZSwVsaLas57IPJC4jDqghhDGzxiUiINQJygbp1J15Ay40pN-dJULWASXvGHNhta-pzkxBJ1ZfQnB3RrprPup7nmf&source=gbs_api','2007-01-01 00:00:00'),
(18,'j1eLEAAAQBAJ','Robert Moffat','http://books.google.com/books/publisher/content?id=j1eLEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70FM30DsyLvZ0c1bSydlmKCU-m-kMUt7qXa-CvayZ_Ua1MBesQAj5CHzCc2v18o4smgSmJFojqAqZrKn4S4Q49NSY6_PveZO1MnoHgqnvpclheIE88zhAPNWzJ2saALPmU_hzd0&source=gbs_api','2022-09-16 00:00:00'),
(19,'co1cDwAAQBAJ','Dead Before Dying','http://books.google.com/books/content?id=co1cDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2008-02-01 00:00:00'),
(20,'mOKYDwAAQBAJ','Zimbabwe','http://books.google.com/books/content?id=mOKYDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2019-04-12 00:00:00'),
(21,'W92rBwAAQBAJ','Unofficial Doctor Who','http://books.google.com/books/content?id=W92rBwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2015-04-06 00:00:00'),
(22,'bIbCDwAAQBAJ','The January Stars','http://books.google.com/books/content?id=bIbCDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2020-03-31 00:00:00'),
(23,'n4E9AQAAMAAJ','Hearings, January 16-18, 1946','http://books.google.com/books/content?id=n4E9AQAAMAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','1945-01-01 00:00:00'),
(24,'UDi81QcqNFYC','Re: The Ash Lad','http://books.google.com/books/content?id=UDi81QcqNFYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',NULL),
(25,'WrA0DwAAQBAJ','I Am Alive and You Are Dead','http://books.google.com/books/content?id=WrA0DwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','2005-06-01 00:00:00'),
(26,'ENzrDwAAQBAJ','Porn After Porn','http://books.google.com/books/content?id=ENzrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2014-12-18 23:00:00'),
(27,'gnm03e_t0V0C','Designed to Survive','http://books.google.com/books/content?id=gnm03e_t0V0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2011-01-01 00:00:00'),
(28,'pqQeAgAAQBAJ','The Walking Dead #4','http://books.google.com/books/content?id=pqQeAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2004-01-28 00:00:00'),
(29,'FpkeAgAAQBAJ','The Walking Dead #5','http://books.google.com/books/content?id=FpkeAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2004-02-15 00:00:00'),
(30,'Riv4DwAAQBAJ','Other Voices, Other Rooms','http://books.google.com/books/content?id=Riv4DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2020-03-12 00:00:00'),
(31,'_m75EAAAQBAJ','The Immunology of the Dog','http://books.google.com/books/content?id=_m75EAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2024-07-27 00:00:00'),
(32,'5bDhAAAAMAAJ','Fead Family Facts','http://books.google.com/books/content?id=5bDhAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','1970-01-01 00:00:00'),
(33,'uZ4eAgAAQBAJ','The Walking Dead #32','http://books.google.com/books/content?id=uZ4eAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2006-11-22 00:00:00'),
(34,'viUtDwAAQBAJ','Doctor Who: The Third Doctor #3','http://books.google.com/books/content?id=viUtDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2016-11-30 00:00:00'),
(35,'H3xeHT53IuoC','Scarlett Dedd','http://books.google.com/books/content?id=H3xeHT53IuoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2012-02-16 00:00:00'),
(36,'6u2QEAAAQBAJ','1984','http://books.google.com/books/publisher/content?id=6u2QEAAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72f8dtN93yN1cFly-tUp0Lnox7Oo0nPmgdn4w5ebXNs8FXxShyh71LcEQcyOI6NYkhBSeHF-DMaOG_CaKSaQi7DQxZtDNjms9WA1T8Abtk7b-pcR6jYdBJzGB84o1u-rpP8FHQV&source=gbs_api','2021-03-30 00:00:00'),
(37,'SxSJDwAAQBAJ','On Nineteen Eighty-Four','http://books.google.com/books/content?id=SxSJDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2019-10-22 00:00:00'),
(38,'7FmPEAAAQBAJ','The Dead','http://books.google.com/books/content?id=7FmPEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','2004-09-01 00:00:00'),
(39,'LzsGBAAAQBAJ','Dead 2','http://books.google.com/books/content?id=LzsGBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2014-08-11 00:00:00'),
(40,'VspcAAAAMAAJ','Nineteen Eighty-four','http://books.google.com/books/content?id=VspcAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE730BPBA8h-taEqR-WHxrr991GIrQQe0yalLosYenAbxNRvmUs43gKfmnhRQ1d6ggGax_V72oeutbcTAi0tefHVMRmILSyebzFI3o5bQsnOZTJovX2SGapc3n2HYL2y42aXUfyC7&source=gbs_api','1991-01-01 00:00:00'),
(41,'Jmv6DwAAQBAJ','Rita Hayworth and Shawshank Redemption','http://books.google.com/books/content?id=Jmv6DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2020-09-29 00:00:00'),
(42,'S85NCwAAQBAJ','It','http://books.google.com/books/publisher/content?id=S85NCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73SS78mXvAXCQ_RW5m_tWvhw8Yd-HSFHRnDWGh8IDy7zIbmc8MlvXut6TypY_Y_W_vC1TZ68Z4jkjfH0K09_SwdwHWUkNprR5yJeARCulfunaxH1WIOGec4HxeG9cj8q-ssUu00&source=gbs_api','2016-01-05 00:00:00'),
(43,'U4RqCgAAQBAJ','God\'s Not Dead 2','http://books.google.com/books/content?id=U4RqCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2016-03-01 00:00:00'),
(44,'h8cVAAAAYAAJ','The Dead Have Never Died','http://books.google.com/books/content?id=h8cVAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api','1917-01-01 00:00:00'),
(45,'vwXUCgAAQBAJ','Living with the Dead #2','http://books.google.com/books/content?id=vwXUCgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2011-04-26 00:00:00'),
(46,'62hxBgAAQBAJ','Mali Princ','http://books.google.com/books/publisher/content?id=62hxBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70u_3fKl5YS5tC3UQdYYsGIkW1uY7Yg03CmpKZvH2fYzD1wIsutazR7hjX640v6OyRAyOFCOZhEKmOreh0sg1qITDmXfnaXIIixg7WWOLcJoEVBTR5GKbJdAobHZF_lCVk03-LY&source=gbs_api','2015-01-30 00:00:00'),
(47,'3-82DAAAQBAJ','The Communist Manifesto (Diversion Classics)','http://books.google.com/books/publisher/content?id=3-82DAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72rT2ImL04w7QO06VBUa0fpxRcXuYRsaSzCPnVGNwA3QmaWyn2evXV2wnzpVDBEPHsyrFWVQzPQuGWQuRwfbrxopryRI10dBstRJayF222bvlCcO00pggA3rEPHyTJ1JN3zMq_9&source=gbs_api','2016-05-24 00:00:00'),
(48,'f0SwvZCh2W8C','The Communist Manifesto','http://books.google.com/books/content?id=f0SwvZCh2W8C&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71ot_Ly7Jo6jkR_2B0d7wIPGKSIv3hRjgz_8nzAm4Vi60ahozYt3fjwe_WU-GDOqdL5Mt1Taqo9MCIYsuSOxin2p6VjXzkZlUGuOwlBUccuqaOWYuyERQlNuOny-8MtABSsktyY&source=gbs_api','1988-09-01 00:00:00'),
(49,'T9BUEQAAQBAJ','Animal Farm','http://books.google.com/books/publisher/content?id=T9BUEQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE722nrl404z3WufQXXnLCuy8fmZxxApxf152puoSB7ua9F4__mwBhw_4kw5RFyyvzK8FcAHm4yoEWX_0UHjxuvYyIlla-xcLyDXI3tYFGhN9DroYTLwBppHtI_b4W5J6wFwtUXvh&source=gbs_api','2025-04-10 00:00:00'),
(50,'AZShAQAAQBAJ','The First Fifteen Lives of Harry August','http://books.google.com/books/publisher/content?id=AZShAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70mEEQD93NgiC1rMXMf71H_eMV8pQrh15zlzAevy8K4HDZYTc83hSA5y-W_1z3-7P08r_oKjaq8gn0CnaeCS3NvVqmhmVsAwCDA_VUC64XEWv7BCGa30O20KDCQrsjkDIwUWc7Q&source=gbs_api','2014-04-08 00:00:00'),
(51,'ccg1EQAAQBAJ','Kralj Edip','http://books.google.com/books/content?id=ccg1EQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','2011-06-21 00:00:00');

/*Table structure for table `knjige_has_autori_knjiga` */

DROP TABLE IF EXISTS `knjige_has_autori_knjiga`;

CREATE TABLE `knjige_has_autori_knjiga` (
  `book_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`book_id`,`author_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `knjige_has_autori_knjiga_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `knjige` (`book_id`),
  CONSTRAINT `knjige_has_autori_knjiga_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `autori_knjiga` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `knjige_has_autori_knjiga` */

insert  into `knjige_has_autori_knjiga`(`book_id`,`author_id`) values 
(3,3),
(5,3),
(4,4),
(7,4),
(6,5),
(15,5),
(8,6),
(9,7),
(10,8),
(11,9),
(11,10),
(12,11),
(12,12),
(13,13),
(14,14),
(16,15),
(16,16),
(16,17),
(17,18),
(18,19),
(19,20),
(20,21),
(21,22),
(22,23),
(23,24),
(24,25),
(26,27),
(27,28),
(28,29),
(29,29),
(33,29),
(30,30),
(31,31),
(32,32),
(34,33),
(35,34),
(36,35),
(40,35),
(49,35),
(37,36),
(38,37),
(39,38),
(41,39),
(42,39),
(43,40),
(43,41),
(43,42),
(44,43),
(45,44),
(46,45),
(47,46),
(47,47),
(48,47),
(50,48),
(51,49);

/*Table structure for table `komentari_na_kritike` */

DROP TABLE IF EXISTS `komentari_na_kritike`;

CREATE TABLE `komentari_na_kritike` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `critic_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `komentari_na_kritike_review_id_foreign_idx` (`critic_id`),
  CONSTRAINT `komentari_na_kritike_review_id_foreign_idx` FOREIGN KEY (`critic_id`) REFERENCES `kritike` (`critic_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb3;

/*Data for the table `komentari_na_kritike` */

insert  into `komentari_na_kritike`(`comment_id`,`user_id`,`comment_text`,`created_at`,`critic_id`) values 
(1,3,'I agree, it is an amazing book!','2024-07-20 19:12:20',NULL),
(2,2,'I found it perfectly paced.','2024-07-20 19:12:20',NULL),
(12,8,'dsa','2024-08-03 19:16:56',NULL),
(13,8,'dsa2','2024-08-03 19:17:44',NULL),
(14,8,'latest','2024-08-03 19:17:49',NULL),
(15,8,'latest3','2024-08-03 19:17:53',NULL),
(16,4,'das','2024-08-03 19:18:57',NULL),
(18,4,'fds','2024-08-03 22:31:55',NULL),
(19,4,'dsa','2024-08-03 23:40:39',NULL),
(20,4,'dsa','2024-08-03 23:44:36',NULL),
(21,8,'das','2024-08-11 16:07:54',NULL),
(24,13,'nice','2024-08-11 16:34:14',NULL),
(25,13,'Super kritika!','2024-08-11 21:06:21',33),
(26,8,'fdasfasd','2024-08-18 17:01:52',NULL),
(27,8,'dasdas','2024-08-18 17:03:07',NULL),
(28,8,'dsafdasfad','2024-08-18 17:05:58',NULL),
(29,8,'dsadas','2024-08-18 17:41:44',NULL),
(30,8,'dead','2024-08-18 19:04:18',NULL),
(31,8,'test','2024-08-19 18:16:42',NULL),
(32,8,'good review','2024-08-20 21:37:40',42),
(35,20,'great review!','2024-09-15 20:49:39',48),
(36,21,'great review!','2024-09-15 20:53:07',NULL),
(38,24,'love this','2024-09-15 21:16:21',NULL),
(39,29,'u have great taste bro','2026-01-11 13:39:12',52),
(40,29,'Bome da','2026-01-11 14:30:53',42);

/*Table structure for table `korisnici` */

DROP TABLE IF EXISTS `korisnici`;

CREATE TABLE `korisnici` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3;

/*Data for the table `korisnici` */

insert  into `korisnici`(`user_id`,`username`,`email`,`password_hash`,`created_at`) values 
(1,'admin','admin@example.com','hashedpassword1','2024-07-20 17:12:20'),
(2,'user1','user1@example.com','hashedpassword2','2024-07-20 17:12:20'),
(3,'user2','user2@example.com','hashedpassword3','2024-07-20 17:12:20'),
(4,'karlo_cvitak','karlo.cvitakk@gmail.com','b3ba21d4dc755cf0cafac14e65bd02a3cf844f5aa65581a6a2ccfcaf495d6da5','2024-07-25 22:48:00'),
(5,'test','test@test.com','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','2024-07-27 14:15:51'),
(6,'test2','test2@test.com','60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752','2024-07-27 14:18:09'),
(7,'test23','test2@t3est.com','4e758d4760a6cffc347cdb45f0966d20f481bad806731c4c0e44f21cf9d90bb5','2024-07-27 14:20:09'),
(8,'test5','korisnik@korisnik.com','b3ba21d4dc755cf0cafac14e65bd02a3cf844f5aa65581a6a2ccfcaf495d6da5','2024-07-27 14:20:36'),
(9,'karlo_cvitak2','karlo.cvitakk2@gmail.com','b3ba21d4dc755cf0cafac14e65bd02a3cf844f5aa65581a6a2ccfcaf495d6da5','2024-08-11 13:58:54'),
(10,'korisnik22','korisnik@2korisnik2.com','28a3a5e81d1e89f0efc70b63bf717b921373fc7fac70bc1b7e4d466799c0c6b0','2024-08-11 14:00:28'),
(11,'korisnik_1','1korisnik@korisnik.com','b3ba21d4dc755cf0cafac14e65bd02a3cf844f5aa65581a6a2ccfcaf495d6da5','2024-08-11 14:01:26'),
(12,'korisnik_3','4_korisnik@korisnik.com','b3ba21d4dc755cf0cafac14e65bd02a3cf844f5aa65581a6a2ccfcaf495d6da5','2024-08-11 14:31:28'),
(13,'testKorisnik','testKorisnik@testKorisnik.com','b3ba21d4dc755cf0cafac14e65bd02a3cf844f5aa65581a6a2ccfcaf495d6da5','2024-08-11 14:32:12'),
(14,'DAEDSASDASD','DSADASS@fdsadsa.com','2825f4f238690847c2d2301225fec4e733d9c4c7ab20deacb93c3107e1277a06','2024-08-12 17:58:53'),
(15,'userTest1','userTest1@userTest1.com','b3ba21d4dc755cf0cafac14e65bd02a3cf844f5aa65581a6a2ccfcaf495d6da5','2024-09-11 17:53:20'),
(16,'Tester','Tester@gmail.com','9e7cd9cb5a63a3591e16f4d835f32a1c4a84ab66e39ae27aa448c03b66bf63e7','2024-09-15 18:34:53'),
(17,'Testerr','Testerr@gmail.com','9e7cd9cb5a63a3591e16f4d835f32a1c4a84ab66e39ae27aa448c03b66bf63e7','2024-09-15 18:36:23'),
(18,'Testerrrr','QA@gmail.com','9bba5c53a0545e0c80184b946153c9f58387e3bd1d4ee35740f29ac2e718b019','2024-09-15 18:38:48'),
(19,'testingUser','usertest@gmail.com','691b0c334b6a09f1a7dd4243c7e0720add2e928ac2f83ad35f8a824ea6fc0828','2024-09-15 18:42:33'),
(20,'demo','demo@demo.com','9956d6a8168de87560ad6918838818f2c3a1995f2575285da6609a748322863c','2024-09-15 18:48:47'),
(21,'demo2','demo1@gmail.com','9dd70d640816c748a2ad512e13c90585fd0589f7a257741289424a267f089ff0','2024-09-15 18:52:12'),
(22,'demo3','demo3@gmail.com','69ef25ec8979952012c5833656608f6e4f7f676b98877468430d1b8ad6705f14','2024-09-15 18:57:12'),
(23,'demoo','demoo@gmail.com','26c2842a058c59147cff4062744f701514d923824630c03e18e8c25b4ec677f1','2024-09-15 18:57:46'),
(24,'dddemo','ddemo@gmail.com','b26538513ffca6285be062b7269d5c29b8cb4b7bbed05570f4d05cb9ace83b3f','2024-09-15 19:14:52'),
(25,'Karlooo','qualityengineer@mail.com','1428de830a719af21c4aa5ea65b69aaa00065218c65f88462d0f5893a84a7067','2025-02-17 11:11:10'),
(26,'testtesttest','test@test.comtest','9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08','2025-02-17 15:36:40'),
(27,'johhnytest','johhnytest@johhnytest.com','ccc292f77a30d70bbf4d7b0e7ee8fe778b5618e429854abf1ad91f33e3daf606','2025-02-17 15:36:58'),
(28,'jasampametan','ja@sam.pametan','3d2e0f04ffd86721b315b0216ef9f6d5f92c2358d9a5f52ba88e314fbe7ef5ac','2025-12-23 19:27:26'),
(29,'kcvitak@tvz.hr','kcvitak@tvz.hr','faa974475a59b2afd5442547b5852bbb3b9dea3414a5eb6cc92dd9fccbd33f2d','2026-01-11 12:33:06');

/*Table structure for table `korisnicke_role` */

DROP TABLE IF EXISTS `korisnicke_role`;

CREATE TABLE `korisnicke_role` (
  `user_role_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `user_id` (`user_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `korisnicke_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `korisnici` (`user_id`),
  CONSTRAINT `korisnicke_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;

/*Data for the table `korisnicke_role` */

insert  into `korisnicke_role`(`user_role_id`,`user_id`,`role_id`) values 
(3,3,2),
(4,7,2),
(5,8,2),
(13,1,2),
(14,1,1),
(15,8,1),
(16,9,2),
(17,10,2),
(18,11,2),
(19,12,2),
(20,13,2),
(21,13,1),
(22,4,2),
(23,5,2),
(24,6,2),
(25,14,2),
(26,2,1),
(27,3,1),
(28,15,2),
(29,16,2),
(30,17,2),
(31,18,2),
(32,19,2),
(33,4,1),
(34,20,2),
(35,21,2),
(36,21,1),
(37,22,2),
(38,23,2),
(39,24,2),
(40,24,1),
(41,25,2),
(42,26,2),
(43,27,2),
(44,28,2),
(45,29,1),
(46,1,2),
(47,2,2);

/*Table structure for table `kritike` */

DROP TABLE IF EXISTS `kritike`;

CREATE TABLE `kritike` (
  `critic_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `rating` int NOT NULL,
  `review_text` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`critic_id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `kritike_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `korisnici` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `kritike_ibfk_4` FOREIGN KEY (`book_id`) REFERENCES `knjige` (`book_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb3;

/*Data for the table `kritike` */

insert  into `kritike`(`critic_id`,`user_id`,`book_id`,`rating`,`review_text`,`created_at`) values 
(1,2,1,5,'Amazing book! A must-read for everyone.','2024-07-20 17:12:20'),
(2,3,2,4,'Great story but a bit too long.','2024-07-20 17:12:20'),
(33,13,40,4,'1984 Georgea Orwella je distopijski roman koji prikazuje mračnu i totalitarnu budućnost u kojoj vlada Veliki Brat, a sloboda misli ne postoji. Radnja prati Winstona Smitha, običnog građanina koji počinje propitivati režim u kojem živi. Orwellova vizija svijeta pod stalnim nadzorom, gdje su čak i misli podložne kontroli, izvanredno oslikava opasnosti apsolutne moći i gubitka individualnih sloboda. \"1984\" je otrežnjujuće upozorenje o tome koliko daleko može otići represija i manipulacija društvom, a njegova relevantnost ostaje neupitna i danas.','2024-08-11 18:42:13'),
(37,8,16,2,'fadsdfads','2024-08-13 18:51:18'),
(39,8,13,4,'','2024-08-18 16:28:26'),
(40,8,10,5,'Test','2024-08-19 16:26:52'),
(42,8,36,4,'1984 by George Orwell is a powerful and haunting dystopian novel that continues to resonate deeply with readers decades after its publication. Set in a bleak, totalitarian world where the government, led by the omnipresent Party and its leader Big Brother, exerts total control over every aspect of life, Orwell\'s work explores themes of oppression, surveillance, and the erosion of individual freedom.','2024-08-20 19:36:29'),
(43,8,15,4,'Great book!','2024-08-20 19:56:18'),
(44,8,15,5,'amazing, would read again!','2024-08-20 19:56:26'),
(45,15,46,4,'Hello, this is a test review!','2024-09-11 17:54:11'),
(48,20,46,3,'i love this book!','2024-09-15 18:49:21'),
(49,21,46,5,'Great book, am loving it!!','2024-09-15 18:52:46'),
(50,23,46,0,'am loving this book sofar','2024-09-15 18:58:08'),
(51,24,46,3,'I\'m loving this book!!','2024-09-15 19:15:18'),
(52,25,47,5,'best shit ever omg so hot','2025-02-17 11:14:25'),
(54,29,49,5,'1984 by George Orwell is a powerful and haunting dystopian novel that continues to resonate deeply with readers decades after its publication. Set in a bleak, totalitarian world where the government, led by the omnipresent Party and its leader Big Brother, exerts total control over every aspect of life, Orwell\'s work explores themes of oppression, surveillance, and the erosion of individual freedom.\n\n','2026-01-11 13:21:10');

/*Table structure for table `lajk_kritike` */

DROP TABLE IF EXISTS `lajk_kritike`;

CREATE TABLE `lajk_kritike` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `critic_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  KEY `critic_id` (`critic_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `lajk_kritike_ibfk_1` FOREIGN KEY (`critic_id`) REFERENCES `kritike` (`critic_id`),
  CONSTRAINT `lajk_kritike_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `korisnici` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb3;

/*Data for the table `lajk_kritike` */

insert  into `lajk_kritike`(`like_id`,`critic_id`,`user_id`,`created_at`) values 
(1,1,3,'2024-07-20 19:12:20'),
(2,2,2,'2024-07-20 19:12:20'),
(82,33,13,'2024-08-11 20:42:28'),
(103,40,8,'2024-08-19 18:27:11'),
(104,42,8,'2024-08-20 21:40:39'),
(105,45,15,'2024-09-11 19:54:21'),
(109,45,20,'2024-09-15 20:49:26'),
(111,51,24,'2024-09-15 21:15:22'),
(113,52,25,'2025-02-17 12:14:28'),
(115,42,29,'2026-01-11 14:28:57');

/*Table structure for table `liste` */

DROP TABLE IF EXISTS `liste`;

CREATE TABLE `liste` (
  `list_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`list_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `liste_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `korisnici` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;

/*Data for the table `liste` */

insert  into `liste`(`list_id`,`user_id`,`title`,`description`,`created_at`) values 
(12,8,'doctor who books','best dr.who books','2024-08-04 18:03:53'),
(16,13,'Najbolje knjige','Ovo je lista najboljih knjiga','2024-08-11 21:14:25'),
(17,8,'Najbolje knjige','Lista najboljih knjiga','2024-08-13 22:42:17'),
(21,4,'lista karlo_cvitak','dead','2024-08-15 13:28:37'),
(22,8,'Lista najboljih knjiga','lista','2024-08-19 18:30:29'),
(23,18,'Najbolje knjige','lista najboljih knjiga','2024-09-15 20:40:30'),
(24,24,'najbolje knjige','lsita najboljih kjiga','2024-09-15 21:19:40'),
(25,25,'Best communist literature','','2025-02-17 12:13:49'),
(26,29,'Lista lektira za maturu 2025/2026','Popis djela za esej na maturi u 2026.\n','2026-01-11 14:25:10');

/*Table structure for table `pracenja` */

DROP TABLE IF EXISTS `pracenja`;

CREATE TABLE `pracenja` (
  `follow_id` int NOT NULL AUTO_INCREMENT,
  `follower_id` int NOT NULL,
  `followed_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follow_id`),
  KEY `follower_id` (`follower_id`),
  KEY `followed_id` (`followed_id`),
  CONSTRAINT `pracenja_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `korisnici` (`user_id`),
  CONSTRAINT `pracenja_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `korisnici` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;

/*Data for the table `pracenja` */

insert  into `pracenja`(`follow_id`,`follower_id`,`followed_id`,`created_at`) values 
(1,2,3,'2024-07-20 19:12:20'),
(2,3,2,'2024-07-20 19:12:20'),
(5,4,4,'2024-07-27 17:44:03'),
(6,4,4,'2024-07-27 17:44:28'),
(7,4,4,'2024-07-27 17:44:58'),
(9,4,4,'2024-07-27 17:45:00'),
(10,4,4,'2024-07-27 17:45:01'),
(29,4,8,'2024-08-03 19:18:28'),
(34,13,11,'2024-08-11 16:34:05'),
(35,13,4,'2024-08-11 16:35:08'),
(37,18,4,'2024-09-15 20:40:52'),
(38,18,9,'2024-09-15 20:41:02'),
(39,19,18,'2024-09-15 20:43:47'),
(40,21,18,'2024-09-15 20:53:25'),
(41,24,18,'2024-09-15 21:16:07'),
(42,24,9,'2024-09-15 21:25:54'),
(43,24,13,'2024-09-15 21:26:19'),
(45,29,8,'2026-01-11 14:17:21');

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `role` */

insert  into `role`(`role_id`,`role_name`) values 
(1,'Admin'),
(2,'User');

/*Table structure for table `statusi` */

DROP TABLE IF EXISTS `statusi`;

CREATE TABLE `statusi` (
  `status_id` int NOT NULL AUTO_INCREMENT,
  `status_name` varchar(50) NOT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `status_name` (`status_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

/*Data for the table `statusi` */

insert  into `statusi`(`status_id`,`status_name`) values 
(2,'Currently Reading'),
(1,'Read'),
(3,'Want to Read');

/*Table structure for table `zanr_knjiga` */

DROP TABLE IF EXISTS `zanr_knjiga`;

CREATE TABLE `zanr_knjiga` (
  `genre_id` int NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(50) NOT NULL,
  PRIMARY KEY (`genre_id`),
  UNIQUE KEY `genre_name` (`genre_name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `zanr_knjiga` */

insert  into `zanr_knjiga`(`genre_id`,`genre_name`) values 
(1,'Fantasy'),
(2,'Science Fiction');

/*Table structure for table `zanr_knjiga_has_knjige` */

DROP TABLE IF EXISTS `zanr_knjiga_has_knjige`;

CREATE TABLE `zanr_knjiga_has_knjige` (
  `genre_id` int NOT NULL,
  `book_id` int NOT NULL,
  KEY `genre_id` (`genre_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `zanr_knjiga_has_knjige_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `zanr_knjiga` (`genre_id`),
  CONSTRAINT `zanr_knjiga_has_knjige_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `knjige` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `zanr_knjiga_has_knjige` */

insert  into `zanr_knjiga_has_knjige`(`genre_id`,`book_id`) values 
(1,1),
(1,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
