/**
 * 自动扫描并引入所有已安装主题目录下的 CSS 样式。
 * 样式由各自主题的 [data-theme='xxx'] 作用域隔离，删除某个主题文件夹时自动不引入其样式。
 */
import.meta.glob(['./*/*.css', './*/**/*.css', '!./*/seed/**'], { eager: true });

