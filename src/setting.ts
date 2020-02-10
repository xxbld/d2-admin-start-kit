import { ITheme } from './store/modules/d2admin/modules/theme'

const baseUrl = process.env.BASE_URL
function getThemePng(path: string, match: string, needDefault = false) {
  let png: any = undefined
  const subPath = path.replace('./', '').replace('index.scss', `img/${match}`)
  try {
    png = require('./assets/style/theme/' + subPath + '.png')
    // 如果是url 加上baseurl
  } catch (error) {
    // default bg preview
    if (needDefault) {
      png = `${baseUrl}image/theme/default/${match}.png`
    }
  }
  return png
}
// TODO: title 可以考虑从国际化配置中读取
// 有的主题提供多张可选背景??
const keyName = {
  'bzh': '标准化',
  'd2': 'd2admin 经典',
  'violet': '紫罗兰',
  'line': '简约线条',
  'star': '流星',
  'tomorrow-night-blue': 'Tomorrow Night Blue (vsCode)',
}

function getThemes() {
  const themes: ITheme[] = []
  const files = require.context('./assets/style/theme', true, /index.scss$/)
  files.keys().forEach((path) => {
    const arr = path.split('/')
    if (arr.length === 3) {
      const themeKey = arr[arr.length - 2]
      themes.push({
        title: keyName[themeKey] || themeKey,
        name: themeKey,
        backgroundImage: getThemePng(path, 'bg'),
        preview: getThemePng(path, 'preview@2x', true),
        // TODO: logo 深色、浅色两套就够了
        logo: getThemePng(path, 'logo-all', true),
        logoMini: getThemePng(path, 'logo-icon-only', true),
      })
    }
  })
  return themes;
}
const themes = getThemes()

export default {
  // 快捷键
  // 支持快捷键 例如 ctrl+shift+s
  hotkey: {
    search: {
      open: 's',
      close: 'esc'
    }
  },
  // 侧边栏默认折叠状态
  menu: {
    asideCollapse: false
  },
  // 在读取持久化数据失败时默认页面
  page: {
    opened: [
      {
        name: 'index',
        fullPath: '/index',
        meta: {
          title: '首页',
          auth: false
        }
      }
    ]
  },
  // 菜单搜索
  search: {
    enable: true
  },
  // 注册的主题
  theme: {
    list: themes
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  }
}
