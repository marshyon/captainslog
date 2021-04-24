package main

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/marshyon/captainslog/controller"
	model "github.com/marshyon/captainslog/model"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {

	api_url := os.Getenv("API_URL")
	fmt.Println(api_url)
	r := gin.Default()

	// CORS for https://foo.com and https://github.com origins, allowing:
	// - PUT and PATCH methods
	// - Origin header
	// - Credentials share
	// - Preflight requests cached for 12 hours
	r.Use(cors.New(cors.Config{

		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc:  func(origin string) bool { return true },
		MaxAge:           12 * time.Hour,
	}))

	r.LoadHTMLGlob("templates/*")

	// Connect to database
	model.ConnectDatabase()

	// API Routes
	r.GET("/logs", controller.FindLogs)
	r.GET("/logs/:id", controller.FindLog)
	r.POST("/logs", controller.CreateLog)
	r.PATCH("/logs/:id", controller.UpdateLog)
	r.DELETE("/logs/:id", controller.DeleteLog)
	// Main Site Routes
	// r.StaticFile("/index.html", "./html/index.html")
	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", gin.H{
			"title": "Awooga",
		})
	})

	r.Use(static.Serve("/", static.LocalFile("html", false)))

	// Run the server
	r.Run()
}
