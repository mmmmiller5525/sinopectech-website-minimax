-- 第二期接 CMS 时在 Supabase SQL Editor 执行
-- 文档 v1.0 里的表结构

create table if not exists products (
  id serial primary key,
  name_cn varchar(255),
  name_en varchar(255),
  category varchar(50),
  series varchar(100),
  description_cn text,
  description_en text,
  image_url varchar(500),
  gallery_images jsonb,
  is_active boolean default true,
  display_order int default 1,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists about (
  id serial primary key,
  title_cn varchar(255),
  title_en varchar(255),
  subtitle_cn varchar(255),
  subtitle_en varchar(255),
  content_cn text,
  content_en text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists company (
  id serial primary key,
  name_cn varchar(255),
  name_en varchar(255),
  address_cn text,
  address_en text,
  description_cn text,
  description_en text,
  images jsonb,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists partners (
  id serial primary key,
  name varchar(255),
  region varchar(50),
  logo_url varchar(500),
  website varchar(500),
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists contact (
  id int primary key default 1,
  phone varchar(100),
  email varchar(255),
  address_cn text,
  address_en text,
  wechat varchar(100),
  whatsapp varchar(100),
  constraint contact_singleton check (id = 1)
);

create table if not exists inquiries (
  id serial primary key,
  name varchar(255),
  email varchar(255),
  company varchar(255),
  phone varchar(100),
  product varchar(255),
  message text,
  products_interested jsonb,
  status varchar(50) default 'new',
  created_at timestamp default now()
);

create table if not exists settings (
  id int primary key default 1,
  site_name_cn varchar(255),
  site_name_en varchar(255),
  hero_title_cn varchar(255),
  hero_title_en varchar(255),
  hero_subtitle_cn text,
  hero_subtitle_en text,
  hero_video_url varchar(500),
  seo_title_cn varchar(255),
  seo_title_en varchar(255),
  seo_description_cn text,
  seo_description_en text,
  seo_keywords_cn text,
  seo_keywords_en text,
  created_at timestamp default now(),
  updated_at timestamp default now(),
  constraint settings_singleton check (id = 1)
);

-- 索引
create index if not exists idx_products_active_order on products(is_active, display_order);
create index if not exists idx_inquiries_status_created on inquiries(status, created_at desc);

-- RLS：MVP 阶段所有表公开读；写操作待第二期加 Auth
alter table products enable row level security;
alter table about enable row level security;
alter table company enable row level security;
alter table partners enable row level security;
alter table contact enable row level security;
alter table inquiries enable row level security;
alter table settings enable row level security;

-- 公开读
drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (is_active = true);

drop policy if exists "public read about" on about;
create policy "public read about" on about for select using (true);

drop policy if exists "public read company" on company;
create policy "public read company" on company for select using (true);

drop policy if exists "public read partners" on partners;
create policy "public read partners" on partners for select using (true);

drop policy if exists "public read contact" on contact;
create policy "public read contact" on contact for select using (true);

drop policy if exists "public read settings" on settings;
create policy "public read settings" on settings for select using (true);

-- 询盘：任何人可插入（anon 提交）
drop policy if exists "anon insert inquiries" on inquiries;
create policy "anon insert inquiries" on inquiries for insert with check (true);

drop policy if exists "public read inquiries" on inquiries;
create policy "public read inquiries" on inquiries for select using (true);
