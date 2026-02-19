# 部署指南：GitHub Pages（Astro + Actions）

本指南目标：把 Astro 静态站点部署到 **GitHub Pages**，实现 **push 到 `main` 自动构建并发布**。

参考：Astro 官方推荐用 `withastro/action` 部署到 Pages。

## 0. 前置条件
- 一个 GitHub 账号
- 本地已安装：
  - Node.js（建议 22+）
  - Git
- 你已经有一个 Astro 项目（或准备初始化一个）

> 说明：你的当前工作区还不是 git 仓库（从 Cursor 信息看 `Is directory a git repo: No`），因此你需要先 `git init` 并推到 GitHub 才能使用 Pages。

## 1. 选择 Pages 地址形式（非常关键）
GitHub Pages 常见两种：

### 1.1 用户主页仓库（推荐，路径最简单）
- 仓库名：`<username>.github.io`
- 访问地址：`https://<username>.github.io/`
- 优点：通常**不需要**设置 `base`

### 1.2 项目仓库（更常见）
- 仓库名：例如 `personal-web`
- 访问地址：`https://<username>.github.io/personal-web/`
- 你需要在 `astro.config.*` 设置 `base: '/personal-web'`，否则资源路径可能 404

## 2. 配置 `astro.config.*`（site/base）
在 `astro.config.mjs`（或 `astro.config.ts`）设置：

### 2.1 用户主页仓库 `<username>.github.io`
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<username>.github.io',
});
```

### 2.2 项目仓库（例如 `personal-web`）
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/personal-web',
});
```

> `site` 用于生成规范 URL（SEO/OG/站点地图等），`base` 用于让资源与路由在子路径下正确工作。

## 3. 添加 GitHub Actions 工作流（自动部署）
在你的仓库中新增文件：
- `.github/workflows/deploy.yml`

内容可直接照抄（Astro 官方推荐结构）：

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v5

      - name: Install, build, and upload your site
        uses: withastro/action@v5
        # with:
        #   path: .
        #   node-version: 24
        #   package-manager: pnpm@latest
        #   build-cmd: pnpm run build
        # env:
        #   SOME_PUBLIC_ENV: 'value'

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

说明：
- `withastro/action@v5` 会自动检测你的包管理器（依据 lockfile），安装依赖并执行 build，然后上传构建产物到 Pages。
- 你可以按需指定 `node-version`（默认 22）。

## 4. GitHub Pages 设置
在 GitHub 仓库页面：
- Settings → Pages
- Source 选择 **GitHub Actions**

完成后，第一次跑完 Actions，你会在 Pages 页面看到站点 URL。

## 5. 发布流程（你会看到什么）
- 你 push 到 `main`
- GitHub Actions 出现一次工作流运行
- build 成功后自动 deploy
- 访问 Pages URL 即可看到最新站点

## 6. 常见问题与排查

### 6.1 页面能打开但 CSS/图片/JS 404
几乎都是 `base` 没设置对：
- 如果 URL 是 `https://<username>.github.io/<repo>/`，必须设置 `base: '/<repo>'`
- 资源引用尽量使用相对路径，或使用 `import.meta.env.BASE_URL` 拼接

### 6.2 页面 404（根路径/子路径不一致）
- 用户主页仓库：`https://<username>.github.io/` 对应仓库名必须是 `<username>.github.io`
- 项目仓库：访问要带 `/repo/` 子路径

### 6.3 Actions 权限不足 / 无法发布
确认工作流中有：
- `permissions: pages: write` 与 `id-token: write`
并且 Pages Source 选择了 GitHub Actions。

### 6.4 自定义域名（可选）
思路（不展开 DNS 细节，后续可补充）：
- Pages 设置里填入 custom domain
- DNS：子域名一般用 CNAME 指向 `<username>.github.io`；根域名按 GitHub 提示配置 A 记录
- GitHub 会自动签发/续期 HTTPS

## 7. 发布前检查清单（建议）
- `astro.config.*` 的 `site`/`base` 已按仓库类型配置
- `npm run build`（或 pnpm/yarn）本地能成功
- `.github/workflows/deploy.yml` 已提交并推到 `main`
- Settings → Pages → Source = GitHub Actions

