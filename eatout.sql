-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 05, 2021 at 03:32 PM
-- Server version: 8.0.22
-- PHP Version: 7.3.24-(to be removed in future macOS)

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eatout`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int NOT NULL,
  `category_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`) VALUES
(1, 'Bar'),
(2, 'Buffet'),
(3, 'Cafe'),
(4, 'Chinese'),
(5, 'Desserts'),
(6, 'Fast Food'),
(7, 'Fusion'),
(8, 'Halal'),
(9, 'Indian'),
(10, 'Italian'),
(11, 'Japanese'),
(12, 'Kids-friendly'),
(13, 'Malay'),
(14, 'Mediterranean'),
(15, 'Supper'),
(16, 'Thai'),
(17, 'Vietnamese'),
(18, 'Western');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `restaurant_id` int NOT NULL,
  `restaurant_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurant_address` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `restaurant_telephone` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `restaurant_menu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `restaurant_url` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `restaurant_ig` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `restaurant_photo_1` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `restaurant_photo_2` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`restaurant_id`, `restaurant_name`, `restaurant_address`, `restaurant_telephone`, `restaurant_menu`, `restaurant_url`, `restaurant_ig`, `restaurant_photo_1`, `restaurant_photo_2`) VALUES
(1, 'Ming Kee Chicken Rice', '511 Bishan Street 13, #01-522, Kim San Leng Coffee Shop, Singapore 570511', NULL, NULL, NULL, NULL, '/images/restaurants/1@2x.png', '/images/restaurants/1@2x.png'),
(2, 'Vatos Urban Tacos', '36 Beach Rd Singapore 189766', '6385 6010', 'http://vatossg.com/menu/', NULL, NULL, '/images/restaurants/2@2x.png', '/images/restaurants/1@2x.png'),
(3, 'New Ubin Seafood', '30 Victoria Street #02-01B/C Singapore 187996', '9740 6870', NULL, 'https://www.newubinseafood.com', NULL, '/images/restaurants/3@2x.png', '/images/restaurants/4@2x.png'),
(4, 'The Malayan Council', '71 Bussorah Street Singapore 199484', '9009 7345', '', 'https://themalayancouncil.sg/', 'https://www.instagram.com/themalayancouncil/', '/images/restaurants/4@2x.png', NULL),
(5, 'Ya Kun Kaya Toast', '252 North Bridge Road #B1-18 Singapore 179103', '6781 1475', NULL, NULL, NULL, '/images/restaurants/5@2x.png', NULL),
(6, 'Cake Spade', '83 Tanjong Pagar Road, Singapore 088504', NULL, NULL, 'http://www.cakespade.com/', 'https://www.instagram.com/cakespadesg/?hl=en', '/images/restaurants/d2.png', NULL),
(7, 'KURA', '46 Kim Yam Road, #01-07 The Herencia, Singapore 239351', NULL, NULL, 'https://kura.sg/', 'https://www.instagram.com/kura.singapore/', '/images/restaurants/d3.png', '/images/restaurant/d4.png'),
(8, 'The Dark Gallery', 'Millenia Walk #01-K5, Takashimaya Shopping Centre #B2-29\r\nFunan #01-14, Great World City #01-117/118', NULL, NULL, 'https://thedarkgallery.com/', 'https://www.instagram.com/discoverthedark/', '/images/restaurants/d5.png', NULL),
(11, 'Satay Burger (The Quarters)', 'Icon Village, 16 Enggor Street #01-09 Singapore 079717 (Next to Cold Storage)', '6834 4174', NULL, 'http://www.thequarters.sg/', NULL, '/images/restaurants/12.png', NULL),
(12, 'Orange Kaya Pisang Creme Brulee', '458 Joo Chiat Road, Singapore 427671', '6345 5034', NULL, 'http://www.sinpopo.com/', NULL, '/images/restaurants/7.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_category`
--

CREATE TABLE `restaurant_category` (
  `rc_restaurant_id` int NOT NULL,
  `rc_category_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `restaurant_category`
--

INSERT INTO `restaurant_category` (`rc_restaurant_id`, `rc_category_id`) VALUES
(1, 4),
(2, 7),
(3, 4),
(4, 8),
(4, 7),
(5, 4),
(6, 5),
(7, 5),
(6, 3),
(7, 3),
(8, 3),
(8, 5),
(6, 5),
(7, 5),
(6, 3),
(7, 3),
(8, 3),
(8, 5),
(12, 7),
(12, 4),
(11, 7),
(11, 3),
(12, 7),
(12, 4),
(11, 7),
(11, 3);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `user_id` int NOT NULL,
  `review_rating` tinyint NOT NULL,
  `review_title` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `review_writeup` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `review_photo_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `review_photo_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `review_visited` date NOT NULL,
  `review_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `review_useful` int DEFAULT NULL,
  `review_status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `restaurant_id`, `user_id`, `review_rating`, `review_title`, `review_writeup`, `review_photo_1`, `review_photo_2`, `review_visited`, `review_added`, `review_useful`, `review_status`) VALUES
(1, 4, 1, 2, 'Good Service! ', 'Pleasant ambience. Good service. Awesome staffs! The place is cosy ', NULL, NULL, '2021-02-11', '2021-02-20 22:24:09', NULL, 0),
(2, 2, 4, 4, 'Something different', 'If you\'re looking for something different, look no further! Fresh ingredients and great service. ', NULL, NULL, '2021-02-08', '2021-02-21 11:03:09', NULL, 0),
(3, 4, 4, 4, 'Fragrant chicken rice!', 'The cakes here are fantastic. Slightly overpriced but huge portions. Share if you can!', NULL, NULL, '2021-02-01', '2021-02-21 11:04:16', NULL, 0),
(4, 3, 1, 4, 'Nice chilli crab!', 'Expensive but tasty food! Would recommend to try for special occassions.', '', '', '2021-02-01', '2021-02-21 11:12:26', NULL, 0),
(16, 5, 1, 5, 'Fantastic eggs!', 'Awesome experience. ', '', '', '2021-03-03', '2021-03-04 00:18:48', NULL, 0),
(18, 2, 1, 5, 'Awesome tacos!', 'What\'s a taco? ', '', '', '2021-03-04', '2021-03-04 01:16:25', NULL, 0),
(19, 1, 1, 1, 'Fantastic! ', 'Tastes like chicken rice.', '', '', '2021-03-02', '2021-03-04 19:10:57', NULL, 0),
(21, 1, 4, 1, 'Was alright', 'Chicken rice is awesome.', '', '', '2021-03-04', '2021-03-05 00:13:01', NULL, 0),
(22, 5, 4, 5, 'I love kaya toast ', 'The eggs were kinda nice too!', '', '', '2021-03-05', '2021-03-05 00:44:18', NULL, 0),
(23, 6, 1, 5, 'Pretty cakes', 'Fantastic! ', '', '', '2021-03-03', '2021-03-05 13:39:27', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_login` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `user_email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_firstname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_lastname` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_gender` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_mobile` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_login`, `user_password`, `user_role`, `user_email`, `user_firstname`, `user_lastname`, `user_gender`, `user_mobile`, `user_address`, `user_photo`, `user_status`) VALUES
(1, 'testuser', '$2b$10$H6Uhj75jG6QnqUbFtFQMieRQAN71TD8onT62ZDXRk3kwuX/TrHeKC', 'admin', 'test3@test.com', 'Putra', 'User', 'Male', '99999999', '22 Sin Ming', '/images/users/1.png', 0),
(4, 'testuser2', '$2b$10$H6Uhj75jG6QnqUbFtFQMieRQAN71TD8onT62ZDXRk3kwuX/TrHeKC', 'user', 'tes2t@test.com', 'Zahra', 'Bambam', 'female', '91111111', '614 Tampines', '/images/users/2.png', 0),
(5, 'testuser3', '$2b$10$RBGbkd6TcKG0L42yRoYOQeuvwAGjT0EcFlEGeLo5wGQD57VbRMKTu', 'user', 'tes4t@test.com', 'Test2', 'User2', 'female', '91111111', '22 Sin Ming', '/images/users/1.png', 0),
(6, 'testuser4', '$2b$10$6m/tD8s0lrUs0rxgVXP6e.7uLG.PUG9mCUfMhIBt2SpoNd.njPkcS', 'user', 'test@test', 'first', 'last', 'Unknown', '9111111', 'Singapore', '/images/users/2.png', 0),
(7, 'testuser5', '$2b$10$41FLmz/M5wgQSmIubetCYerk4rjPUExpaICT4.hc00K2Tzdn/kccG', 'user', 'tes2t@test.com', 'Test2', 'User2', 'female', '91111111', '22 Sin Ming', NULL, 0),
(11, 'MrTan', '$2b$10$BOTCWhB9/ruGpGHK5S0GYuCY4CNdF7DD9Ib4fSZZCEyc4D3nFnJZC', 'user', 'we@poorthing.com', 'John', 'Smith', 'female', '91111111', '22 Sin Ming', NULL, 0),
(14, 'Test99', '$2b$10$d6ldfnV8Nx68wub.TK99e.P263zh1fmfmHmL4e4hJoMHrhmOEOSFa', 'user', 'test@test.com', 'Oyen', 'Cat', 'Male', '9191919191', '123 Lane ', NULL, 0),
(16, 'James ', '$2b$10$v4OU80v3E16vGJi1gaBQ4eVrhT0SIGWdyzAppNMYLOG5GkHwJzS0y', 'user', '007@gmail.com', 'James', 'Bond', 'Male', '88888888', 'Woodlands Ring Road ', NULL, 0),
(17, 'Jamie', '$2b$10$Z3YNEUOR4ydLdzxg64Hf0O0lV5xVyHilUZ.EPmYd0w4SSnhzu1zTS', 'user', 'jamie@oliver.com', 'Jamie', 'Oliver', 'Male', '88881111', 'Bedok South ', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurant_id`);

--
-- Indexes for table `restaurant_category`
--
ALTER TABLE `restaurant_category`
  ADD KEY `rc_restaurant_id_idx` (`rc_restaurant_id`),
  ADD KEY `rc_category_id_idx` (`rc_category_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `restaurant_id_idx` (`restaurant_id`),
  ADD KEY `user_id_idx` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `restaurant_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `restaurant_category`
--
ALTER TABLE `restaurant_category`
  ADD CONSTRAINT `rc_category_id` FOREIGN KEY (`rc_category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `rc_restaurant_id` FOREIGN KEY (`rc_restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
