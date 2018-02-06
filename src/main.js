/*=============================================
 =                   SCENE                    =
 =============================================*/
const scene   = new THREE.Scene();

/*=============================================
 =                   Camera                   =
 =============================================*/
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set( 0, 0, 1500 );
scene.add(camera);

/*=============================================
 =                   Renderer                 =
 =============================================*/
const renderer = new THREE.WebGLRenderer({antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*=============================================
 =                   OBJ                      =
 =============================================*/
let mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( './models/' );
mtlLoader.load( 'Backfire.mtl', function( materials ) {
    materials.preload();
    let loader = new THREE.OBJLoader();
    loader.setMaterials( materials );
    loader.setPath( './models/' );
    loader.load( 'Backfire.obj', function ( object ) {
        scene.add( object );
    });
});

/*=============================================
 =                   CONTROLS                 =
 =============================================*/
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
controls.autoRotate = true;
controls.enableZoom = false;

/*=============================================
 =                  Lights                    =
 =============================================*/
let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );
let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );


function animate() {
    requestAnimationFrame( animate );
    controls.update();
    scene.rotation.y +=0.1;
    render();
}

function render() {renderer.render( scene, camera );}

animate();