-- ===================================================
-- PDFMaster Pro Database SQL Schema (MySQL 8.0+)
-- Developed by Suraj Vishwakarma
-- © 2026 PDFMaster Pro
-- ===================================================

CREATE DATABASE IF NOT EXISTS `pdfmaster_pro` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `pdfmaster_pro`;

-- ---------------------------------------------------
-- Table: users
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `passwordHash` VARCHAR(191) NULL,
  `name` VARCHAR(191) NOT NULL,
  `avatar` VARCHAR(191) NULL,
  `role` ENUM('ADMIN', 'STAFF', 'USER') NOT NULL DEFAULT 'USER',
  `isVerified` BOOLEAN NOT NULL DEFAULT FALSE,
  `otpCode` VARCHAR(191) NULL,
  `otpExpires` DATETIME(3) NULL,
  `refreshToken` VARCHAR(191) NULL,
  `storageUsedBytes` BIGINT NOT NULL DEFAULT 0,
  `storageLimitBytes` BIGINT NOT NULL DEFAULT 5368709120,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: plans
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `plans` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `priceMonthly` DOUBLE NOT NULL,
  `priceYearly` DOUBLE NOT NULL,
  `storageMb` INT NOT NULL,
  `dailyTaskLimit` INT NOT NULL,
  `featuresJson` TEXT NOT NULL,
  `isPopular` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: subscriptions
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `planId` VARCHAR(191) NOT NULL,
  `status` ENUM('ACTIVE', 'CANCELED', 'EXPIRED', 'PAST_DUE') NOT NULL DEFAULT 'ACTIVE',
  `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endDate` DATETIME(3) NOT NULL,
  `stripeSubId` VARCHAR(191) NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`planId`) REFERENCES `plans`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: folders
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `folders` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: files
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `files` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `folderId` VARCHAR(191) NULL,
  `name` VARCHAR(191) NOT NULL,
  `fileUrl` VARCHAR(191) NOT NULL,
  `fileSizeBytes` INT NOT NULL,
  `mimeType` VARCHAR(191) NOT NULL DEFAULT 'application/pdf',
  `pageCount` INT NULL,
  `isFavorite` BOOLEAN NOT NULL DEFAULT FALSE,
  `isTrash` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`folderId`) REFERENCES `folders`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: processing_history
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `processing_history` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `toolName` VARCHAR(191) NOT NULL,
  `fileName` VARCHAR(191) NOT NULL,
  `fileSizeBytes` INT NOT NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'COMPLETED',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: payments
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `payments` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `amount` DOUBLE NOT NULL,
  `currency` VARCHAR(191) NOT NULL DEFAULT 'USD',
  `stripePaymentId` VARCHAR(191) NULL,
  `status` VARCHAR(191) NOT NULL DEFAULT 'PAID',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: invoices
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `invoices` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `invoiceNum` VARCHAR(191) NOT NULL UNIQUE,
  `amount` DOUBLE NOT NULL,
  `pdfUrl` VARCHAR(191) NULL,
  `issuedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: notifications
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` VARCHAR(191) NOT NULL,
  `userId` VARCHAR(191) NOT NULL,
  `title` VARCHAR(191) NOT NULL,
  `message` VARCHAR(191) NOT NULL,
  `isRead` BOOLEAN NOT NULL DEFAULT FALSE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------
-- Table: categories & blog_posts
-- ---------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id` VARCHAR(191) NOT NULL,
  `categoryId` VARCHAR(191) NULL,
  `title` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `summary` TEXT NOT NULL,
  `content` TEXT NOT NULL,
  `coverImage` VARCHAR(191) NULL,
  `isPublished` BOOLEAN NOT NULL DEFAULT TRUE,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed Data
INSERT INTO `plans` (`id`, `name`, `slug`, `priceMonthly`, `priceYearly`, `storageMb`, `dailyTaskLimit`, `featuresJson`, `isPopular`, `createdAt`) VALUES
('plan_free', 'Free Explorer', 'free', 0, 0, 500, 10, '["Merge up to 5 files", "Basic PDF compression", "Standard support"]', FALSE, NOW()),
('plan_pro', 'Pro Professional', 'pro', 9.99, 99.00, 10240, 500, '["Unlimited PDF Merge & Split", "High-ratio Compression", "AI Summary & Chat", "Priority Support"]', TRUE, NOW()),
('plan_enterprise', 'Enterprise Team', 'enterprise', 29.99, 299.00, 102400, 10000, '["All Pro Features", "Batch API Access", "Dedicated Account Manager", "Custom Branding"]', FALSE, NOW());
