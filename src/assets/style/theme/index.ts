export interface ITheme {
    /**标题 */
    title: string;
    /** theme css name */
    name: string;
    /**preview img path */
    preview: string;
    backgroundImage: string;
}
const defaultConfigs: Partial<ITheme>[] = [
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
// TODO: 主题加载策略优化
// 1.自动导入 style/theme/**/index.scss
// 2.取消title 从i18n (themes.[name])中取值
// 3.图片要不放在一起有点不方便,搞成 theme/[name]/img/.... webpack配置不对里面的文件打包

const themes: ITheme[] = []
const req = require.context('.', true, /\index.scss$/)
req.keys().forEach((filePath) => {
    const fileName = filePath.split('/').reverse()[1]

})
export default themes