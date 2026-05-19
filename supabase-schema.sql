-- ==========================================
-- 나의 기록 V-log 앱 - Supabase 데이터베이스 설정
-- ==========================================
-- Supabase Dashboard → SQL Editor 에서 그대로 실행하세요
-- ==========================================

-- 1. 메인 테이블 생성
create table if not exists vlog_entries (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('맛집', '여행', '일상')),
  title text not null,
  description text,
  rating int check (rating >= 1 and rating <= 5),
  location_name text,
  latitude double precision,
  longitude double precision,
  price text,
  menu text,
  photo_urls text[] default '{}',
  visited_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 2. 인덱스 (조회 성능)
create index if not exists idx_vlog_visited on vlog_entries(visited_at desc);
create index if not exists idx_vlog_category on vlog_entries(category);

-- 3. Row Level Security 비활성화 (개인용이므로)
alter table vlog_entries disable row level security;

-- ==========================================
-- 추가로 Supabase 대시보드에서 직접 해야 할 일:
-- ==========================================
-- Storage → New bucket 클릭
--   bucket 이름: vlog-photos
--   ✅ Public bucket 체크 (반드시!)
--   File size limit: 5 MB (선택)
-- ==========================================
