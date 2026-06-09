# Sinopectech Web

东莞市丹彩日用品有限公司 + Sinopec Technologies Limited（香港）官网。
中英双语响应式企业站 + 完整 CMS 后台。

## 完整部署文档

打开 [DEPLOY.md](./DEPLOY.md)。

## 一次性启动

```bash
# 安装依赖
npm install

# 本地开发
npm run dev
# 打开 http://localhost:3000

# 后台：登录页 http://localhost:3000/login
```

## 关键文件

- `supabase/init.sql` — 一次性建表 + 填默认数据（在 Supabase SQL Editor 跑）
- `.env.example` — 环境变量模板（复制为 `.env.local`）
- `app/api/admin/upload/route.ts` — 后台图片上传（service_role 写 Storage，绕过 RLS）
- `app/admin/settings/SettingsEditor.tsx` — 后台网站设置（含 Logo / Favicon / Hero 上传）
