import {useEffect, useRef} from "react";
import {addScript, removeScript} from "../../utils/dom";
import useLoading from "../../hooks/useLoading";
import '../../styles/components/threejs/Bingdundun.scss'
import {sleep} from "../../utils";

function initBingdundun(target,callback) {
    const scene = new THREE.Scene()
    const width = 420
    const height = 500

    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    const bddcontainer = target;
    bddcontainer.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, 0.6);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 垂直旋转角度限制
    controls.minPolarAngle = 1.24;
    controls.maxPolarAngle = 1.24;
    // 水平旋转角度限制
    controls.minAzimuthAngle = -0.38;
    controls.maxAzimuthAngle = 0.92;

    const cubeGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
    const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xdc161a});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 0, 0);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.intensity = 1;
    light.position.set(16, 16, 8);
    light.castShadow = true;
    light.target = cube;
    light.shadow.mapSize.width = 512 * 12;
    light.shadow.mapSize.height = 512 * 12;
    light.shadow.camera.top = 40;
    light.shadow.camera.bottom = -40;
    light.shadow.camera.left = -40;
    light.shadow.camera.right = 40;
    scene.add(light);

// 环境光
    const ambientLight = new THREE.AmbientLight(0xcfffff);
    ambientLight.intensity = 1;
    scene.add(ambientLight);

    const loader = new THREE.GLTFLoader();

    loader.load(
        "https://www.ttppl.xyz/file/3dmodels/bingdundun.glb",
        function (mesh) {
            mesh.scene.traverse(function (child) {
                if (child.isMesh) {
                    if (child.name === "oldtiger001") {
                        child.material.metalness = 0.5;
                        child.material.roughness = 0.8;
                    }
                    if (child.name === "oldtiger002") {
                        child.material.transparent = true;
                        child.material.opacity = 0.5;
                        child.material.metalness = 0.2;
                        child.material.roughness = 0;
                        child.material.refractionRatio = 1;
                        child.castShadow = true;
                    }
                }
            });
            mesh.scene.rotation.y = (Math.PI * 15) / 180;
            mesh.scene.position.set(0, -0.25, 0);
            scene.add(mesh.scene);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
    let stop = false
    const animate = function () {
        if (!stop) {
            requestAnimationFrame(animate);
        }
        // controls.update();
        // console.log(111)
        renderer.render(scene, camera);
    };
    animate()
    callback?.()
    return () => {
        stop = true
        // cancelAnimationFrame(animationId)
    }
}

function Bingdundun({className}) {
    const containerRef = useRef(null)
    const [loading, setLoading] = useLoading(true, containerRef, {label: '冰墩墩正在路上...'})
    useEffect(() => {
        const init = async () => {
            await addScript('/libs/threejs/three.min.js',document.body,true)
            await addScript('/libs/threejs/GLTFLoader.js', document.body,true)
            await addScript('/libs/threejs/OrbitControls.js', document.body,true)
            // await  addScript('/libs/threejs/initBingdundun.js',containerRef.current)
        }
        let stop = null
        init().then(() => {
            stop = initBingdundun(containerRef.current,() => {
                setLoading(false)
            })
        })
        return () => {
            removeScript('/libs/threejs/three.min.js')
            removeScript('/libs/threejs/GLTFLoader.js')
            removeScript('/libs/threejs/OrbitControls.js')
            stop?.()
        }
    }, [])
    return <div ref={containerRef} className={`xl-bing-dun-dun-container ${className}`}>
    </div>
}

export default Bingdundun