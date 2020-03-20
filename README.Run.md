##### Run docker at this folder

### 1: Build api
- goto /api and run:

docker build -t pscd-api .

### 2: Build dashboard

- goto /dashboard and run:

docker build -t pscd-frontend .


### 3: Run container

- at this folder, run:

docker-compose up