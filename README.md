# Setup guideline

## Build server docker image
```
cd backend
docker build --no-cache -t voting-server .
cd ..
```

## Build Web docker image
```
cd frontend
docker build --no-cache -t voting-web .
cd ..
```

### Build and run
```
docker-compose up -d
```

| Page | URL |
| ------ | ------ |
| API Docs | http://localhost:8080/api-docs |
| API End Point | http://localhost:8080/v1 |
| Voting Page | http://localhost:8081 |
