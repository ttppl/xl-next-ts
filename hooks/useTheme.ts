import {useCallback, useEffect, useState} from "react";

const useTheme = (theme:string)=>{
    const [appTheme, setAppTheme] = useState(theme)
    useEffect(()=>{
        const themeVars = require(`/theme/${appTheme}Theme.js`).default
        Object.keys(themeVars).forEach((item) => {
            document.documentElement.style.setProperty(
                `--${item}`,
                themeVars[item]
            );
        });
        document.body.style.color = themeVars['base-color']
        // 修复切换背景图时出现的“白色闪屏”现象
        let img = new Image();
        img.src = `/imgs/${appTheme}-bg.jpg`;
        img.onload = function () {
            document.body.style.backgroundImage = "url(" + img.src + ")";
        }
        // document.body.style.background = `url(/imgs/${appTheme}-bg.jpg) no-repeat`
    },[appTheme])
    const changeTheme = useCallback(() => {
        const newTheme = appTheme === 'light' ? 'dark' : 'light'
        setAppTheme(newTheme)
    },[appTheme])
    return [appTheme,changeTheme]
}
export default useTheme
