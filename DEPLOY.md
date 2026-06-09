# 部署到 Vercel — 完整步骤

## 0. 准备：你需要有的

- ✅ 一个 Supabase 项目（已完成）
- ✅ 跑过 `supabase/init.sql` 建表（已完成）
- ✅ Supabase Auth 里有至少 1 个 admin 账号（已完成）
- ✅ Supabase Storage 公开 bucket `product-images` 和 `assets`（已完成）
- ✅ Resend 账号 + API key（已完成）
- ✅ 一份本项目代码（在 `E:\Agent Program\sinopectech-web\`）
- ✅ 一个 GitHub 账号（用来 push 代码）
- ✅ 一个 Vercel 账号（用 GitHub 登录）

## 1. 把代码推到 GitHub

```bash
# 第一次：进入项目目录
cd "E:\Agent Program\sinopectech-web"

# 初始化 git 并提交
git init
git add .
git commit -m "Initial: Sinopectech web + admin"

# 在 GitHub 网页上 New repository，名字随便（如 sinopectech-web），不要勾 "Add README"
# 复制仓库地址，例如 https://github.com/yourname/sinopectech-web.git

git remote add origin https://github.com/yourname/sinopectech-web.git
git branch -M main
git push -u origin main
```

## 2. 在 Vercel 导入项目

1. 打开 https://vercel.com/new
2. 点 "Import Git Repository" → 选你刚 push 的仓库
3. Framework Preset 选 **Next.js**（自动识别）
4. **先别点 Deploy** — 展开 "Environment Variables"，填这些：

| 变量名 | 值 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://sohxlwxlhxkfffrzifwp.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 你的 anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → `service_role` key |
| `RESEND_API_KEY` | Resend 拿的 `re_xxx` |
| `INQUIRY_NOTIFY_TO` | `cherryshi2012@126.com` |
| `INQUIRY_FROM` | `Sinopec Website <onboarding@resend.dev>`（临时）或 `Sinopec Website <noreply@sinopectechlimited.com>`（验证后） |
| `NEXT_PUBLIC_SITE_URL` | `https://www.sinopectechlimited.com` |

5. 点 **Deploy**
6. 第一次构建 1-3 分钟。成功后给你一个 `xxx.vercel.app` 临时域名

## 3. 验证一切正常

打开 `https://xxx.vercel.app`，应该看到前台首页。访问 `/admin` 应该跳到 `/login` 让你登录。

## 4. 绑定正式域名

1. Vercel 项目页面 → Settings → Domains
2. 输入 `www.sinopectechlimited.com` → 点 Add
3. Vercel 会告诉你加一条 CNAME 记录
4. 到域名注册商加：
   ```
   类型: CNAME
   主机: www
   值: cname.vercel-dns.com
   ```
5. 等 DNS 生效（5-30 分钟）
6. Vercel 自动签发 Let's Encrypt 证书

## 5. 第一次用后台

1. 登录（Supabase Auth 账号）→ 进 `/admin/site-settings`，把 SEO/品牌信息填好
2. 进 `/admin/contact` 核对电话/邮箱/微信
3. 进 `/admin/products/new` 上传 4-5 个产品
4. 进前台刷新 → 应该看到产品出现了

## 6. 切换到 Resend 自有域名（可选）

1. https://resend.com/domains → Add Domain → `sinopectechlimited.com`
2. 复制 Resend 给的 DNS 记录到域名注册商
3. 验证通过后改 Vercel 环境变量 `INQUIRY_FROM=Sinopec Website <noreply@sinopectechlimited.com>`
4. 重新部署

## 出问题怎么办

| 现象 | 原因 / 解决 |
|---|---|
| 打开 `/admin` 直接 500 | 检查 `NEXT_PUBLIC_SUPABASE_URL` 和 anon key 是否对 |
| 登录报 "Invalid login credentials" | 账号没在 Supabase Auth 建 / 密码错 |
| 上传图片报 "new row violates row-level security policy" | 应该不会，服务端走 service_role 绕过 RLS |
| 询盘不写入 | 看 Vercel Logs；检查 service_role key 是否填了 |
| 邮件没收到 | 看 Vercel Logs；检查 RESEND_API_KEY；126 邮箱查垃圾箱 |
| 切到英文 404 | 不会了，已修（语言切换不动 URL） |
| 构建失败 | Vercel Logs 里有报错贴给我 |

## 关键路径速查

- 前台首页: `https://www.sinopectechlimited.com/`
- 后台入口: `https://www.sinopectechlimited.com/admin`（未登录跳 `/login`）
- 登录页: `https://www.sinopectechlimited.com/login`
- API 询盘提交: `POST /api/inquiry`
- 邮件 API: 内部用，无公开端点
