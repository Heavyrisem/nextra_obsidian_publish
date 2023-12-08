---
nextra-publish: true
nextra-displayname: k8s 배포시 환경변수 세팅법
---

# k8s 배포시 환경변수 세팅법

> 리소스 설정 파일의 배포는 kubectl 또는 lens 등의 도구를 사용하여 할 수 있습니다.

## k8s에 configMap 생성

ConfigMap 리소스 생성을 위한 설정 파일
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: EXAMPLE_NAME-config
  namespace: ******
data:
  KEY: VALUE
  ...

```
## deployment yaml 수정

containers 요소에 속성 추가
```yaml
...
    spec:
      affinity: {}
      containers:
        - image: *********
          imagePullPolicy: Always
          name: *******
          resources: {}
          securityContext:
            allowPrivilegeEscalation: false
            privileged: false
            readOnlyRootFilesystem: false
            runAsNonRoot: false
          stdin: true
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
          tty: true
          envFrom: # <<< 추가된 필드
          - configMapRef:
              name: EXAMPLE_NAME-config
...
```


## 참고

> configMap의 값이 변경되었다면
> 해당 ConfigMap을 사용하는 deployment를 재시작 하기 전까지 변경사항은 반영되지 않습니다.