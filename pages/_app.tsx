import '../styles/globals.css'
import '../styles/transition.scss'
import '../styles/blog.scss'
// import 'antd/dist/antd.css'
import '/styles/antdCustom.scss'
import type { AppProps } from 'next/app'
import React, {Component, ReactElement, ReactNode} from "react";
import {NextPage} from "next";

export type NextPageWithLayout = NextPage & {
  layout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }:AppPropsWithLayout) {
  // return <Component {...pageProps} />
  const layout = Component.layout || ((page:ReactElement,props:any) => page)
  return layout(<Component {...pageProps} />,pageProps?.layoutProps)
}
export default MyApp
