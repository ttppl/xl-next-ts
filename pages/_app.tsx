import '../styles/globals.css'
import '../styles/transition.scss'
import '../styles/blog.scss'
// import 'antd/dist/antd.css'
import '/styles/antdCustom.scss'
import type {AppProps} from 'next/app'
import React, {Component, ReactElement, ReactNode, useEffect} from "react";
import {NextPage} from "next";

export type NextPageWithLayout = NextPage & {
    layout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
    useEffect(() => {
        if (!("fontDisplay" in document.body.style)) {
            if ("fonts" in document) {
                document.fonts.load("1em font-xk").then(()=>{
                    document.documentElement.classList.add('font-xk-loaded')
                });
            }
        }else {
            document.documentElement.classList.add('font-display-supported')
        }
    }, [])
    // return <Component {...pageProps} />
    const layout = Component.layout || ((page: ReactElement, props: any) => page)
    return layout(<Component {...pageProps} />, pageProps?.layoutProps)
}

export default MyApp
