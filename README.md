# 📔 나의 기록 · Daily V-log

> 맛집·여행·일상을 사진과 함께 기록하고, 네이버 블로그에 한 번에 복사·붙여넣기 할 수 있는 개인용 PWA 앱

## ✨ 주요 기능

- 📷 **사진 기록** — 카메라/갤러리에서 사진을 여러 장 업로드
- 🗂️ **카테고리 분류** — 맛집 🍽️ / 여행 ✈️ / 일상 📝
- ⭐ **평점 & 메모** — 별점, 위치, 가격, 메뉴, 자유 기록
- 📍 **GPS 자동 기록** — 버튼 한 번으로 현재 위치 저장
- 📝 **블로그 자동 변환** — 기록을 네이버 블로그 형식으로 자동 작성
- 📋 **원클릭 복사** — 블로그 글을 한 번에 복사해서 붙여넣기
- 📱 **PWA** — 홈 화면에 추가하면 앱처럼 사용 가능
- ☁️ **클라우드 저장** — Supabase에 안전하게 저장 (휴대폰 바꿔도 OK)

---

## 🚀 처음 설치하기 (10분 소요)

### 1단계: Supabase 계정 만들기

1. https://supabase.com 접속
2. **Start your project** 클릭
3. GitHub 계정으로 로그인 (이미 사용 중이시니까 같은 계정 사용 가능)
4. **New Project** 클릭
5. 정보 입력:
   - Organization: 본인 계정
   - Project name: `vlog` (아무거나)
   - Database password: **잘 기억해두세요** (안 써도 됨, 만일을 위해)
   - Region: `Northeast Asia (Seoul)` 선택 ✅
   - Plan: **Free** 그대로
6. **Create new project** → 2~3분 기다리기

### 2단계: 데이터베이스 만들기

1. 프로젝트 대시보드 왼쪽 메뉴에서 **SQL Editor** 클릭
2. **New query** 클릭
3. 이 폴더의 `supabase-schema.sql` 내용을 통째로 복사해서 붙여넣기
4. **Run** 버튼 클릭 → "Success" 뜨면 OK ✅

### 3단계: 사진 저장소 만들기

1. 왼쪽 메뉴에서 **Storage** 클릭
2. **New bucket** 클릭
3. 입력:
   - Name: `vlog-photos` ← **정확히 이대로 입력!**
   - ✅ **Public bucket** 체크박스 켜기 (이거 안 켜면 사진 안 보임!)
4. **Save** 클릭

### 4단계: API 키 확인

1. 왼쪽 메뉴 맨 아래 **Project Settings** (⚙️ 아이콘) 클릭
2. **API** 탭 클릭
3. 두 가지 정보를 메모장에 복사해두세요:
   - **Project URL** (`https://xxxxx.supabase.co` 형태)
   - **anon public** 키 (긴 문자열, `eyJhbG...`로 시작)

---

## 📦 5단계: 앱 배포하기 (GitHub + Render)

### 옵션 A — GitHub Pages (가장 쉬움, 무료)

1. GitHub에서 **New repository** 클릭
2. 이름: `vlog-app` (아무거나)
3. Public 선택 → **Create repository**
4. **Add file → Upload files** 클릭
5. 이 폴더의 모든 파일 업로드:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
6. **Commit changes** 클릭
7. **Settings** 탭 → 왼쪽 **Pages** 클릭
8. Source: **Deploy from a branch** → Branch: **main** → **Save**
9. 1~2분 후 `https://본인아이디.github.io/vlog-app/` 으로 접속 가능

### 옵션 B — Render Static Site (현재 사용 중인 서비스 활용)

1. https://render.com 접속 → 로그인
2. **New +** → **Static Site** 클릭
3. GitHub 저장소 연결
4. 설정:
   - Build Command: 비워두기
   - Publish directory: `.` (점 하나)
5. **Create Static Site** → 완료

---

## 📱 6단계: 휴대폰에 설치하기

### iPhone (Safari)
1. 배포된 URL 접속
2. 하단 공유 버튼 (↑) 누르기
3. **홈 화면에 추가** 선택

### Android (Chrome / Edge)
1. 배포된 URL 접속
2. 오른쪽 위 메뉴 (⋮) 누르기
3. **앱 설치** 또는 **홈 화면에 추가** 선택

설치하면 진짜 앱처럼 보이고 카메라/GPS도 정상 작동해요!

---

## 🎬 첫 사용

1. 앱 처음 열면 설정 화면이 나옴
2. 메모해둔 **Project URL**과 **anon key** 입력
3. **시작하기** 누르면 끝! 🎉

---

## 💡 사용 팁

### 사진 촬영 워크플로우
1. 식당/여행지에서 사진 촬영 → 갤러리에 저장
2. 앱 열기 → **추가** 탭
3. 카테고리 선택 → 사진 업로드 → GPS 누르기
4. 제목, 메모, 별점 입력 → 저장

### 네이버 블로그 업로드
1. **블로그** 탭 → 기록 선택
2. 자동 생성된 글 확인
3. **복사하기** 누르기
4. 네이버 블로그 글쓰기에서 붙여넣기
5. 사진은 같은 화면 아래에서 **저장** 눌러서 갤러리에 다운 → 네이버 블로그에 첨부

### 데이터 백업
- 설정 탭 → **데이터 백업** 으로 JSON 파일 다운로드 가능
- 만일을 대비해 주기적으로 백업하세요

---

## 🔧 자주 묻는 질문

**Q. 사진이 안 보여요**
A. Supabase Storage의 `vlog-photos` 버킷이 Public인지 확인하세요.

**Q. 저장이 안 돼요**
A. Supabase URL/Key가 정확한지, SQL 스키마가 실행됐는지 확인.

**Q. 다른 휴대폰에서도 볼 수 있나요?**
A. 네, 같은 Supabase URL/Key 입력하면 같은 데이터가 보여요.

**Q. 무료 계정 한도는?**
A. Supabase 무료: 500MB DB + 1GB Storage. 사진 약 2000장 분량.

**Q. 보안은 괜찮나요?**
A. anon key는 공개되어도 안전한 설계지만, 개인용이므로 URL을 SNS에 공유하지 마세요.

---

## 📂 파일 구조

```
vlog-app/
├── index.html              ← 메인 앱
├── manifest.json           ← PWA 설정
├── sw.js                   ← 오프라인 캐싱
├── icon-192.png            ← 앱 아이콘 (작은 거)
├── icon-512.png            ← 앱 아이콘 (큰 거)
├── supabase-schema.sql     ← DB 설정 SQL
└── README.md               ← 이 파일
```

---

## 🎨 디자인 컨셉

따뜻한 종이 노트 같은 톤. 일상이 가볍게 쌓이는 공간이 되도록 만들었어요.
