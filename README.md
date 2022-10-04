Project - MyTodoList
======================

## 1. 프로젝트 계획 이유
[**BookStamp**](https://book-community.vercel.app/) : 

### - 제공기능
    1.
    2.
    3.
    4.


# 2. Install & Deploy

## 2.1. Init: Next.js
* [**Install Node.js Path**](https://nodejs.org/ko/download/) : Next.js 설치를 위해, 기본적으로 Node가 필요하니, Node.js 설치를 진행합니다.

* 다음으로, create-next-app을 설치합니다. 
  ```
  npm install –g create-next-app
  ```

* 위 과정에서 설치한 create-next-app으로 Next.js 프로젝트를 생성합니다.
  ```
  npx create-next-app [project-name]
  ```

* run Next.js project
  ```
  npm run dev
  ```

## 2.2. Firebase
* 사용자 데이터 관리를 위한 데이터베이스인 [**Firebase**](https://firebase.google.com/docs/web/setup?hl=ko) 를 설치합니다.
  ```
  npm install firebase
  ```

## 2.3. semantic-ui-react 
* UI관련 컴포넌트를 제공하여, 빠르게 서비스를 구현할 수 있게 도와주는 라이브러리를 설치합니다.
  ```
  npm install semantic-ui-react semantic-ui-css
  yarn add semantic-ui-react semantic-ui-css
  ```

## 2.4 recoil
* React 상태 관리를 목적으로 제공되는 라이브러리인 recoil를 설치합니다.
  ```
  npm install recoil
  yarn add recoi
  ```

## 2.5 react-kakao-maps-sdk
* Kakao Map API를 사용하여 화면에 지도를 표시할 때, 컴포넌트 형식으로 코드를 작성할 수 있게 도와주는 라이브러리 react-kakao-maps-sdk를 설치합니다.
  ```
  npm install –save react-kakao-maps
  yarn add react-kakao-maps
  ```

## 2.6 he
* JavaScript로 작성된 HTML entity Encoder/Decoder를 설치합니다.
  ```
  npm install he
  ```

## 2.7 framer-motion
* React 환경에서, 웹 애니메이션, 제스처를 쉽게 구현할 수 있도록 도와주는 오픈소스 라이브러리인 framer-motion을 설치합니다.
  ```
  npm install framer-motion
  yarn add framer-motion
  ```

## 2.8 Deploy - Vercel
 * Vercel은 Next.js에서 제공하는 배포 플랫폼으로 [빌드 + 배포 + 호스팅] 서비스를 제공합니다.
 * 본 프로젝트의 설계 결과물은 Vercel을 이용하여 배포 중에 있으며, 아래에서 제공하는 URL에 접속하여 확인할 수 있습니다.