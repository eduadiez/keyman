FROM golang:alpine as build
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh build-base

RUN mkdir -p /app
ADD . /app 
WORKDIR /app
RUN go build -o /app/gotoma .

FROM golang:alpine
RUN mkdir -p /app 
COPY --from=build /app/gotoma /app/gotoma
ADD config.yml /app/config.yaml
WORKDIR /app 

ENTRYPOINT ["/app/gotoma","serve"]

