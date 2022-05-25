import Loading from "../../components/common/Loading";
import ReactDOM from 'react-dom'
import React from "react";

const GlobalLoading = {
    isLoading: false,
    container: null,
    target: null
}


export default function setGlobalLoading(show, options = {label:''}) {
    if (!GlobalLoading.container) {
        GlobalLoading.container = document.createElement('div')
        GlobalLoading.container.className = 'xl-loading-container mask'
        GlobalLoading.container.style.position='fixed'
    }
    if (!GlobalLoading.target) {
        GlobalLoading.target = document.body
    }
    if (show) {
        if(GlobalLoading.isLoading){
            return
        }
        ReactDOM.render(<Loading {...options} />, GlobalLoading.container)
        GlobalLoading.target.appendChild(GlobalLoading.container)
        GlobalLoading.isLoading=true
    } else {
        ReactDOM.unmountComponentAtNode(GlobalLoading.container)
        if (GlobalLoading.target.contains(GlobalLoading.container)) {
            GlobalLoading.target.removeChild(GlobalLoading.container)
        }
        GlobalLoading.isLoading=false
    }
}
