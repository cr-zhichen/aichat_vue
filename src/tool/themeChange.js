//定义枚举
export const Theme = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
}

//从localStorage中获取主题
import {useDark, useToggle} from "@vueuse/core";

//获取主题
export function getTheme() {
    return localStorage.getItem('vueuse-color-scheme');
}

//获取主题名称
export function getThemeName() {
    let theme = getTheme();
    switch (theme) {
        case Theme.LIGHT:
            return '浅色模式';
        case Theme.DARK:
            return '暗黑模式';
        case Theme.AUTO:
            return '跟随系统';
        default:
    }
}

//设置主题
export function setTheme(theme) {
    localStorage.setItem('vueuse-color-scheme', theme);
    const isDark = useDark();
    useToggle(isDark)
}