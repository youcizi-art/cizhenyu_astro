/** 首页区块标题（UI chrome）；正文来自 CMS seed */
export function defaultHomeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';
  return {
    painTitle: zh
      ? '网站慢、询盘少、运营坚持不住？'
      : ja
        ? '遅いサイト・少ない問い合わせ・続かない運用？'
        : 'Slow site, few inquiries, ops that won’t stick?',
    painSub: zh
      ? '这些问题不是再买一个工具能解决的——需要一条可落地的外贸获客流水线。'
      : ja
        ? 'ツールを増やすだけでは解決しません。実行できる獲得の流れが必要です。'
        : 'Another tool won’t fix this — you need a runnable acquisition pipeline.',
    productsTitle: zh ? '真实产品模块' : ja ? 'プロダクトモジュール' : 'Product modules',
    productsSub: zh
      ? '从内容后台到展示站、一键部署、询盘中台与本地 Agent——按阶段组合，不强制全套。'
      : ja
        ? 'CMS・サイト・デプロイ・CRM/AI・ローカル Agent。段階導入でき、フルセット強制なし。'
        : 'CMS, site, deploy, CRM/AI, and local Agent — compose by stage, no forced bundle.',
    compareTitle: zh ? '旧方式 vs 磁帧鱼' : ja ? '従来方式 vs 磁帧鱼' : 'Old way vs Cizhenyu',
    compareSub: zh
      ? '把技术门槛、询盘流失和运营断更，一次性收进同一条链路。'
      : ja
        ? '技術ハードル・問い合わせ漏れ・更新停滞を一本の流れに。'
        : 'Collapse tech friction, lost leads, and content drift into one flow.',
    stepsTitle: zh ? '3 步开始' : ja ? '3ステップで開始' : 'Start in 3 steps',
    stepsSub: zh
      ? '先诊断瓶颈，再配置模块——价格不在官网公示，提交询盘获取方案。'
      : ja
        ? 'まず課題を診断し、モジュールを選定。価格は問い合わせでご案内。'
        : 'Diagnose first, then pick modules. Pricing via inquiry — not listed publicly.',
    rolesTitle: zh ? '适合这些角色' : ja ? 'こんな方に' : 'Built for',
    ctaTitle: zh
      ? '先谈您的获客瓶颈，再谈系统怎么配'
      : ja
        ? 'まずは課題から。構成はあとで。'
        : 'Talk bottlenecks first, stack second',
    ctaSub: zh
      ? '留下行业、目标市场与现状，我们给出可落地的模块组合建议。'
      : ja
        ? '業界・市場・現状を教えてください。実行可能な組み合わせをご提案します。'
        : 'Share industry, markets, and status — we’ll propose a practical module mix.',
    ctaBtn: zh ? '提交询盘' : ja ? '問い合わせる' : 'Send inquiry',
    readMore: zh ? '了解模块' : ja ? '詳細を見る' : 'Learn more',
    exploreAll: zh ? '查看全部产品' : ja ? 'すべての製品' : 'All products',
    solveLabel: zh ? '我们如何解决' : ja ? '解決策' : 'How we solve it',
    compareColOld: zh ? '常见旧方式' : ja ? '従来' : 'Typical old way',
    compareColNew: zh ? '磁帧鱼' : 'Cizhenyu',
    compareDim: zh ? '维度' : ja ? '項目' : 'Dimension',
    compareDim1: zh ? '建站与改内容' : ja ? 'サイトと更新' : 'Site & content edits',
    compareOld1: zh ? '外包改一版排一期' : ja ? '外注で都度待ち' : 'Agency queue for every edit',
    compareNew1: zh ? '后台自行更新，站点自动刷新' : ja ? 'CMSで更新、サイト即反映' : 'Edit in CMS; site refreshes',
    compareDim2: zh ? '上线与运维' : ja ? '公開と運用' : 'Launch & ops',
    compareOld2: zh ? '要懂 Cloudflare 才能部署' : ja ? 'Cloudflare 習熟が必要' : 'Must learn Cloudflare',
    compareNew2: zh
      ? '部署向导点选交付，资产在自有账户'
      : ja
        ? 'ウィザード導入、資産は自アカウント'
        : 'Wizard deploy; assets on your account',
    compareDim3: zh ? '询盘跟进' : ja ? '問い合わせ対応' : 'Inquiry follow-up',
    compareOld3: zh ? '散落微信/邮件，夜间空窗' : ja ? 'チャット散在、夜間空白' : 'Leads scattered; night gaps',
    compareNew3: zh
      ? 'CRM + 知识库 AI 客服可转人工'
      : ja
        ? 'CRM + KB AI、必要時に有人'
        : 'CRM + KB AI with human handoff',
    compareDim4: zh ? 'SEO/GEO 与社媒' : 'SEO/GEO & social',
    compareOld4: zh ? '靠加班堆人力，难坚持' : ja ? '人力頼みで続かない' : 'Manual grind that fades',
    compareNew4: zh
      ? '本地 Agent 成熟流程，低 Token 日常运营'
      : ja
        ? 'ローカル Agent・低 Token 運用'
        : 'Local Agent playbooks; low-token ops',
    step1Title: zh ? '描述业务与瓶颈' : ja ? '課題を伝える' : 'Describe bottlenecks',
    step1Body: zh
      ? '行业、目标市场、有无网站与询盘渠道。'
      : ja
        ? '業界・市場・サイト/問い合わせ現状。'
        : 'Industry, markets, site & inquiry status.',
    step2Title: zh ? '组合模块方案' : ja ? 'モジュール選定' : 'Compose modules',
    step2Body: zh
      ? '按阶段配置后台、展示站、部署、询盘与 Agent。'
      : ja
        ? 'CMS・サイト・Deploy・CRM・Agent を段階導入。'
        : 'Stage CMS, site, deploy, CRM, and Agent.',
    step3Title: zh ? '上线并持续获客' : ja ? '公開と継続獲得' : 'Launch & keep acquiring',
    step3Body: zh
      ? '一键部署到自有 Cloudflare，再跑自动化运营节奏。'
      : ja
        ? '自 Cloudflare へ導入し、自動化運用を回す。'
        : 'Deploy to your Cloudflare, then run ops loops.',
    role1: zh ? '个人外贸业务员' : ja ? '個人営業' : 'Solo export sales',
    role1Body: zh
      ? '先有可索引的独立站资产，再谈放大。'
      : ja
        ? 'まず検索される自社サイト資産を持つ。'
        : 'Own an indexable site asset first, then scale.',
    role2: zh ? '中小外贸企业 / 工厂外贸部' : ja ? '中小輸出企業' : 'SME export teams',
    role2Body: zh
      ? '从「有网站」升级到「有持续获客节奏」。'
      : ja
        ? '「サイトがある」から「継続獲得」へ。'
        : 'Move from “have a site” to a steady lead rhythm.',
    role3: zh ? '外贸服务商' : ja ? '輸出支援事業者' : 'Export agencies',
    role3Body: zh
      ? '标准化交付，缩短每次从零配置的时间。'
      : ja
        ? '標準納品でゼロからの設定時間を短縮。'
        : 'Standardize delivery; cut zero-to-live time.',
    trust1: zh
      ? '部署到您自己的 Cloudflare 账户'
      : ja
        ? 'ご自身の Cloudflare アカウントへ'
        : 'Deploy to your own Cloudflare account',
    trust2: zh
      ? '数据自有，按模块阶段投入'
      : ja
        ? 'データは自社、段階導入'
        : 'Your data; stage modules as needed',
    trust3: zh
      ? '价格询盘获取，官网不公示套餐价'
      : ja
        ? '価格は問い合わせ、公開料金表なし'
        : 'Pricing via inquiry — not listed publicly',
    solveHint: zh
      ? '纳入磁帧鱼增长流水线统一解决'
      : ja
        ? '磁帧鱼の獲得パイプラインで解決'
        : 'Solved inside the Cizhenyu growth pipeline',
  };
}
