CREATE DATABASE IF NOT EXISTS voting;
USE voting;
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
START TRANSACTION;
SET time_zone = "+00:00";
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `hkid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*ALTER TABLE `users`
ADD PRIMARY KEY (`id`);*/


CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*INSERT INTO `campaigns` (`id`, `name`, `start_time`, `end_time`, `createdAt`, `updatedAt`) VALUES
(1, 'Who is the best NBA player in the history', '2020-12-01 00:00:00', '2020-12-02 00:00:00', '2020-12-01 00:00:00', '2020-12-01 00:00:00'),
(2, 'Which HK CEO candidate you are preferred.', '2020-09-01 00:00:00', '2021-01-01 21:44:00', '2020-12-01 00:00:00', '2020-12-01 00:00:00');*/

/*ALTER TABLE `campaigns`
ADD PRIMARY KEY (`id`);*/


CREATE TABLE IF NOT EXISTS `vote_options` (
  `id` int(11) NOT NULL,
  `option_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;*/

/*INSERT INTO `vote_options` (`id`, `option_name`, `campaign_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Michael Jordan', 1, '2020-12-01 05:11:06', '2020-12-01 05:11:06'),
(2, 'Kobe Bryant', 1, '2020-12-01 05:11:33', '2020-12-01 05:11:33'),
(3, 'Leborn James', 1, '2020-12-01 05:11:56', '2020-12-01 05:11:56'),
(4, 'Stephen Curry', 1, '2020-12-01 05:11:56', '2020-12-01 05:11:56'),
(5, 'Carrie Lam', 2, '2020-12-01 16:29:21', '2020-12-01 16:29:21'),
(6, 'John Tsang', 2, '2020-12-01 16:29:21', '2020-12-01 16:29:21'),
(7, 'Rebecca Ip', 2, '2020-12-02 00:00:00', '2020-12-02 00:00:00');*/

/*ALTER TABLE `vote_options`
ADD PRIMARY KEY (`id`),
ADD KEY `campaign_id` (`campaign_id`);
ALTER TABLE `vote_options`
ADD CONSTRAINT `vote_options_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`);*/


CREATE TABLE IF NOT EXISTS `user_votes` (
  `id` int(11) NOT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `option_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


/*ALTER TABLE `user_votes`
ADD PRIMARY KEY (`id`),
ADD KEY `campaign_id` (`campaign_id`),
ADD KEY `user_id` (`user_id`),
ADD KEY `user_votes_ibfk_3` (`option_id`);

ALTER TABLE `user_votes`
ADD CONSTRAINT `user_votes_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
ADD CONSTRAINT `user_votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
ADD CONSTRAINT `user_votes_ibfk_3` FOREIGN KEY (`option_id`) REFERENCES `vote_options` (`id`);*/
COMMIT;
