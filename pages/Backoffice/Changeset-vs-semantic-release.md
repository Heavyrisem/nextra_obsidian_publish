---
nextra-publish: true
---

## Changeset

### Pros
- 직관적인 사용방법 ex) pnpm changeset -> major/minor/patch 선택 -> changelog 작성
- PR/MR과 함께 사용시 추가적인 기능도 쓸 수 있음
    - PR/MR에 포함된 changeset이 없을 경우 경고 띄우기 가능
- monorepo 지원 o

### Cons
- Github 특화
    - gitlab 지원하는 확장 버전이 있긴 함
    - github release는 작성해 주지만 gitlab은 안됨
- commit 시에 해야 할 단계가 늘어남
- custom 로직 지원 x
    - changelog, commit name 같은 특정 기능들의 커스텀 로직만 지원함


## Semantic-Release

### Pros
- Github/Gitlab 지원
    - **Gitlab Releases 지원**
- 커밋 메세지로 관리하기 때문에 추가적인 단계가 필요없음
- custom 로직 지원 o
    - tag custom 기능
    - 플러그인
    - 플러그인 커스텀 시 팀즈 봇과 연동할 수 있어 보임 (slack 연동 플러그인 존재)


### Cons
- **monorepo 지원 x**
    - 가능하게 만든 버전이 있긴 함
- 커밋 메세지 컨벤션 통일이 필요함
- node 20 버전부터 사용 가능 (최신버전 기준)
- 세팅 난이도가 있음