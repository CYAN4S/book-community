# BOOKSTAMP

## 1. 프로젝트 계획 이유

[**BookStamp**](https://github.com/CYAN4S/book-community) : 독서는 모든 공부의 시작이며, 모든 학습의 토대는 읽기를 통한 이해로부터 비롯되기 때문에, 이러한 습관이 사라지고 있다는 것은 굉장히 안타까운 문제라 생각합니다. 또 기존에 존재하는 커뮤니티들은 게시 양식의 한계 및 표현 방식에 제한 요소가 있었습니다.

저희 팀은 책에 대한 많은 사용자의 관심을 확대하고, 기존 책 커뮤니티 소통방식의 아쉬웠던 점을 개선하기 위한 방법에 대해 고민하였습니다. 고민 결과, 소통이 활발한 커뮤니티를 만들어 볼 필요성을 느끼게 되었고, 그를 구현하기 위해 팀 프로젝트를 진행하였습니다.

저희의 목표는 사용자 편의를 맞춘 독서 커뮤니티를 제공하는 것, 그리고 이에 더해 차별화된 부가서비스를 제공하는 것입니다.

### 1.1. 제공기능

1. 사용자 인증
   - 로그인 및 로그아웃
   - Google 계정으로 로그인
2. 포스트 등록
   - 타임라인 형태로 표시
   - 텍스트, 이미지, 동영상, YouTube 링크 첨부 가능
   - 댓글 및 답글에 답글 가능
3. 도서 탐색
   - 도서 검색
   - 최근 검색한 도서 표시
   - 구독한 인물의 관심있어 하는 책 표시
4. 도서 상세 정보 표시
   - 도서 정보
   - 도서 설명
   - 관련 도서관 조회
   - 채팅 기능
   - 관심있는 책으로 등록
   - 관련 도서 추천
5. 도서 보유 도서관 조회
6. 장르 별 게시글
   - KDC 기준 대표/세부장르 선택
   - 선택된 항목에 따른 소통 공간 이동
7. 사용자 계정 관리
   - 닉네임, 상태 메시지, 프로필 사진 변경
   - 다른 사용자 구독 관리
   - 관심있는 책 관리

## 2. Install & Deploy

### 2.1. Init: Next.js

- [**Install Node.js Path**](https://nodejs.org/ko/download/) : Next.js 설치를 위해, 기본적으로 Node가 필요하니, Node.js 설치를 진행합니다.

- 다음으로, create-next-app을 설치합니다.

```shell
npm install –g create-next-app
```

- 위 과정에서 설치한 create-next-app으로 Next.js 프로젝트를 생성합니다.

```shell
npx create-next-app [project-name]
```

- run Next.js project

```shell
npm run dev
```

### 2.2. Firebase

- 사용자 데이터 관리를 위한 데이터베이스인 [**Firebase**](https://firebase.google.com/docs/web/setup?hl=ko) 를 설치합니다.

```shell
npm install firebase
```

### 2.3. semantic-ui-react

- UI관련 컴포넌트를 제공하여, 빠르게 서비스를 구현할 수 있게 도와주는 라이브러리를 설치합니다.

```shell
npm install semantic-ui-react semantic-ui-css
yarn add semantic-ui-react semantic-ui-css
```

### 2.4 recoil

- React 상태 관리를 목적으로 제공되는 라이브러리인 recoil를 설치합니다.

```shell
npm install recoil
yarn add recoi
```

### 2.5 react-kakao-maps-sdk

- Kakao Map API를 사용하여 화면에 지도를 표시할 때, 컴포넌트 형식으로 코드를 작성할 수 있게 도와주는 라이브러리 react-kakao-maps-sdk를 설치합니다.

```shell
npm install –save react-kakao-maps
yarn add react-kakao-maps
```

### 2.6 he

- JavaScript로 작성된 HTML entity Encoder/Decoder를 설치합니다.

```shell
npm install he
```

### 2.7 framer-motion

- React 환경에서, 웹 애니메이션, 제스처를 쉽게 구현할 수 있도록 도와주는 오픈소스 라이브러리인 framer-motion을 설치합니다.

```shell
npm install framer-motion
yarn add framer-motion
```

### 2.8 Deploy - Vercel

- Vercel은 Next.js에서 제공하는 배포 플랫폼으로 [빌드 + 배포 + 호스팅] 서비스를 제공합니다.
- 본 프로젝트의 설계 결과물은 Vercel을 이용하여 배포 중에 있으며, 아래에서 제공하는 URL에 접속하여 확인할 수 있습니다.
