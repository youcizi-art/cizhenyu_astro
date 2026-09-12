# 前端平台方案（cizhenyu_payload B2B 对接）

> 独立项目，非 `czy_model` 迁移。参考说明见 [REFERENCE_NOTES.md](./REFERENCE_NOTES.md)。

---

## 1. 目标

- 对接 `cizhenyu_payload` 公开 API  
- 多 B2B 站（manifest）  
- Pages 页面缓存扛 ≈1 万日 UV  
- 后续 AI 一键建站  

---

## 2. 结构（AGENTS.md）

```text
src/modules/cms|site|product|…
src/workflows/…          # 页面数据组装
src/ui/                  # 展示
src/pages/               # Astro 路由薄壳
sites/<siteKey>/site.manifest.json
```

依赖方向：

```text
pages → workflows → modules → CMS API
ui 只消费 workflows / modules 已整理好的数据
```

不提前建庞大 theme/contract 体系；有第二套视觉需求时再加 `ui/themes`。

---

## 3. CMS 路径

见 [CMS_MAPPING.md](./CMS_MAPPING.md)。示例：

`GET /api/p/data/b2b/products/b2b_product`

catalog 由 `scripts/sync-b2b-catalog.mjs` 从 `sites/b2b/b2b-collections.json` 生成。

---

## 4. 缓存

见 [CACHE_STRATEGY.md](./CACHE_STRATEGY.md)：主缓存在 Pages；CMS webhook → `/api/revalidate`。

---

## 5. 节奏

| 阶段 | 内容 |
| --- | --- |
| P1（当前） | cms 模块、catalog、site manifest、首页/产品列表、revalidate 入口 |
| P2 | 详情、公司信息、询盘 submit、ISR 参数 |
| P3 | 其余 b2b 模块按需增加 |
| P4 | 多站点部署矩阵 |
| P5 | AI 建站脚本 |
