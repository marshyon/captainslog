package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/marshyon/captainslog/models"
)

type CreateLogInput struct {
	Title    string `json:"title" binding:"required"`
	Author   string `json:"author" binding:"required"`
	Category string `json:"category" binding:"required"`
	Content  string `json:"content" binding:"required"`
}

type UpdateLogInput struct {
	Title    string `json:"title"`
	Author   string `json:"author"`
	Category string `json:"category"`
	Content  string `json:"content"`
}

// GET /logs
// Find all logs
func FindLogs(c *gin.Context) {
	var logs []models.Log
	models.DB.Find(&logs)

	c.JSON(http.StatusOK, gin.H{"data": logs})
}

// GET /logs/:id
// Find a log
func FindLog(c *gin.Context) {
	// Get model if exist
	var log models.Log
	if err := models.DB.Where("id = ?", c.Param("id")).First(&log).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": log})
}

// POST /logs
// Create new log
func CreateLog(c *gin.Context) {
	// Validate input
	var input CreateLogInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create log
	log := models.Log{
		Title:    input.Title,
		Author:   input.Author,
		Category: input.Category,
		Content:  input.Content,
	}
	models.DB.Create(&log)

	c.JSON(http.StatusOK, gin.H{"data": log})
}

// PATCH /logs/:id
// Update a log
func UpdateLog(c *gin.Context) {
	// Get model if exist
	var log models.Log
	if err := models.DB.Where("id = ?", c.Param("id")).First(&log).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	// Validate input
	var input UpdateLogInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	models.DB.Model(&log).Updates(input)

	c.JSON(http.StatusOK, gin.H{"data": log})
}

// DELETE /logs/:id
// Delete a log
func DeleteLog(c *gin.Context) {
	// Get model if exist
	var log models.Log
	if err := models.DB.Where("id = ?", c.Param("id")).First(&log).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	models.DB.Delete(&log)

	c.JSON(http.StatusOK, gin.H{"data": true})
}
