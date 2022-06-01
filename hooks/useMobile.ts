import {useEffect, useState} from "react";
import {checkDevice} from "../utils/check";
import EventManager from "../utils/libs/EventManager";
import debounce from "lodash/debounce";
function useMobile(){
    const [isMobile,setIsMobile] = useState(false)
    useEffect(()=>{
        setIsMobile(checkDevice()==='mobile')
        const resizeListener = EventManager.addListener(window,'resize',debounce((e)=>{
            if(window.innerWidth<900){
                setIsMobile(true)
            }else {
                setIsMobile(false)
            }
        },300,{leading:true}))
        return ()=>{
            EventManager.removeListenerRS(resizeListener)
        }
    },[])
    return {isMobile}
}

export default useMobile
