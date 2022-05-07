import React, {useMemo, useRef} from "react";
import {getElementSize} from "../../utils/dom";
import XlTransition from "./XlTransition";

Collapse.defaultProps = {
    show: false
}

function Collapse({show, children}) {
    const height = useRef(0)
    const transitions = useMemo(() => ({
        beforeEnter: (el) => {
            height.current = getElementSize(el).height
            return {overflow: 'hidden', height: 0}
        },
        entering: () => {
            return {overflow: 'hidden', height: height.current}
        },
        entered: () => {
            return {}
        },
        beforeExit: (el) => {
            height.current = getElementSize(el).height
            return {overflow: 'hidden', height: height.current}
        },
        exiting: () => {
            return {overflow: 'hidden', height: 0}
        },
        exited: () => {
            return {display: 'none'}
        },
    }), [height])
    return <XlTransition show={show}
                         defaultStyle={{transition: 'height 300ms ease-in-out'}}
                         status={transitions}
    >
        {children}
    </XlTransition>
}

export default Collapse
