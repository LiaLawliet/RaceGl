let BackfireMaterials;
let BackfireObject;
let Backfire;
let speed={x:0, y:0, z:0};
let step=0.1;

/*=============================================
 =                   SCENE                    =
 =============================================*/
const scene  = new THREE.Scene();

/*=============================================
 =                   Camera                   =
 =============================================*/
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 20000 );
scene.add(camera);

/*=============================================
 =                   Renderer                 =
 =============================================*/
const renderer = new THREE.WebGLRenderer({antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/*=============================================
 =                  OBJ  MTL                  =
 =============================================*/
/*var objLoader = new THREE.OBJLoader();
objLoader.setPath('./models/');
objLoader.load('Backfire.obj', function (object) {
    console.log(object);
    BackfireObject = object;
});

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( './models/' );
mtlLoader.load( 'Backfire.mtl', function( materials ) {
    console.log(materials);
    materials.preload();
    BackfireMaterials = materials;
*/




let mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath( './models/' );
mtlLoader.load( 'Backfire.mtl', function( materials ) {
    materials.preload();
    let loader = new THREE.OBJLoader();
    loader.setMaterials( materials );
    loader.setPath( './models/' );
    loader.load( 'Backfire.obj', function ( object ) {
        Backfire = object;
        //Backfire.rotateY(1.5);
        scene.add( Backfire );
        animate();
    });
});

//

/*=============================================
 =                   CONTROLS                 =
 =============================================*/
/*controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
//controls.autoRotate = true;
controls.enableZoom = false;*/

/*=============================================
 =                  Lights                    =
 =============================================*/
let ambientLight = new THREE.AmbientLight( 0xcccccc, 1 );
scene.add( ambientLight );
let pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function animate() {
    requestAnimationFrame( animate );
    stats.begin();
    //controls.update();
    camera.position.set(Backfire.position.x , 500, Backfire.position.z + 1600 );
    //Backfire.position.z -= 5;
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 39) {
            speed.x += step;
            //Backfire.position.x += 0.15;
        } else if (keyCode == 37) {
            speed.x -= step;
            //Backfire.position.x -= 0.15;
        }
    };
    Backfire.position.x += speed.x;
    render();
    stats.end();
}
