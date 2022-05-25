import {useCallback, useEffect, useState} from "react";
import setGlobalLoading from "../utils/libs/setGlobalLoading";
import {sleep} from "../utils";

const useTheme = (theme:string)=>{
    const [appTheme, setAppTheme] = useState(theme)
    useEffect(()=>{
        const themeVars = require(`/theme/${appTheme}Theme.js`).default
        // 修复切换背景图时出现的“白色闪屏”现象
        let img = new Image();
        img.src = `/imgs/${appTheme}-bg.jpg`;
        img.onload = function () {
            document.body.style.backgroundImage = "url(" + img.src + ")";
            Object.keys(themeVars).forEach((item) => {
                document.documentElement.style.setProperty(
                    `--${item}`,
                    themeVars[item]
                );
            });
            setGlobalLoading(false,{})
        }
    },[appTheme])
    const changeTheme = useCallback(async () => {
        setGlobalLoading(true,{label:'主题切换中...'})
        const newTheme = appTheme === 'light' ? 'dark' : 'light'
        setAppTheme(newTheme)
    },[appTheme])
    return [appTheme,changeTheme]
}
export default useTheme
