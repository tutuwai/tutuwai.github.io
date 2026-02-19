# 技术路线（Astro 静态站点）

## 1. 为什么选 Astro（本项目的匹配点）
针对“简历 + 项目展示”这类以内容为主的站点，Astro 的优势非常贴合：
- **静态优先**：默认输出静态 HTML，部署简单、安全、成本低。
- **性能与 SEO**：首屏快、可做良好的 meta/OG，天然利于搜索与分享。
- **内容组织方便**：项目/简历内容可用 JSON 或 Markdown 管理，维护成本低。
- **扩展空间**：后续可以加项目详情页、博客、RSS、站点地图等。

## 2. 推荐实现形态
MVP 采用：
- **单页 + 锚点导航**（About/Projects/Resume/Contact）
- 项目展示使用**数据驱动**（`projects.json` 或 `content/projects/*.md`）
- 样式以“参考图”风格为准：简洁留白、清晰标题层级、徽章与项目卡片

## 3. 目录结构建议（落地到代码仓库）
以下是建议的站点结构（实际以 Astro 初始化项目为准）：

- `src/pages/index.astro`\n  - 单页入口，拼装各 section 组件
- `src/components/`\n  - `Header.astro` / `Hero.astro` / `Section.astro` / `ProjectCard.astro` 等
- `src/data/`\n  - `projects.json`（若选 JSON 数据源）
- `src/content/`\n  - `projects/`（若选 Markdown 内容源；可结合 Astro Content Collections）
- `public/`\n  - `avatar.png`、项目封面图、`Resume.pdf`（可选）

## 4. 数据与内容管理（两种方案）

### 4.1 方案 A：JSON（推荐 MVP）
适合项目卡片展示，字段简单、渲染直接：
- 优点：实现最省事，新增项目只改 `projects.json`
- 缺点：不适合写很长的项目说明（但 MVP 不需要）

### 4.2 方案 B：Markdown（适合 Phase 2）
适合做“项目详情页”或博客：
- 优点：内容表达更自由，可写长文、插图、分段
- 缺点：需要额外的内容路由/集合配置

建议：**MVP 用 JSON**，后续要项目详情页时再迁移/兼容 Markdown。

## 5. 样式方案建议

### 5.1 Tailwind CSS（推荐）
- 适合快速做出参考图那种“信息密度高但很干净”的排版
- 组件化时 class 直接跟组件走，改动集中

### 5.2 纯 CSS（也可行）
- 用 `global.css` + 少量组件局部样式
- 更轻量，但布局/响应式写起来可能更慢

MVP 推荐：**Tailwind CSS**（节省时间，易调版式）。

## 6. 路由与页面策略
MVP：
- `index` 单页 + section anchors

Phase 2：
- `/projects/<slug>/` 项目详情页
- `/blog/` 写作页面（可选）

## 7. 关键配置点（为 GitHub Pages 做准备）
部署到 GitHub Pages 时，最容易踩坑的是资源路径与 base path。

你需要在 `astro.config.*` 中根据仓库类型设置：
- 若仓库名是 `username.github.io`：\n  - `site: 'https://username.github.io'`\n  - 通常 **不需要** `base`
- 若仓库名是普通仓库（例如 `personal-web`），访问地址通常是 `https://username.github.io/personal-web/`：\n  - `site: 'https://username.github.io'`\n  - `base: '/personal-web'`

这部分会在部署指南中给出可直接照抄的配置与排查清单。

## 8. 组件与 UI 复用建议（贴近参考图）
建议做几个高复用组件，减少重复样式：
- `Layout`：统一容器宽度、字体、背景
- `Nav`：顶部锚点导航
- `Badge`：技能/角色徽章
- `ProjectCard`：项目卡片（标题/一句话/标签/链接）
- `Section`：统一 section 标题、间距、分割线

## 9. SEO 与分享（MVP 必备）
至少包含：
- `<title>`、`meta description`
- OpenGraph：`og:title`、`og:description`、`og:image`、`og:url`
- `favicon`

可选增强（Phase 2）：
- sitemap
- robots.txt

## 10. 后续扩展点（不影响 MVP）
- **项目详情页**：从 JSON 迁移/兼容 Markdown
- **多语言**：中文/英文切换（i18n）
- **统计**：隐私友好分析（如 Cloudflare Web Analytics）
- **域名**：自定义域名 + HTTPS

