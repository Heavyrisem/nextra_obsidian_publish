---
nextra-publish: true
---


## Docker Install

### For Docker

```sh
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### For Docker-Compose

```sh
sudo apt install docker-compose
```


### Sudo 없이 도커 실행 (Optional)
```sh
sudo usermod -aG docker $USER
```


## Portainer Setup

```sh
mkdir ~/portainer
nano ~/portainer/docker-compose.yml
```

아래 내용 붙여넣기 이후, ctrl + x -> y -> Enter

`docker-compose.yml`
```yml
version: '3'

services:
  portainer:
    image: portainer/portainer-ce
    container_name: portainer
    restart: always
    ports:
      - 8000:8000
      - 9443:9443
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data

volumes:
  portainer_data:
```

```sh
cd ~/portainer
sudo docker-compose up -d
```



## OCI Port Open


인스턴스 메뉴에서 서브넷 부분 클릭
![Pasted image 20230922231947.png](/Pasted_image_20230922231947.png)

보안 목록 클릭
![Pasted image 20230922232016.png](/Pasted_image_20230922232016.png)


수신 규칙 추가 클릭
![Pasted image 20230922232035.png](/Pasted_image_20230922232035.png)

사진처럼 세팅후 규칙 추가
![Pasted image 20230922232410.png](/Pasted_image_20230922232410.png)

아래 인스턴스 아이피 변경하여 접속
https://인스턴스아이피:9443

### 접속시 portainer ui에서 secure 어쩌구 오류 발생하는 경우
```sh
cd ~/portainer
sudo docker-compose restart
```
이후 재접속


### Portainer Setup
1. 최초 계정 생성 작업
2. 환경 선택 두가지 중 왼쪽 환경 클릭
#### registry setup
왼쪽 Settings에 Registries > Add Registry

registry url: ghcr.io
uesrname: 깃허브아이디
password: 아까 생성한 github access token
![Pasted image 20230923001927.png](/Pasted_image_20230923001927.png)




# Discord 봇 배포 CI 작성

>기본적인 프로젝트 도커 빌드 세팅 필요함


프로젝트 루트 경로 기준으로 파일 작성
`.github/workflows/main.yml`
```yml
name: Build And Push

on:
  push:
    branches: [main] # !!!! master 사용시 master로 변경필요 !!!!

env:
  DOCKER_NAME: 도커이미지명 # 원하는 이미지명으로 작성
  DOCKER_IMAGE: ghcr.io/깃헙계정명/도커이미지명

jobs:
  build-and-push:
    runs-on: ubuntu-latest

    steps:
      - name: Check out source code
        uses: actions/checkout@v3

      # tonistiigi/binfmt 이미지를 이용해 qemu 설치
      - name: Set up QEMU
        uses: docker/setup-qemu-action@v2

      # docker buildx 설치
      - name: Set up docker buildx
        id: buildx
        uses: docker/setup-buildx-action@v2

        # secrets를 이용해 Docker Hub 로그인
      - name: Login to ghcr
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.repository_owner }}
          password: ${{ secrets.GHCR_PAT }}

      # buildx 명령어로 amd64, arm64, arm/v6, arm/v7 아키텍처 이미지 빌드 및
      - name: Docker Build
        run: docker buildx build --platform linux/amd64,linux/arm64 -t ${{ env.DOCKER_IMAGE }}:latest -t ${{ env.DOCKER_IMAGE}}:${{ github.run_id }} --push .

```

write:packages 권한이 있는 깃허브 키를 생성
(profile > Settings > developer settings)
![Pasted image 20230922233731.png](/Pasted_image_20230922233731.png)

생성한 키를 레포지토리 secret에 등록
이때 키(name)은 "GHCR_PAT"로 등록
repository > Settings > Secrets and variables > Actions > New repository Secret
![Pasted image 20230922233959.png](/Pasted_image_20230922233959.png)

코드를 push하면 CI가 자동으로 실행되고, github packages에 이미지가 올라감

### Deploy on portainer

Stacks > Add Stack
```yml
version: '3'

services:
  discord_bot:
    image: ghcr.io/깃허브계정명/도커이미지명:latest
    restart: always
    environment:
      - 환경변수키=값 # 디스코드 봇에서 써야하는 환경변수 입력
      - 환경변수키=값
```


#### latest 버전에서 이슈가 발견된다면
Stacks > 생성한 스택 > Editor탭
image 부분의 버전 태그를 이슈 발생 이전의 버전으로 변경후 재배포