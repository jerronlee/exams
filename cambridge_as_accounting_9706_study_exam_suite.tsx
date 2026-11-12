import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Search,
  Languages,
  Calculator,
  FileText,
  HelpCircle,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Eye,
  Check,
  X,
  Sparkles,
  Layers,
  GraduationCap,
  Scale,
  ArrowRightLeft,
  Compass,
  Filter,
  Bookmark,
  Volume2,
  ClipboardCheck,
  BarChart3,
  Lightbulb
} from 'lucide-react';

// ============================================================================
// 1. BILINGUAL ACCOUNTING JARGON & COMMAND WORDS DATABASE (55+ ESSENTIAL TERMS)
// ============================================================================
const JARGON_DICTIONARY = [
  // Section 1.1 & 1.2: The Accounting System & Entities
  {
    id: 'double-entry',
    term: 'Double-entry bookkeeping',
    zh: '复式记账法',
    pinyin: 'Fùshì jìzhàng fǎ',
    topic: '1.2',
    category: 'Accounting System',
    definition: 'A system of recording financial transactions that recognises there are two sides (debit and credit) to every transaction.',
    zhNote: '每一笔经济业务都以相等的金额在两个或两个以上相互联系的账户中进行登记（有借必有贷，借贷必相等）。'
  },
  {
    id: 'duality',
    term: 'Duality concept',
    zh: '双重性原则 / 复式原则',
    pinyin: 'Shuāngchóngxìng yuánzé',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'Recognises that there are two aspects to each financial transaction, represented by debit and credit entries in accounts (Assets = Capital + Liabilities).',
    zhNote: '会计恒等式的基础：资产 = 资本 + 负债。每项交易都有双重影响。'
  },
  {
    id: 'books-prime-entry',
    term: 'Books of prime entry',
    zh: '原始记账簿 / 序时账簿',
    pinyin: 'Yuánshǐ jìzhàng bù',
    topic: '1.2',
    category: 'Accounting System',
    definition: 'Books in which transactions are first recorded before being posted to the ledger (Sales Journal, Purchases Journal, Cash Book, General Journal, etc.).',
    zhNote: '交易发生时首先登记的账簿（如销售日记账、采购日记账、现金簿、普通日记账），之后再过账到分类账。'
  },
  {
    id: 'ledger',
    term: 'Ledger account',
    zh: '分类账户',
    pinyin: 'Fēnlèi zhànghù',
    topic: '1.2',
    category: 'Accounting System',
    definition: 'A history of all financial transactions of a similar nature, divided into Debit (left) and Credit (right) sides.',
    zhNote: '按经济业务类别设立的T型账户（T-account），左边为借方（Debit），右边为贷方（Credit）。'
  },
  {
    id: 'trial-balance',
    term: 'Trial balance',
    zh: '试算平衡表',
    pinyin: 'Shìsuàn pínghéng biǎo',
    topic: '1.4',
    category: 'Verification',
    definition: 'A list of all balances extracted from the ledger accounts at a particular date to check the arithmetical accuracy of double-entry bookkeeping.',
    zhNote: '列出所有分类账户借方余额和贷方余额的表，用于检查复式记账的算术准确性。'
  },
  {
    id: 'contra-entry',
    term: 'Contra entry (Set-off)',
    zh: '对销分录 / 抵销分录',
    pinyin: 'Duìxiāo fēnlù',
    topic: '1.4',
    category: 'Accounting System',
    definition: 'An accounting entry where balances on two accounts are cancelled out against each other (e.g., Cash/Bank contra or Sales/Purchases Ledger set-off).',
    zhNote: '两个账户余额互相抵销的分录（如现金存入银行的对冲，或既是客户又是供应商时的应收应付抵销）。'
  },
  {
    id: 'going-concern',
    term: 'Going concern',
    zh: '持续经营假设',
    pinyin: 'Chíxù jīngyíng jiǎshè',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'The assumption that a business will continue to operate for the foreseeable future and has no intention or need to liquidate.',
    zhNote: '假设企业在可预见的未来会持续经营下去，不会破产清算，因此资产按历史成本而非清算价格计价。'
  },
  {
    id: 'matching-concept',
    term: 'Matching concept (Accruals concept)',
    zh: '配比原则 (权责发生制)',
    pinyin: 'Pèibǐ yuánzé (Quánzé fāshēng zhì)',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'Revenue earned and expenses incurred in an accounting period must be matched against each other to determine profit, regardless of when cash is received or paid.',
    zhNote: '当期赚取的收入必须与为赚取该收入而发生的当期费用相配比，不论款项是否实际收付。'
  },
  {
    id: 'prudence',
    term: 'Prudence concept',
    zh: '谨慎性原则',
    pinyin: 'Jǐnshènxìng yuánzé',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'Profits and assets should not be overstated, and losses and liabilities should not be understated. Provide for all probable losses.',
    zhNote: '不高估资产或收益，不低估负债或费用（例如计提坏账准备、存货按成本与可变现净值孰低计价）。'
  },
  {
    id: 'consistency',
    term: 'Consistency concept',
    zh: '一贯性原则 / 一致性原则',
    pinyin: 'Yīguànxìng yuánzé',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'Financial transactions of a similar nature should be recorded using the same accounting method in the same and future accounting years.',
    zhNote: '同一企业不同时期应采用一致的会计政策和方法（如折旧方法），以便财务报表具有可比性。'
  },
  {
    id: 'substance-over-form',
    term: 'Substance over form',
    zh: '实质重于形式',
    pinyin: 'Shízhì zhòng yú xíngshì',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'Transactions are recorded according to their real economic substance rather than strictly their legal form (e.g., assets bought on hire purchase).',
    zhNote: '应当按照交易或事项的经济实质进行会计核算，而不应仅以法律形式为依据。'
  },
  {
    id: 'materiality',
    term: 'Materiality concept',
    zh: '重要性原则',
    pinyin: 'Zhòngyàoxìng yuánzé',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'Items of low value that do not affect users’ decisions can be treated as expenses rather than non-current assets (e.g., calculators or staplers).',
    zhNote: '忽略不重要的微小项目（如廉价办公文具直接作为费用而非固定资产），重点反映可能影响决策的重要信息。'
  },
  {
    id: 'business-entity',
    term: 'Business entity concept',
    zh: '会计主体假设',
    pinyin: 'Kuàijì zhǔtǐ jiǎshè',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'The affairs of the business are treated as completely separate from the personal affairs of its owner(s).',
    zhNote: '企业的经济活动与所有者的个人经济活动必须严格区分（业主私人提款记作Drawings）。'
  },
  {
    id: 'historic-cost',
    term: 'Historic cost concept',
    zh: '历史成本原则',
    pinyin: 'Lìshǐ chéngběn yuánzé',
    topic: '1.2',
    category: 'Accounting Concepts',
    definition: 'Assets and expenses are initially recorded in ledger accounts at their actual original purchase price.',
    zhNote: '各项财产物资应当按取得时的实际交易价格计价，具有客观性和可验证性。'
  },

  // Section 1.3: Non-current assets & Depreciation
  {
    id: 'non-current-assets',
    term: 'Non-current assets',
    zh: '非流动资产 (固定资产)',
    pinyin: 'Fēi liúdòng zīchǎn',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'Items bought by a business intended to be used for operations for more than one year and not bought for resale.',
    zhNote: '企业持有以供生产经营使用超过一年、且不以转售为目的的资产（如厂房、机器、车辆）。'
  },
  {
    id: 'capital-expenditure',
    term: 'Capital expenditure',
    zh: '资本性支出',
    pinyin: 'Zīběnxìng zhīchū',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'Expenditure incurred in the purchase, delivery, installation, or improvement of a non-current asset (recorded in the Statement of Financial Position).',
    zhNote: '用于购买、安装或改良非流动资产并提升其盈利能力的支出（计入资产负债表）。'
  },
  {
    id: 'revenue-expenditure',
    term: 'Revenue expenditure',
    zh: '收益性支出 (日常费用支出)',
    pinyin: 'Shōuyìxìng zhīchū',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'Expenditure incurred in the day-to-day running and maintenance of the business (charged as an expense in the Statement of Profit or Loss).',
    zhNote: '用于企业日常运营和维护资产正常运转的支出（如维修费、保险费、路税，计入损益表）。'
  },
  {
    id: 'depreciation',
    term: 'Depreciation',
    zh: '折旧',
    pinyin: 'Zhéjiù',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'The systematic allocation of the cost of a non-current asset over its estimated useful economic life.',
    zhNote: '将非流动资产的成本在其预计使用寿命内进行系统分摊的过程（体现配比原则与谨慎性原则）。'
  },
  {
    id: 'accumulated-depreciation',
    term: 'Provision for (Accumulated) depreciation',
    zh: '累计折旧',
    pinyin: 'Lěijì zhéjiù',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'The cumulative total of all depreciation charged on non-current assets since purchase. Has a credit balance.',
    zhNote: '资产自购入以来已计提折旧的累计总额，属于资产抵减账户（贷方余额）。'
  },
  {
    id: 'net-book-value',
    term: 'Net book value (Carrying amount)',
    zh: '账面净值',
    pinyin: 'Zhàngmiàn jìngzhí',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'The historic cost of a non-current asset minus its accumulated depreciation to date (Cost - Accumulated Depreciation).',
    zhNote: '非流动资产原始成本减去累计折旧后的余额（Cost - Accumulated Depreciation）。'
  },
  {
    id: 'straight-line',
    term: 'Straight-line method',
    zh: '直线法 (平均年限法)',
    pinyin: 'Zhíxiàn fǎ',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'Depreciation method that charges an equal amount of depreciation each year: (Cost - Residual Value) ÷ Useful Life.',
    zhNote: '每年计提相同金额的折旧：(成本 - 预计残值) ÷ 预计使用年限。适合建筑等损耗均匀的资产。'
  },
  {
    id: 'reducing-balance',
    term: 'Reducing balance method',
    zh: '余额递减法',
    pinyin: 'Yú’é dìjiǎn fǎ',
    topic: '1.3',
    category: 'Assets & Depreciation',
    definition: 'Depreciation method where a fixed percentage is applied to the Net Book Value each year, resulting in higher charges in early years.',
    zhNote: '每年按资产账面净值（NBV）乘以固定百分比计提折旧，前期折旧多、后期折旧少（适合车辆、电脑）。'
  },

  // Section 1.4: Reconciliation & Verification
  {
    id: 'bank-reconciliation',
    term: 'Bank reconciliation statement',
    zh: '银行存款余额调节表',
    pinyin: 'Yínháng cúnkuǎn yú’é tiáojié biǎo',
    topic: '1.4',
    category: 'Verification',
    definition: 'A statement prepared periodically to explain the difference between the updated Cash Book bank balance and the balance shown on the bank statement.',
    zhNote: '定期编制以解释更新后的现金簿银行账户余额与银行对账单余额之间差异（未达账项）的报表。'
  },
  {
    id: 'unpresented-cheques',
    term: 'Unpresented cheques',
    zh: '未兑现支票',
    pinyin: 'Wèi duìxiàn zhīpiào',
    topic: '1.4',
    category: 'Verification',
    definition: 'Cheques issued by the business and recorded in the cash book, but not yet presented to the bank for payment by the supplier.',
    zhNote: '企业已开出并记入现金簿贷方，但收款人尚未到银行兑现的支票。'
  },
  {
    id: 'uncredited-lodgements',
    term: 'Uncredited lodgements (Deposits in transit)',
    zh: '在途存款 / 未达存款',
    pinyin: 'Zàitú cúnkuǎn',
    topic: '1.4',
    category: 'Verification',
    definition: 'Money paid into the bank and debited in the cash book, but not yet cleared and credited on the bank statement.',
    zhNote: '企业已存入银行并记入现金簿借方，但银行尚未入账的存款。'
  },
  {
    id: 'control-account',
    term: 'Control account',
    zh: '统制账户 / 控制账户',
    pinyin: 'Tǒngzhì zhànghù',
    topic: '1.4',
    category: 'Verification',
    definition: 'A summary account containing the totals of all transactions relating to Trade Receivables (Sales Ledger) or Trade Payables (Purchases Ledger) to locate errors and deter fraud.',
    zhNote: '汇总登记应收账款明细账或应付账款明细账总额的账户，用于核对明细账准确性及防止舞弊。'
  },
  {
    id: 'suspense-account',
    term: 'Suspense account',
    zh: '暂记账户',
    pinyin: 'Zànjì zhànghù',
    topic: '1.4',
    category: 'Verification',
    definition: 'A temporary account opened when the Trial Balance fails to agree, holding the difference until errors are discovered and corrected via journal entries.',
    zhNote: '当试算平衡表借贷总额不相等时开设的临时账户，在查明错误并编制更正分录后余额清零。'
  },

  // Section 1.5: Financial Statements & Adjustments
  {
    id: 'statement-profit-loss',
    term: 'Statement of profit or loss (Income statement)',
    zh: '损益表 (利润表)',
    pinyin: 'Sǔnyì biǎo (Lìrùn biǎo)',
    topic: '1.5',
    category: 'Financial Statements',
    definition: 'A financial statement prepared for an accounting period to calculate Gross Profit and Profit for the year.',
    zhNote: '反映企业在一定会计期间经营成果（毛利 Gross Profit 与年度净利润 Profit for the year）的财务报表。'
  },
  {
    id: 'statement-financial-position',
    term: 'Statement of financial position (Balance sheet)',
    zh: '财务状况表 (资产负债表)',
    pinyin: 'Cáiwù zhuàngkuàng biǎo',
    topic: '1.5',
    category: 'Financial Statements',
    definition: 'A statement listing the assets, liabilities, and capital/equity of a business at a specific point in time.',
    zhNote: '反映企业在某一特定日期的资产、负债和所有者权益（资本）状况的报表。'
  },
  {
    id: 'accrual',
    term: 'Accrual (Accrued expense)',
    zh: '应计费用 (应付未付费用)',
    pinyin: 'Yīngjì fèiyòng',
    topic: '1.5',
    category: 'Adjustments',
    definition: 'An expense incurred within the accounting period for which benefit has been received, but remains unpaid at the year end (Current Liability).',
    zhNote: '本期已经发生并受益但期末尚未支付的费用（在损益表中加上，在资产负债表中列为流动负债）。'
  },
  {
    id: 'prepayment',
    term: 'Prepayment (Prepaid expense)',
    zh: '预付费用',
    pinyin: 'Yùfù fèiyòng',
    topic: '1.5',
    category: 'Adjustments',
    definition: 'An expense paid in advance during the current year that relates to the next accounting period (Current Asset).',
    zhNote: '本期已支付但属于下一会计期间的费用（在损益表中减去，在资产负债表中列为流动资产）。'
  },
  {
    id: 'irrecoverable-debt',
    term: 'Irrecoverable debt (Bad debt)',
    zh: '坏账 / 无法收回的债务',
    pinyin: 'Huàizhàng',
    topic: '1.5',
    category: 'Adjustments',
    definition: 'A debt due from a credit customer that is confirmed to be uncollectible and is written off as an expense.',
    zhNote: '确认为无法收回并从应收账款中直接核销的客户欠款（借记坏账费用，贷记应收账款）。'
  },
  {
    id: 'allowance-irrecoverable',
    term: 'Allowance (Provision) for irrecoverable debts',
    zh: '坏账准备 / 呆账准备',
    pinyin: 'Huàizhàng zhǔnbèi',
    topic: '1.5',
    category: 'Adjustments',
    definition: 'An estimate of the amount of current trade receivables that may become irrecoverable in the future, deducted from Trade Receivables on the SOFP.',
    zhNote: '根据谨慎性原则对期末应收账款可能无法收回部分所作的估计抵减项；只有准备金的增减变动才计入当期损益表。'
  },
  {
    id: 'trade-receivables',
    term: 'Trade receivables (Debtors)',
    zh: '应收账款',
    pinyin: 'Yīngshōu zhàngkuǎn',
    topic: '1.5',
    category: 'Financial Statements',
    definition: 'Amounts owed to the business by credit customers for goods sold on credit (Current Asset).',
    zhNote: '因赊销商品而应向客户收取的款项（属于流动资产）。'
  },
  {
    id: 'trade-payables',
    term: 'Trade payables (Creditors)',
    zh: '应付账款',
    pinyin: 'Yīngfù zhàngkuǎn',
    topic: '1.5',
    category: 'Financial Statements',
    definition: 'Amounts owed by the business to credit suppliers for goods bought on credit (Current Liability).',
    zhNote: '因赊购商品而欠供应商的货款（属于流动负债）。'
  },
  {
    id: 'inventory',
    term: 'Inventory (Stock)',
    zh: '存货',
    pinyin: 'Cúnhuò',
    topic: '1.5',
    category: 'Financial Statements',
    definition: 'Unsold goods held by a business at a point in time, valued at the lower of Cost and Net Realisable Value (IAS 2).',
    zhNote: '企业在期末持有的未售出商品，按成本（Cost）与可变现净值（NRV）孰低原则计价。'
  },
  {
    id: 'net-realisable-value',
    term: 'Net realisable value (NRV)',
    zh: '可变现净值',
    pinyin: 'Kě biànxiàn jìngzhí',
    topic: '1.5',
    category: 'Financial Statements',
    definition: 'Estimated selling price of inventory less any further costs to complete and costs to sell (Selling Price - Completion/Selling Costs).',
    zhNote: '存货的预计售价减去进一步加工成本和预计销售费用后的净额。'
  },
  {
    id: 'drawings',
    term: 'Drawings',
    zh: '提款 / 业主提用',
    pinyin: 'Tíkuǎn',
    topic: '1.5',
    category: 'Financial Statements',
    definition: 'Cash or goods taken out of a business by the owner(s) for personal use, reducing capital/current account.',
    zhNote: '企业所有者从企业提取供个人使用的现金或商品，直接减少业主资本（不作为企业费用）。'
  },
  {
    id: 'appropriation-account',
    term: 'Appropriation account',
    zh: '利润分配账户',
    pinyin: 'Lìrùn fēnpèi zhànghù',
    topic: '1.5',
    category: 'Partnerships',
    definition: 'An account prepared after the Statement of Profit or Loss in a partnership showing how profit for the year is shared (interest on drawings, interest on capital, salaries, residual profit).',
    zhNote: '合伙企业损益表之后编制的账户，展示年度利润如何在合伙人之间分配（提款利息、资本利息、合伙人薪金及剩余利润分成）。'
  },
  {
    id: 'share-premium',
    term: 'Share premium',
    zh: '股本溢价 / 股票溢价',
    pinyin: 'Gǔběn yìjià',
    topic: '1.1',
    category: 'Limited Companies',
    definition: 'A capital reserve created when a limited company issues shares at a price above their nominal (par) value.',
    zhNote: '有限公司以高于股票面值（Nominal/Par value）的价格发行股票时产生的溢价，属于不可用于派息的资本公积（Capital reserve）。'
  },
  {
    id: 'retained-earnings',
    term: 'Retained earnings',
    zh: '留存收益',
    pinyin: 'Liúcún shōuyì',
    topic: '1.1',
    category: 'Limited Companies',
    definition: 'Accumulated profits of a limited company after tax, dividends, and transfers to general reserves, kept for reinvestment (Revenue reserve).',
    zhNote: '公司历年累计实现的税后利润扣除已派发股息及转入普通储备后的余额，属于可分配的收益公积（Revenue reserve）。'
  },
  {
    id: 'rights-issue',
    term: 'Rights issue of shares',
    zh: '配股 (供股)',
    pinyin: 'Pèigǔ',
    topic: '1.1',
    category: 'Limited Companies',
    definition: 'An issue of new shares for cash offered to existing shareholders in proportion to their current shareholding, usually below market price.',
    zhNote: '向现有股东按其持股比例发行的有偿新股，能为公司筹集现金。'
  },
  {
    id: 'bonus-issue',
    term: 'Bonus issue (Capitalisation issue)',
    zh: '红股发行 (资本化发行)',
    pinyin: 'Hónggǔ fāxíng',
    topic: '1.1',
    category: 'Limited Companies',
    definition: 'An issue of free shares to existing shareholders out of reserves. Total equity and cash remain unchanged.',
    zhNote: '将储备金转化为股本、免费向现有股东派发新股。不产生现金流入，股东权益总额不变（优先使用资本公积如Share Premium）。'
  },
  {
    id: 'debentures',
    term: 'Debentures (Loan notes)',
    zh: '公司债券 / 长期借款债券',
    pinyin: 'Gōngsī zhàiquàn',
    topic: '1.1',
    category: 'Limited Companies',
    definition: 'Long-term loans issued by a company carrying a fixed rate of interest, classified as Non-current Liabilities.',
    zhNote: '公司发行的固定利率长期债务凭证，属于非流动负债，无论公司是否盈利都必须支付债券利息（财务费用）。'
  },
  {
    id: 'margin-markup',
    term: 'Margin vs Mark-up',
    zh: '销售毛利率 (Margin) 与 成本加成率 (Mark-up)',
    pinyin: 'Máolìlǜ yǔ Chéngběn jiāchénglǜ',
    topic: '1.5',
    category: 'Incomplete Records',
    definition: 'Margin = Gross Profit ÷ Revenue. Mark-up = Gross Profit ÷ Cost of Sales. If Mark-up is 1/4 (25%), Margin is 1/5 (20%).',
    zhNote: 'Margin以销售额为分母（毛利÷销售收入）；Mark-up以销售成本为分母（毛利÷销售成本）。不完整记录题目中常用于倒推失窃存货或销售额。'
  },

  // Section 1.6: Ratios & Analysis
  {
    id: 'roce',
    term: 'Return on Capital Employed (ROCE)',
    zh: '动用资本回报率',
    pinyin: 'Dòngyòng zīběn huíbàolǜ',
    topic: '1.6',
    category: 'Ratios',
    definition: 'Profit from operations (before interest and tax) ÷ Capital Employed × 100%. Measures how efficiently long-term funds generate profit.',
    zhNote: '营业利润（息税前利润）÷ 动用资本总额（所有者权益 + 非流动负债）× 100%，衡量长期资金创造利润的整体效率。'
  },
  {
    id: 'liquid-ratio',
    term: 'Liquid (Acid test / Quick) ratio',
    zh: '速动比率 (酸性测试比率)',
    pinyin: 'Sùdòng bǐlǜ',
    topic: '1.6',
    category: 'Ratios',
    definition: '(Current Assets - Inventory) : Current Liabilities. Tests whether a business can pay its immediate debts without relying on selling inventory.',
    zhNote: '(流动资产 - 存货) : 流动负债。剔除变现最慢的存货，衡量企业即刻偿还短期债务的能力（通常基准约为1:1）。'
  },

  // Section 2.1 & 2.2: Cost & Management Accounting
  {
    id: 'fifo-avco',
    term: 'FIFO & AVCO inventory valuation',
    zh: '先进先出法 (FIFO) 与 加权平均法 (AVCO)',
    pinyin: 'Xiānjìn xiānchū fǎ / Jiāquán píngjūn fǎ',
    topic: '2.1',
    category: 'Cost Accounting',
    definition: 'FIFO assumes earliest inventory bought is issued/sold first. AVCO recalculates weighted average unit cost after each new receipt of inventory.',
    zhNote: 'FIFO假设先购入的存货先发出（物价上涨时，期末存货价值较高、利润较高）；AVCO每次进货后重新计算加权平均单价。'
  },
  {
    id: 'absorption-costing',
    term: 'Absorption costing',
    zh: '完全成本法 (吸收成本法)',
    pinyin: 'Wánquán chéngběn fǎ',
    topic: '2.2',
    category: 'Cost Accounting',
    definition: 'A costing system that allocates, apportions, and absorbs both variable and fixed production overheads into cost units (required for external financial reporting under IAS 2).',
    zhNote: '将全部生产成本（包括变动生产成本和固定制造费用）分摊并吸收计入产品单位成本的方法（符合国际会计准则外部报告要求）。'
  },
  {
    id: 'allocation-apportionment',
    term: 'Allocation vs Apportionment of overheads',
    zh: '制造费用的直接归集 (Allocation) 与 分配 (Apportionment)',
    pinyin: 'Guījí yǔ Fēnpèi',
    topic: '2.2',
    category: 'Cost Accounting',
    definition: 'Allocation charges whole cost items directly to a single cost centre. Apportionment shares shared overheads across cost centres using a fair basis (e.g., floor area for rent).',
    zhNote: 'Allocation是将专属某部门的费用直接计入该成本中心；Apportionment是将共同费用按合理标准（如厂房面积、机器价值）在各部门间分摊。'
  },
  {
    id: 'under-over-absorption',
    term: 'Under-absorption and Over-absorption',
    zh: '制造费用吸收不足 (少分配) 与 过度吸收 (多分配)',
    pinyin: 'Xīshōu bùzú / Guòdù xīshōu',
    topic: '2.2',
    category: 'Cost Accounting',
    definition: 'Occurs when Absorbed Overheads (OAR × Actual Activity) differ from Actual Overheads Incurred. Under-absorption reduces profit; Over-absorption increases profit.',
    zhNote: '当按预定吸收率计算的已吸收制造费用（OAR × 实际工时）低于实际发生额时为吸收不足（Under-absorbed），反之则为过度吸收（Over-absorbed）。'
  },
  {
    id: 'marginal-costing',
    term: 'Marginal costing',
    zh: '边际成本法 (变动成本法)',
    pinyin: 'Biānjì chéngběn fǎ',
    topic: '2.2',
    category: 'Cost Accounting',
    definition: 'A costing method that values inventory at variable production cost only and treats fixed overheads as period costs. Ideal for short-term internal decision making.',
    zhNote: '仅将变动生产成本计入产品成本，而将固定制造费用作为期间费用全额计入当期损益的方法。广泛用于短期内部经营决策。'
  },
  {
    id: 'contribution',
    term: 'Contribution',
    zh: '边际贡献',
    pinyin: 'Biānjì gòngxiàn',
    topic: '2.2',
    category: 'Cost Accounting',
    definition: 'Selling Price minus Variable Cost per unit (or Total Revenue minus Total Variable Costs). Contributes first towards covering Fixed Costs, and then towards Profit.',
    zhNote: '销售收入减去变动成本后的差额（单位售价 - 单位变动成本）。首先用于弥补固定成本，多余部分即为利润。'
  },
  {
    id: 'break-even',
    term: 'Break-even point (BEP) & Margin of Safety',
    zh: '盈亏平衡点 (保本点) 与 安全边际',
    pinyin: 'Yíngkuī pínghéng diǎn / Ānquán biānjì',
    topic: '2.2',
    category: 'Cost Accounting',
    definition: 'BEP (units) = Total Fixed Costs ÷ Contribution per unit (neither profit nor loss). Margin of Safety = Budgeted/Actual Sales - Break-even Sales.',
    zhNote: '盈亏平衡点 = 固定成本总额 ÷ 单位边际贡献（此时利润为零）。安全边际 = 预计（或实际）销量 - 盈亏平衡销量，衡量销量下跌多少才会开始亏损。'
  },
  {
    id: 'limiting-factor',
    term: 'Limiting factor (Key factor)',
    zh: '限制性因素 (瓶颈资源)',
    pinyin: 'Xiànzhìxìng yīnsù',
    topic: '2.2',
    category: 'Cost Accounting',
    definition: 'Anything that restricts production or sales capacity (e.g., scarce direct labour hours or raw materials). Maximise profit by ranking products by Contribution per unit of Limiting Factor.',
    zhNote: '限制企业产销量的稀缺资源（如熟练工时或原材料短缺）。决策规则：按“每单位限制性因素的边际贡献”从高到低排序安排生产。'
  },

  // Exam Command Words (Cambridge 9706)
  {
    id: 'cmd-state-explain',
    term: 'Command Words: State, Explain, Advise',
    zh: '剑桥考试指令词：State (陈述)、Explain (解释)、Advise (建议/评估)',
    pinyin: 'Kǎoshì zhǐlìng cí',
    topic: 'Exam',
    category: 'Command Words',
    definition: 'State (AO1): Give a concise fact. Explain (AO1/AO2): Set out purposes or reasons ("Point + Because/Impact"). Advise/Evaluate (AO3): Weigh pros & cons, consider financial & non-financial factors, and give a clear recommendation.',
    zhNote: 'State只需简明写出要点；Explain需要写出原因及影响；Advise/Evaluate（高分题必考）必须权衡正反两方面、结合财务与非财务因素，并在最后给出明确的结论建议（Recommendation）。'
  }
];

