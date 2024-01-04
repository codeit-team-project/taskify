<div align="center">
    <h1>일정 관리 서비스 Taskify</h1>
    <br/>

![Alt text](/public/assets/image-1.png)

<h3>당신을 위한 새로운 일정관리, Taskify</h3>
<p>
웹에서든 모바일에서든 편리하게 사용해보세요!
</p>
<br/>
</div>

## 프로젝트 소개

Taskify는 팀원들과 일정을 공유하고 관리하기 위해 만들어진 서비스입니다.

자유롭게 대시보드를 생성하고, 대시보드 안에서 여러 칼럼들을 두어 할 일을 관리할 수 있습니다.

또한 이메일로 팀원을 자신의 대시보드에 초대해 할 일을 공유할 수 있습니다.

<br/>

## 배포 주소
https://taskify-schedule.vercel.app/

<br/>

## 팀원 소개

<div align="center">

|                                                                  **박소현**                                                                   |                                                                **김선혜**                                                                |                                                             **조연아**                                                             |                                                               **홍재원**                                                               |
| :-------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/124856726?v=4" height=150 width=150> <br/> @ParkSohyunee](https://github.com/ParkSohyunee) | [<img src="https://avatars.githubusercontent.com/u/82023300?v=4" height=150 width=150> <br/> @HaydenDevK](https://github.com/HaydenDevK) | [<img src="https://avatars.githubusercontent.com/u/86518113?v=4" height=150 width=150> <br/> @yunajoe](https://github.com/yunajoe) | [<img src="https://avatars.githubusercontent.com/u/89698149?v=4" height=150 width=150> <br/> @Hongjw030](https://github.com/Hongjw030) |

</div>

<br>
<div>

### 😆 박소현
- 페이지 : 마이대시보드 페이지, 대시보드 수정페이지
- 공통 : 사이드바 컴포넌트, 대시보드 목록, 생성, 수정 컴포넌트, 구성원, 초대내역 컴포넌트
- 기능
    - 대시보드 생성, 수정, 삭제 기능
    - 대시보드 목록, 구성원 내역, 초대 내역 페이지네이션 구현
    - 초대하기, 초대 취소 기능
    - 구성원 삭제 기능

### 😋 김선혜

- 페이지 : 마이대시보드 페이지, 대시보드 상세 페이지
- 공통 : 칼럼 모달 컴포넌트, 칼럼 리스트 컴포넌트, 초대 받은 대시보드 컴포넌트
- 기능
    - 칼럼 생성, 수정, 삭제 기능
    - 초대 받은 대시보드 응답(수락, 거절) 기능
    - 초대 받은 대시보드 제목 검색 기능
    - 초대 받은 대시보드 무한스크롤 기능

### 😊 조연아

- 페이지 : 대시보드 상세페이지
- 공통 : 할일 카드 생성 컴포넌트, 할일 카드 수정 컴포넌트, 할일 카드 상세 컴포넌트, 공통 모달 컴포넌트
- 기능
    - 할일 카드 생성, 수정, 삭제 기능
    - 태그 기능, 이미지 업로드 기능, 캘린더에서 날짜 선택 기능
    - 할일 카드 상세에서 댓글 생성, 수정, 삭제 기능
    - 댓글 무한스크롤 기능

### 😙 홍재원

- 페이지 : 로그인 페이지, 회원가입 페이지, 마이페이지, 랜딩페이지, 404페이지
- 공통 : navBar 컴포넌트, 회원가입 및 로그인 form 컴포넌트, 프로필 및 비밀번호 변경 컴포넌트
- 기능
    - 회원가입, 로그인, 로그아웃 기능
    - 네브바에 멤버 보여주기
    - 프로필 사진 업로드 기능, 프로필 수정 기능
    - 비밀번호 변경 기능
    - 미들웨어 및 interceptor

</div>

<br/>

## 시작 가이드

```cmd
git clone https://github.com/codeit-team-project/taskify.git

yarn add
```

<br/>

## 기술 스택

#### Tools

<img src="https://img.shields.io/badge/visualStudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-f05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

#### Config

 <img src="https://img.shields.io/badge/yarn-2c8ebb?style=for-the-badge&logo=yarn&logoColor=white">

#### Development

<img src="https://img.shields.io/badge/typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/react-61dafb?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/scss-cc6699?style=for-the-badge&logo=sass&logoColor=white">

#### Comumnication

<img src="https://img.shields.io/badge/discord-5865f2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

<br/>

## 주요 기능 및 디자인

<div >
<h3>메인 페이지</h3>
<p>서비스를 소개하는 메인 페이지입니다.</p>

| 데스크탑 화면                                  | 모바일 화면                                        |
| ---------------------------------------------- | -------------------------------------------------- |
| ![Alt text](/public/assets/sample/image-1.png) | ![Alt text](/public/assets/sample/main-mobile.png) |

</div>

<div >
<h3>로그인, 회원가입 페이지</h3>
<p>
이메일 주소와 비밀번호를 입력해 로그인, 회원가입을 할 수 있습니다.

중복된 이메일, 잘못된 주소의 이메일은 회원가입을 할 수 없게 체크하고, 인풋에 값이 모두 채워지지 않았다면 폼을 제출할 수 없게 막습니다.

</p>

| 회원가입                                     | 로그인                                         |
| -------------------------------------------- | ---------------------------------------------- |
| ![Alt text](/public/assets/sample/image.png) | ![Alt text](/public/assets/sample/image-3.png) |

