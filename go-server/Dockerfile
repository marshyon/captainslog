FROM golang:1.16 AS builder

RUN mkdir /app
ADD . /app
WORKDIR /app

RUN CGO_ENABLED=0 GOOS=linux go build -o app main.go

FROM ubuntu AS production
COPY --from=builder /app .

CMD ["./app"]