// ============================================================================
// 2. COMPLETE AS LEVEL 9706 SYLLABUS MODULES & STUDY NOTES
// ============================================================================
const SYLLABUS_MODULES = [
  {
    id: '1.1',
    code: 'AS 1.1',
    section: 'Financial Accounting',
    title: 'Types of Business Entity',
    zhTitle: '企业组织形式 (独资、合伙与有限公司)',
    chapters: 'Chapters 18, 21, 22',
    summary: 'Understand the legal and accounting differences between Sole Traders, Partnerships, and Limited Companies, including capital structures, reserves, debentures, and financing.',
    learningObjectives: [
      'Compare ownership, liability, management, and financing of sole traders, partnerships, and private/public limited companies (Plc vs Ltd)',
      'Understand the Partnership Act 1890 default rules when no Partnership Agreement exists',
      'Distinguish between Revenue Reserves (Retained Earnings, General Reserve) and Capital Reserves (Share Premium, Revaluation Reserve)',
      'Account for Ordinary Shares, Rights Issues, Bonus Issues, and Debentures (Loan Notes)'
    ],
    concepts: [
      {
        heading: '1. Sole Traders vs Partnerships vs Limited Companies',
        zhHeading: '独资企业、合伙企业与有限公司对比',
        content: [
          'Sole Trader (独资经营者): Owned by one person with unlimited liability (无限责任). Capital is funded via owner savings, bank loans, and retained profits.',
          'Partnership (合伙企业): 2 to 20 partners sharing risks, expertise, and capital. If there is no Partnership Agreement (合伙协议), the Partnership Act 1890 applies: profits and losses are shared equally, NO interest on capital, NO interest on drawings, NO partner salaries, and 5% p.a. interest on any loan made by a partner above capital.',
          'Limited Company (有限公司): Separate legal entity (独立法人实体) where shareholders enjoy limited liability (有限责任 — loss is restricted to the amount invested in shares).'
        ]
      },
      {
        heading: '2. Limited Company Equity, Reserves & Bonus vs Rights Issues',
        zhHeading: '有限公司权益、储备金及配股与红股',
        content: [
          'Ordinary Share Capital (普通股股本): Voting shares carrying variable dividends paid after preference dividends and interest.',
          'Capital Reserves (资本公积 - e.g., Share Premium 股本溢价, Revaluation Reserve 重估储备): Cannot be used to pay cash dividends to shareholders; can be used for a Bonus Issue.',
          'Revenue Reserves (收益公积 - e.g., Retained Earnings 留存收益, General Reserve 普通储备): Created from undistributed trading profits; can be used to fund cash dividends.',
          'Rights Issue (配股): Offered to existing shareholders in proportion to holdings for CASH. Increases Bank and increases Equity.',
          'Bonus Issue (红股): Free shares issued to existing shareholders by capitalising reserves (use Capital Reserves like Share Premium first to keep Revenue Reserves available for dividends). Does NOT raise cash and does NOT change total equity.'
        ]
      }
    ],
    formulas: [
      {
        name: 'Sole Trader Closing Capital',
        zh: '独资期末资本公式',
        expr: 'Closing Capital = Opening Capital + Capital Introduced + Profit for the year - Drawings'
      },
      {
        name: 'Total Equity (Limited Company)',
        zh: '有限公司股东权益总额',
        expr: 'Total Equity = Ordinary Share Capital + Share Premium + Revaluation Reserve + General Reserve + Retained Earnings'
      }
    ],
    workedExample: {
      title: 'Rights Issue & Bonus Issue Double-Entry Worked Example',
      scenario: 'Orion Ltd has 200,000 ordinary shares of $1.00 each, Share Premium of $60,000, and Retained Earnings of $140,000. On 1 March, it makes a 1-for-4 Rights Issue at $1.50 per share. On 1 June, it makes a 1-for-5 Bonus Issue on all shares then in issue, leaving revenue reserves in the most flexible form.',
      steps: [
        'Step 1 (Rights Issue on 1 March): New shares = 200,000 ÷ 4 = 50,000 shares. Cash received = 50,000 × $1.50 = $75,000.',
        'Journal Entry: Dr Bank $75,000 | Cr Ordinary Share Capital $50,000 (nominal value) | Cr Share Premium $25,000 ($0.50 premium).',
        'Step 2 (Total shares before Bonus Issue): 200,000 + 50,000 = 250,000 shares. Share Premium is now $60,000 + $25,000 = $85,000.',
        'Step 3 (Bonus Issue on 1 June): 250,000 ÷ 5 = 50,000 bonus shares at $1.00 nominal value = $50,000. To keep revenue reserves flexible, deduct fully from Share Premium.',
        'Journal Entry: Dr Share Premium $50,000 | Cr Ordinary Share Capital $50,000.'
      ]
    }
  },
  {
    id: '1.2',
    code: 'AS 1.2',
    section: 'Financial Accounting',
    title: 'The Accounting System & Concepts',
    zhTitle: '会计系统、原始账簿与会计基本原则',
    chapters: 'Chapters 1, 2, 3, 4, 6, 9, 27',
    summary: 'Master double-entry bookkeeping, books of prime entry, trade vs settlement discounts, core accounting concepts, and computerised accounting systems.',
    learningObjectives: [
      'Apply DEAD CLIC rules to record cash and credit transactions in ledger accounts',
      'Identify the 6 Books of Prime Entry and their source documents',
      'Distinguish between Trade Discount (never in double entry) and Cash/Settlement Discount',
      'Apply core accounting concepts (Going Concern, Matching, Prudence, Consistency, Duality, Materiality, Business Entity, Historic Cost, Substance over Form)',
      'Evaluate benefits and limitations of Computerised Accounting Systems (CAS)'
    ],
    concepts: [
      {
        heading: '1. Double-Entry Golden Rule (DEAD CLIC)',
        zhHeading: '借贷记账黄金法则 (DEAD CLIC)',
        content: [
          'DEBIT (Dr / 借方) increases: Expenses (费用), Assets (资产), Drawings (提款).',
          'CREDIT (Cr / 贷方) increases: Liabilities (负债), Income/Revenue (收入), Capital (资本).',
          'Trade Discount (商业折扣): Given for bulk buying or trade custom; deducted on the invoice BEFORE recording in Books of Prime Entry. Never enters ledger accounts.',
          'Cash / Settlement Discount (现金/结算折扣): Offered for prompt payment within credit period. Discount Allowed (销售折扣 - Expense in SOPL) and Discount Received (采购折扣 - Income in SOPL).'
        ]
      },
      {
        heading: '2. Books of Prime Entry & Source Documents',
        zhHeading: '六大原始记账簿与原始凭证',
        content: [
          'Sales Journal (销售日记账) ← Credit Sales Invoices issued',
          'Purchases Journal (采购日记账) ← Credit Purchase Invoices received',
          'Sales Returns Journal (销售退回日记账) ← Credit Notes issued to customers',
          'Purchases Returns Journal (采购退回日记账) ← Credit Notes received from suppliers',
          'Cash Book & Petty Cash Book (现金簿与零用现金簿) ← Receipts, cheque stubs, bank statements, vouchers',
          'General Journal (普通日记账) ← Non-routine items: purchase/sale of non-current assets on credit, opening entries, writing off irrecoverable debts, and correction of errors.'
        ]
      }
    ],
    formulas: [
      {
        name: 'The Accounting Equation',
        zh: '会计恒等式',
        expr: 'Assets = Capital + Liabilities   (or Capital = Assets - Liabilities)'
      },
      {
        name: 'Net Invoice Amount after Trade Discount',
        zh: '商业折扣后发票净额',
        expr: 'Invoice Amount Recorded = List Price × (1 - Trade Discount %)'
      }
    ],
    workedExample: {
      title: 'Trade vs Cash Discount Double-Entry Worked Example',
      scenario: 'Sold goods with a list price of $2,000 to Chen on credit, granting a 15% trade discount and offering a 5% cash discount if paid within 14 days. Chen pays by cheque 10 days later.',
      steps: [
        'Step 1 (Date of Credit Sale): Deduct 15% trade discount: $2,000 × 85% = $1,700. Record in Sales Journal.',
        'Ledger Post: Dr Chen (Trade Receivable) $1,700 | Cr Sales $1,700.',
        'Step 2 (Date of Payment within 10 days): Cash discount = 5% of $1,700 = $85. Cheque received = $1,700 - $85 = $1,615.',
        'Ledger Post: Dr Bank $1,615 | Dr Discount Allowed $85 | Cr Chen (Trade Receivable) $1,700.'
      ]
    }
  },
  {
    id: '1.3',
    code: 'AS 1.3',
    section: 'Financial Accounting',
    title: 'Accounting for Non-Current Assets',
    zhTitle: '非流动资产核算、折旧与处置',
    chapters: 'Chapters 5, 11',
    summary: 'Distinguish between capital and revenue expenditure/receipts, calculate depreciation (straight-line, reducing balance, revaluation), and prepare Asset, Provision for Depreciation, and Disposal ledger accounts.',
    learningObjectives: [
      'Distinguish between Capital Expenditure and Revenue Expenditure (and impact of misclassifying on profit and assets)',
      'Calculate depreciation using Straight-Line, Reducing Balance, and Revaluation methods',
      'Prepare Non-current Asset at Cost, Provision for Depreciation, and Disposal of Non-current Asset accounts',
      'Calculate Profit or Loss on Disposal (including part-exchange / trade-in allowance)'
    ],
    concepts: [
      {
        heading: '1. Capital vs Revenue Expenditure & Depreciation Causes',
        zhHeading: '资本性支出与收益性支出、折旧成因',
        content: [
          'Capital Expenditure (资本性支出): Purchase price of NCA + delivery + installation + legal fees on property + improvements extending capacity. Recorded on SOFP.',
          'Revenue Expenditure (收益性支出): Repairs, maintenance, insurance, road tax, petrol. Charged as expense to SOPL.',
          'Causes of Depreciation: Physical deterioration (wear and tear 磨损), Economic factors (obsolescence 技术过时, inadequacy), and Time factors (depletion of mines, lease expiry).'
        ]
      },
      {
        heading: '2. Accounting for Disposal of Non-Current Assets',
        zhHeading: '非流动资产处置三步分录法',
        content: [
          'Step 1 (Remove Original Cost): Dr Disposal Account | Cr Non-current Asset at Cost Account (with original cost).',
          'Step 2 (Remove Accumulated Depreciation): Dr Provision for Depreciation Account | Cr Disposal Account (with total depreciation charged on that asset).',
          'Step 3 (Record Proceeds or Part-Exchange): Dr Bank / Trade Receivable / New Asset at Cost (if part-exchange) | Cr Disposal Account.',
          'Step 4 (Balance Disposal Account): If Proceeds > NBV = Profit on Disposal (Dr Disposal, Cr SOPL). If Proceeds < NBV = Loss on Disposal (Dr SOPL, Cr Disposal).'
        ]
      }
    ],
    formulas: [
      {
        name: 'Straight-Line Depreciation (p.a.)',
        zh: '直线法年折旧额',
        expr: 'Annual Depreciation = (Original Cost - Estimated Residual Value) ÷ Useful Life (years)'
      },
      {
        name: 'Reducing Balance Depreciation (p.a.)',
        zh: '余额递减法年折旧额',
        expr: 'Annual Depreciation = (Cost - Accumulated Depreciation to date) × Depreciation %'
      },
      {
        name: 'Profit / (Loss) on Disposal',
        zh: '资产处置损益',
        expr: 'Sale Proceeds (or Part-Exchange Allowance) - Net Book Value at Disposal Date'
      }
    ],
    workedExample: {
      title: 'Asset Disposal & Part-Exchange Worked Example',
      scenario: 'A delivery van bought on 1 Jan 2023 for $25,000 is depreciated at 20% p.a. using the reducing balance method (full year in year of purchase, none in year of disposal). On 1 July 2025, it is traded in for a new van costing $32,000, with a part-exchange allowance of $14,500; the balance is paid by cheque.',
      steps: [
        'Step 1 (Calculate Accumulated Depreciation for 2023 & 2024):',
        '• 2023 Depreciation = 20% × $25,000 = $5,000 (NBV = $20,000).',
        '• 2024 Depreciation = 20% × $20,000 = $4,000 (NBV = $16,000).',
        '• Total Accumulated Depreciation = $9,000; Net Book Value at disposal = $16,000.',
        'Step 2 (Compare Part-Exchange Allowance with NBV):',
        '• Allowance ($14,500) - NBV ($16,000) = -$1,500 → Loss on disposal of $1,500.',
        'Step 3 (New Van Cost): Recorded at full $32,000 (Dr Motor Vehicles $32,000 | Cr Disposal $14,500 | Cr Bank $17,500).'
      ]
    }
  },
  {
    id: '1.4',
    code: 'AS 1.4',
    section: 'Financial Accounting',
    title: 'Reconciliation and Verification',
    zhTitle: '银行调节表、统制账户与差错更正',
    chapters: 'Chapters 6, 13, 14, 15',
    summary: 'Verify accounting records by preparing updated Cash Books and Bank Reconciliation Statements, Sales & Purchases Ledger Control Accounts, and correcting errors with or without a Suspense Account.',
    learningObjectives: [
      'Update the Cash Book (bank column) and prepare a Bank Reconciliation Statement',
      'Prepare Sales Ledger Control Account (SLCA) and Purchases Ledger Control Account (PLCA)',
      'Identify the 6 types of errors NOT revealed by a Trial Balance',
      'Prepare Journal entries and a Suspense Account to correct errors and produces a Statement of Corrected Profit'
    ],
    concepts: [
      {
        heading: '1. Six Errors NOT Revealed by a Trial Balance',
        zhHeading: '不影响试算平衡表平衡的六类错误',
        content: [
          '1. Error of Omission (遗漏错误): Transaction completely omitted from the books.',
          '2. Error of Commission (记错同名账户): Correct amount posted to the wrong personal account of the same class (e.g., Dr J. Lim instead of J. Lam).',
          '3. Error of Principle (原则性错误): Posted to the wrong class of account (e.g., motor repairs debited to Motor Vehicles NCA account). Affects profit!',
          '4. Error of Original Entry (原始金额错误): Wrong figure calculated on invoice and used for both Dr and Cr.',
          '5. Complete Reversal of Entries (借贷方向完全颠倒): Correct accounts and amount, but Dr and Cr are swapped (correct by doubling the adjustment).',
          '6. Compensating Errors (抵销性错误): Two unrelated errors on opposite sides cancel each other out.'
        ]
      },
      {
        heading: '2. Bank Reconciliation & Control Accounts Structure',
        zhHeading: '银行余额调节表与统制账户要点',
        content: [
          'Update Cash Book First: Standing orders, direct debits, bank charges, dishonoured cheques, and bank interest go into the Updated Cash Book.',
          'Bank Reconciliation Statement Only: Unpresented cheques (未兑现支票) and Uncredited lodgements/deposits (在途存款) plus any bank errors.',
          'Control Accounts Note: Allowance for irrecoverable debts and Cash Sales/Purchases NEVER enter Control Accounts!'
        ]
      }
    ],
    formulas: [
      {
        name: 'Bank Reconciliation (Starting from Updated Cash Book Balance)',
        zh: '银行存款余额调节公式',
        expr: 'Updated Cash Book Balance + Unpresented Cheques - Uncredited Lodgements = Bank Statement Balance'
      },
      {
        name: 'SLCA Balance Formula',
        zh: '应收账款统制账户期末余额',
        expr: 'Opening Dr + Credit Sales + Dishonoured Cheques + Interest Charged - Receipts - Discount Allowed - Sales Returns - Irrecoverable Debts - Contra = Closing Dr'
      }
    ],
    workedExample: {
      title: 'Suspense Account & Profit Correction Worked Example',
      scenario: 'Draft profit is $42,000. Two errors are found: (1) Discount allowed of $350 was credited to the Discount Received account. (2) Equipment repairs of $1,200 were debited to the Equipment at Cost account (depreciated at 10% straight-line).',
      steps: [
        'Error 1 Correction: Discount allowed ($350) should be Dr, and Discount received ($350) was wrongly Cr. Both sides of trial balance were affected.',
        '• Journal 1: Dr Discount Allowed $350 | Dr Discount Received $350 | Cr Suspense Account $700. Impact on profit: -$700.',
        'Error 2 Correction: Error of principle (no suspense needed). Remove $1,200 from Equipment and charge to Repairs expense, AND reverse the 10% ($120) excess depreciation charged.',
        '• Journal 2a: Dr Repairs $1,200 | Cr Equipment at Cost $1,200 (Profit impact: -$1,200).',
        '• Journal 2b: Dr Provision for Depreciation $120 | Cr Depreciation Expense $120 (Profit impact: +$120).',
        'Corrected Profit = $42,000 - $700 - $1,200 + $120 = $40,220.'
      ]
    }
  },
  {
    id: '1.5',
    code: 'AS 1.5',
    section: 'Financial Accounting',
    title: 'Preparation of Financial Statements',
    zhTitle: '财务报表编制、期末调整与不完整会计记录',
    chapters: 'Chapters 7, 8, 10, 12, 16, 17, 18, 21, 22',
    summary: 'Prepare complete financial statements for Sole Traders, Partnerships, and Limited Companies incorporating year-end adjustments (accruals, prepayments, depreciation, irrecoverable debts) and Incomplete Records.',
    learningObjectives: [
      'Adjust income and expenses for Accruals and Prepayments under the Matching Concept',
      'Account for Irrecoverable Debts written off, Irrecoverable Debts Recovered, and changes in Allowance for Irrecoverable Debts',
      'Prepare Partnership Appropriation Accounts, Current Accounts, and Capital Accounts',
      'Prepare Limited Company Statement of Profit or Loss, Statement of Changes in Equity, and Statement of Financial Position',
      'Solve Incomplete Records problems using Net Worth (Capital comparison), Control Accounts, and Margin vs Mark-up'
    ],
    concepts: [
      {
        heading: '1. Year-End Adjustments Summary Table',
        zhHeading: '四大期末调整事项速查',
        content: [
          'Accrued Expense (应计费用): Add to Expense in SOPL | Show under Current Liabilities on SOFP.',
          'Prepaid Expense (预付费用): Deduct from Expense in SOPL | Show under Current Assets on SOFP.',
          'Accrued Income (应计收入): Add to Income in SOPL | Show under Current Assets on SOFP.',
          'Prepaid Income (预收收入): Deduct from Income in SOPL | Show under Current Liabilities on SOFP.',
          'Allowance for Irrecoverable Debts (坏账准备): Write off actual irrecoverable debts FIRST, then calculate New Allowance = % × Remaining Trade Receivables. Only the INCREASE (Expense) or DECREASE (Income) enters SOPL; full closing allowance is deducted from Trade Receivables on SOFP.'
        ]
      },
      {
        heading: '2. Partnership Accounts & Incomplete Records Tricks',
        zhHeading: '合伙企业核算与不完整记录解题技巧',
        content: [
          'Partnership Appropriation Account: Profit for the year + Interest on Drawings - Interest on Capital - Partner Salaries = Residual Profit shared by profit-sharing ratio.',
          'Partner Current Account (往来账户): Cr Opening Balance, Interest on Capital, Salary, Profit Share | Dr Drawings, Interest on Drawings, Loss Share.',
          'Incomplete Records (不完整记录): Convert Margin to Mark-up carefully! If Margin = 1/5 (20%), then Mark-up = 1/(5-1) = 1/4 (25%). Use Cost of Sales = Opening Inventory + Net Purchases - Closing Inventory to find missing stolen/destroyed inventory.'
        ]
      }
    ],
    formulas: [
      {
        name: 'Cost of Sales',
        zh: '销售成本公式',
        expr: 'Opening Inventory + Purchases - Purchases Returns + Carriage Inwards - Goods for Own Use - Closing Inventory'
      },
      {
        name: 'Margin vs Mark-up Conversion',
        zh: '毛利率与加成率换算',
        expr: 'Margin = Gross Profit ÷ Revenue  |  Mark-up = Gross Profit ÷ Cost of Sales'
      }
    ],
    workedExample: {
      title: 'Allowance for Irrecoverable Debts Adjustment Worked Example',
      scenario: 'At 31 Dec 2025, Trade Receivables in the Trial Balance are $51,200 and existing Allowance for Irrecoverable Debts (1 Jan 2025) is $2,100. An additional debt of $1,200 is found to be irrecoverable and must be written off. The allowance is to be maintained at 5% of remaining trade receivables.',
      steps: [
        'Step 1 (Write off the additional irrecoverable debt): Remaining Trade Receivables = $51,200 - $1,200 = $50,000.',
        'Step 2 (Calculate Closing Allowance at 5%): 5% × $50,000 = $2,500.',
        'Step 3 (Compare with Opening Allowance): Increase in Allowance = $2,500 (New) - $2,100 (Old) = $400 increase.',
        'Step 4 (Financial Statement Impact):',
        '• SOPL Expenses: Irrecoverable debts written off ($1,200) + Increase in allowance ($400) = $1,600.',
        '• SOFP Current Assets: Trade Receivables $50,000 less Allowance $2,500 = Net Trade Receivables $47,500.'
      ]
    }
  },
  {
    id: '1.6',
    code: 'AS 1.6',
    section: 'Financial Accounting',
    title: 'Analysis and Communication of Accounting Information',
    zhTitle: '利益相关者、财务比率分析与评价',
    chapters: 'Chapter 30',
    summary: 'Identify information needs of internal and external stakeholders, calculate and interpret Profitability, Liquidity, and Efficiency ratios, and evaluate the limitations of ratio analysis.',
    learningObjectives: [
      'Explain why different stakeholders (owners, managers, employees, lenders, suppliers, customers, government) use accounting statements',
      'Calculate and interpret Profitability Ratios (Gross Margin, Mark-up, Profit Margin, ROCE, Expense to Revenue)',
      'Calculate and interpret Liquidity Ratios (Current Ratio, Liquid / Acid Test Ratio)',
      'Calculate and interpret Efficiency Ratios (Inventory Turnover, Trade Receivables Turnover days, Trade Payables Turnover days, Non-current Asset Turnover)',
      'Discuss limitations of financial statements and historic ratio comparisons'
    ],
    concepts: [
      {
        heading: '1. Interpreting Profitability, Liquidity & Working Capital Cycle',
        zhHeading: '盈利能力、流动性与营运资金周期解读',
        content: [
          'Gross Profit Margin vs Profit Margin: If Gross Margin rises but Profit Margin falls, control over overhead expenses has worsened.',
          'Liquidity vs Profitability Trade-off: Holding too much inventory or cash improves Current Ratio but ties up cash and lowers ROCE.',
          'Trade Receivables vs Trade Payables Days: Ideally, Trade Receivables collection period (days) should be SHORTER than Trade Payables payment period so cash is collected from customers before paying suppliers (avoiding cash flow strain or loss of cash discounts).'
        ]
      },
      {
        heading: '2. Limitations of Ratio Analysis (High-Yield Evaluation Points)',
        zhHeading: '财务比率分析的局限性 (论述题高频得分点)',
        content: [
          '1. Based on Historic Cost data (past performance may not reflect future prospects or inflation).',
          '2. Different accounting policies (e.g., straight-line vs reducing balance depreciation, FIFO vs AVCO) distort inter-firm comparisons.',
          '3. Ignores non-financial factors (staff morale, brand reputation, customer loyalty, environmental impact, economic climate).',
          '4. Window dressing (粉饰报表) at year-end snapshot date can temporarily make liquidity appear better than normal.'
        ]
      }
    ],
    formulas: [
      {
        name: 'Return on Capital Employed (ROCE)',
        zh: '动用资本回报率',
        expr: '(Profit from Operations ÷ Capital Employed) × 100%   [Capital Employed = Equity/Capital + Non-Current Liabilities]'
      },
      {
        name: 'Current Ratio & Liquid (Acid Test) Ratio',
        zh: '流动比率与速动比率',
        expr: 'Current Ratio = CA : CL   |   Liquid Ratio = (CA - Inventory) : CL'
      },
      {
        name: 'Trade Receivables & Payables Turnover (Days)',
        zh: '应收与应付账款周转天数',
        expr: 'Receivables Days = (Trade Receivables ÷ Credit Sales) × 365  |  Payables Days = (Trade Payables ÷ Credit Purchases) × 365'
      },
      {
        name: 'Inventory Turnover (Days & Rate)',
        zh: '存货周转天数与周转次数',
        expr: 'Days = (Average Inventory ÷ Cost of Sales) × 365  |  Rate (times) = Cost of Sales ÷ Average Inventory'
      }
    ],
    workedExample: {
      title: 'Liquidity & Efficiency Ratio Interpretation Worked Example',
      scenario: 'Business A has Credit Sales $365,000, Credit Purchases $219,000, Inventory $45,000, Trade Receivables $42,000, Bank Overdraft $15,000, and Trade Payables $25,000.',
      steps: [
        '1. Current Ratio = Current Assets ($45,000 + $42,000) : Current Liabilities ($15,000 + $25,000) = $87,000 : $40,000 = 2.18 : 1.',
        '2. Liquid (Acid Test) Ratio = ($87,000 - $45,000) : $40,000 = $42,000 : $40,000 = 1.05 : 1.',
        '3. Trade Receivables Turnover = ($42,000 ÷ $365,000) × 365 = 42 days.',
        '4. Trade Payables Turnover = ($25,000 ÷ $219,000) × 365 = 41.7 days (42 days).',
        'Evaluation: Liquidity looks healthy overall (1.05:1 acid test), though over half of current assets are tied up in inventory and the business relies on a bank overdraft.'
      ]
    }
  },
  {
    id: '2.1',
    code: 'AS 2.1',
    section: 'Cost & Management Accounting',
    title: 'Costs and Cost Behaviour (Materials & Labour)',
    zhTitle: '成本性态、存货计价 (FIFO/AVCO) 与人工成本',
    chapters: 'Chapter 32',
    summary: 'Classify costs into direct/indirect and fixed/variable/stepped/semi-variable, evaluate Just-in-Time (JIT) inventory management, value inventory using FIFO and AVCO, and calculate labour remuneration.',
    learningObjectives: [
      'Distinguish between Direct Costs (Prime Cost) and Indirect Costs (Overheads)',
      'Explain Fixed, Variable, Stepped Fixed, and Semi-variable cost behaviours',
      'Value closing inventory and issues using FIFO (First-In, First-Out) and AVCO (Weighted Average Cost)',
      'Evaluate Just-In-Time (JIT) inventory management advantages and risks',
      'Calculate labour costs using hourly rates, overtime premiums, piecework, and bonus schemes'
    ],
    concepts: [
      {
        heading: '1. Cost Classification & Behaviour',
        zhHeading: '成本分类与成本性态',
        content: [
          'Direct Costs (直接成本): Directly traceable to a unit of production (Direct Materials + Direct Labour + Direct Expenses = Prime Cost 主要成本).',
          'Indirect Costs / Production Overheads (间接生产成本/制造费用): Factory rent, supervisor salary, machine depreciation.',
          'Stepped Fixed Cost (阶梯式固定成本): Fixed within a relevant activity range, then jumps up when capacity threshold is exceeded (e.g., renting a second warehouse or hiring an extra supervisor).'
        ]
      },
      {
        heading: '2. FIFO vs AVCO & Just-In-Time (JIT)',
        zhHeading: '先进先出法、加权平均法与准时制生产 (JIT)',
        content: [
          'During periods of rising prices (inflation): FIFO uses older, cheaper costs for Cost of Sales and newest, higher prices for Closing Inventory → Higher Closing Inventory & Higher Profit than AVCO.',
          'Just-In-Time (JIT 准时制库存): Raw materials arrive exactly as needed in production. Pros: Reduces warehouse holding costs, reduces wastage/obsolescence, frees up working capital. Cons: Vulnerable to supply chain disruptions, loss of bulk trade discounts, inability to meet sudden surge orders.'
        ]
      }
    ],
    formulas: [
      {
        name: 'Prime Cost & Total Production Cost',
        zh: '主要成本与总生产成本',
        expr: 'Prime Cost = Direct Materials + Direct Labour + Direct Expenses  |  Total Production Cost = Prime Cost + Production Overheads'
      },
      {
        name: 'AVCO Weighted Average Unit Cost',
        zh: '加权平均单价计算',
        expr: 'New Average Cost per unit = Total Value of Inventory in Store ÷ Total Units in Store'
      }
    ],
    workedExample: {
      title: 'Perpetual FIFO vs AVCO Inventory Valuation Worked Example',
      scenario: 'May 1: Opening inventory 100 units @ $10 ($1,000). May 10: Bought 100 units @ $14 ($1,400). May 15: Sold 120 units. Calculate Closing Inventory value (80 units) under FIFO and AVCO.',
      steps: [
        'Under FIFO:',
        '• The 120 units sold on May 15 come from: all 100 units @ $10 ($1,000) + 20 units @ $14 ($280) = Cost of Sales $1,280.',
        '• Closing Inventory = remaining 80 units from May 10 batch @ $14 = $1,120.',
        'Under AVCO:',
        '• After May 10 purchase: Total units = 200, Total value = $1,000 + $1,400 = $2,400 → Weighted Average Cost = $2,400 ÷ 200 = $12.00/unit.',
        '• Cost of Sales (120 units) = 120 × $12 = $1,440. Closing Inventory (80 units) = 80 × $12 = $960.'
      ]
    }
  },
  {
    id: '2.2',
    code: 'AS 2.2',
    section: 'Cost & Management Accounting',
    title: 'Traditional Costing Methods (Absorption & Marginal)',
    zhTitle: '完全成本法、作业批次成本与边际成本决策',
    chapters: 'Chapters 33, 34, 35',
    summary: 'Master Overhead Allocation, Apportionment, Re-apportionment, Overhead Absorption Rates (OAR), Under/Over Absorption, Job/Batch Costing, and Marginal Costing decision-making (Break-Even, Limiting Factors, Make-or-Buy, Special Orders).',
    learningObjectives: [
      'Allocate and apportion overheads to Production and Service departments, and re-apportion Service departments',
      'Calculate departmental Overhead Absorption Rates (OAR) per Direct Labour Hour or Machine Hour',
      'Calculate and explain Under-absorption and Over-absorption of overheads',
      'Calculate Contribution, Break-Even Point, Margin of Safety, C/S Ratio, and Target Profit output',
      'Reconcile profits between Absorption Costing and Marginal Costing when inventory levels change',
      'Apply Marginal Costing to Limiting Factor (scarce resource) production plans, Make-or-Buy decisions, and Special Orders'
    ],
    concepts: [
      {
        heading: '1. Absorption Costing: 4-Stage Overhead Process',
        zhHeading: '完全成本法：制造费用四步处理流程',
        content: [
          '1. Allocation (直接归集): Assign whole costs directly to a specific cost centre.',
          '2. Apportionment (初次分配): Share common overheads across departments on a fair basis (Rent/Heat → Floor Area; Depreciation/Insurance of machinery → Machinery Cost/NBV; Canteen → Number of employees).',
          '3. Re-apportionment (服务部门二次分配): Re-apportion Service Centre totals to Production Centres.',
          '4. Absorption (成本吸收): OAR = Budgeted Overhead ÷ Budgeted Activity (Machine Hours if machine-intensive; Direct Labour Hours if labour-intensive).'
        ]
      },
      {
        heading: '2. Marginal Costing & Profit Reconciliation Rule',
        zhHeading: '边际成本法决策与两种成本法利润差异调节',
        content: [
          'Why Profits Differ: In Absorption Costing, closing inventory carries a share of Fixed Production Overheads into the next period. In Marginal Costing, all Fixed Overheads are charged to the current period.',
          'Reconciliation Rule: Difference in Profit = Change in Inventory Units × Fixed Overhead Absorption Rate per unit. When Production > Sales (Inventory INCREASES), Absorption Profit > Marginal Profit.',
          'Decision Rules: (a) Accept a special order if Price > Variable Cost (positive contribution), provided spare capacity exists and normal market prices are not eroded. (b) In Make-or-Buy: buy externally only if External Purchase Price < Variable Cost of Making (plus any avoidable fixed costs). (c) With a Limiting Factor: rank products by Contribution per unit of the scarce resource!'
        ]
      }
    ],
    formulas: [
      {
        name: 'Overhead Absorption Rate (OAR) & Under/Over Absorption',
        zh: '制造费用吸收率与少/多分配计算',
        expr: 'OAR = Budgeted Overheads ÷ Budgeted Hours   |   Absorbed = OAR × Actual Hours   |   Difference = Absorbed - Actual Overheads'
      },
      {
        name: 'Break-Even Point (Units) & Target Profit Units',
        zh: '盈亏平衡销量与目标利润销量',
        expr: 'BEP (units) = Fixed Costs ÷ Contribution per unit   |   Target Units = (Fixed Costs + Target Profit) ÷ Contribution per unit'
      },
      {
        name: 'Contribution to Sales (C/S) Ratio',
        zh: '边际贡献率 (C/S Ratio)',
        expr: 'C/S Ratio = (Contribution per unit ÷ Selling Price per unit) × 100%   |   BEP ($) = Fixed Costs ÷ C/S Ratio'
      }
    ],
    workedExample: {
      title: 'Limiting Factor & Marginal vs Absorption Profit Worked Example',
      scenario: 'Product X has Selling Price $50, Variable Cost $30 (Contribution = $20), and requires 4 kg of scarce material. Product Y has Selling Price $42, Variable Cost $24 (Contribution = $18), and requires 3 kg of scarce material. How should production be prioritised?',
      steps: [
        'Step 1 (Contribution per unit): Product X = $20/unit; Product Y = $18/unit. (Do NOT rank by unit contribution alone!)',
        'Step 2 (Contribution per kg of Limiting Factor):',
        '• Product X = $20 ÷ 4 kg = $5.00 per kg.',
        '• Product Y = $18 ÷ 3 kg = $6.00 per kg.',
        'Step 3 (Optimal Ranking): Rank Product Y FIRST ($6.00/kg) up to maximum demand, then use remaining material to make Product X ($5.00/kg).'
      ]
    }
  }
];

