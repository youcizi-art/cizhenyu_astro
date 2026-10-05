/** 首页区块标题（UI chrome）；正文来自 CMS seed */
export function defaultHomeLabels(locale: string) {
  const zh = locale.startsWith('zh');
  const ja = locale === 'ja';
  return {
    painTitle: zh
      ? '外贸团队最常卡住的三件事，先在这里说清楚'
      : ja
        ? '輸出チームがつまずく3つの現実'
        : 'Three frictions export teams hit first',
    painSub: zh
      ? '不是再买一个工具就能解决——需要可安装、可交付、能接住询盘的系统。'
      : ja
        ? 'ツール追加では足りません。導入でき、問い合わせを受け止められる仕組みが必要です。'
        : 'Another SaaS tab won’t fix it — you need an installable stack that catches leads.',
    productsTitle: zh ? '三款可下载安装的产品' : ja ? 'ダウンロード導入できる3製品' : 'Three installable products',
    productsSub: zh
      ? '站群与 B2B 生成、智能客服询盘、部署运营获客——可单买、可组合，客服可协作安装。'
      : ja
        ? 'サイト群生成・AI問い合わせ・導入運用。単体でも組合せでも。同席導入可。'
        : 'Multi-site generation, AI inquiry, deploy growth — alone or together, with install help.',
    compareTitle: zh
      ? '同样要获客，为什么选磁帧鱼，而不是继续堆人力？'
      : ja
        ? '同じ予算なら、なぜ磁帧鱼か'
        : 'Same budget — why Cizhenyu instead of more headcount?',
    compareSub: zh
      ? '把建站改稿、询盘承接、上线运维收进同一条可安装链路。'
      : ja
        ? 'サイト更新・問い合わせ・導入運用を一本の導入可能な流れに。'
        : 'Collapse site edits, inquiry handling, and deploy ops into one installable flow.',
    stepsTitle: zh ? '3 步开始' : ja ? '3ステップ' : 'Start in 3 steps',
    stepsSub: zh
      ? '先讲清楚瓶颈，再选产品；下载后可约客服协作安装。价格询盘获取。'
      : ja
        ? '課題→製品選定→ダウンロード後に同席導入可。価格はお問い合わせ。'
        : 'Diagnose, pick products, download — collaborative install available. Pricing via inquiry.',
    rolesTitle: zh ? '这些角色正在用' : ja ? 'こんな方に' : 'Built for',
    rolesSub: zh
      ? '个人业务员、工厂外贸部、外贸服务商——都能按阶段上模块。'
      : ja
        ? '個人営業・メーカー輸出部・支援事業者向け。'
        : 'Solo sellers, factory teams, and agencies — stage modules as needed.',
    ctaTitle: zh
      ? '准备好下载安装了吗？'
      : ja
        ? 'ダウンロード導入の準備は？'
        : 'Ready to download and install?',
    ctaSub: zh
      ? '点击下载将进入询盘；告诉我们行业与目标市场，客服可协作上线。'
      : ja
        ? 'ダウンロードは問い合わせへ。業界と市場を伝え、同席導入も可能。'
        : 'Download opens inquiry — share industry and markets; we can collaborate on install.',
    ctaBtn: zh ? '去下载 / 提交询盘' : ja ? 'ダウンロード / 相談' : 'Download / Inquire',
    readMore: zh ? '了解产品' : ja ? '詳細' : 'Learn more',
    exploreAll: zh ? '查看全部产品' : ja ? 'すべての製品' : 'All products',
    downloadCta: zh ? '去下载安装' : ja ? 'ダウンロードへ' : 'Go to download',
    solveLabel: zh ? '磁帧鱼怎么解' : ja ? '磁帧鱼の解' : 'How Cizhenyu helps',
    solveHint: zh
      ? '纳入三款可安装产品，按阶段交付'
      : ja
        ? '3製品を段階導入'
        : 'Stage the three installable products',
    compareColOld: zh ? '常见旧方式' : ja ? '従来' : 'Typical old way',
    compareColNew: zh ? '磁帧鱼' : 'Cizhenyu',
    compareDim: zh ? '维度' : ja ? '項目' : 'Dimension',
    compareDim1: zh ? '建站与改内容' : ja ? 'サイト更新' : 'Site & content',
    compareOld1: zh ? '外包改一版排一期' : ja ? '外注待ち' : 'Agency queue every edit',
    compareNew1: zh ? '站群后台统一改，站点自动刷新' : ja ? 'サイト群CMSで即反映' : 'Edit once in multi-site CMS',
    compareDim2: zh ? '询盘承接' : ja ? '問い合わせ' : 'Inquiry handling',
    compareOld2: zh ? '散落微信/邮件，夜间空窗' : ja ? '散在・夜間空白' : 'Scattered chats; night gaps',
    compareNew2: zh ? '智能客服 + 询盘中台，可转人工' : ja ? 'AI客服＋有人切替' : 'AI desk with human handoff',
    compareDim3: zh ? '上线与运维' : ja ? '導入と運用' : 'Launch & ops',
    compareOld3: zh ? '要懂 Cloudflare 才能部署' : ja ? 'Cloudflare習熟が必要' : 'Must learn Cloudflare',
    compareNew3: zh ? '向导部署到自有账户，可协作安装' : ja ? 'ウィザード＋同席導入' : 'Wizard deploy + collaborative install',
    compareDim4: zh ? '上线后获客' : ja ? '公開後の獲得' : 'After go-live',
    compareOld4: zh ? '上线即停更，难坚持' : ja ? '公開で止まる' : 'Launch then stall',
    compareNew4: zh ? '部署运营获客系统持续跑节奏' : ja ? '導入運用で継続' : 'Growth ops keeps cadence',
    step1Title: zh ? '说清行业与瓶颈' : ja ? '課題を伝える' : 'Share bottlenecks',
    step1Body: zh
      ? '目标市场、有无站群/官网、询盘怎么接。'
      : ja
        ? '市場・サイト有無・問い合わせ現状。'
        : 'Markets, current sites, how leads arrive.',
    step2Title: zh ? '选产品组合' : ja ? '製品を選ぶ' : 'Pick modules',
    step2Body: zh
      ? '站群生成 / 智能询盘 / 部署获客，按阶段配置。'
      : ja
        ? 'サイト群・問い合わせ・導入運用を段階選定。'
        : 'Multi-site, inquiry, deploy growth — by stage.',
    step3Title: zh ? '下载并协作安装' : ja ? 'ダウンロードと同席導入' : 'Download & install together',
    step3Body: zh
      ? '下载入口进询盘；客服可协助首发上线与初始化。'
      : ja
        ? 'ダウンロードは問い合わせへ。初回導入をサポート。'
        : 'Download CTAs open inquiry; support helps first launch.',
    role1: zh ? '个人外贸业务员' : ja ? '個人営業' : 'Solo export sellers',
    role1Body: zh
      ? '先有可索引的站点资产，再谈放大询盘。'
      : ja
        ? 'まず検索されるサイト資産を持つ。'
        : 'Own an indexable site asset first, then scale leads.',
    role2: zh ? '工厂 / 贸易公司外贸部' : ja ? 'メーカー輸出部' : 'Factory & trading teams',
    role2Body: zh
      ? '从「有个站」升级到「站群 + 询盘 + 持续运营」。'
      : ja
        ? 'サイトがある状態から継続獲得へ。'
        : 'Move from “have a site” to multi-site + inquiry cadence.',
    role3: zh ? '外贸服务商 / 建站代理' : ja ? '支援事業者' : 'Export agencies',
    role3Body: zh
      ? '标准化交付站群与询盘系统，缩短每次从零配置。'
      : ja
        ? '標準納品でゼロからの設定を短縮。'
        : 'Standardize delivery; cut zero-to-live time.',
    trust1: zh
      ? '3 款产品可下载 · 客服可协作安装'
      : ja
        ? '3製品DL可・同席導入可'
        : '3 downloadable products · collaborative install',
    trust2: zh
      ? '资产部署到您自己的云账户'
      : ja
        ? '資産は自クラウドアカウントへ'
        : 'Assets on your own cloud account',
    trust3: zh
      ? '价格询盘获取 · 官网不公示套餐价'
      : ja
        ? '価格はお問い合わせ'
        : 'Pricing via inquiry — not listed publicly',
    heroPanel: zh ? '站群 · 询盘 · 部署获客' : ja ? 'サイト群・問い合わせ・導入' : 'Sites · Inquiry · Growth',
  };
}
