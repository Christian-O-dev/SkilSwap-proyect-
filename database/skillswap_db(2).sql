-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 15-06-2026 a las 15:00:49
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `skillswap_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `desired_skills`
--

CREATE TABLE `desired_skills` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `desired_skills`
--

INSERT INTO `desired_skills` (`id`, `user_id`, `category`, `title`, `created_at`) VALUES
(4, 9, 'Música', 'Piano', '2026-06-12 16:32:18'),
(5, 10, 'Idiomas', 'Japonés', '2026-06-12 16:38:09'),
(6, 1, 'Música', NULL, '2026-06-12 16:52:42'),
(7, 1, 'Deportes', 'Natación', '2026-06-12 16:52:42'),
(8, 3, 'Deportes', 'Natación', '2026-06-12 16:53:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exchanges`
--

CREATE TABLE `exchanges` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `agreed_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `exchanges`
--

INSERT INTO `exchanges` (`id`, `request_id`, `agreed_at`, `status`) VALUES
(1, 8, '2026-06-02 17:09:29', 'completed'),
(2, 7, '2026-06-02 17:09:31', 'completed'),
(3, 6, '2026-06-02 17:09:51', 'completed'),
(4, 5, '2026-06-02 17:09:52', 'completed'),
(5, 4, '2026-06-02 17:09:53', 'completed'),
(6, 3, '2026-06-02 17:09:54', 'completed'),
(7, 12, '2026-06-12 14:34:06', 'pending'),
(8, 2, '2026-06-12 14:34:08', 'pending'),
(9, 1, '2026-06-12 14:34:09', 'pending'),
(10, 11, '2026-06-12 14:35:26', 'pending'),
(11, 14, '2026-06-12 14:36:11', 'pending'),
(12, 13, '2026-06-12 14:36:11', 'pending');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `exchange_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `exchange_id`, `sender_id`, `content`, `created_at`) VALUES
(1, 5, 3, 'ASDASDASD', '2026-06-12 14:30:21'),
(2, 5, 3, 'ASDASDSA', '2026-06-12 14:30:28'),
(3, 1, 3, 'ASDASDASD', '2026-06-12 14:30:38'),
(4, 6, 2, 'QWEQWRWQEREW', '2026-06-12 14:31:34'),
(5, 6, 2, 'QWEQWEQWEQWE', '2026-06-12 14:32:17'),
(6, 1, 3, 'QWEQWE', '2026-06-12 14:33:12'),
(7, 2, 3, 'QWEQWE', '2026-06-12 14:33:19'),
(8, 3, 3, 'QWEQWE', '2026-06-12 14:33:26'),
(9, 4, 3, 'QWEQWEQWE', '2026-06-12 14:33:31'),
(10, 5, 3, 'QWEQWEQWE', '2026-06-12 14:33:38'),
(11, 9, 1, 'HOLA SI', '2026-06-12 14:34:23'),
(12, 8, 1, 'HOLA NO', '2026-06-12 14:34:33'),
(13, 7, 1, 'HOLAAA', '2026-06-12 14:34:39'),
(14, 10, 3, 'HOLAAAAA', '2026-06-12 14:35:35'),
(15, 12, 2, 'ASDASDASD', '2026-06-12 14:36:18'),
(16, 11, 2, 'ASDASD', '2026-06-12 14:36:21'),
(17, 10, 2, 'SIIIII', '2026-06-12 14:36:28'),
(18, 9, 2, 'NOOOO', '2026-06-12 14:36:34'),
(19, 8, 2, 'ASDASDASD', '2026-06-12 14:36:39'),
(20, 7, 2, 'ASDASDASD', '2026-06-12 14:36:42'),
(21, 12, 3, 'ASDASDASD', '2026-06-12 14:39:11'),
(22, 10, 3, 'ASDASDASD', '2026-06-12 14:39:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `exchange_id` int(11) NOT NULL,
  `rated_by` int(11) NOT NULL,
  `rated_to` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Volcado de datos para la tabla `ratings`
--

INSERT INTO `ratings` (`id`, `exchange_id`, `rated_by`, `rated_to`, `score`, `comment`, `created_at`) VALUES
(1, 5, 3, 1, 2, 'asdfasdfasdf', '2026-06-02 17:15:32'),
(2, 4, 3, 1, 4, 'SDasdaSDAs', '2026-06-02 17:15:39'),
(3, 3, 3, 1, 3, 'asdfasdfsadfsad', '2026-06-02 17:15:45'),
(4, 2, 3, 1, 5, 'aSDAsdasD', '2026-06-02 17:15:51'),
(5, 6, 1, 2, 5, NULL, '2026-06-02 17:16:18'),
(6, 5, 1, 3, 3, 'ASDASD', '2026-06-02 17:16:24'),
(7, 4, 1, 3, 3, 'ASDASD', '2026-06-02 17:16:29'),
(8, 3, 1, 3, 2, 'ASDASDASD', '2026-06-02 17:16:34'),
(9, 6, 2, 1, 5, 'QWEQWEQWEQWE', '2026-06-12 14:31:30'),
(10, 1, 3, 1, 5, 'QWEQWEQWE', '2026-06-12 14:33:07'),
(11, 2, 1, 3, 5, NULL, '2026-06-12 14:34:59'),
(12, 1, 1, 3, 5, NULL, '2026-06-12 14:35:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `requester_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `status` enum('open','accepted','rejected') NOT NULL DEFAULT 'open',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `requests`
--

INSERT INTO `requests` (`id`, `requester_id`, `skill_id`, `status`, `created_at`) VALUES
(1, 2, 2, 'accepted', '2026-06-02 15:53:21'),
(2, 2, 1, 'accepted', '2026-06-02 15:54:14'),
(3, 2, 2, 'accepted', '2026-06-02 15:54:16'),
(4, 3, 3, 'accepted', '2026-06-02 17:00:56'),
(5, 3, 2, 'accepted', '2026-06-02 17:00:58'),
(6, 3, 1, 'accepted', '2026-06-02 17:00:59'),
(7, 1, 4, 'accepted', '2026-06-02 17:01:33'),
(8, 1, 4, 'accepted', '2026-06-02 17:01:55'),
(9, 3, 5, 'open', '2026-06-12 14:29:35'),
(10, 2, 5, 'open', '2026-06-12 14:31:08'),
(11, 2, 4, 'accepted', '2026-06-12 14:31:10'),
(12, 2, 3, 'accepted', '2026-06-12 14:31:11'),
(13, 3, 6, 'accepted', '2026-06-12 14:32:50'),
(14, 1, 6, 'accepted', '2026-06-12 14:33:56'),
(15, 1, 5, 'open', '2026-06-12 14:33:57'),
(16, 1, 7, 'open', '2026-06-12 14:49:35'),
(17, 3, 8, 'open', '2026-06-12 14:50:13'),
(18, 3, 10, 'open', '2026-06-12 15:27:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `level` enum('Starter','Intermediate','Advanced') NOT NULL DEFAULT 'Starter',
  `format` enum('Online','Presencial') NOT NULL DEFAULT 'Online',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `skills`
--

INSERT INTO `skills` (`id`, `user_id`, `title`, `description`, `category`, `level`, `format`, `created_at`, `location`) VALUES
(1, 1, 'Guitarra clasica', 'asdasdasd', 'Tecnología', 'Starter', 'Online', '2026-06-02 15:51:41', NULL),
(2, 1, 'PHP', 'asdasdasdsfgdfdgjdfg', 'Tecnología', 'Starter', 'Online', '2026-06-02 15:51:51', NULL),
(3, 1, 'diseño graficoa', 'sdasdasd', 'Tecnología', 'Intermediate', 'Online', '2026-06-02 17:00:02', NULL),
(4, 3, 'react', 'asdasdasd', 'Tecnología', 'Advanced', 'Presencial', '2026-06-02 17:01:08', NULL),
(5, 5, 'Piano', 'asdasd', 'Música', 'Starter', 'Online', '2026-06-12 14:18:21', NULL),
(6, 2, 'Fotografía', 'QWEQWEQWE', 'Arte y Diseño', 'Starter', 'Online', '2026-06-12 14:32:33', NULL),
(7, 3, 'Japonés', 'ASDASDASDAS', 'Idiomas', 'Intermediate', 'Presencial', '2026-06-12 14:49:14', 'comte de güell 35'),
(8, 1, 'Natación', 'ASDASDASD', 'Deportes', 'Starter', 'Presencial', '2026-06-12 14:49:59', NULL),
(9, 3, 'Producción Musical', 'asdasdasdasd', 'Música', 'Starter', 'Presencial', '2026-06-12 15:11:27', 'Carrer de Manuel Arnús, Sant Gervasi - la Bonanova, Sarrià - Sant Gervasi, Barcelona, Barcelonés, Barcelona, Cataluña, 08022, España'),
(10, 1, 'Cocina', 'asdasdasd', 'Oficios', 'Advanced', 'Presencial', '2026-06-12 15:14:09', 'comte del sert 25 barcelona'),
(11, 7, 'Italiano', 'sdfasdfsadf', 'Idiomas', 'Intermediate', 'Presencial', '2026-06-12 16:19:07', '3X, Carrer de l\'Enginyeria, Sant Gervasi - la Bonanova, Sarrià - Sant Gervasi, Barcelona, Barcelonés, Barcelona, Cataluña, 08022, España'),
(12, 9, 'Fontanería', 'asdasdsa', 'Oficios', 'Starter', 'Online', '2026-06-12 16:32:11', NULL),
(13, 10, 'Alemán', 'dsfhgsdfhsdfg', 'Idiomas', 'Starter', 'Online', '2026-06-12 16:37:56', NULL),
(14, 3, 'Violín', 'asdasdasdasd', 'Música', 'Starter', 'Online', '2026-06-12 16:51:55', NULL),
(15, 1, 'Natación', 'asdasdas', 'Deportes', 'Starter', 'Presencial', '2026-06-12 16:52:24', '18-10, Carrer de Manuel Arnús, Sant Gervasi - la Bonanova, Sarrià - Sant Gervasi, Barcelona, Barcelonés, Barcelona, Cataluña, 08022, España');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 2,
  `is_blocked` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role_id`, `is_blocked`, `created_at`) VALUES
(1, 'chritian3', 'asdasfsdf@asfsadfsdfasdf.com', '$2b$10$wMsTXPLIFKLn4V/1Zyzswuo9.PED92CwO5B2t13VvIuX4lYOEFZgu', 2, 0, '2026-06-02 15:48:54'),
(2, 'chrstian3', 'asdasdas@gmail.com', '$2b$10$jDHMQ2ncFA.XfiWtDLyKeOrrv9KCn8REUB7wBiuTHMWESDcWPj7we', 2, 0, '2026-06-02 15:53:15'),
(3, 'christian', 'sdfgdsfgdfg@gmail.com', '$2b$10$.5gR6Lq3Vch5j0Y7w7V83eEGYUBcJ57eQ0IvDDwp400SK1dtmFH0.', 2, 0, '2026-06-02 17:00:50'),
(4, 'admin_root', 'admin_root@skillswap.local', '$2b$10$A13uzRydDnJ6qiSBHlte.e1JCLQrop5PrUVEk/Iptn353QP3SpZpy', 1, 0, '2026-06-02 17:26:09'),
(5, 'chritian4', 'ortizortuno4@gmail.copm', '$2b$10$dkA2IflaMvnd9nfPFgLIrOUpY8QMA.pD6Shwz/8OZ4.VylXYe4Njq', 2, 0, '2026-06-12 14:08:13'),
(6, 'christian6', 'ortizortuno6@gmail.com', '$2b$10$V6y.OBMEHn05VdSrDMaCz.YwanlYip2CrjA2i3U3r2qTvOSJbbumS', 2, 0, '2026-06-12 15:53:07'),
(7, 'christian7', 'ortizortuno7@gmail.copm', '$2b$10$VbHSPPfzMF4AcmqE/f649.S8JhEweTK8fkebgOOv86r0fh.uL3eRa', 2, 0, '2026-06-12 16:16:43'),
(8, 'asdfasdfasfd', 'asdfasdfasdf@asdsadcom', '$2b$10$uWM2G8VXO2wSXycs7Kg6XOdsdN/4ppGTbK1KcCTcIBOxJrR2hS7LK', 2, 0, '2026-06-12 16:19:33'),
(9, 'dfhjdfhj', 'dfgjfhjgfhj@oksjlkjlk.com', '$2b$10$lLaaicgyhT47x4hcG7oLqO5xQ9ZujXqe.uvuOyBtywiLDjcV8bUni', 2, 0, '2026-06-12 16:29:33'),
(10, 'ghioyuiuytkiuy', 'guyiyukyujtyjyumu@gmail.com', '$2b$10$pfsVorc4GYqtuplaB981R.Yf3Mzyh5gelTxdLj/NZwutfZep82PKe', 2, 0, '2026-06-12 16:37:42');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `desired_skills`
--
ALTER TABLE `desired_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_desired_user` (`user_id`);

--
-- Indices de la tabla `exchanges`
--
ALTER TABLE `exchanges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_id` (`request_id`);

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_messages_exchange` (`exchange_id`),
  ADD KEY `fk_messages_sender` (`sender_id`);

--
-- Indices de la tabla `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_rating_exchange_user` (`exchange_id`,`rated_by`),
  ADD KEY `fk_ratings_rated_by` (`rated_by`),
  ADD KEY `fk_ratings_rated_to` (`rated_to`);

--
-- Indices de la tabla `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_requests_user` (`requester_id`),
  ADD KEY `fk_requests_skill` (`skill_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_skills_user` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_users_role` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `desired_skills`
--
ALTER TABLE `desired_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `exchanges`
--
ALTER TABLE `exchanges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `desired_skills`
--
ALTER TABLE `desired_skills`
  ADD CONSTRAINT `fk_desired_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `exchanges`
--
ALTER TABLE `exchanges`
  ADD CONSTRAINT `fk_exchanges_request` FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_exchange` FOREIGN KEY (`exchange_id`) REFERENCES `exchanges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `fk_ratings_exchange` FOREIGN KEY (`exchange_id`) REFERENCES `exchanges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ratings_rated_by` FOREIGN KEY (`rated_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ratings_rated_to` FOREIGN KEY (`rated_to`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `fk_requests_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_requests_user` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `fk_skills_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
