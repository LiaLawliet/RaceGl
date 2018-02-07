class Vehicules{
	constructor(geo, mat) {
		this.mesh = new THREE.Mesh(geo, mat);
		scene.add(this.mesh);
	}

	update(){
		this.mesh.translateZ(40);

		if (this.mesh.position.z > camera.position.z) {
			this.mesh.position.z = getRandomInt(-20000) - 19000;
			this.mesh.position.x = getRandomInt(4000) - 2000;
		}
	}

	spawn(){
		this.mesh.position.set(getRandomInt(4000) - 2000, 0, getRandomInt(-20000));
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random()* Math.floor(max))
}

let geometry = new THREE.BoxGeometry( 300, 300, 300 );
let material = new THREE.MeshPhongMaterial(0x666666);

let vehicules = [];

for (var i = 0; i < 10; i++) {
	let vehicule = new Vehicules(geometry, material);
	vehicules.push(vehicule);
}

function render() {
	for (var i = 0; i < 10; i++) {
		vehicules[i].update();
	}
	renderer.render(scene, camera);
}