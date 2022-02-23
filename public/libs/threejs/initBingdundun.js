var scene = new THREE.Scene();
// scene.rotation.y = -Math.PI / 3;
// scene.position.set(-0.02, -0.2,0);
const centerX = 0
const centerY = 0
const centerZ = 0
const width = 400,
    height = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
const bddcontainer = document.getElementById("bing-dun-dun");
bddcontainer.appendChild(renderer.domElement);

// var axes = new THREE.AxesHelper(10);
// scene.add(axes);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0,0.2,0.6);
// camera.position.z=100
// camera.up.set(0,0,1)
camera.lookAt(centerX,centerY,centerZ);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(centerX,centerY,centerZ);
// controls.autoRotate = true
// controls.enableDamping = true;
// controls.enablePan = false;
// controls.enableZoom = false;
// // 垂直旋转角度限制
// controls.minPolarAngle = 1.4;
// controls.maxPolarAngle = 1.8;
// // 水平旋转角度限制
// controls.minAzimuthAngle = -0.6;
// controls.maxAzimuthAngle = 0.6;

const cubeGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xdc161a });
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

var loader = new THREE.GLTFLoader();

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
        mesh.scene.rotation.y = (Math.PI * 25) / 180;
        const size = 2
        mesh.scene.position.set(0, -0.25, 0);
        // mesh.scene.scale.set(size,size,size);
        scene.add(mesh.scene);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();