// ============================================================================
// 3. INTERACTIVE PRACTICE WORKBENCH EXERCISES
// ============================================================================
const DOUBLE_ENTRY_EXERCISES = [
  {
    id: 'de-1',
    topic: '1.2 Cash & Credit Transactions',
    transaction: 'Sold goods on credit to a customer, K. Wong, list price $1,500 less 20% trade discount.',
    zhTransaction: '向客户 K. Wong 赊销商品，标价 $1,500，享受 20% 商业折扣。',
    correctDr: 'K. Wong (Trade Receivables)',
    correctCr: 'Sales (Revenue)',
    amount: 1200,
    options: [
      'K. Wong (Trade Receivables)',
      'Sales (Revenue)',
      'Bank',
      'Trade Discount Allowed',
      'Purchases',
      'Sales Returns'
    ],
    explanation: 'Trade discount (20% of $1,500 = $300) is deducted before recording. Net invoice = $1,200. Credit sale increases asset Trade Receivables (Dr) and increases income Sales (Cr).'
  },
  {
    id: 'de-2',
    topic: '1.2 Drawings & Business Entity',
    transaction: 'The owner took unsold goods costing $450 (selling price $600) for personal family use.',
    zhTransaction: '企业业主提取成本为 $450（售价 $600）的未售商品供个人家庭使用。',
    correctDr: 'Drawings',
    correctCr: 'Purchases',
    amount: 450,
    options: [
      'Drawings',
      'Purchases',
      'Inventory',
      'Sales',
      'Capital',
      'General Expenses'
    ],
    explanation: 'Goods taken by the owner for own use are always recorded at COST ($450). Dr Drawings (increases drawings) and Cr Purchases (reduces cost of goods available for sale).'
  },
  {
    id: 'de-3',
    topic: '1.3 Depreciation Charge',
    transaction: 'Record the annual depreciation charge of $3,800 on factory machinery at the financial year end.',
    zhTransaction: '在财政年度末记录工厂机器设备的年度折旧费用 $3,800。',
    correctDr: 'Statement of Profit or Loss (Depreciation Expense)',
    correctCr: 'Provision for Depreciation of Machinery',
    amount: 3800,
    options: [
      'Statement of Profit or Loss (Depreciation Expense)',
      'Provision for Depreciation of Machinery',
      'Machinery at Cost',
      'Disposal of Machinery',
      'Bank',
      'Revaluation Reserve'
    ],
    explanation: 'Depreciation is a non-cash expense charged to the Statement of Profit or Loss (Dr) and accumulated in the Provision for Depreciation account (Cr). Never credit the Asset at Cost account directly for annual depreciation.'
  },
  {
    id: 'de-4',
    topic: '1.5 Allowance for Irrecoverable Debts',
    transaction: 'At year end, the Allowance for Irrecoverable Debts is reduced from $2,400 to $1,950.',
    zhTransaction: '年末，坏账准备金从期初的 $2,400 调减至 $1,950。',
    correctDr: 'Allowance for Irrecoverable Debts',
    correctCr: 'Statement of Profit or Loss (Income)',
    amount: 450,
    options: [
      'Allowance for Irrecoverable Debts',
      'Statement of Profit or Loss (Income)',
      'Trade Receivables',
      'Irrecoverable Debts Expense',
      'Bad Debts Recovered',
      'Sales Ledger Control Account'
    ],
    explanation: 'A reduction in the Allowance ($2,400 - $1,950 = $450) decreases the credit balance on the Allowance account (Dr Allowance $450) and is added as other income in the Statement of Profit or Loss (Cr SOPL $450).'
  },
  {
    id: 'de-5',
    topic: '1.4 Contra Set-Off',
    transaction: 'Agreed a set-off (contra) of $620 between a customer’s Sales Ledger account and their Purchases Ledger account.',
    zhTransaction: '客户同时也是供应商，双方同意将应收账款与应付账款中的 $620 进行对冲抵销（Contra set-off）。',
    correctDr: 'Purchases Ledger Control Account (Trade Payables)',
    correctCr: 'Sales Ledger Control Account (Trade Receivables)',
    amount: 620,
    options: [
      'Purchases Ledger Control Account (Trade Payables)',
      'Sales Ledger Control Account (Trade Receivables)',
      'Suspense Account',
      'Bank',
      'Discount Allowed',
      'Statement of Profit or Loss'
    ],
    explanation: 'A contra entry reduces the liability owed to Trade Payables (Dr PLCA $620) and reduces the asset owed by Trade Receivables (Cr SLCA $620).'
  },
  {
    id: 'de-6',
    topic: '1.1 Bonus Issue of Shares',
    transaction: 'A limited company makes a bonus issue of 40,000 ordinary shares of $0.50 each using the Share Premium account.',
    zhTransaction: '有限公司动用股本溢价账户（Share Premium）向股东派发 40,000 股每股面值 $0.50 的红股。',
    correctDr: 'Share Premium',
    correctCr: 'Ordinary Share Capital',
    amount: 20000,
    options: [
      'Share Premium',
      'Ordinary Share Capital',
      'Bank',
      'Retained Earnings',
      'Debentures',
      'Statement of Profit or Loss'
    ],
    explanation: '40,000 shares × $0.50 nominal value = $20,000. A bonus issue transfers reserves into permanent share capital: Dr Share Premium $20,000, Cr Ordinary Share Capital $20,000.'
  }
];

