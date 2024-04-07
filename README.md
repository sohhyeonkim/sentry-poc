## Feature

ServiceException을 Sentry에 전송하는 기능을 제공한다.

## Requirements

1. Sentry에 프로젝트를 생성한다.
2. Sentry에서 DSN(Client key), Auth Token을 발급받는다.
3. <a href="https://docs.sentry.io/platforms/node/">공식문서</a>를 참고하여 Sentry를 설정한다.

## Description

1. 서비스에서 발생하는 HttpException을 처리하는 Filter (`HttpExceptionFilter`)를 구현해 global filter로 등록한다.
  - `HttpExceptionFilter`에서는 `captureException`메서드를 사용하여 exception을 Sentry로 전송한다. 이때 extra 필드로 추가 정보를 전달할 수 있다.

2. ci.yml을 생성하여 빌드를 수행한다. 
  - `npm run build` 명령어를 사용하여 프로젝트를 빌드하고, 이때 생성된 sourcemap을 Sentry에 전송한다.
  - 생성된 sourcemap은 배포되지 않도록 디렉토리를 구분하여 저장한다.
  - `./dist` 하위의 파일들을 `./source-maps`로 이동한다.
  - `./dist` 하위의 *.js 파일들을 `./source-maps`로 이동한다.
  - `dist`, `source-maps` 디렉토리를 artifacts로 등록한다. (Artifacts를 사용하면 워크플로의 작업 간에 데이터를 공유하고 워크플로가 완료되면 데이터를 저장가능)

## Ref
- <a href="https://helloinyong.tistory.com/311">production에서 sourcemap 보안 이슈</a>
- <a href="https://velog.io/@kjwsx23/TypeScriptViteSentry-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-Sourcemap-%EC%9C%A0%EC%B6%9C-%EB%B0%A9%EC%A7%80%ED%95%98%EA%B8%B0">TypeScript+Vite+Sentry 환경에서 Sourcemap 유출 방지하기</a>
- <a href="Artifacts를 사용하면 워크플로의 작업 간에 데이터를 공유하고 워크플로가 완료되면 데이터를 저장">워크플로 데이터를 아티팩트로 저장</a>

## TODO 

1. cd.yml을 생성하여 배포를 수행한다.
2. cd 단계에서 저장된 artifacts를 사용하여 배포를 수행한다.