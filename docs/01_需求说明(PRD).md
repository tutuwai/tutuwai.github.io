# 个人主页需求说明（PRD）

## 1. 背景与目的
我需要一个用于展示**个人简历（英文）**与**个人项目作品集**的网站，并提供醒目的 **GitHub 主页入口**。页面风格参考 `docs/参考1.png`、`docs/参考2.png`：简洁留白、头像与侧栏/顶栏信息、分节（section）单页滚动。

## 2. 目标（MVP）
- **英文简历**：在网页中用英文呈现核心简历信息（不只放 PDF）。
- **项目展示**：以卡片/列表方式展示项目，包含技术栈标签、亮点、链接（GitHub 必须）。
- **GitHub 入口**：在页面首屏可见位置提供 GitHub 主页链接。
- **响应式**：移动端与桌面端良好显示。
- **基础 SEO**：页面标题/描述、OpenGraph 基础信息。
- **可部署**：支持一键/自动化部署到云端（GitHub Pages）。

## 3. 非目标（MVP 不做）
- 登录/注册、后台管理
- 数据库、评论系统
- 复杂动效（可保留轻量滚动/淡入）
- 完整博客系统（可作为 Phase 2）

## 4. 目标受众
- 招聘方/面试官
- 潜在合作伙伴
- 个人长期维护的作品集入口

## 5. 范围与页面结构（MVP）
MVP 推荐做成**单页（Single Page）+ 顶部导航锚点**：
- About（英文自我介绍 + 头像 + 角色/技能徽章 + 社交链接）
- Projects（项目卡片/列表）
- Resume（英文简历要点；可选提供 PDF 下载）
- Contact（邮箱/社交链接）

可选：Education / Experience / Skills（若内容充足可并入 Resume 或单独 section）

## 6. 功能需求

### 6.1 导航与布局
- 顶部导航：About / Projects / Resume / Contact（点击滚动到对应 section）。
- 首屏信息区：
  - 头像
  - 英文姓名与一句话定位（tagline）
  - 角色/技能徽章（chips/badges）
  - 关键链接：GitHub（必须）、Email（建议）、LinkedIn（可选）、Resume PDF（可选）
- 桌面端建议采用“左侧信息 + 右侧正文”或“顶栏 + 正文”的简洁布局；移动端自动折叠为纵向排列。

### 6.2 About（英文）
- 英文短介绍（1–2 句）+ 英文长介绍（2–4 段）。
- 关键技能/方向（以 badge 或列表呈现）。

### 6.3 Projects（项目展示）
每个项目条目至少包含：
- 标题
- 1–2 句英文简介（做了什么 + 价值/影响）
- 技术栈标签（例如 Python/FastAPI/React 等）
- 链接：
  - GitHub Repo（必需）
  - Live Demo（可选）
  - 文章/说明（可选）
- 可选：封面图/截图（用于卡片展示）

展示规则（建议）：
- Featured Projects（2–4 个）优先展示
- 其余项目按时间或重要性排序

### 6.4 Resume（英文简历）
网页内用英文呈现关键信息（建议结构）：
- Summary
- Experience（可选）
- Education（可选）
- Skills（可选）
- Awards / Publications（可选）

并提供一个可选的 `Resume.pdf` 下载入口（若你有 PDF）。

### 6.5 Contact（联系方式）
- Email（mailto）
- GitHub 主页链接（再次出现）
- 可选：LinkedIn / X / Google Scholar 等

## 7. 非功能需求
- **性能**：首屏快速加载；图片压缩；避免引入沉重依赖。
- **可访问性**：
  - 语义化标题层级
  - 图片 alt
  - 颜色对比度合格
  - 键盘可操作（导航与链接）
- **可维护性**：项目列表应以数据文件维护（JSON 或 Markdown 内容源），减少频繁改 UI 代码。
- **可扩展性**：后续可加“项目详情页”“博客”“多语言”。

## 8. 里程碑（建议）
- Phase 0（内容准备）：英文 About 文案、项目清单（字段齐全）、链接整理。
- Phase 1（MVP）：完成单页 + 项目展示 + GitHub Pages 部署。
- Phase 2（增强）：项目详情页、博客、统计分析、多语言等。

## 9. 验收标准（MVP）
- 打开站点后，首屏可见：头像/姓名/英文定位 + GitHub 链接。
- About/Projects/Resume/Contact 结构清晰，英文内容无明显排版问题。
- Projects 至少展示 3 个项目，且每个项目有 GitHub 链接与技术栈标签。
- 移动端与桌面端均可正常浏览（无溢出、无遮挡）。
- 页面具备基础 SEO 信息（title/description/OG 基础）。
- 已部署到 GitHub Pages，获得可访问的公开 URL；后续 push 可自动更新站点。

