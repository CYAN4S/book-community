# BOOKSTAMP

## 1. 프로젝트 계획 이유

[**BookStamp**](https://github.com/CYAN4S/book-community) : 독서는 모든 공부의 시작이며, 모든 학습의 토대는 읽기를 통한 이해로부터 비롯되기 때문에, 이러한 습관이 사라지고 있다는 것은 굉장히 안타까운 문제라 생각합니다. 또 기존에 존재하는 커뮤니티들은 게시 양식의 한계 및 표현 방식에 제한 요소가 있었습니다.

저희 팀은 책에 대한 많은 사용자의 관심을 확대하고, 기존 책 커뮤니티 소통방식의 아쉬웠던 점을 개선하기 위한 방법에 대해 고민하였습니다. 고민 결과, 소통이 활발한 커뮤니티를 만들어 볼 필요성을 느끼게 되었고, 이를 구현하기 위해 팀 프로젝트를 진행하였습니다.

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

---

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

---

# 3. 한계

### 3.1. HTML/CSS
* 프로젝트 구현 기간이 충분하지 않아, 기능 구현을 급하게 진행하다 보니, 명확히 HTML/CSS 구조를 설계하지 않음으로써 가시성 문제가 발생합니다.
* 모바일 환경(디바이스 별 화면구성)에서, 요소가 어색하게 배치됩니다.

### 3.2. 책 검색 및 책 상세 페이지
* 검색한 결과의 책들 중 특정 책의 제목에 특정 단어가 존재하거나, 네이버 책 API 내에서 문제가 있는 책의 경우, 해당 책의 상세 정보를 불러오지 못하는 문제가 발생합니다.
* 몇몇 오류는 ***he library*** 를 사용하여 해결하였으나, 새롭게 발견되는 몇몇 오류에 대해
전부 대응하지 못하는 문제가 남아있습니다.

### 3.3. 도서관 검색지역 세분화
* 현재 지역별로 탐색할 수 있는 범위가 과도하게 넓게 되어있습니다.

### 3.4. 추천자 시스템
* 미 학습된 책에 대한 추천이 불가합니다.
* 정확한 성능 확인이 불가합니다. (성능 평가 - 자체 기준점 , 평가방식의 부재)

---

# 4. 개선방안과 개선노력

### 4.1. HTML/CSS
* 문제가 발생하는 페이지에 대해, HTML/CSS을 구체적으로 재설계합니다.

* css 작성능력을 키워나감과 함께 sass/scss를 사용함으로써 가독성있게 파일을 작성하여, UI/UX 설계를 재진행하는 방법을 사용하고자 합니다.
   * **개선노력: 팀원 이상범**
   
      - 해당 부분을 개선하기 위해, 기존에 정말 기초부분만 알고 있었던 css를 다시 공부하고, sass/scss 사용방법을 익히는 과정이 필요하다고 생각했습니다.

      - HTML/CSS 부분에서 발생한 한계를 개선하기 위해, 노력한 학습 내용과 웹으로서의 구현한 결과물은 아래와 같습니다.

         1) Study Reponse Web
            - [**github**](https://github.com/Lee-Sang-Beom/study_responive_css)
            - [**Deploy**](https://lee-sang-beom.github.io/study_responive_css/)

         2) 카카오톡 채팅 레이아웃 구현(SCSS)
            - [**github**](https://github.com/Lee-Sang-Beom/study_saas)
            - [**Deploy**](https://lee-sang-beom.github.io/study_saas/)

         3) Upgrade Simulator
            - [**github**](https://github.com/Lee-Sang-Beom/Upgrade_Simulation)
            - [**Deploy**](https://lee-sang-beom.github.io/Upgrade_Simulation//)

         4) Introduce Game Site : Ori
            - [**github**](https://github.com/Lee-Sang-Beom/Ori-Fan-Site)
            - [**Deploy**](https://ori-fan-site.vercel.app/)

         5) Hydn : 진행예정
            - [**github**](https://github.com/CYAN4S/hydn.git)
            - [**Deploy**](https://rubygems.org/gems/hydn)


### 4.2. 도서관 검색지역 세분화
* 도서관 정보나루 API에서 세부지역코드를 이용하여, API를 추가적으로 가공합니다.

### 4.3. 추천자 시스템
* 모델 배포 및 예측 수행을 위해 호스팅 업체를 사용합니다 (Docker 이미지 활용도 가능)
* 호스팅 된 모델을 사용하여 기능을 다시 추가합니다.

---

# 5. 유지보수

### 1. **ISBN 데이터 변화에 따른 오류 수정 (수행 팀원 : 이상범)**
![ISBN](./public/readmeImg/isbnError.png)
- 2022년 **4월 ~ 6월**의 기간동안에는, 책에 따라 **ISBN코드**가 아래 두 가지 경우로 나뉘어져 표현되었습니다.
   - “**8972757578 9788972757573**”와 같이 **10자리, 13자리**를 둘 다 포함하는 경우
   - “**9788972757573”와 같이** 13자리인 코드만 포함되어 있는 경우

- **2022-10-07** 코드 리뷰 중, ISBN 코드가 이제 “**9788972757573”처럼 13자리로 통일되어 제공됨을 확인**하였고, 그에 따라 수정 작업을 거쳤습니다.

- **ISBN**이 프로젝트 전반에 걸쳐 영향을 주던 부분은 아래와 같았습니다.
    - 책 상세 페이지에서, 책 정보 출력
    - 책 정보를 이용한 책 추천 시스템 구동
    - 책 정보를 이용한 지역 별 도서관 정보, 소장 및 대출 가능여부 조회

---

### 2. **네이버 책 API의 price key 미제공 (수행 팀원 : 이상범)**
   - 프로젝트 기간이 지난 후, 코드 리뷰를 하면서 **책 상세 페이지에서 책의 가격이 표시되지 않는 오류**를 발견하였습니다.

   - 해당 오류의 이유를 **아래와 같은 개발자 포럼에서 찾아보니 price 정보 제공이 종료**되었음이 원인이었음을 알게 되었습니다.
      
      * [개발자 포럼 - NAVER Developers](https://developers.naver.com/forum/posts/33383)
      
   - **해결방법** : **price 대신 discount key-value**를 이용해 가격을 출력하였습니다.

---

### 3. **카카오톡 데이터센터 화재로 인한 카카오 맵 서비스 제공 오류 (수행 팀원 : 이상범)**
    
![ISBN](./public/readmeImg/fireOfKakaoDataCenter.jpg)

- Bookstamp 프로젝트는, 특정 책을 검색한 후의 상세 페이지에서 지역 별 도서관 정보를 확인할 수 있습니다.
   - 또한, 특정 지역 도서관 정보를 불러온 후에 해당 맵핀을 누르면 **카카오 맵 서비스를 통해 도서관 위치를 조회할 수 있습니다.**

- **카카오 데이터센터 화재**가 발생했을 때 **카카오 맵 서비스 시스템**이 먹통된 것을 확인하였고, 도서관 위치 조회 서비스가 정상 작동되지 않음을 확인하였습니다.
   - 카카오 서버가 복구된 후, 작동에 이상이 없는지를 확인하였습니다.

- 직접 코드를 바꾼다거나의 해결을 하진 않았지만, **서비스가 이런 방식으로도 먹통이 될 수도 있구나**에 대한 **관리의 심각성, 중요성**을 인지한 계기가 되었습니다.

---

### 4. CSS 보완

#### **4-1)** 북스탬프 메인화면 변경 (2022-10-21) (수행 팀원 : 이상범) 

- 기존에 **반응형**을 고려하지 않았던 메인 화면은, 모바일 환경에서 UI/UX에 불편한 경험을 주었습니다.
    - 애니메이션이 적용된 텍스트와 버튼 배치의 어색함을 수정하였습니다.
      > **수정 전**

      ![Before](./public/readmeImg/logoBefore.jpg)

      > **수정 후**

      ![After](./public/readmeImg/logoAfter.jpg)

---

#### **4-2)** EXPLORE 화면 수정 (2022-11-08 ~ 2022-11-09) (수행 팀원 : 이상범) 

- 기존 Explore 페이지에서는 아래의 문제가 있었습니다.
    - 검색 영역의 세로축 미정렬
    - **최근 검색한 책, 구독자가 관심있어 하는 최근 책 영역**의 반응형 미설계
    
- 개선된 페이지에서는 위에서 언급한 문제를 해결할 수 있도록 하였습니다.
   > **데스크탑 화면 고려**

   ![Before](./public/readmeImg/exploreDesktop.jpg)

   > **모바일 화면 고려**

   ![After](./public/readmeImg/exploreMobile.jpg)