const ADJUSTMENT_SCENARIOS = [
  {
    id: 'adj-1',
    title: 'Scenario A: Accruals, Prepayments & Allowance Adjustments',
    zhTitle: '练习一：应计费用、预付费用与坏账准备综合调整',
    description: 'Extracts from Trial Balance of Lin Mei at 31 December 2025: Gross Profit $94,000; Rent & Rates paid $18,000; General Expenses paid $11,400; Trade Receivables $36,000; Opening Allowance for Irrecoverable Debts (1 Jan 2025) $1,500.',
    notes: [
      '1. Rent & Rates includes a prepayment of $2,400 for Jan–Feb 2026.',
      '2. General Expenses of $850 were accrued (unpaid) at 31 December 2025.',
      '3. An irrecoverable debt of $1,000 is to be written off from Trade Receivables.',
      '4. The Allowance for Irrecoverable Debts is to be adjusted to 5% of remaining Trade Receivables.'
    ],
    fields: [
      {
        key: 'rent',
        label: 'Rent & Rates Expense in Statement of Profit or Loss ($)',
        zhLabel: '损益表中的租金费用 ($)',
        correct: 15600,
        working: '$18,000 paid - $2,400 prepaid = $15,600 (Prepayment is deducted under the matching concept).'
      },
      {
        key: 'genExp',
        label: 'General Expenses in Statement of Profit or Loss ($)',
        zhLabel: '损益表中的一般费用 ($)',
        correct: 12250,
        working: '$11,400 paid + $850 accrued = $12,250 (Accrual is added under the matching concept).'
      },
      {
        key: 'closingAllowance',
        label: 'Closing Allowance for Irrecoverable Debts on SOFP ($)',
        zhLabel: '资产负债表期末坏账准备余额 ($)',
        correct: 1750,
        working: 'Remaining Trade Receivables = $36,000 - $1,000 written off = $35,000. Closing Allowance = 5% × $35,000 = $1,750.'
      },
      {
        key: 'profitForYear',
        label: 'Profit for the Year ($)',
        zhLabel: '本年度净利润 ($)',
        correct: 64900,
        working: 'Gross Profit $94,000 - Rent ($15,600) - General Expenses ($12,250) - Irrecoverable Debt ($1,000) - Increase in Allowance ($1,750 - $1,500 = $250) = $64,900.'
      }
    ]
  },
  {
    id: 'adj-2',
    title: 'Scenario B: Marginal vs Absorption Costing & Break-Even Lab',
    zhTitle: '练习二：边际成本法、完全成本法与盈亏平衡计算',
    description: 'Apex Manufacturing produces a single product. Selling price = $45/unit. Direct materials = $14/unit. Direct labour = $11/unit. Budgeted and actual Fixed Production Overheads = $60,000 per month (based on budgeted production of 10,000 units). In Month 1, 10,000 units were produced and 8,500 units were sold (no opening inventory).',
    notes: [
      '1. Calculate Contribution per unit and Break-Even Point in units.',
      '2. Calculate Profit under Marginal Costing and under Absorption Costing for Month 1.'
    ],
    fields: [
      {
        key: 'contribUnit',
        label: 'Contribution per unit ($)',
        zhLabel: '单位边际贡献 ($)',
        correct: 20,
        working: 'Selling Price ($45) - Variable Cost per unit ($14 + $11 = $25) = $20 per unit.'
      },
      {
        key: 'bepUnits',
        label: 'Break-Even Point in units',
        zhLabel: '盈亏平衡点销量 (件)',
        correct: 3000,
        working: 'Fixed Overheads ($60,000) ÷ Contribution per unit ($20) = 3,000 units.'
      },
      {
        key: 'marginalProfit',
        label: 'Month 1 Profit under Marginal Costing ($)',
        zhLabel: '边际成本法下的第一月利润 ($)',
        correct: 110000,
        working: 'Total Contribution (8,500 units sold × $20 = $170,000) - Fixed Overheads ($60,000) = $110,000.'
      },
      {
        key: 'absorptionProfit',
        label: 'Month 1 Profit under Absorption Costing ($)',
        zhLabel: '完全成本法下的第一月利润 ($)',
        correct: 119000,
        working: 'Fixed OAR = $60,000 ÷ 10,000 units = $6/unit. Closing inventory increased by 1,500 units (10,000 - 8,500), carrying $9,000 (1,500 × $6) of fixed overheads into next month. Absorption Profit = $110,000 + $9,000 = $119,000.'
      }
    ]
  }
];

