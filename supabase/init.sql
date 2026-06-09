-- Sinopectech Web — Supabase 初始化（一次性）
-- 在 Supabase SQL Editor 整段执行
-- https://supabase.com/dashboard/project/sohxlwxlhxkfffrzifwp/sql

create table if not exists products (
  id serial primary key,
  name_cn varchar(255), name_en varchar(255),
  category varchar(50), series varchar(100),
  description_cn text, description_en text,
  image_url varchar(500), gallery_images jsonb,
  is_active boolean default true, display_order int default 1,
  created_at timestamp default now(), updated_at timestamp default now()
);

create table if not exists about (
  id serial primary key,
  title_cn varchar(255), title_en varchar(255),
  subtitle_cn varchar(255), subtitle_en varchar(255),
  content_cn text, content_en text,
  created_at timestamp default now(), updated_at timestamp default now()
);

create table if not exists company (
  id serial primary key,
  name_cn varchar(255), name_en varchar(255),
  address_cn text, address_en text,
  description_cn text, description_en text,
  images jsonb,
  created_at timestamp default now(), updated_at timestamp default now()
);

create table if not exists partners (
  id serial primary key,
  name varchar(255), region varchar(50),
  logo_url varchar(500), website varchar(500),
  created_at timestamp default now(), updated_at timestamp default now()
);

create table if not exists contact (
  id int primary key default 1,
  phone varchar(100), email varchar(255),
  address_cn text, address_en text,
  wechat varchar(100), whatsapp varchar(100),
  constraint contact_singleton check (id = 1)
);

create table if not exists inquiries (
  id serial primary key,
  name varchar(255), email varchar(255), company varchar(255),
  phone varchar(100), product varchar(255),
  message text, products_interested jsonb,
  status varchar(50) default 'new',
  created_at timestamp default now()
);

create table if not exists settings (
  id int primary key default 1,
  site_name_cn varchar(255), site_name_en varchar(255),
  site_name_short_cn varchar(255), site_name_short_en varchar(255),
  logo_url varchar(500), favicon_url varchar(500),
  hero_title_cn varchar(255), hero_title_en varchar(255),
  hero_subtitle_cn text, hero_subtitle_en text,
  hero_video_url varchar(500), hero_image_url varchar(500),
  seo_title_cn varchar(255), seo_title_en varchar(255),
  seo_description_cn text, seo_description_en text,
  seo_keywords_cn text, seo_keywords_en text,
  created_at timestamp default now(), updated_at timestamp default now(),
  constraint settings_singleton check (id = 1)
);

create index if not exists idx_products_active_order on products(is_active, display_order);
create index if not exists idx_inquiries_status_created on inquiries(status, created_at desc);

alter table products enable row level security;
alter table about enable row level security;
alter table company enable row level security;
alter table partners enable row level security;
alter table contact enable row level security;
alter table inquiries enable row level security;
alter table settings enable row level security;

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
drop policy if exists "anon insert inquiries" on inquiries;
create policy "anon insert inquiries" on inquiries for insert with check (true);

drop policy if exists "public read inquiries" on inquiries;
create policy "public read inquiries" on inquiries for select using (true);

-- 默认数据
insert into settings (id) values (1) on conflict (id) do nothing;
insert into contact (id) values (1) on conflict (id) do nothing;
insert into about (id) values (1) on conflict (id) do nothing;
insert into company (id) values (1) on conflict (id) do nothing;

update contact set phone = '+86 150 1943 1630', email = 'cherryshi2012@126.com',
  address_cn = '广东省东莞市企石镇 16 栋 506 室', address_en = 'Room 506, Building 16, Qishi Town, Dongguan, Guangdong, China'
where id = 1;

update company set name_cn = '东莞市丹彩日用品有限公司',
  name_en = 'Dongguan Red Color Materials Co., Ltd. (丹彩日用品)',
  address_cn = '广东省东莞市企石镇 16 栋 506 室', address_en = 'Room 506, Building 16, Qishi Town, Dongguan, Guangdong, China',
  description_cn = '潮玩 / 动作玩偶 ODM 工厂', description_en = 'Designer toys & action figure ODM factory'
where id = 1;

update about set
  title_cn = '关于丹彩', title_en = 'About Us',
  subtitle_cn = '工厂主体 + 香港出口壳，双引擎服务全球客户',
  subtitle_en = 'Sinopec Technologies (HK) + 丹彩日用品 — ODM partnership serving global clients.',
  content_cn = 'Sinopec Technologies, Ltd. 成立于 2012 年，专注国际贸易领域。十年出口订单积淀后，2022 年正式切入潮玩 / 动作玩偶赛道。',
  content_en = 'Sinopec Technologies, Ltd. was established in 2012 and entered the international trade field. After a decade of producing export orders, we ventured into the designer toy and action figure sector in 2022.'
where id = 1;

update settings set
  site_name_cn = '东莞市丹彩日用品有限公司', site_name_en = 'Sinopec Technologies Limited',
  site_name_short_cn = '丹彩日用品', site_name_short_en = 'Sinopectech',
  logo_url = '/logo.jpg', favicon_url = '/favicon.ico',
  hero_title_cn = '从东莞到世界\n2012 年起，匠心制物',
  hero_title_en = 'From Dongguan to the world.\nCrafted figures since 2012.',
  hero_subtitle_cn = 'Sinopec Technologies Limited（香港）是东莞市丹彩日用品有限公司的出口窗口。',
  hero_subtitle_en = 'Sinopec Technologies Limited (HK) is the export arm of 丹彩日用品.',
  seo_title_cn = '丹彩日用品 · 潮玩 / 动作玩偶 ODM 工厂',
  seo_title_en = 'Sinopectech · Chinese Model & Action Figure ODM'
where id = 1;

insert into partners (name, region, website) values
  ('Walmart', 'USA', 'https://www.walmart.com'),
  ('Target', 'USA', 'https://www.target.com'),
  ('Disney', 'USA', 'https://www.disney.com'),
  ('Melissa & Doug', 'USA', 'https://www.melissaanddoug.com'),
  ('Nikkan', 'Japan', ''), ('Chica', 'Japan', ''), ('Mato', 'Japan', ''),
  ('Bathtime', 'Europe', ''), ('Asura', 'South Africa', '')
on conflict do nothing;

-- Storage 公开 bucket：手动在 Supabase 后台建（product-images, assets），
-- 上传时由后端 service_role key 写，绕过 RLS，不需要额外 policy。
