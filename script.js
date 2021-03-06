import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import {GLTFLoader} from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'https://unpkg.com/gsap@3.8.0/index.js';





// Scène
  const scene = new THREE.Scene();

  


// Caméra 75 pour l'angle de la caméra, et on prend la taille de la page, enfin les paramètre de champs de caméra
  const camera = new THREE.PerspectiveCamera(70, 1.7, 0.1, 1000);
  camera.position.setZ(30); // Positionnement de la caméra
  camera.position.setY(0);
  camera.position.setX(0);

  
  
// Light 
    // Crée une lumière à un point fixe
    const light = new THREE.DirectionalLight("rgb(220, 20, 60)", 1.5)
    light.position.x = 0;
    light.position.y =0;
    light.position.z =30;
    light.target.position.set(0,0,0);
    light.castShadow = true;

    light.shadow.mapSize.width = 2000; // default
    light.shadow.mapSize.height = 200; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 200; // default

    light.shadow.camera.top += 5; // default
    light.shadow.camera.left -= 30; // default
    light.shadow.camera.right += 30; // default
    light.shadow.camera.bottom -= 5; // default


    const light4 = new THREE.DirectionalLight("rgb(0, 75, 155)", 1.5)
    light4.position.x = -30;
    light4.position.y =0;
    light4.position.z =30;
    light4.target.position.set(0,0,0);
    light4.castShadow = true;

    light4.shadow.mapSize.width = 2000; // default
    light4.shadow.mapSize.height = 200; // default
    light4.shadow.camera.near = 0.5; // default
    light4.shadow.camera.far = 200; // default

    light4.shadow.camera.top += 5; // default
    light4.shadow.camera.left -= 30; // default
    light4.shadow.camera.right += 30; // default
    light4.shadow.camera.bottom -= 5; // default

    const light2 = new THREE.AmbientLight(0XFFFFFF, 0.1);
    


// Créer et importer un objet a partir d'un fichier gltf
  const gltfLoader = new GLTFLoader(); //Création du loader
  
  gltfLoader.load('MATTHIEU_SHOWREEL.gltf', (gltf) => {
    gltf.scene.scale.set(15,15,15);
    scene.add(gltf.scene);

    // permet d'appliquer la fonction d'ombre au objets du du fichier gltf
    gltf.scene.traverse( function( node ) {
      if ( node.isMesh ) { 
        node.castShadow = true;
        //node.receiveShadow = true;
       }

  } );
  }); 




  
window.addEventListener('resize', () =>
{
    // Update camera
    camera.updateProjectionMatrix()

    console.log(window.devicePixelRatio)

    // Update renderer
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth,  heightCanvas() );
});


// Les objet 3D sont composé d'une 'forme' (geometry), et d'un 'habillage' (material) ensemble il forme un MESH

    // Création de la forme ici un tore
      const geometry = new THREE.TorusGeometry( 1.5, 0.6, 20, 20 );
      const geometry3 = new THREE.IcosahedronBufferGeometry(1.5,0);
      const geometry4 = new THREE.CylinderBufferGeometry(0.6,0.6,2,15);
      const geometry5 = new THREE.TetrahedronBufferGeometry(1,0);
      const geometry2 =new THREE.PlaneBufferGeometry(500,150,100,100);

    // Définition de l'habillage
      // on peut spécifier la couleur de l'objet ici
      const material = new THREE.MeshPhongMaterial();
      const material2 = new THREE.MeshPhongMaterial();

      material.metalness = 0.5;
      material.shininess = 30;
      material.color = new THREE.Color("rgb(250, 250, 250)")



      material2.metalness = 0.6;
      material2.shininess = 30;
      material2.color = new THREE.Color("rgb(200, 220, 200)")

    const object = [];

    // Création du MESH avec comme paramètre la forme et l'habillage
      
      const plane = new THREE.Mesh(geometry2,material2);
      plane.receiveShadow = true;

      plane.position.x = 0;
      plane.position.y =30;
      plane.position.z =-45;
  
    for(var i=0; i< 13;i++){
      for(var x=3;x<=5;x++){
        const scaleNumb = Math.floor(Math.random()*3)+0.8;
        
        var formeDeco = new THREE.Mesh(eval('geometry'+x),material);
        formeDeco.scale.set(scaleNumb,scaleNumb,scaleNumb);

        var positionZ = Math.floor(Math.random() * -20) + -15;

        do {
          var positionX = Math.floor(Math.random() * 160) + -80;
          var positionY = Math.floor(Math.random() * 80) + -40;
        } while ( (positionX > -5 && positionX < 5) || (positionY > -10 && positionY < 28) ); 


        formeDeco.position.x = positionX;
        formeDeco.position.y = positionY;
        formeDeco.position.z = positionZ;
        formeDeco.rotation.x = (Math.random()*10);
        formeDeco.rotation.y = (Math.random()*15);
        formeDeco.userData.clicable = true;
        formeDeco.userData.speed = false;
        scene.add(formeDeco);
        object.push(formeDeco);
      }
    };
    
//Création du renderer, sorte de container qui affiche la scene 3D et qui est relier au canvas que nous avons créé en HTML
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg'),
    antialias : true,
  });

  console.log();

  // On définie la taille 
  renderer.setPixelRatio( window.devicePixelRatio );

  
  const heightCanvas = () =>{
    if(window.innerWidth/window.innerHeight <=1){
      return window.innerWidth;
    }else{
      return window.innerHeight;
    }
  };

  

  renderer.setSize( window.innerWidth, heightCanvas() );

  

  // Mettre des ombres
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMapSoft = true;
 
scene.add(light);
scene.add(plane);
scene.add(light2);
scene.add(light4);
scene.rotateX(-0.2);




const mouse =new THREE.Vector2();
const raycaster = new THREE.Raycaster();

const easeInOutCirc = (nombre)=>{
  if(nombre < 0.5){
    return (1 - Math.sqrt(1 - Math.pow(2 * nombre, 2))) / 2;
  }else{
    return (Math.sqrt(1 - Math.pow(-2 * nombre + 2, 2)) + 1) / 2;
  }
}

window.addEventListener('mousemove',e=>
{
  let mouseX = easeInOutCirc(e.clientX/window.innerWidth);
  light.position.x = 30 -(mouseX*60 );
  light4.position.x = -30 +(mouseX *60);
});

document.getElementById('myRange').addEventListener('input',e=>{
  let mouseX = easeInOutCirc((document.getElementById('myRange').value/100));
  light.position.x = 30 -(mouseX*60 );
  light4.position.x = -30 +(mouseX *60);
})



window.addEventListener('mousemove', onMouseHover);

function onMouseHover(event){

  mouse.x =(event.clientX/window.innerWidth)*2-1;
  mouse.y = -(event.clientY/window.innerHeight)*2+1;

  raycaster.setFromCamera(mouse,camera);
  var intersects = raycaster.intersectObjects(scene.children);

  for(let i=0; i<intersects.length; i++){

    if(intersects[i].object.userData.clicable){
      let tl = gsap.timeline()
      tl.to(intersects[i].object.rotation,{z:2, duration :1});
    }
  };
};
  
function animate(){
  requestAnimationFrame(animate);
  for ( let i = 0, il = object.length; i < il; i ++ ) {

    if(object[i].userData.speed){
      object[i].rotation.x += 0.02;
      object[i].rotation.y += 0.06;
    }
    else{
      object[i].rotation.x += 0.003;
      object[i].rotation.y += 0.01;
    };
  }
  
  renderer.render(scene, camera);
}

animate(); 