// ============================================================================
// 4. EXAM SIMULATOR: PAPER 1 (MCQ) & PAPER 2 (STRUCTURED QUESTIONS)
// ============================================================================
const PAPER_1_MCQS = [
  {
    id: 'q1',
    topic: '1.1 Partnerships',
    question: 'A and B are in partnership without a formal partnership agreement. A contributed $60,000 capital and B contributed $20,000 capital. A also provided a loan of $10,000 to the partnership at the start of the year. Profit before loan interest for the year was $32,500. What is A’s share of the residual profit?',
    zhQuestion: 'A 和 B 合伙经营但未签订正式合伙协议。A 出资 $60,000，B 出资 $20,000。年初 A 向合伙企业提供了一笔 $10,000 的贷款。未扣贷款利息前的年度利润为 $32,500。A 应分得的剩余利润是多少？',
    options: [
      'A. $16,000',
      'B. $16,250',
      'C. $24,000',
      'D. $24,375'
    ],
    correctIndex: 0,
    working: 'Under the Partnership Act 1890 (no agreement): (1) Loan interest is 5% p.a. = 5% × $10,000 = $500 expense. (2) Residual profit = $32,500 - $500 = $32,000. (3) Profits are shared EQUALLY regardless of capital contributed: $32,000 ÷ 2 = $16,000.'
  },
  {
    id: 'q2',
    topic: '1.2 Accounting Concepts',
    question: 'A business values its closing inventory at the lower of cost and net realisable value, and writes off a low-value pocket calculator as an immediate expense. Which two accounting concepts are being applied?',
    zhQuestion: '某企业将期末存货按成本与可变现净值孰低计价，并将低值计算器直接作为当期费用核销。这应用了哪两个会计原则？',
    options: [
      'A. Consistency and Going Concern',
      'B. Matching and Duality',
      'C. Prudence and Materiality',
      'D. Substance over Form and Historic Cost'
    ],
    correctIndex: 2,
    working: 'Valuing inventory at the lower of cost and NRV prevents overstating assets and profits (Prudence concept / 谨慎性原则). Expensing a low-value item rather than capitalising it applies the Materiality concept (重要性原则).'
  },
  {
    id: 'q3',
    topic: '1.3 Non-Current Assets & Depreciation',
    question: 'A machine was purchased on 1 January 2023 for $40,000 and depreciated at 25% per annum using the reducing balance method. On 1 January 2025, it was sold for $21,000. What was the profit or loss on disposal?',
    zhQuestion: '一台机器于 2023 年 1 月 1 日以 $40,000 购入，采用余额递减法按每年 25% 计提折旧。2025 年 1 月 1 日以 $21,000 售出。处置损益是多少？',
    options: [
      'A. $1,000 profit',
      'B. $1,500 loss',
      'C. $1,500 profit',
      'D. $2,500 loss'
    ],
    correctIndex: 1,
    working: 'Year 1 (2023) NBV = $40,000 × 75% = $30,000. Year 2 (2024) NBV = $30,000 × 75% = $22,500. Proceeds ($21,000) - NBV ($22,500) = -$1,500 → $1,500 loss on disposal.'
  },
  {
    id: 'q4',
    topic: '1.4 Bank Reconciliation',
    question: 'An updated Cash Book shows a debit balance of $4,200. Cheques issued to suppliers of $950 have not yet been presented to the bank, and a deposit of $1,350 paid in on the last day of the month does not yet appear on the bank statement. What balance is shown on the bank statement?',
    zhQuestion: '更新后的现金簿显示借方余额（存款）为 $4,200。开给供应商的 $950 支票尚未兑现，月末最后一天存入的 $1,350 尚未出现在银行对账单上。银行对账单显示的余额是多少？',
    options: [
      'A. $3,800 credit',
      'B. $3,800 debit',
      'C. $4,600 credit',
      'D. $4,600 debit'
    ],
    correctIndex: 0,
    working: 'Bank Statement balance = Updated Cash Book ($4,200) + Unpresented Cheques ($950) - Uncredited Deposits ($1,350) = $3,800 positive balance. On a Bank Statement, a positive balance in the customer’s favour is shown as a CREDIT balance (because the bank owes the customer).'
  },
  {
    id: 'q5',
    topic: '1.4 Correction of Errors',
    question: 'A trial balance failed to agree and a Suspense Account was opened. It was later found that a purchase return of $480 had been correctly entered in the supplier’s account, but had been debited to the Sales Returns account. What journal entry corrects this error?',
    zhQuestion: '试算平衡表不平并开设了暂记账户。随后发现一笔 $480 的采购退回已正确记入供应商账户，但被错误借记到了销售退回账户。更正该错误的分录是什么？',
    options: [
      'A. Dr Suspense $480 | Cr Purchases Returns $480',
      'B. Dr Purchases Returns $480 | Dr Sales Returns $480 | Cr Suspense $960',
      'C. Dr Suspense $960 | Cr Sales Returns $480 | Cr Purchases Returns $480',
      'D. Dr Sales Returns $480 | Cr Purchases Returns $480'
    ],
    correctIndex: 2,
    working: 'To remove the wrong debit in Sales Returns: Cr Sales Returns $480. To record the omitted credit in Purchases Returns: Cr Purchases Returns $480. Total Credit = $960, so Dr Suspense Account $960.'
  },
  {
    id: 'q6',
    topic: '1.5 Incomplete Records (Margin vs Mark-up)',
    question: 'A trader achieves a uniform gross profit mark-up on cost of 25%. During the year, Revenue was $180,000, Opening Inventory was $18,000, and Purchases were $150,000. All closing inventory was destroyed by fire. What was the cost of the inventory destroyed?',
    zhQuestion: '某商人的统一成本加成率（Mark-up）为 25%。本年度销售收入为 $180,000，期初存货 $18,000，采购额 $150,000。期末存货全部被大火烧毁。被烧毁的期末存货成本是多少？',
    options: [
      'A. $24,000',
      'B. $33,000',
      'C. $36,000',
      'D. $42,000'
    ],
    correctIndex: 0,
    working: 'Mark-up = 25% = 1/4 on cost → Margin = 1/5 (20%) on revenue. Gross Profit = 20% × $180,000 = $36,000. Therefore, Cost of Sales = $180,000 - $36,000 = $144,000. Goods available for sale = $18,000 + $150,000 = $168,000. Closing Inventory destroyed = $168,000 - $144,000 = $24,000.'
  },
  {
    id: 'q7',
    topic: '1.6 Accounting Ratios',
    question: 'A company has Equity of $300,000, 8% Debentures (2030) of $100,000, and Profit for the year (after deducting debenture interest) of $52,000. What is its Return on Capital Employed (ROCE)?',
    zhQuestion: '一家公司拥有股东权益 $300,000，8% 的长期债券 $100,000，扣除债券利息后的年度净利润为 $52,000。其动用资本回报率（ROCE）是多少？',
    options: [
      'A. 13.0%',
      'B. 15.0%',
      'C. 17.3%',
      'D. 20.0%'
    ],
    correctIndex: 1,
    working: 'Debenture interest = 8% × $100,000 = $8,000. Profit from Operations (before interest) = $52,000 + $8,000 = $60,000. Capital Employed = Equity ($300,000) + Non-Current Liabilities ($100,000) = $400,000. ROCE = ($60,000 ÷ $400,000) × 100% = 15.0%.'
  },
  {
    id: 'q8',
    topic: '2.2 Overhead Absorption',
    question: 'A production department budgeted overheads of $120,000 and 15,000 machine hours. Actual overheads were $126,000 and actual machine hours worked were 16,200 hours. Overheads for the period were:',
    zhQuestion: '某生产部门预算制造费用为 $120,000，预算机器工时为 15,000 小时。实际制造费用为 $126,000，实际机器工时为 16,200 小时。当期制造费用：',
    options: [
      'A. $3,600 over-absorbed',
      'B. $3,600 under-absorbed',
      'C. $6,000 over-absorbed',
      'D. $6,000 under-absorbed'
    ],
    correctIndex: 0,
    working: 'Budgeted OAR = $120,000 ÷ 15,000 hours = $8.00 per machine hour. Absorbed Overheads = 16,200 actual hours × $8.00 = $129,600. Actual Overheads = $126,000. Since Absorbed ($129,600) > Actual ($126,000), overheads were OVER-ABSORBED by $3,600.'
  }
];

