-- wuhan_life 表结构

USE wuhan_life;

-- 区域表
CREATE TABLE IF NOT EXISTS districts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    `order` INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 夜市表
CREATE TABLE IF NOT EXISTS markets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    districtId INT,
    address VARCHAR(200),
    description TEXT,
    openHours VARCHAR(50),
    bestTime VARCHAR(50),
    traffic VARCHAR(200),
    tips TEXT,
    latitude FLOAT,
    longitude FLOAT,
    images TEXT,
    rating FLOAT DEFAULT 0,
    viewCount INT DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_district (districtId),
    INDEX idx_rating (rating),
    FOREIGN KEY (districtId) REFERENCES districts(id) ON DELETE CASCADE
);

-- 小吃表
CREATE TABLE IF NOT EXISTS foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    marketId INT NOT NULL,
    shopName VARCHAR(100),
    price VARCHAR(50),
    description TEXT,
    tags TEXT,
    images TEXT,
    rating FLOAT DEFAULT 0,
    recommend INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_market (marketId),
    INDEX idx_rating (rating),
    FOREIGN KEY (marketId) REFERENCES markets(id) ON DELETE CASCADE
);

-- 跑山路线表
CREATE TABLE IF NOT EXISTS routes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    direction VARCHAR(20),
    distance INT,
    duration VARCHAR(50),
    difficulty INT DEFAULT 1,
    description TEXT,
    roadCondition TEXT,
    bestSeason VARCHAR(100),
    tips TEXT,
    startpoint VARCHAR(200),
    endpoint VARCHAR(200),
    coordinates TEXT,
    images TEXT,
    rating FLOAT DEFAULT 0,
    viewCount INT DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_direction (direction),
    INDEX idx_difficulty (difficulty),
    INDEX idx_rating (rating)
);

-- 途经点表
CREATE TABLE IF NOT EXISTS waypoints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    routeId INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    latitude FLOAT,
    longitude FLOAT,
    `order` INT DEFAULT 0,
    isHighlight BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_route (routeId),
    FOREIGN KEY (routeId) REFERENCES routes(id) ON DELETE CASCADE
);

-- 评价表
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(100) NOT NULL,
    targetType VARCHAR(20) NOT NULL,
    targetId INT NOT NULL,
    rating INT NOT NULL,
    content TEXT,
    images TEXT,
    likes INT DEFAULT 0,
    isAnonymous BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_target (targetType, targetId),
    INDEX idx_user (userId)
);

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) PRIMARY KEY,
    nickname VARCHAR(100),
    avatar VARCHAR(200),
    phone VARCHAR(20),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 收藏表
CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(100) NOT NULL,
    targetType VARCHAR(20) NOT NULL,
    targetId INT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (userId, targetType, targetId),
    INDEX idx_user (userId),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- 插入初始区域数据
INSERT INTO districts (name, `order`) VALUES
('Jianghan', 1),
('Wuchang', 2),
('Jiangan', 3),
('Qiaokou', 4),
('Hanyang', 5),
('Qingshan', 6),
('Hongshan', 7),
('Dongxihu', 8),
('Caidian', 9),
('Jiangxia', 10),
('Huangpi', 11),
('Xinzhou', 12),
('Hannan', 13)
ON DUPLICATE KEY UPDATE name=VALUES(name);
