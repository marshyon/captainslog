# captains log REST API using Gin and Gorm

Read the [article](https://blog.logrocket.com/how-to-build-a-rest-api-with-golang-using-gin-and-gorm/).

How to use:

```
$ API_URL=":8080" API_USER="admin" API_PASSWORD="7676fsadfsdaf878" go run main.go
```

which will run the api with the specified endpoint, user and password of `:8080`, `admin` and `7676fsadfsdaf878`

**change user and password to something sensible**

alternatively, run with 

```
$ API_URL=":8080"  go run main.go
```

and check the logged output to find the user `admin` and a randomly generated password