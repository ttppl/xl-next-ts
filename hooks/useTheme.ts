import {useCallback, useEffect, useState} from "react";
import setGlobalLoading from "../utils/libs/setGlobalLoading";
import {sleep} from "../utils";
import {getParaByKey} from "../request/modules/paraRequest";

const useTheme = (theme:string)=>{
    const [appTheme, setAppTheme] = useState(theme)
    useEffect(()=>{
        const theme = localStorage.getItem('appTheme')
        if(theme) {
            setAppTheme(theme)
        }else {
            getParaByKey('blog_default_theme').then(theme=>{
                localStorage.setItem('appTheme',theme)
                setAppTheme(theme)
            })
        }
    },[])
    useEffect(()=>{
        const theme = localStorage.getItem('appTheme')
        if(!theme||appTheme===theme) {
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
                setGlobalLoading(false)
            }
        }
    },[appTheme])
    const changeTheme = useCallback(async () => {
        setGlobalLoading(true,{label:'主题切换中...'})
        const newTheme = appTheme === 'light' ? 'dark' : 'light'
        localStorage.setItem('appTheme',newTheme)
        setAppTheme(newTheme)
    },[appTheme])
    return [appTheme,changeTheme]
}
export default useTheme
