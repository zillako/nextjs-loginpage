# 프로젝트 실행 방법

npm을 사용할 경우

```
> npm run build && npm start
```

yarn을 사용할 경우

```
> yarn build && yarn start
```

`localhost:3000` 으로 접속

# 주 사용 라이브러리와 사용 의도

### Next.js

기본 환경 설정이 잘되어 있어 SSR, Router 환경 구축이 편리함

이 프로젝트에서는 SSR 환경을 활용하지 못하였으나, 회원 정보 조회 페이지에서 SSR 환경에서 사용자 정보를 미리 받아오는 로직을 구성할 계획이었으나 loading 상태에서는 화면을 노출하지 않는 방식으로 구현함

### React-Query

API 호출과 Server State를 관리하기 용이함

cache / stale time 값을 설정하여 불필요한 호출을 줄이고, 또한 업데이트 호출도 쉬움 custom hook을 만들어 활용함

### Recoil

비밀번호 재설정 과정에서 전달되는 값들을 관리하기 위해 추가함

Hooks 기반으로 사용하기 쉽고, 코드 분할이 용이하여 비밀번호 재설정 과정에서만 사용하기에 적합함

# 컴포넌트 구조와 설계 의도

Next.js 의 기본 폴더 구조를 기반으로 함

- apis : API 호출 함수
- components : components 모음, atomic design system을 차용
- hooks : 사용자 정보, accessToken 값을 체크할 수 있는 hook이 있고, 범용적으로 사용될 수 있는 custom hooks 모음
- lib : 범용적으로 사용되는 도구 모음
- state : recoil의 atoms, selectors
- styles : 전역 style css
- types : 전역 type 값 모음

# 상태 관리의 구조와 설계 의도

## React-Query

회원 정보 조회 API 호출에 사용되며, 페이지 접근 시, accessToken을 검사하여 사용자의 활성 유무를 체크함

필요 시 페이지 전환을 지정할 수 있는 useUser hooks를 만들어 각 페이지의 필요에 따라 사용됨

file : hooks/user.ts

## Recoil

비밀번호 재설정 과정에서 서버에서 받아온 값들을 recoil에서 관리함

state 폴더안에 atoms에서 recoil state를 만들어 사용함

# 리뷰어에게 강조하고 싶은 부분 또는 그 외 기타 내용

가능한 공통되는 부분들을 묶어서 구현했습니다. apis/base.ts 의 axios instance를 만든 부분이나, components 에 공통 컴포넌트들을 만들어 사용하였습니다.

cookie와 localStorage를 고민하였습니다. cookie를 사용한 이유는 SSR 에서도 cookie를 가져와서 api 호출에 사용할 수 있었기 때문입니다.

\_app에서 vh 값을 화면 사이즈가 바뀔 때마다 변경해주는 부분이 있습니다. 이는 모바일 브라우저에서 상단 바가 사라질 때 높이 값이 바뀌는데 이 때 vh 값은 반영되지 않아서 스크롤이 생기는 이슈가 있습니다. 그에 대한 대응입니다.

re-rendering을 줄이는 것을 고려해보려고 노력했습니다.
