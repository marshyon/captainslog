package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/marshyon/captainslog/controller"
	"github.com/marshyon/captainslog/middleware"
	model "github.com/marshyon/captainslog/model"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

// func setupLogOutput() {
// 	f, err := os.Create("gin.log")
// 	if err != nil {
// 		fmt.Printf("failed to open file : %s\n", err)
// 		os.Exit(1)
// 	}
// 	// gin.DefaultWriter := io.MultiWriter(f, os.Stdout)
// 	gin.DefaultWriter := io.MultiWriter(f)
// }

func generateUserPassword() (user, password string) {

	rand.Seed(time.Now().UnixNano())
	chars := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"abcdefghijklmnopqrstuvwxyz" +
		"0123456789")
	length := 10
	var b strings.Builder
	for i := 0; i < length; i++ {
		b.WriteRune(chars[rand.Intn(len(chars))])
	}
	randomString := b.String()
	apiUser := "admin"
	fmt.Printf("generated api_user [%s]\n", apiUser)
	fmt.Printf("generated api_password [%s]\n", randomString)

	return "admin", randomString
}

func main() {

	// setupLogOutput()

	apiURL := os.Getenv("API_URL")
	apiUser := os.Getenv("API_USER")
	apiPassword := os.Getenv("API_PASSWORD")
	if apiUser == "" && apiPassword == "" {
		apiUser, apiPassword = generateUserPassword()
	}
	fmt.Printf("user defined endpoint of [%s]\n", apiURL)
	// r := gin.Default()
	r := gin.New()
	// r.Use(cors.Default())

	// r.Use(gin.Recovery(), gin.Logger())
	// r.Use(gin.Recovery(), middleware.Logger(), middleware.BasicAuth())
	r.Use(middleware.CORSMiddleware(), gin.Recovery(), gin.Logger(), middleware.BasicAuth(apiUser, apiPassword))

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
	r.Run(apiURL)
}
