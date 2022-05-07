import PropTypes from 'prop-types'
import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {sleep} from "../../utils";
import {isFunction} from "../../utils/check";

XlTransition.defaultProps = {
    show: false,
    delay: 0,
    duration: 300,
    defaultStyle: {},
    status: {},
    loadInitTransition:false
}
XlTransition.propTypes = {
    show: PropTypes.bool,
    delay: PropTypes.number,
    duration: PropTypes.number,
    defaultStyle: PropTypes.object,
    status: PropTypes.object,
    loadInitTransition:PropTypes.bool
}
type statusFun = (node: HTMLElement | null) => object

interface Status {
    beforeEnter: statusFun|any,
    entering: statusFun|any,
    entered: statusFun|any,
    beforeExit: statusFun|any
    exiting: statusFun|any,
    exited: statusFun|any
}

interface TransitionProps {
    show: boolean,
    delay: number,
    duration: number,
    defaultStyle: object,
    status: Status,
    loadInitTransition:boolean,
    children: ReactNode
}

function XlTransition({show, delay, duration, children, defaultStyle, status,loadInitTransition}: TransitionProps) {
    const container = useRef(null)
    const currentState = useRef(show?'entered':'exited')
    const defaultStyles = useMemo(() => ({
        transition: `all ${duration}ms ease-in-out`,
        ...defaultStyle
    }), [defaultStyle])
    const initTransition = useRef(loadInitTransition)//是否展示初始动画
    const [myStyle, setMyStyle] = useState({display: show ? 'block' : 'none', ...defaultStyle} as any)
    const startTransition = async () => {
        if (show) {//enter
            if(initTransition.current){
                setMyStyle({...defaultStyles, ...(isFunction(status.beforeEnter)?status.beforeEnter(container.current):status.beforeEnter)})
                currentState.current = 'beforeEnter'
            }else {
                setMyStyle({...defaultStyles, ...(isFunction(status.entered)?status.entered(container.current):status.entered)})
                currentState.current = 'entered'
                initTransition.current=true
            }

        } else {//exit
            if(initTransition.current) {
                setMyStyle({...defaultStyles, ...(isFunction(status.beforeExit)?status.beforeExit(container.current):status.beforeExit)})
                currentState.current = 'beforeExit'
            }else {
                setMyStyle({...defaultStyles, ...(isFunction(status.exited)?status.exited(container.current):status.exited)})
                currentState.current = 'exited'
                initTransition.current=true
            }
        }
    }
    useEffect(() => {
        const ret = startTransition()
    }, [show])
    const changeStatus = async () => {
        if (currentState.current === 'beforeEnter') {
            await sleep(16 + delay)//浏览器每一帧绘制需要16ms时间
            setMyStyle({...defaultStyles, ...(isFunction(status.entering)?status.entering(container.current):status.entering)})
            currentState.current = 'entering'
        } else if (currentState.current === 'entering') {
            await sleep(duration)
            setMyStyle({...defaultStyles, ...(isFunction(status.entered)?status.entered(container.current):status.entered)})
            currentState.current = 'entered'
        } else if (currentState.current === 'beforeExit') {
            await sleep(16 + delay)
            setMyStyle({...defaultStyles, ...(isFunction(status.exiting)?status.exiting(container.current):status.exiting)})
            currentState.current = 'exiting'
        } else if (currentState.current === 'exiting') {
            await sleep(duration)
            setMyStyle({...defaultStyles, ...(isFunction(status.exited)?status.exited(container.current):status.exited)})
            currentState.current = 'exited'
        }
    }
    useEffect(() => {
        changeStatus()
    }, [myStyle])
    return <div ref={container} style={myStyle}>{children}</div>
}

export default XlTransition;
