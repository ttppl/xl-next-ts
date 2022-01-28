import PropTypes from 'prop-types'
import React, {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import {sleep} from "../utils";

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
    beforeEnter: statusFun,
    entering: statusFun,
    entered: statusFun,
    beforeExit: statusFun
    exiting: statusFun,
    exited: statusFun
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
    const currentState = useRef('exited')
    const defaultStyles = useMemo(() => ({
        transition: `all ${duration}ms ease-in-out`,
        ...defaultStyle
    }), [defaultStyle])
    const initTransition = useRef(loadInitTransition)//是否展示初始动画
    const [myStyle, setMyStyle] = useState({display: show ? 'block' : 'none', ...defaultStyle} as any)
    const startTransition = async () => {
        if (show) {//enter
            if(initTransition.current){
                setMyStyle({...defaultStyles, ...status.beforeEnter(container.current)})
                currentState.current = 'beforeEnter'
            }else {
                setMyStyle({...defaultStyles, ...status.entered(container.current)})
                currentState.current = 'entered'
                initTransition.current=true
            }

        } else {//exit
            if(initTransition.current) {
                setMyStyle({...defaultStyles, ...status.beforeExit(container.current)})
                currentState.current = 'beforeExit'
            }else {
                setMyStyle({...defaultStyles, ...status.exited(container.current)})
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
            setMyStyle({...defaultStyles, ...status.entering(container.current)})
            currentState.current = 'entering'
        } else if (currentState.current === 'entering') {
            await sleep(duration)
            setMyStyle({...defaultStyles, ...status.entered(container.current)})
            currentState.current = 'entered'
        } else if (currentState.current === 'beforeExit') {
            await sleep(16 + delay)
            setMyStyle({...defaultStyles, ...status.exiting(container.current)})
            currentState.current = 'exiting'
        } else if (currentState.current === 'exiting') {
            await sleep(duration)
            setMyStyle({...defaultStyles, ...status.exited(container.current)})
            currentState.current = 'exited'
        }
    }
    useEffect(() => {
        const ret = changeStatus()
    }, [myStyle])
    return <div ref={container} style={myStyle}>{children}</div>
}

export default XlTransition;
