package middleware

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func BasicAuth(user, password string) gin.HandlerFunc {
	fmt.Printf("user [%s] password [%s]\n", user, password)
	return gin.BasicAuth(gin.Accounts{
		user: password,
	})
}
