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

ALTER TABLE `users`
ADD PRIMARY KEY (`id`);
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

START TRANSACTION;

CREATE TABLE IF NOT EXISTS `campaigns` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `campaigns`
ADD PRIMARY KEY (`id`);

ALTER TABLE `campaigns`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

START TRANSACTION;

CREATE TABLE IF NOT EXISTS `vote_options` (
  `id` int(11) NOT NULL,
  `option_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `vote_options`
ADD PRIMARY KEY (`id`),
ADD KEY `campaign_id` (`campaign_id`);

ALTER TABLE `vote_options`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `vote_options`
ADD CONSTRAINT `vote_options_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`);



CREATE TABLE IF NOT EXISTS `user_votes` (
  `id` int(11) NOT NULL,
  `campaign_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `option_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

ALTER TABLE `user_votes`
ADD PRIMARY KEY (`id`),
ADD KEY `campaign_id` (`campaign_id`),
ADD KEY `user_id` (`user_id`),
ADD KEY `user_votes_ibfk_3` (`option_id`);

ALTER TABLE `user_votes`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user_votes`
ADD CONSTRAINT `user_votes_ibfk_1` FOREIGN KEY (`campaign_id`) REFERENCES `campaigns` (`id`),
ADD CONSTRAINT `user_votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
ADD CONSTRAINT `user_votes_ibfk_3` FOREIGN KEY (`option_id`) REFERENCES `vote_options` (`id`);


COMMIT;
START TRANSACTION;
INSERT INTO `users` (`id`, `hkid`, `createdAt`, `updatedAt`) VALUES
(1, 'de901dcb6e911e41d2e5390633d93356', '2020-12-01 00:00:00', '2020-12-02 00:00:00'),
(2, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(3, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(4, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(5, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(6, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(7, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(8, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(9, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(10, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(11, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(12, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(13, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(14, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(15, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(16, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(17, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(18, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(19, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(20, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(21, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(22, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(23, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(24, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(25, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(26, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(27, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(28, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(29, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(30, 'de901dcb6e911e41d2e5390633d93356', '2020-09-01 00:00:00', '2021-01-01 21:44:00');

INSERT INTO `campaigns` (`id`, `name`, `start_time`, `end_time`, `createdAt`, `updatedAt`) VALUES
(1, 'Who is the best NBA player in the history', '2020-12-01 00:00:00', '2020-12-02 00:00:00', '2020-12-01 00:00:00', '2020-12-01 00:00:00'),
(2, 'Which HK CEO candidate you are preferred.', '2020-09-01 00:00:00', '2021-01-01 21:44:00', '2020-12-01 00:00:00', '2020-12-01 00:00:00');

INSERT INTO `vote_options` (`id`, `option_name`, `campaign_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Michael Jordan', 1, '2020-12-01 05:11:06', '2020-12-01 05:11:06'),
(2, 'Kobe Bryant', 1, '2020-12-01 05:11:33', '2020-12-01 05:11:33'),
(3, 'Leborn James', 1, '2020-12-01 05:11:56', '2020-12-01 05:11:56'),
(4, 'Stephen Curry', 1, '2020-12-01 05:11:56', '2020-12-01 05:11:56'),
(5, 'Carrie Lam', 2, '2020-12-01 16:29:21', '2020-12-01 16:29:21'),
(6, 'John Tsang', 2, '2020-12-01 16:29:21', '2020-12-01 16:29:21'),
(7, 'Rebecca Ip', 2, '2020-12-02 00:00:00', '2020-12-02 00:00:00');

INSERT INTO `user_votes` (`id`, `user_id`, `campaign_id`, `option_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(2, 2, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(3, 3, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(4, 4, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(5, 5, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(6, 6, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(7, 7, 1, 3, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(8, 8, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(9, 9, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(10, 10, 1, 4, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(11, 11, 1, 4, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(12, 12, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(13, 13, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(14, 14, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(15, 15, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(16, 16, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(17, 17, 1, 3, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(18, 18, 1, 3, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(19, 19, 1, 4, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(20, 20, 1, 4, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(21, 21, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(22, 22, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(23, 23, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(24, 24, 1, 3, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(25, 25, 1, 4, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(26, 26, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(27, 27, 1, 2, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(28, 28, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(29, 29, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00'),
(30, 30, 1, 1, '2020-09-01 00:00:00', '2021-01-01 21:44:00');
COMMIT;
