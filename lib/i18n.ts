export type Lang = 'en' | 'zh'

const dicts = {
  en: {
    nav: {
      home: '首页',
      about: '关于我们',
      people: '团队成员',
      research: '研究方向',
      publications: '论文成果',
      news: '新闻动态',
      talks: '学术报告',
      workshops: '工作坊',
      blog: '博客文章',
      join: '加入我们',
      contact: '联系我们'
    },
    search: { placeholder: '搜索论文、成员、文章...', shortcut: '按 / 键快速聚焦' },
    filters: { role: '身份', topic: '主题', year: '年份', search: '搜索', venue: '会议', firstAuthor: '第一作者' },
    common: { upcoming: '即将开始', past: '已结束', readMore: '阅读更多', signup: '立即报名', replay: '观看回放' },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      people: '团队成员',
      research: '研究方向',
      publications: '论文成果',
      news: '新闻动态',
      talks: '学术报告',
      workshops: '工作坊',
      blog: '博客文章',
      join: '加入我们',
      contact: '联系我们'
    },
    search: { placeholder: '搜索论文、成员、文章...', shortcut: '按 / 键快速聚焦' },
    filters: { role: '身份', topic: '主题', year: '年份', search: '搜索', venue: '会议', firstAuthor: '第一作者' },
    common: { upcoming: '即将开始', past: '已结束', readMore: '阅读更多', signup: '立即报名', replay: '观看回放' },
  }
}

export function getDict(lang: Lang) { return dicts[lang] }