| 회원가입 실패 시                                     | 로그인 실패 시                                       |
| ---------------------------------------------------- | ---------------------------------------------------- |
| ![Alt text](/public/assets/sample/failed-signup.png) | ![Alt text](/public/assets/sample/failed-signin.png) |

| 회원가입 에러 문구                                  | 로그인 에러 문구                                    |
| --------------------------------------------------- | --------------------------------------------------- |
| ![Alt text](/public/assets/sample/error-signup.png) | ![Alt text](/public/assets/sample/error-signin.png) |

</div>

<div >
<h3>마이 대시보드 페이지</h3>
<p>
로그인에 성공한 후 바로 리다이렉트 되는 페이지입니다.

사이드 바, 내비게이션, 대시보드 목록, 초대받은 대시보드 목록으로 이루어져있습니다. 사용자 본인이 만든 대시보드는 이름 옆에 왕관 아이콘이 자동으로 추가됩니다.

| 마이 대시보드 페이지 초기                                  | 마이 대시보드 페이지 샘플                               |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| ![Alt text](/public/assets/sample/mydashboard-initial.png) | ![Alt text](/public/assets/sample/mydashboard-used.png) |

사용자는 초대를 수락하거나 거절할 수 있고, 대시보드를 새로 생성할 수 있습니다.

| 대시보드 생성                                             | 초대 수락 및 거절                                         |
| --------------------------------------------------------- | --------------------------------------------------------- |
| ![Alt text](/public/assets/sample/mydashboard-create.png) | ![Alt text](/public/assets/sample/mydashboard-invite.png) |

</p>

<div >
<h3>대시보드 상세 페이지</h3>
<p>
사이드바의 대시보드를 누르면 각 대시보드의 상세페이지로 이동합니다.

내비게이션에서는 대시보드의 타이틀, 멤버 리스트를 보여주고, 사이드바에선 현재 위치한 대시보드를 표시해줍니다. 생성된 대시보드에는 자동으로 Todo, onProgress, Done 컬럼이 생성되며 사용자가 직접 컬럼을 추가, 삭제할 수 있습니다.

| 대시보드 상세 페이지                              | 대시보드 컬럼 추가                               |
| ------------------------------------------------- | ------------------------------------------------ |
| ![Alt text](/public/assets/sample/board-page.png) | ![Alt text](/public/assets/sample/board-new.png) |

| 대시보드 컬럼 이름 변경                           | 대시보드 컬럼 삭제                                  |
| ------------------------------------------------- | --------------------------------------------------- |
| ![Alt text](/public/assets/sample/board-edit.png) | ![Alt text](/public/assets/sample/board-delete.png) |

사용자는 각 컬럼에서 할 일을 추가할 수 있습니다.

| 컬럼 내 카드 추가                                   | 컬럼 내 카드 삭제                                      |
| --------------------------------------------------- | ------------------------------------------------------ |
| ![Alt text](/public/assets/sample/board-card-3.png) | ![Alt text](/public/assets/sample/board-card-edit.png) |

| 컬럼 내 카드 디자인                               | 컬럼 내 카드 댓글                                         |
| ------------------------------------------------- | --------------------------------------------------------- |
| ![Alt text](/public/assets/sample/board-card.png) | ![Alt text](/public/assets/sample/board-card-comment.png) |

</p>

</div>

<div >
<h3>대시보드 수정 페이지</h3>
<p>
만약 사용자가 해당 대시보드의 관리자일 경우 내비게이션의 관리 버튼을 눌러 edit 페이지로 이동할 수 있습니다.

| 사용자가 관리자일 경우                           | 사용자가 관리자가 아닐 경우                      |
| ------------------------------------------------ | ------------------------------------------------ |
| ![Alt text](/public/assets/sample/yes-owner.png) | ![Alt text](/public/assets/sample/not-owner.png) |

대시보드 이름, 구성원, 초대 내역 리스트, 대시보드 삭제 버튼이 있습니다.

| 대시보드 편집 페이지                             | 대시보드 초대 기능                                 |
| ------------------------------------------------ | -------------------------------------------------- |
| ![Alt text](/public/assets/sample/dash-page.png) | ![Alt text](/public/assets/sample/dash-invite.png) |

</p>

</div>

<div >
<h3>마이 페이지</h3>
<p>
내비게이션의 드롭다운 메뉴를 통해 마이페이지로 이동할 수 있습니다.

프로필 영역에선 자신의 이미지 사진과 닉네임을 변경할 수 있으며, 이메일은 변경 불가능합니다.

| 프로필 수정                                           | 비밀번호 수정                                     |
| ----------------------------------------------------- | ------------------------------------------------- |
| ![Alt text](/public/assets/sample/mypage-profile.png) | ![Alt text](/public/assets/sample/mypage-psw.png) |

</p>

</div>

<div >
<h3>에러 페이지</h3>
<p>
기본적으로 잘못된 url로 접근 시 공통 404 페이지로 이동합니다.

만약 대시보드 상세 페이지에서 잘못된 대시보드 id url로 접근 시 대시보드 404 ui가 보입니다.

| 404 페이지                                       | 대시보드 404 페이지                                    |
| ------------------------------------------------ | ------------------------------------------------------ |
| ![Alt text](/public/assets/sample/error-404.png) | ![Alt text](/public/assets/sample/error-dashboard.png) |

</p>

</div>
