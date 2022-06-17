import {LayoutContext} from "../components/layouts/main";
import {RefObject, useContext, useEffect} from "react";

interface LayoutProvider {
    logoClickCallback: RefObject<Array<Function>>,
    logoRef:RefObject<HTMLElement>
}

export default function useLogoClick(callback: Function, deps?: Array<any>) {
    const layoutContext = useContext(LayoutContext) as unknown as LayoutProvider
    const logoClickCallback = layoutContext.logoClickCallback.current as Array<Function>
    useEffect(() => {
        logoClickCallback.push(callback)
        return () => {
            logoClickCallback.splice(logoClickCallback.findIndex(c => c === callback), 1)
        }
    }, deps)
    return {logoRef:layoutContext.logoRef}
}
