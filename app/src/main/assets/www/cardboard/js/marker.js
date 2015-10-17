 //////////////
 // Three.js //
 //////////////

 renderer = new THREE.WebGLRenderer({alpha: true});
 renderer.setSize( window.innerWidth, window.innerHeight );
 scene = new THREE.Scene();
 var vFOV = 90;
 var aspectRatio = window.innerWidth/ (window.innerHeight * 0.5); // 0.5 corresponds to renderer height being set to 50%
 camera = new THREE.PerspectiveCamera(vFOV, aspectRatio, 0.1, 1000);
 scene.add(camera);
 camera.position.z = 5;

 //cross hairs
 var horizontal = new THREE.BoxGeometry( .5, .05, .1 );
 var vertical = new THREE.BoxGeometry( .05, .5, .1 );
 var material = new THREE.MeshBasicMaterial( {color: 0x00ff00, transparent: true, opacity: 0.4} );
 var horizontalBox = new THREE.Mesh( horizontal, material );
 var verticalBox = new THREE.Mesh( vertical, material );
 scene.add( horizontalBox );
 scene.add( verticalBox );

 effect = new THREE.StereoEffect(renderer);
 effect.setSize( window.innerWidth, window.innerHeight );
 effect.separation = 0;
 renderer.domElement.style.top = '30%';
 renderer.domElement.style.height = '50%';
 document.body.appendChild( renderer.domElement );

 function render() {
	requestAnimationFrame( render );
	effect.render(scene, camera);
	TWEEN.update();
 }
 render();

 function setOrientationControls(e) {
    if (!e.alpha) {
        return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.noZoom = true;
    controls.noPan = true;
    controls.connect();
    controls.update();
 }
 // Only used if we want three.js elements to move with head orientation
 //window.addEventListener('deviceorientation', setOrientationControls, true);

 function animateCoords(x, y, color){
    console.log(color);
    var torus = buildMarker(color);
    animateMarker(torus, {x: x, y: y, z: 0});
 }

  function buildMarker(color){
     var geometry = new THREE.TorusGeometry( 1, .2, 16, 100 );
     var material = new THREE.MeshBasicMaterial( { transparent: true, opacity: 1.0, color: new THREE.Color( color ) } );
     var torus = new THREE.Mesh( geometry, material );
     scene.add( torus );

     torus.position.x = 0;
     torus.position.y = 10;

     return torus;
  }

  function animateMarker(torus, posVector){
      var tween1 = new TWEEN.Tween({scale: 7, x: 0, y: 10})
          .to({scale: .2 , x: posVector.x, y: posVector.y}, 250)
          .easing(TWEEN.Easing.Quadratic.Out)
          .onUpdate(function(){
              torus.scale.set(this.scale, this.scale, this.scale);
              torus.position.x = this.x;
              torus.position.y = this.y;
          });
      var tween2 = new TWEEN.Tween({opacity: 1})
          .to({opacity: 0}, 2000)
          .delay(3000)
          .onUpdate(function(){
              torus.material.opacity = this.opacity;
          })
          .onComplete(function(){
              scene.remove(torus);
          });
      tween1.chain(tween2);
      tween1.start();
  }

 ///////////////////////////////////////////////////////////////
 // VIDEO (Not currently used. Using HTML video elems instead)//
 ///////////////////////////////////////////////////////////////

// video = $( 'localVideo' );
//
// videoImage = $( 'videoImage' );
// videoImageContext = videoImage.getContext( '2d' );
// // Background color if no video present
// videoImageContext.fillStyle = '#000000';
// videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

// videoTexture = new THREE.Texture( videoImage );
// videoTexture.minFilter = THREE.LinearFilter;
// videoTexture.magFilter = THREE.LinearFilter;

// var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
// // The geometry on which the movie will be displayed;
// // Movie image will be scaled to fit these dimensions.
// var movieGeometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight, 1, 1 );
// var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
// movieScreen.position.set(0,50,0);
// scene.add(movieScreen);

// camera.position.set(0,50,200);
// camera.lookAt(movieScreen.position);