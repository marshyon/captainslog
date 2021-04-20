# Captains Log

this is an initial release

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