const PAPER_2_QUESTIONS = [
  {
    id: 'p2-q1',
    number: 'Question 1 (30 Marks)',
    topic: 'Financial Statements of a Limited Company & Adjustments (AS 1.1 & 1.5)',
    zhTopic: '第一题（30分）：有限公司财务报表编制与期末调整',
    context: 'Sterling Plc has an accounting year end of 31 October 2025. Extracted balances at 31 October 2025 include: Revenue $840,000; Cost of Sales $490,000; Administrative Expenses $112,000; Distribution Costs $78,000; 6% Debentures (2029) $100,000; Debenture Interest Paid $3,000; Equipment at Cost $160,000; Accumulated Depreciation on Equipment (1 Nov 2024) $60,000.',
    adjustments: [
      '1. Administrative expenses include $4,000 prepaid for insurance relating to November 2025.',
      '2. Equipment is depreciated at 20% per annum using the reducing balance method, charged 50% to Administrative Expenses and 50% to Distribution Costs.',
      '3. Half a year’s debenture interest remains unpaid (accrued) at 31 October 2025.'
    ],
    numericalTasks: [
      {
        id: 'gp',
        label: '(a)(i) Gross Profit ($)',
        zhLabel: '毛利 Gross Profit ($)',
        marks: 2,
        correct: 350000,
        working: 'Revenue ($840,000) - Cost of Sales ($490,000) = $350,000.'
      },
      {
        id: 'dep',
        label: '(a)(ii) Total Equipment Depreciation for the Year ($)',
        zhLabel: '设备本年度折旧总额 ($)',
        marks: 3,
        correct: 20000,
        working: 'Reducing balance: 20% × ($160,000 Cost - $60,000 Acc. Dep.) = 20% × $100,000 = $20,000 ($10,000 to Admin, $10,000 to Distribution).'
      },
      {
        id: 'opProfit',
        label: '(a)(iii) Profit from Operations before Interest ($)',
        zhLabel: '息税前营业利润 Profit from Operations ($)',
        marks: 5,
        correct: 144000,
        working: 'Admin Expenses = $112,000 - $4,000 prepaid + $10,000 dep = $118,000. Distribution Costs = $78,000 + $10,000 dep = $88,000. Profit from Operations = $350,000 - $118,000 - $88,000 = $144,000.'
      },
      {
        id: 'pftYear',
        label: '(a)(iv) Profit for the Year after Finance Costs ($)',
        zhLabel: '本年度净利润 Profit for the Year ($)',
        marks: 3,
        correct: 138000,
        working: 'Full annual debenture interest = 6% × $100,000 = $6,000 ($3,000 paid + $3,000 accrued). Profit for the year = $144,000 - $6,000 = $138,000.'
      }
    ],
    writtenPrompt: '(b) The directors of Sterling Plc need to raise $150,000 to fund new machinery. Advise the directors whether they should issue a Rights Issue of Ordinary Shares or issue 7% Debentures (7 marks - AO2 & AO3 Evaluation).',
    zhWrittenPrompt: '(b) Sterling Plc 董事局需要筹集 $150,000 购置新机器。请评估并建议董事局应当通过向现有股东配股（Rights Issue of Ordinary Shares）还是发行 7% 公司债券（Debentures）来筹资。（7分 - 考查分析与评估能力 AO2/AO3）',
    markScheme: [
      'Rights Issue (配股): Permanent capital that never needs to be repaid (1); dividends are discretionary and only paid if profits allow (1); avoids increasing gearing/financial risk (1); however, dilutes control if existing shareholders do not take up their rights and takes time/cost to arrange (1).',
      '7% Debentures (公司债券): Does not dilute voting control of existing shareholders (1); interest is tax-deductible and fixed at $10,500 p.a. (1); however, interest MUST be paid every year regardless of profitability (reducing cash flow) and the $150,000 capital must be repaid on maturity (1).',
      'Decision / Recommendation (1 mandatory mark): Clear conclusion advising either Rights Issue or Debentures supported by Sterling’s existing $100,000 debentures and strong operating profit cover.'
    ]
  },
  {
    id: 'p2-q4',
    number: 'Question 4 (30 Marks)',
    topic: 'Cost & Management Accounting: Marginal Costing & Special Order Decision (AS 2.2)',
    zhTopic: '第四题（30分）：边际成本法、盈亏平衡与特殊订单决策',
    context: ' Zenith Ltd manufactures ergonomic desk chairs. Maximum factory capacity is 12,000 chairs per quarter. Current quarterly budget is 10,000 chairs at a selling price of $90 per chair. Per-unit variable costs are: Direct Materials $28, Direct Labour $22, Variable Production Overhead $10. Fixed overheads are $180,000 per quarter.',
    adjustments: [
      '1. Calculate unit contribution, quarterly break-even point in units, and current quarterly profit at 10,000 units.',
      '2. An overseas hotel chain offers a one-off special order for 1,800 chairs at a discounted price of $72 per chair. Each chair in this order requires a custom logo costing $3 per chair in extra direct materials, plus a one-off special stitching machine rental of $5,400.'
    ],
    numericalTasks: [
      {
        id: 'unitContrib',
        label: '(a)(i) Normal Contribution per Chair ($)',
        zhLabel: '常规每把椅子的单位边际贡献 ($)',
        marks: 2,
        correct: 30,
        working: 'Selling Price $90 - Total Variable Cost ($28 + $22 + $10 = $60) = $30 per chair.'
      },
      {
        id: 'bep',
        label: '(a)(ii) Quarterly Break-Even Point (chairs)',
        zhLabel: '季度盈亏平衡点销量 (把)',
        marks: 2,
        correct: 6000,
        working: 'Fixed Overheads ($180,000) ÷ Contribution per chair ($30) = 6,000 chairs.'
      },
      {
        id: 'currProfit',
        label: '(a)(iii) Current Quarterly Profit on 10,000 Chairs ($)',
        zhLabel: '当前 10,000 把椅子的季度利润 ($)',
        marks: 3,
        correct: 120000,
        working: 'Total Contribution (10,000 × $30 = $300,000) - Fixed Overheads ($180,000) = $120,000.'
      },
      {
        id: 'specialProfit',
        label: '(b) Additional Net Profit from Accepting the 1,800 Special Order ($)',
        zhLabel: '接受 1,800 把特殊订单带来的额外净利润 ($)',
        marks: 5,
        correct: 10800,
        working: 'Special order price = $72. Special variable cost = $60 + $3 logo = $63/chair. Special contribution = $72 - $63 = $9/chair. Total extra contribution = 1,800 × $9 = $16,200. Less specific fixed machine rental ($5,400) = +$10,800 net additional profit.'
      }
    ],
    writtenPrompt: '(c) Advise the directors of Zenith Ltd whether or not they should accept the overseas hotel chain’s special order. Consider both financial and non-financial factors (7 marks - AO2 & AO3).',
    zhWrittenPrompt: '(c) 请结合财务因素与非财务因素，建议 Zenith Ltd 董事局是否应当接受该海外连锁酒店的特殊订单。（7分 - 考查财务与非财务综合评估能力 AO2/AO3）',
    markScheme: [
      'Financial Factors (财务因素): Accepting generates positive contribution of $9/unit ($16,200 total) and increases overall quarterly profit by $10,800 after covering the $5,400 machine hire (2); Zenith has 2,000 units of spare capacity (12,000 - 10,000), which is enough for the 1,800-chair order without sacrificing regular $90 sales (1).',
      'Non-Financial Factors (非财务因素): Utilises idle factory capacity and keeps workforce employed/motivated (1); may lead to long-term repeat business in the overseas hospitality market (1); HOWEVER, existing regular customers may find out about the $72 price and demand discounts on the normal $90 price (1); check creditworthiness of the overseas client and quality reliability of the rented stitching machine (1).',
      'Decision / Recommendation (1 mandatory mark): Clear, justified recommendation (e.g., Accept the order because it adds $10,800 profit within spare capacity and is in a separate overseas market).'
    ]
  }
];

