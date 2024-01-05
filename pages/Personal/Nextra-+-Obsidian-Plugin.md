---
nextra-publish: true
nextra-displayname: Nextra + Obsidian 배포 플러그인
---
# Nextra + Obsidian 배포 플러그인

문서를 편하게 마크다운 문법으로 관리할 수 있게 해 주는 Next.js 기반 Nextra 프레임워크를 사용하여, Obsidian 노트들을 웹 상에 배포하는 플러그인


### 제약사항
- 옵시디언의 모든 기능을 100% 지원하기에는 어려움이 있음, ex) 노트 그래프, 플러그인으로 구현된 기능
- nextjs 라우터 자체의 이슈로 인해 배포 경로에 특수 문자가 들어가면 404 오류가 생김
    - 파일명을 한글로 표시하고 싶은 경우, nextra-displayname 속성으로 표시될 파일명 지정 가능




### 구현된 기능들
- 전체 노트 배포
- 단일 노트 배포
    - 배포하려는 노트와 연관된 이미지 배포
    - 링크된 노트들의 배포는 아직 미구현

### 구현 예정
- 노트간 링크 기능 구현
- 깃 push 작업을 최소화 하여, CI가 실행되는 케이스 줄이기 -> 최적화