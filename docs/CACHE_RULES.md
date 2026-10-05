# Pages 边缘 HTML 缓存规则（多站 · 由部署工具自动写入）

> **不要**每个站点都去 Cloudflare 控制台点一遍，也不要在本应用设置里手填域名。  
> 域名在部署/改绑时已经选定；Cache Rules 随绑定自动写入。

## 1. 自动做什么（用户无感）

| 时机 | 行为 |
| --- | --- |
| 部署前端并绑定自定义域 | 按该主机名 upsert HTML 48h + `/api` 绕过 |
| Pages 管理里绑定/解绑域名 | 绑定写规则；解绑删除本工具写入的规则 |
| 更新部署（不改绑） | 按当前已绑定主机名再幂等同步一遍 |
| 「同步边缘缓存」按钮 | 读取 Pages 已绑定域名并 upsert（覆盖在 CF 后台改域后的缺口） |

规则 description：

| description | 作用 |
| --- | --- |
| `cizhenyu-deploy:api:{host}` | `/api/*` → 不缓存 |
| `cizhenyu-deploy:html:{host}` | 公开 GET → 边缘 48h |

`*.pages.dev` 跳过 Zone Rules，依赖响应头 + Worker 回落。

## 2. 设置页只做权限（账户级一次，与 OAuth 分离）

Wrangler OAuth **通常不含** Cache Rules Edit。若部署/绑定报 403：

1. **设置 → 边缘 HTML 缓存 · 权限**
2. 点「打开 Token 创建页（权限已预填）」→ 在 Cloudflare **直接点创建令牌**（勿改权限）→ 复制 Token
3. 回到本应用粘贴「保存边缘缓存 Token」

该 Token **单独保存**，不会替换现有 Cloudflare OAuth 授权。部署/改绑/「同步边缘缓存」写规则时优先用它。

不要去控制台手搓规则；不要在设置里再填域名。

## 3. 验收

同一产品 URL 连续两次：第二次期望 `cf-cache-status: HIT`，且 Pages Function 不随 PV 线性涨。  
CMS 改内容 → `/api/revalidate` → 该 URL 下次回源。
