interface ITheme {
  title: string;
  name: string;
  logo: any;
  logoMini: any;
  backgroundImage?: any;
  preview?: any;
}
function getThemePng(path: string, match: string, needDefault = false) {
  let png: any = undefined
  const baseUrl = process.env.BASE_URL
  const subPath = path.replace('./', '').replace('index.scss', `img/${match}`)
  try {
    png = require('./assets/style/theme/' + subPath + '.png')
    // 如果是url 加上baseurl
  } catch (error) {
    // default bg preview
    if (needDefault) {
      png = `${baseUrl}image/theme/default/${subPath}.png`
    }
  }
  return png
}
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
        title: keyName[themeKey],
        name: themeKey,
        backgroundImage: getThemePng(path, 'bg'),
        preview: getThemePng(path, 'preview@2x', true),
        logo: getThemePng(path, 'logo-all', true),
        logoMini: getThemePng(path, 'logo-icon-only', true),
      })
    }
  })
  return themes;
}
const themes = getThemes()
console.log(themes)

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
    list: [
      {
        title: '标准化',
        name: 'bzh',
        backgroundImage: 'image/theme/bzh/bg.png',
        preview: 'image/theme/bzh/preview@2x.png'
      },
      {
        title: 'd2admin 经典',
        name: 'd2',
        preview: 'image/theme/d2/preview@2x.png'
      },
      {
        title: '紫罗兰',
        name: 'violet',
        preview: 'image/theme/violet/preview@2x.png'
      },
      {
        title: '简约线条',
        name: 'line',
        backgroundImage: 'image/theme/line/bg.jpg',
        preview: 'image/theme/line/preview@2x.png'
      },
      {
        title: '流星',
        name: 'star',
        backgroundImage: 'image/theme/star/bg.jpg',
        preview: 'image/theme/star/preview@2x.png'
      },
      {
        title: 'Tomorrow Night Blue (vsCode)',
        name: 'tomorrow-night-blue',
        preview: 'image/theme/tomorrow-night-blue/preview@2x.png'
      }
    ]
  },
  // 是否默认开启页面切换动画
  transition: {
    active: true
  }
}
