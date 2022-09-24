/*
 Navicat Premium Data Transfer

 Source Server         : localhostMariaDB
 Source Server Type    : MySQL
 Source Server Version : 100803
 Source Host           : localhost:3306
 Source Schema         : SMS

 Target Server Type    : MySQL
 Target Server Version : 100803
 File Encoding         : 65001

 Date: 16/08/2022 00:03
*/

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `class_id` int(11) NULL DEFAULT NULL,
  `createAt` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `creator_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `creator_id`(`creator_id`) USING BTREE,
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`user_uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------

-- ----------------------------
-- Table structure for course_member
-- ----------------------------
DROP TABLE IF EXISTS `course_member`;
CREATE TABLE `course_member`  (
  `id` int(11) NOT NULL,
  `course_id` int(11) NULL DEFAULT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `course_id`(`course_id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `course_member_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `course_member_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_uid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course_member
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_uid` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` int(11) NOT NULL,
  PRIMARY KEY (`user_uid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('ec4f5fc4-e17c-4424-95ac-853989dbbee6', 'sms_admin', '080b6dca473e799d813b811315846ec5', 1);

SET FOREIGN_KEY_CHECKS = 1;
