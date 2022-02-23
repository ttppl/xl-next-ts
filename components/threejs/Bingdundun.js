import Head from "next/head";
import {useEffect} from "react";

function Bingdundun({className}) {
    useEffect(()=>{
        const script = document.createElement('script')
        script.src = '/libs/threejs/initBingdundun.js'
        document.getElementsByTagName('head')[0].appendChild(script);
    },[])
    return <>
        <div id='bing-dun-dun' className={className}/>
        <Head>
            <script src="https://www.ttppl.xyz/file/threejs/three.min.js"/>
            <script src="https://www.ttppl.xyz/file/threejs/GLTFLoader.js"/>
            <script src="https://www.ttppl.xyz/file/threejs/OrbitControls.js"/>
            {/*<script src="/libs/threejs/initBingdundun.js"/>*/}
        </Head>
    </>
}

export default Bingdundun
