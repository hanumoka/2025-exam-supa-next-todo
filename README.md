yarn add react-spinners@0.13.8
yarn add react-icons@5.0.1

- supabase 기본 라이브러리
  yarn add @supabase/supabase-js@2.42.0
  yarn add @supabase/ssr@0.1.0
  yarn add @supabase/auth-ui-react@0.4.7
  yarn add @supabase/auth-ui-shared@0.1.8

yarn add cookies-next@4.1.1

- 1.supabase 개발 라이브러리
  yarn add supabase@">=1.8.1" -D

- 2.supabase 로그인
  npx supabase login

- supabase 타입생성 public 영역의 테이블을 기준으로 supabase에 생성한 테이블별 타입(typescript)을 생성해주는것 같다. (1, 2 를 해야 된다.)
  npx supabase gen types typescript --project-id "pvvlboidqrgqymjodkbw" --schema public > types/supabase.ts
