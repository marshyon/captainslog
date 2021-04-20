# Captains Log

Basic CRUD application using React front end and Go rest back end.

It stores simple 'log entries' in a similar way to when captain Kirk of the Starship Enterprise recorded his logs at the beginning of each episode but this time, you can be the captain and enter your own logs.

The front end uses React and Material UI.

The back end is written in Go and uses Gin framework to handle the API and GORM to persist data.
# Releases 

| tag   | description |
| ----- | ----------- |
| 0.0.1 | this is an initial release |

My Plan is to extend this simple application to use more features of GORM and Gin pricipally the latter to add CORS, hosting of the React application itself within the Go Gin app, containerisation of the application, use of an external database to enable K8s like environments to become a target, JWT token authentication, possibly SSL encryption via letsencrypt and / or Nginx / Traefic.

Data is persisted to a SQLite database but as this uses GORM it could thus be extended to use other SQL based compatible and supported databases ( and enabling this to run in something like a statefull set )

# Prerequisites

The following need to be installed on a system able to run GCC compiled applications ( Linux is fine, Mac should be ok too, infact Windows would be good so long as it has GCC and build tools present and should work but I tested on WSL - which is linux anyway ) : 

Go - https://golang.org/dl/

Node - https://nodejs.org/en/download/

There must be port 8080 and 3000 available. If not, the below needs changed or services running on these ports need to be stopped.
# Usage 



to run, in the react-fe directory, create a file called `.env` that has something like :

```
API_URL="http://172.168.3.101:8080"
```

replacing the ip address with that of the system you are running this upon

open 2 terminials and in the first, change to `go-server` directory and run `go run main.go` :

```
$ go run main.go

[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:   export GIN_MODE=release
 - using code:  gin.SetMode(gin.ReleaseMode)

[GIN-debug] Loaded HTML Templates (2):
        -
        - index.tmpl

[GIN-debug] GET    /logs                     --> github.com/marshyon/captainslog/controllers.FindLogs (4 handlers)
[GIN-debug] GET    /logs/:id                 --> github.com/marshyon/captainslog/controllers.FindLog (4 handlers)
[GIN-debug] POST   /logs                     --> github.com/marshyon/captainslog/controllers.CreateLog (4 handlers)
[GIN-debug] PATCH  /logs/:id                 --> github.com/marshyon/captainslog/controllers.UpdateLog (4 handlers)
[GIN-debug] DELETE /logs/:id                 --> github.com/marshyon/captainslog/controllers.DeleteLog (4 handlers)
[GIN-debug] GET    /                         --> main.main.func2 (4 handlers)
[GIN-debug] Environment variable PORT is undefined. Using port :8080 by default
[GIN-debug] Listening and serving HTTP on :8080
```

in the second window, run the react in its `react-fe` directory initially with :

```
npm install
```

to install dependencies ( npm and node of course being present and installed )

and to run 

```
npm run start
```








