# 参考说明（非迁移）

`D:\ycz_me\models\czy_model` 对接的是**旧** `cizhenyu` 后端，与本仓库、与 `cizhenyu_payload` **不是同一条产品线实现**。

本项目：

- **独立新建**，服务 `cizhenyu_payload` 的 B2B 站群前端  
- 模型真源：`cizhenyu_payload/sites/b2b`  
- API：`/api/p` 分组路径 + `{ status, msg, data }` 信封  

可从 `czy_model` **参考**的仅限产品体验层面（页面类型、模块划分、多语言习惯），**禁止**：

- 复制其 SDK / 路径拼接 / 响应解析  
- 以「迁移 checklist」驱动本仓库结构  
- 为兼容旧后端保留双轨代码  

结构与编码以本仓库 [AGENTS.md](../AGENTS.md) 为准（`modules` / `workflows` / `ui`）。