// ============================================================================
// HELPER COMPONENT: CLICKABLE BILINGUAL JARGON CHIP
// ============================================================================
function JargonText({ text, onSelectTerm, bilingualMode }) {
  // Highlight key terms dynamically or provide quick lookup
  return <span>{text}</span>;
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Navigation & Global Modes
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'dictionary' | 'practice' | 'exam'
  const [bilingualMode, setBilingualMode] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState('1.1');

  // Self-Evaluation Confidence State (Persisted in localStorage)
  const [confidenceMap, setConfidenceMap] = useState(() => {
    try {
      const saved = localStorage.getItem('cambridge_9706_confidence');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return {
      '1.1': 'almost',
      '1.2': 'ready',
      '1.3': 'almost',
      '1.4': 'needs-work',
      '1.5': 'almost',
      '1.6': 'ready',
      '2.1': 'ready',
      '2.2': 'needs-work'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('cambridge_9706_confidence', JSON.stringify(confidenceMap));
    } catch (e) {
      // Ignore storage error
    }
  }, [confidenceMap]);

  // Quick Translator Drawer / Modal State
  const [translatorOpen, setTranslatorOpen] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [selectedJargonItem, setSelectedJargonItem] = useState(JARGON_DICTIONARY[0]);

  // Dictionary View State
  const [dictSearch, setDictSearch] = useState('');
  const [dictCategory, setDictCategory] = useState('All');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  // Practice Workbench State
  const [practiceSubTab, setPracticeSubTab] = useState('double-entry'); // 'double-entry' | 'adjustments' | 'calculators'
  const [deIndex, setDeIndex] = useState(0);
  const [selectedDr, setSelectedDr] = useState('');
  const [selectedCr, setSelectedCr] = useState('');
  const [deChecked, setDeChecked] = useState(false);
  const [deScore, setDeScore] = useState(0);

  // Adjustments Practice State
  const [adjScenarioIdx, setAdjScenarioIdx] = useState(0);
  const [adjInputs, setAdjInputs] = useState({});
  const [adjChecked, setAdjChecked] = useState(false);

  // Interactive Costing & Ratio Calculator State
  const [calcFixedCosts, setCalcFixedCosts] = useState(120000);
  const [calcSellingPrice, setCalcSellingPrice] = useState(50);
  const [calcVarCost, setCalcVarCost] = useState(30);
  const [calcTargetUnits, setCalcTargetUnits] = useState(8000);

  // Exam Simulator State
  const [examPaper, setExamPaper] = useState('paper1'); // 'paper1' | 'paper2'
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [examTimerRunning, setExamTimerRunning] = useState(false);
  const [examSecondsLeft, setExamSecondsLeft] = useState(3600); // 60 mins default
  const [p2Inputs, setP2Inputs] = useState({});
  const [p2Essays, setP2Essays] = useState({});
  const [p2Checked, setP2Checked] = useState({});

  // Timer Effect
  useEffect(() => {
    if (!examTimerRunning) return;
    const interval = setInterval(() => {
      setExamSecondsLeft((prev) => {
        if (prev <= 1) {
          setExamTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examTimerRunning]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  // Filtered Dictionary
  const categories = useMemo(() => {
    const cats = new Set(JARGON_DICTIONARY.map((item) => item.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredDictionary = useMemo(() => {
    return JARGON_DICTIONARY.filter((item) => {
      const matchesCat = dictCategory === 'All' || item.category === dictCategory;
      const q = dictSearch.trim().toLowerCase();
      if (!q) return matchesCat;
      return (
        matchesCat &&
        (item.term.toLowerCase().includes(q) ||
          item.zh.includes(q) ||
          item.pinyin.toLowerCase().includes(q) ||
          item.definition.toLowerCase().includes(q) ||
          item.zhNote.includes(q))
      );
    });
  }, [dictSearch, dictCategory]);

  const quickFilteredJargon = useMemo(() => {
    const q = quickSearchQuery.trim().toLowerCase();
    if (!q) return JARGON_DICTIONARY.slice(0, 12);
    return JARGON_DICTIONARY.filter(
      (item) =>
        item.term.toLowerCase().includes(q) ||
        item.zh.includes(q) ||
        item.pinyin.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
    );
  }, [quickSearchQuery]);

  // Selected Syllabus Module
  const currentModule = useMemo(
    () => SYLLABUS_MODULES.find((m) => m.id === selectedModuleId) || SYLLABUS_MODULES[0],
    [selectedModuleId]
  );

  // Module Jargon Terms
  const currentModuleJargon = useMemo(
    () => JARGON_DICTIONARY.filter((j) => j.topic === currentModule.id),
    [currentModule]
  );

  // Confidence Stats
  const masteryStats = useMemo(() => {
    const total = SYLLABUS_MODULES.length;
    let readyCount = 0;
    let almostCount = 0;
    let needsWorkCount = 0;
    SYLLABUS_MODULES.forEach((m) => {
      const status = confidenceMap[m.id] || 'needs-work';
      if (status === 'ready') readyCount++;
      else if (status === 'almost') almostCount++;
      else needsWorkCount++;
    });
    const pct = Math.round(((readyCount * 1 + almostCount * 0.5) / total) * 100);
    return { total, readyCount, almostCount, needsWorkCount, pct };
  }, [confidenceMap]);

  // Double-entry practice current item
  const currentDe = DOUBLE_ENTRY_EXERCISES[deIndex];

  const handleCheckDoubleEntry = () => {
    if (!selectedDr || !selectedCr) return;
    setDeChecked(true);
    if (selectedDr === currentDe.correctDr && selectedCr === currentDe.correctCr) {
      setDeScore((s) => s + 1);
    }
  };

  const handleNextDoubleEntry = () => {
    setSelectedDr('');
    setSelectedCr('');
    setDeChecked(false);
    setDeIndex((prev) => (prev + 1) % DOUBLE_ENTRY_EXERCISES.length);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      {/* ================================================================== */}
      {/* TOP NAVIGATION HEADER                                              */}
      {/* ================================================================== */}
      <header className="sticky top-0 z-30 bg-slate-900 text-white shadow-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-inner border border-indigo-400/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  Cambridge AS Accounting <span className="text-indigo-400">9706</span>
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Syllabus 2023–2026
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {bilingualMode
                  ? 'Self-Directed Learning, Practice & Exam Prep | 剑桥 AS 会计全真自习与双语备考平台'
                  : 'Self-Directed Learning, Practice & Exam Preparation Suite'}
              </p>
            </div>
          </div>

          {/* Main Mode Switcher */}
          <nav className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700">
            {[
              { id: 'learn', label: '1. Learn', zh: '考点精讲', icon: BookOpen },
              { id: 'dictionary', label: '2. Jargon (中英)', zh: '会计术语库', icon: Languages },
              { id: 'practice', label: '3. Practise', zh: '实操工作台', icon: Calculator },
              { id: 'exam', label: '4. Test (P1/P2)', zh: '模考中心', icon: ClipboardCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {bilingualMode && (
                    <span className="hidden lg:inline text-[11px] opacity-85">({tab.zh})</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Bilingual Toggle & Quick Jargon Lookup */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBilingualMode(!bilingualMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                bilingualMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
              title="Toggle Chinese Accounting Jargon Annotations"
            >
              <Languages className="w-4 h-4" />
              <span>{bilingualMode ? '中英双语: ON' : 'Bilingual: OFF'}</span>
            </button>

            <button
              onClick={() => setTranslatorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500 hover:bg-indigo-400 text-white shadow-sm transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Ask Jargon 查词</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* PROGRESS & SYLLABUS MASTERY BAR                                    */}
      {/* ================================================================== */}
      <div className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" />
              {bilingualMode ? 'AS 考纲掌握进度 (Syllabus Mastery):' : 'AS Syllabus Mastery:'}
            </span>
            <div className="w-36 sm:w-48 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-all duration-500"
                style={{ width: `${masteryStats.pct}%` }}
              />
            </div>
            <span className="font-bold text-indigo-700">{masteryStats.pct}%</span>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Ready to move on: <strong>{masteryStats.readyCount}</strong>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Almost there: <strong>{masteryStats.almostCount}</strong>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              Needs more work: <strong>{masteryStats.needsWorkCount}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT AREA                                                  */}
      {/* ================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ================================================================ */}
        {/* TAB 1: LEARN MODE (SYLLABUS STUDY HUB & SELF-EVALUATION)         */}
        {/* ================================================================ */}
        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: Complete AS 9706 Syllabus Navigator */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-300">
                      9706 AS Level Syllabus
                    </h2>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {bilingualMode
                        ? '点击模块学习并标记掌握程度'
                        : 'Select a topic & rate your confidence'}
                    </p>
                  </div>
                  <Layers className="w-5 h-5 text-indigo-400" />
                </div>

                <div className="divide-y divide-slate-100">
                  {SYLLABUS_MODULES.map((mod) => {
                    const isSelected = mod.id === selectedModuleId;
                    const conf = confidenceMap[mod.id] || 'needs-work';
                    const badgeStyle =
                      conf === 'ready'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : conf === 'almost'
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-rose-100 text-rose-800 border-rose-300';
                    const badgeLabel =
                      conf === 'ready'
                        ? 'Ready'
                        : conf === 'almost'
                        ? 'Almost'
                        : 'Needs Work';

                    return (
                      <button
                        key={mod.id}
                        onClick={() => setSelectedModuleId(mod.id)}
                        className={`w-full text-left p-3.5 transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-indigo-50/90 border-l-4 border-l-indigo-600'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                              {mod.code}
                            </span>
                            <span className="text-[11px] font-medium text-slate-500">
                              {mod.section}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">{mod.title}</p>
                          {bilingualMode && (
                            <p className="text-xs text-indigo-700 font-medium">{mod.zhTitle}</p>
                          )}
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${badgeStyle}`}
                        >
                          {badgeLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Exam Structure Quick Reference Card */}
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-md">
                <h3 className="text-sm font-bold flex items-center gap-2 text-indigo-300">
                  <Compass className="w-4 h-4" />
                  {bilingualMode
                    ? 'Cambridge AS 考试结构 (Papers 1 & 2)'
                    : 'Cambridge AS Assessment Structure'}
                </h3>
                <div className="mt-3 space-y-2.5 text-xs text-slate-200">
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                    <div className="flex justify-between font-bold text-white">
                      <span>Paper 1: Multiple Choice</span>
                      <span className="text-amber-300">28% of AS (1 hr)</span>
                    </div>
                    <p className="mt-1 text-slate-300">
                      30 MCQs covering Sections 1 & 2. Tests speed, double-entry accuracy, and ratio/costing calculations.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 border border-white/10">
                    <div className="flex justify-between font-bold text-white">
                      <span>Paper 2: Structured Questions</span>
                      <span className="text-emerald-300">72% of AS (1 hr 30m)</span>
                    </div>
                    <p className="mt-1 text-slate-300">
                      4 Questions (90 marks total): Q1–Q3 Financial Accounting (30, 15, 15 marks), Q4 Cost & Management Accounting (30 marks).
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Main Panel: Detailed Module Study Guide, Worked Example & Jargon */}
            <section className="lg:col-span-8 space-y-6">
              {/* Module Header & Self-Evaluation Checklist */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      <span>{currentModule.code}</span>
                      <span>•</span>
                      <span>{currentModule.section}</span>
                      <span>•</span>
                      <span className="text-slate-500">Coursebook {currentModule.chapters}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mt-1">
                      {currentModule.title}
                    </h2>
                    {bilingualMode && (
                      <p className="text-base font-semibold text-indigo-700 mt-0.5">
                        {currentModule.zhTitle}
                      </p>
                    )}
                  </div>

                  {/* Self-Evaluation Rating Selector (Coursebook Style) */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      {bilingualMode
                        ? '自我评估清单 (Self-Evaluation Checklist):'
                        : 'Self-Evaluation Confidence:'}
                    </p>
                    <div className="flex items-center gap-1.5">
                      {[
                        {
                          key: 'needs-work',
                          label: 'Needs more work',
                          zh: '需加强',
                          activeClass: 'bg-rose-600 text-white border-rose-600'
                        },
                        {
                          key: 'almost',
                          label: 'Almost there',
                          zh: '基本掌握',
                          activeClass: 'bg-amber-500 text-white border-amber-500'
                        },
                        {
                          key: 'ready',
                          label: 'Ready to move on',
                          zh: '完全掌握',
                          activeClass: 'bg-emerald-600 text-white border-emerald-600'
                        }
                      ].map((opt) => {
                        const isCurrent = (confidenceMap[currentModule.id] || 'needs-work') === opt.key;
                        return (
                          <button
                            key={opt.key}
                            onClick={() =>
                              setConfidenceMap((prev) => ({
                                ...prev,
                                [currentModule.id]: opt.key
                              }))
                            }
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                              isCurrent
                                ? opt.activeClass
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {opt.label} {bilingualMode && `(${opt.zh})`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Summary & Learning Intentions */}
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {currentModule.summary}
                </p>

                <div className="mt-4 bg-indigo-50/60 rounded-xl p-4 border border-indigo-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    {bilingualMode
                      ? '本章核心学习目标 (Learning Intentions - 9706 Syllabus)'
                      : 'Syllabus Learning Intentions'}
                  </h3>
                  <ul className="mt-2.5 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentModule.learningObjectives.map((obj, i) => (
                      <li
                        key={i}
                        className="text-xs text-slate-700 flex items-start gap-2 bg-white p-2.5 rounded-lg border border-indigo-100/80"
                      >
                        <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Clickable Module Bilingual Jargon Chips */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Languages className="w-4 h-4 text-indigo-600" />
                    {bilingualMode
                      ? '本模块高频中英会计专业词汇 (点击查看中文释义与考点)'
                      : 'Key Accounting Jargon in this Topic (Click for Chinese Translation)'}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {currentModuleJargon.length} terms
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentModuleJargon.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedJargonItem(item);
                        setTranslatorOpen(true);
                      }}
                      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 border border-slate-200 hover:border-indigo-300 transition-all"
                    >
                      <span className="font-semibold">{item.term}</span>
                      {bilingualMode && (
                        <span className="text-indigo-600 font-bold bg-indigo-100/80 px-1.5 py-0.5 rounded">
                          {item.zh}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core Concepts & Study Notes */}
              <div className="space-y-4">
                {currentModule.concepts.map((sec, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs"
                  >
                    <h3 className="text-base font-bold text-slate-900">{sec.heading}</h3>
                    {bilingualMode && (
                      <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                        {sec.zhHeading}
                      </p>
                    )}
                    <ul className="mt-3 space-y-2.5">
                      {sec.content.map((point, pIdx) => (
                        <li
                          key={pIdx}
                          className="text-sm text-slate-700 leading-relaxed flex items-start gap-2.5"
                        >
                          <ChevronRight className="w-4 h-4 text-indigo-500 shrink-0 mt-1" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Key Formulas Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  {bilingualMode
                    ? '必背核心公式 (Key Accounting Formulas)'
                    : 'Key Accounting Formulas'}
                </h3>
                <div className="mt-3 grid grid-cols-1 gap-3">
                  {currentModule.formulas.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-semibold text-white">{f.name}</span>
                        {bilingualMode && <span className="text-amber-300">{f.zh}</span>}
                      </div>
                      <p className="mt-1.5 font-mono text-xs sm:text-sm text-emerald-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                        {f.expr}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Worked Example Box (Coursebook Style) */}
              <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Worked Example (分步例题解析)</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {currentModule.workedExample.title}
                </h3>
                <p className="mt-2 text-sm text-slate-700 bg-white p-3.5 rounded-xl border border-emerald-200/80">
                  <strong>Scenario:</strong> {currentModule.workedExample.scenario}
                </p>
                <div className="mt-3 space-y-2">
                  {currentModule.workedExample.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="text-xs sm:text-sm text-slate-800 bg-white/90 px-3.5 py-2.5 rounded-lg border border-emerald-100 font-medium"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: BILINGUAL ACCOUNTING JARGON DICTIONARY & FLASHCARDS       */}
        {/* ================================================================ */}
        {activeTab === 'dictionary' && (
          <div className="space-y-6">
            {/* Top Controls Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Languages className="w-6 h-6 text-indigo-600" />
                  <span>
                    Cambridge AS Accounting Bilingual Jargon Dictionary (剑桥会计中英专业词汇库)
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Search any English or Chinese accounting term, Pinyin, or syllabus concept, or switch to Flashcard Mode to test yourself.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFlashcardMode(false)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    !flashcardMode
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Glossary Table (词典列表)
                </button>
                <button
                  onClick={() => {
                    setFlashcardMode(true);
                    setCardFlipped(false);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    flashcardMode
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Bilingual Flashcards (双语闪卡自测)
                </button>
              </div>
            </div>

            {/* Search & Category Filter */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={dictSearch}
                  onChange={(e) => setDictSearch(e.target.value)}
                  placeholder="Search English term (e.g. Accrual, Prudence, Absorption, Contra) or 中文 (如：应计、坏账准备、边际贡献、配股)..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setDictCategory(cat);
                      setCurrentCardIdx(0);
                      setCardFlipped(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      dictCategory === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Flashcard Mode vs Glossary Grid */}
            {flashcardMode ? (
              <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center space-y-6">
                {filteredDictionary.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-indigo-600">
                        Topic {filteredDictionary[currentCardIdx % filteredDictionary.length].topic} •{' '}
                        {filteredDictionary[currentCardIdx % filteredDictionary.length].category}
                      </span>
                      <span>
                        Card {(currentCardIdx % filteredDictionary.length) + 1} of{' '}
                        {filteredDictionary.length}
                      </span>
                    </div>

                    <div
                      onClick={() => setCardFlipped(!cardFlipped)}
                      className="cursor-pointer min-h-[240px] rounded-2xl border-2 border-dashed border-indigo-200 bg-gradient-to-br from-indigo-50/50 to-slate-50 p-8 flex flex-col items-center justify-center transition-all hover:border-indigo-400"
                    >
                      {!cardFlipped ? (
                        <div className="space-y-3">
                          <span className="text-xs uppercase tracking-widest text-indigo-500 font-bold">
                            English Accounting Term (点击翻转查看中文与定义)
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                            {filteredDictionary[currentCardIdx % filteredDictionary.length].term}
                          </h3>
                          <p className="text-xs text-slate-400 pt-2">
                            Click card to reveal Chinese translation, Pinyin & Cambridge definition
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 text-left max-w-lg">
                          <div className="text-center border-b border-indigo-100 pb-3">
                            <h3 className="text-2xl font-bold text-indigo-700">
                              {filteredDictionary[currentCardIdx % filteredDictionary.length].zh}
                            </h3>
                            <p className="text-xs font-mono text-slate-500">
                              {filteredDictionary[currentCardIdx % filteredDictionary.length].pinyin}
                            </p>
                          </div>
                          <p className="text-sm text-slate-800">
                            <strong>English Definition:</strong>{' '}
                            {filteredDictionary[currentCardIdx % filteredDictionary.length].definition}
                          </p>
                          <p className="text-sm text-indigo-950 bg-indigo-100/70 p-3 rounded-xl">
                            <strong>中文精讲：</strong>
                            {filteredDictionary[currentCardIdx % filteredDictionary.length].zhNote}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setCardFlipped(false);
                          setCurrentCardIdx(
                            (prev) =>
                              (prev - 1 + filteredDictionary.length) % filteredDictionary.length
                          );
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        ← Previous Term
                      </button>
                      <button
                        onClick={() => setCardFlipped(!cardFlipped)}
                        className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white"
                      >
                        {cardFlipped ? 'Show Front (English)' : 'Flip Card (查看中文)'}
                      </button>
                      <button
                        onClick={() => {
                          setCardFlipped(false);
                          setCurrentCardIdx((prev) => (prev + 1) % filteredDictionary.length);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        Next Term →
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-slate-500">No matching terms found.</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDictionary.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 mb-1">
                            AS {item.topic} • {item.category}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">{item.term}</h3>
                        </div>
                        <div className="text-right">
                          <span className="inline-block text-sm font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                            {item.zh}
                          </span>
                          <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                            {item.pinyin}
                          </p>
                        </div>
                      </div>

                      <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.definition}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl">
                      <strong className="text-indigo-900">中文解析：</strong>
                      {item.zhNote}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: PRACTISE MODE (INTERACTIVE ACCOUNTING WORKBENCHES)        */}
        {/* ================================================================ */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Sub-navigation for Practice Labs */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Interactive Accounting Practice Lab (互动实操练习工作台)
                </h2>
                <p className="text-xs text-slate-500">
                  Practise double-entry ledger postings, year-end financial statement adjustments, and break-even/costing calculations.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    id: 'double-entry',
                    label: '1. Double-Entry & T-Accounts',
                    zh: '复式记账与T型账户'
                  },
                  {
                    id: 'adjustments',
                    label: '2. Financial Adjustments & Costing Cases',
                    zh: '期末调整与成本核算'
                  },
                  {
                    id: 'calculators',
                    label: '3. Break-Even & What-If Simulator',
                    zh: '本量利动态模拟器'
                  }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setPracticeSubTab(sub.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      practiceSubTab === sub.id
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {sub.label} {bilingualMode && `(${sub.zh})`}
                  </button>
                ))}
              </div>
            </div>

            {/* WORKBENCH 1: DOUBLE-ENTRY & T-ACCOUNT VISUALISER */}
            {practiceSubTab === 'double-entry' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                      Transaction {deIndex + 1} of {DOUBLE_ENTRY_EXERCISES.length} •{' '}
                      {currentDe.topic}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Score: {deScore}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <p className="text-sm sm:text-base font-bold text-slate-900">
                      {currentDe.transaction}
                    </p>
                    {bilingualMode && (
                      <p className="text-xs sm:text-sm text-indigo-700 font-medium">
                        {currentDe.zhTransaction}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Debit Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                        Account to DEBIT (借方账户 Dr - ${currentDe.amount.toLocaleString()}):
                      </label>
                      <div className="space-y-1.5">
                        {currentDe.options.map((opt) => (
                          <button
                            key={opt}
                            disabled={deChecked}
                            onClick={() => setSelectedDr(opt)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              selectedDr === opt
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Dr {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Credit Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                        Account to CREDIT (贷方账户 Cr - ${currentDe.amount.toLocaleString()}):
                      </label>
                      <div className="space-y-1.5">
                        {currentDe.options.map((opt) => (
                          <button
                            key={opt}
                            disabled={deChecked}
                            onClick={() => setSelectedCr(opt)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              selectedCr === opt
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            Cr {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleCheckDoubleEntry}
                      disabled={!selectedDr || !selectedCr || deChecked}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-all"
                    >
                      Check Double-Entry (核对分录)
                    </button>
                    <button
                      onClick={handleNextDoubleEntry}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all"
                    >
                      Next Transaction (下一题) →
                    </button>
                  </div>

                  {/* Feedback Box */}
                  {deChecked && (
                    <div
                      className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1.5 ${
                        selectedDr === currentDe.correctDr && selectedCr === currentDe.correctCr
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-rose-50 border-rose-300 text-rose-950'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5">
                        {selectedDr === currentDe.correctDr &&
                        selectedCr === currentDe.correctCr ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>Correct Double-Entry! (借贷分录完全正确！)</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4 text-rose-600" />
                            <span>
                              Correct Answer: Dr {currentDe.correctDr} | Cr {currentDe.correctCr}
                            </span>
                          </>
                        )}
                      </div>
                      <p>{currentDe.explanation}</p>
                    </div>
                  )}
                </div>

                {/* Live T-Account Ledger Visualiser */}
                <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 shadow-sm space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4" />
                    <span>Live T-Account Ledger Preview (T型分类账实时预览)</span>
                  </h3>

                  {/* Debit T-Account */}
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="text-center font-bold text-xs text-indigo-300 border-b-2 border-slate-600 pb-1.5">
                      {selectedDr || 'Select Debit Account...'}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-slate-600 text-xs min-h-[75px]">
                      <div className="p-2">
                        <span className="text-[10px] text-slate-400 block">Dr (借方)</span>
                        {selectedDr && (
                          <div className="mt-1 flex justify-between text-emerald-300 font-mono">
                            <span className="truncate pr-1">{selectedCr || 'Contra'}</span>
                            <span>${currentDe.amount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-2">
                        <span className="text-[10px] text-slate-400 block text-right">
                          Cr (贷方)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Credit T-Account */}
                  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                    <div className="text-center font-bold text-xs text-emerald-300 border-b-2 border-slate-600 pb-1.5">
                      {selectedCr || 'Select Credit Account...'}
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-slate-600 text-xs min-h-[75px]">
                      <div className="p-2">
                        <span className="text-[10px] text-slate-400 block">Dr (借方)</span>
                      </div>
                      <div className="p-2">
                        <span className="text-[10px] text-slate-400 block text-right">
                          Cr (贷方)
                        </span>
                        {selectedCr && (
                          <div className="mt-1 flex justify-between text-emerald-300 font-mono">
                            <span className="truncate pr-1">{selectedDr || 'Contra'}</span>
                            <span>${currentDe.amount.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300 space-y-1">
                    <p className="font-bold text-amber-300">DEAD CLIC Memory Aid:</p>
                    <p>• DEBIT to increase: Expenses, Assets, Drawings</p>
                    <p>• CREDIT to increase: Liabilities, Income, Capital</p>
                  </div>
                </div>
              </div>
            )}

            {/* WORKBENCH 2: FINANCIAL ADJUSTMENTS & COSTING WORKBENCH */}
            {practiceSubTab === 'adjustments' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex gap-2">
                    {ADJUSTMENT_SCENARIOS.map((scen, idx) => (
                      <button
                        key={scen.id}
                        onClick={() => {
                          setAdjScenarioIdx(idx);
                          setAdjChecked(false);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                          adjScenarioIdx === idx
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {scen.title}
                      </button>
                    ))}
                  </div>
                </div>

                {(() => {
                  const scen = ADJUSTMENT_SCENARIOS[adjScenarioIdx];
                  return (
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{scen.title}</h3>
                        {bilingualMode && (
                          <p className="text-xs font-semibold text-indigo-600">{scen.zhTitle}</p>
                        )}
                        <p className="mt-2 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                          {scen.description}
                        </p>
                        <ul className="mt-3 space-y-1 text-xs sm:text-sm text-slate-700 pl-2">
                          {scen.notes.map((n, idx) => (
                            <li key={idx} className="font-medium">
                              {n}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {scen.fields.map((field) => {
                          const userVal = adjInputs[`${scen.id}_${field.key}`] ?? '';
                          const isCorrect = Number(userVal) === field.correct;
                          return (
                            <div
                              key={field.key}
                              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                            >
                              <label className="block text-xs font-bold text-slate-800">
                                {field.label}
                                {bilingualMode && (
                                  <span className="block text-indigo-600 font-normal mt-0.5">
                                    {field.zhLabel}
                                  </span>
                                )}
                              </label>
                              <input
                                type="number"
                                value={userVal}
                                onChange={(e) =>
                                  setAdjInputs((prev) => ({
                                    ...prev,
                                    [`${scen.id}_${field.key}`]: e.target.value
                                  }))
                                }
                                placeholder="Enter figure..."
                                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                              {adjChecked && (
                                <div
                                  className={`p-2.5 rounded-lg text-xs ${
                                    isCorrect
                                      ? 'bg-emerald-100/80 text-emerald-900 border border-emerald-300'
                                      : 'bg-amber-50 text-amber-950 border border-amber-300'
                                  }`}
                                >
                                  <p className="font-bold">
                                    {isCorrect
                                      ? '✓ Correct!'
                                      : `Model Answer: ${field.correct.toLocaleString()}`}
                                  </p>
                                  <p className="mt-1">{field.working}</p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAdjChecked(true)}
                          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                          Verify Answers & Show Workings (核对答案并查看计算过程)
                        </button>
                        <button
                          onClick={() => {
                            setAdjInputs({});
                            setAdjChecked(false);
                          }}
                          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
                        >
                          Reset Inputs
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* WORKBENCH 3: INTERACTIVE BREAK-EVEN & COST-VOLUME-PROFIT SIMULATOR */}
            {practiceSubTab === 'calculators' && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Marginal Costing & Break-Even Interactive Lab (本量利与安全边际动态实验室)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Adjust Fixed Costs, Selling Price, Variable Cost per unit, and Planned Output to see real-time impact on Contribution, Break-Even Point, Margin of Safety, and C/S Ratio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">
                      Fixed Costs (固定成本 $)
                    </label>
                    <input
                      type="number"
                      value={calcFixedCosts}
                      onChange={(e) => setCalcFixedCosts(Math.max(0, Number(e.target.value)))}
                      className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-sm"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">
                      Selling Price / unit (单位售价 $)
                    </label>
                    <input
                      type="number"
                      value={calcSellingPrice}
                      onChange={(e) => setCalcSellingPrice(Math.max(1, Number(e.target.value)))}
                      className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-sm"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">
                      Variable Cost / unit (单位变动成本 $)
                    </label>
                    <input
                      type="number"
                      value={calcVarCost}
                      onChange={(e) => setCalcVarCost(Math.max(0, Number(e.target.value)))}
                      className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-sm"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 block">
                      Budgeted Sales (预计销量 units)
                    </label>
                    <input
                      type="number"
                      value={calcTargetUnits}
                      onChange={(e) => setCalcTargetUnits(Math.max(0, Number(e.target.value)))}
                      className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-sm"
                    />
                  </div>
                </div>

                {(() => {
                  const unitContrib = calcSellingPrice - calcVarCost;
                  const csRatio =
                    calcSellingPrice > 0 ? ((unitContrib / calcSellingPrice) * 100).toFixed(1) : 0;
                  const bepUnits =
                    unitContrib > 0 ? Math.ceil(calcFixedCosts / unitContrib) : 'N/A';
                  const bepRevenue =
                    unitContrib > 0 ? bepUnits * calcSellingPrice : 'N/A';
                  const mosUnits =
                    unitContrib > 0 ? calcTargetUnits - bepUnits : 'N/A';
                  const mosPct =
                    unitContrib > 0 && calcTargetUnits > 0
                      ? (((calcTargetUnits - bepUnits) / calcTargetUnits) * 100).toFixed(1)
                      : 0;
                  const totalProfit = calcTargetUnits * unitContrib - calcFixedCosts;

                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                        <span className="text-xs font-semibold text-indigo-800 block">
                          Unit Contribution (单位边际贡献)
                        </span>
                        <span className="text-2xl font-extrabold text-indigo-950 font-mono mt-1 block">
                          ${unitContrib.toLocaleString()}
                        </span>
                        <span className="text-[11px] text-indigo-700">
                          C/S Ratio: {csRatio}%
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                        <span className="text-xs font-semibold text-amber-900 block">
                          Break-Even Point (盈亏平衡点)
                        </span>
                        <span className="text-2xl font-extrabold text-amber-950 font-mono mt-1 block">
                          {typeof bepUnits === 'number'
                            ? `${bepUnits.toLocaleString()} units`
                            : bepUnits}
                        </span>
                        <span className="text-[11px] text-amber-800">
                          Revenue:{' '}
                          {typeof bepRevenue === 'number'
                            ? `$${bepRevenue.toLocaleString()}`
                            : 'N/A'}
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                        <span className="text-xs font-semibold text-emerald-900 block">
                          Margin of Safety (安全边际)
                        </span>
                        <span className="text-2xl font-extrabold text-emerald-950 font-mono mt-1 block">
                          {typeof mosUnits === 'number'
                            ? `${mosUnits.toLocaleString()} units`
                            : mosUnits}
                        </span>
                        <span className="text-[11px] text-emerald-800">
                          {mosPct}% of Budgeted Sales
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-900 text-white sm:col-span-2">
                        <span className="text-xs font-semibold text-indigo-300 block">
                          Marginal Costing Statement @ {calcTargetUnits.toLocaleString()} units
                        </span>
                        <div className="mt-1.5 text-xs font-mono space-y-1">
                          <div className="flex justify-between">
                            <span>Total Contribution ({calcTargetUnits.toLocaleString()} × ${unitContrib}):</span>
                            <span className="text-emerald-300">
                              ${(calcTargetUnits * unitContrib).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Less: Fixed Overheads:</span>
                            <span className="text-rose-300">
                              (${calcFixedCosts.toLocaleString()})
                            </span>
                          </div>
                          <div className="flex justify-between border-t border-slate-700 pt-1 font-bold text-sm">
                            <span>Projected Profit / (Loss):</span>
                            <span
                              className={
                                totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                              }
                            >
                              ${totalProfit.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 4: TEST MODE (PAPER 1 MCQ & PAPER 2 STRUCTURED SIMULATOR)    */}
        {/* ================================================================ */}
        {activeTab === 'exam' && (
          <div className="space-y-6">
            {/* Exam Header & Paper Switcher */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500 text-white">
                    9706 Exam Simulator
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold">
                    {examPaper === 'paper1'
                      ? 'Paper 1: Multiple Choice Examination (1 Hour • 28% Weight)'
                      : 'Paper 2: Structured Questions Examination (1 Hour 30 Mins • 72% Weight)'}
                  </h2>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {bilingualMode
                    ? '全真模拟剑桥 AS 会计 Paper 1 选择题与 Paper 2 综合计算及论述题（附官方评分标准与分步详解）'
                    : 'Timed Cambridge AS Accounting examination practice with detailed workings and mark schemes.'}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Timer Controls */}
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="font-mono text-sm font-bold text-amber-300">
                    {formatTime(examSecondsLeft)}
                  </span>
                  <button
                    onClick={() => setExamTimerRunning(!examTimerRunning)}
                    className="text-xs px-2 py-0.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                  >
                    {examTimerRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    onClick={() => {
                      setExamTimerRunning(false);
                      setExamSecondsLeft(examPaper === 'paper1' ? 3600 : 5400);
                    }}
                    className="text-slate-400 hover:text-white"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Switch Paper 1 / Paper 2 */}
                <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                  <button
                    onClick={() => {
                      setExamPaper('paper1');
                      setExamSecondsLeft(3600);
                      setExamTimerRunning(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      examPaper === 'paper1'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Paper 1 (MCQ)
                  </button>
                  <button
                    onClick={() => {
                      setExamPaper('paper2');
                      setExamSecondsLeft(5400);
                      setExamTimerRunning(false);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      examPaper === 'paper2'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Paper 2 (Structured)
                  </button>
                </div>
              </div>
            </div>

            {/* PAPER 1: MULTIPLE CHOICE SIMULATOR */}
            {examPaper === 'paper1' && (
              <div className="space-y-4">
                {mcqSubmitted && (
                  <div className="bg-indigo-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold">
                        Paper 1 Diagnostic Result:{' '}
                        {
                          PAPER_1_MCQS.filter((q) => mcqAnswers[q.id] === q.correctIndex)
                            .length
                        }{' '}
                        / {PAPER_1_MCQS.length} Correct
                      </h3>
                      <p className="text-xs text-indigo-200">
                        Review the step-by-step workings under each question below to strengthen your exam technique.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setMcqAnswers({});
                        setMcqSubmitted(false);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-indigo-900 hover:bg-indigo-50"
                    >
                      Retake Paper 1
                    </button>
                  </div>
                )}

                {PAPER_1_MCQS.map((q, idx) => {
                  const selected = mcqAnswers[q.id];
                  const isCorrect = selected === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          Question {idx + 1} • Syllabus {q.topic}
                        </span>
                        {mcqSubmitted && (
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? '✓ 1 / 1 Mark' : '✗ 0 / 1 Mark'}
                          </span>
                        )}
                      </div>

                      <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                        {q.question}
                      </p>
                      {bilingualMode && (
                        <p className="text-xs sm:text-sm text-indigo-700 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                          {q.zhQuestion}
                        </p>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt, oIdx) => {
                          const isChosen = selected === oIdx;
                          let btnClass =
                            'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100';
                          if (mcqSubmitted) {
                            if (oIdx === q.correctIndex) {
                              btnClass =
                                'bg-emerald-600 text-white border-emerald-600 font-bold';
                            } else if (isChosen) {
                              btnClass = 'bg-rose-600 text-white border-rose-600';
                            }
                          } else if (isChosen) {
                            btnClass = 'bg-indigo-600 text-white border-indigo-600 font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={mcqSubmitted}
                              onClick={() =>
                                setMcqAnswers((prev) => ({ ...prev, [q.id]: oIdx }))
                              }
                              className={`text-left px-4 py-3 rounded-xl text-xs sm:text-sm border transition-all ${btnClass}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {mcqSubmitted && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
                          <strong className="text-indigo-700 block mb-1">
                            Examiner’s Step-by-Step Working (解析与计算步骤):
                          </strong>
                          {q.working}
                        </div>
                      )}
                    </div>
                  );
                })}

                {!mcqSubmitted && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => setMcqSubmitted(true)}
                      className="px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                    >
                      Submit Paper 1 & View Workings (交卷并查看全部解析)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* PAPER 2: STRUCTURED QUESTIONS & EVALUATION SIMULATOR */}
            {examPaper === 'paper2' && (
              <div className="space-y-8">
                {PAPER_2_QUESTIONS.map((q) => {
                  const isChecked = !!p2Checked[q.id];
                  return (
                    <div
                      key={q.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6"
                    >
                      <div className="border-b border-slate-100 pb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                          {q.number} • {q.topic}
                        </span>
                        {bilingualMode && (
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {q.zhTopic}
                          </h3>
                        )}
                        <p className="mt-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
                          {q.context}
                        </p>
                        <div className="mt-3 space-y-1 text-xs sm:text-sm text-slate-700">
                          <p className="font-bold text-slate-900">Additional Information:</p>
                          {q.adjustments.map((adj, i) => (
                            <p key={i} className="pl-2">
                              {adj}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Part (a) Numerical Tasks */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900">
                          Part (a): Calculation & Financial Statement Extracts (AO1 & AO2 Analysis)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.numericalTasks.map((task) => {
                            const val = p2Inputs[`${q.id}_${task.id}`] ?? '';
                            const right = Number(val) === task.correct;
                            return (
                              <div
                                key={task.id}
                                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                              >
                                <div className="flex justify-between text-xs font-bold text-slate-800">
                                  <span>{task.label}</span>
                                  <span className="text-indigo-600">[{task.marks} marks]</span>
                                </div>
                                {bilingualMode && (
                                  <p className="text-xs text-indigo-700">{task.zhLabel}</p>
                                )}
                                <input
                                  type="number"
                                  value={val}
                                  onChange={(e) =>
                                    setP2Inputs((prev) => ({
                                      ...prev,
                                      [`${q.id}_${task.id}`]: e.target.value
                                    }))
                                  }
                                  placeholder="Enter calculated figure..."
                                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono text-sm"
                                />
                                {isChecked && (
                                  <div
                                    className={`p-2.5 rounded-lg text-xs ${
                                      right
                                        ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                                        : 'bg-amber-50 text-amber-950 border border-amber-300'
                                    }`}
                                  >
                                    <p className="font-bold">
                                      {right
                                        ? `✓ Correct (${task.marks}/${task.marks} marks)`
                                        : `Mark Scheme Figure: ${task.correct.toLocaleString()}`}
                                    </p>
                                    <p className="mt-1">{task.working}</p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Part (b)/(c) Written Evaluation Response (AO2 & AO3) */}
                      <div className="space-y-3 border-t border-slate-100 pt-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">
                            Written Evaluation & Recommendation Question (AO2 Analysis & AO3 Evaluation)
                          </h4>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-900">
                            Command Word: Advise (7 Marks)
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{q.writtenPrompt}</p>
                        {bilingualMode && (
                          <p className="text-xs text-indigo-700">{q.zhWrittenPrompt}</p>
                        )}
                        <textarea
                          rows={4}
                          value={p2Essays[q.id] ?? ''}
                          onChange={(e) =>
                            setP2Essays((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          placeholder="Structure your answer: 1. Arguments FOR Option A / Financial factors  2. Arguments FOR Option B / Non-financial factors  3. Clear final recommendation ('I advise the directors to...')..."
                          className="w-full p-3.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        {isChecked && (
                          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs sm:text-sm text-slate-800">
                            <p className="font-bold text-emerald-900">
                              Official-Style Cambridge Mark Scheme Breakdown (评分标准要点):
                            </p>
                            <ul className="space-y-1.5 list-disc pl-5">
                              {q.markScheme.map((pt, idx) => (
                                <li key={idx}>{pt}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div>
                        <button
                          onClick={() =>
                            setP2Checked((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                          }
                          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
                        >
                          {isChecked
                            ? 'Hide Mark Scheme'
                            : 'Mark Question & Reveal Official Mark Scheme (批改并查看评分标准)'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================================================================== */}
      {/* FLOATING QUICK JARGON TRANSLATOR MODAL                             */}
      {/* ================================================================== */}
      {translatorOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold">
                  Instant Accounting Jargon Translator (中英会计术语即时查询)
                </h3>
              </div>
              <button
                onClick={() => setTranslatorOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-slate-200 bg-slate-50">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  autoFocus
                  value={quickSearchQuery}
                  onChange={(e) => setQuickSearchQuery(e.target.value)}
                  placeholder="Type any English term (e.g. Accrual, Suspense, Margin, Bonus Issue) or Chinese (如：折旧、配股、坏账)..."
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Selected Term Spotlight + Quick Results */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedJargonItem && (
                <div className="p-4 rounded-2xl bg-indigo-50/90 border border-indigo-200 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-indigo-600">
                        Selected Term • AS {selectedJargonItem.topic} ({selectedJargonItem.category})
                      </span>
                      <h4 className="text-lg font-extrabold text-slate-900">
                        {selectedJargonItem.term}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-base font-bold text-white bg-indigo-600 px-3 py-1 rounded-xl">
                        {selectedJargonItem.zh}
                      </span>
                      <p className="text-xs font-mono text-indigo-800 mt-1">
                        {selectedJargonItem.pinyin}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800">
                    <strong>Cambridge Definition:</strong> {selectedJargonItem.definition}
                  </p>
                  <p className="text-xs sm:text-sm text-indigo-950 bg-white p-3 rounded-xl border border-indigo-100">
                    <strong>中文考点精析：</strong> {selectedJargonItem.zhNote}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Matching Accounting Jargon ({quickFilteredJargon.length})
                </p>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {quickFilteredJargon.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedJargonItem(item)}
                      className={`w-full text-left p-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition-all ${
                        selectedJargonItem?.id === item.id ? 'bg-indigo-50/50' : 'bg-white'
                      }`}
                    >
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900">{item.term}</p>
                        <p className="text-xs text-slate-500 truncate max-w-md">
                          {item.definition}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                          {item.zh}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">
                          AS {item.topic}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}