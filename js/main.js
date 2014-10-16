var drawBox = function(items){
	THREE.ImageUtils.crossOrigin = "";
	var scene = new THREE.Scene();
	//var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
   // camera
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = -45;
    camera.position.z = 40;
    camera.rotation.x = 45 * (Math.PI / 180);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	var geometry = new THREE.BoxGeometry(1,1,1);
	// material
	//console.log(items);
	//console.log(items.currentImage.imageUrl);
	THREE.ImageUtils.crossOrigin = "anonymous"
	var proxyUrl="php/proxy.php?pic="+encodeURIComponent(items.currentImage.imageUrl);
	//console.log(proxyUrl);
	// var material = new THREE.MeshLambertMaterial({
	//     //map: THREE.ImageUtils.loadTexture(proxyUrl)
	//     map: THREE.ImageUtils.loadTexture({color: 0x00ff00})
 //      });
    var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(proxyUrl)});
	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	//plane
	var plane = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), material);
    plane.overdraw = true;
    scene.add(plane);

	//camera.position.z = 5;
	
	function render() {
		requestAnimationFrame(render);
		cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
		renderer.render(scene, camera);
	}
	 render();
 	
}

//get Image
var getImage = function(){
var thisURL = "http://scrapi.org/search/spoon" ;

	//run the ajax call and load weather on success
	$.ajax({
		url : thisURL,
		dataType : "json",
		success : function(response) {
			//loadWeather(response);
			//var objectURL=[];	
			var objectURL=response.collection.items[0].href;
			for (i=0; i<response.collection.items.length;i++)
			{
				console.log(response.collection.items[i].href);

			
	        //console.log(response.collection.items.length);	
	        $.ajax({
	        	//url : objectURL,
	        	url:response.collection.items[i].href,
	        	dataTypr:"json",
                success:function(items){
                drawBox(items);
               //$('body').load(items.currentImage.imageUrl);
               var proxyUrl="php/proxy.php?pic="+encodeURIComponent(items.currentImage.imageUrl);
               console.log(proxyUrl);
               //$('body').prepend($('<img>',{id:'theImg',src:proxyUrl}));
            }
	        });	
	    }
		}
	});


};

var init = function(){
	getImage();
}
$( document ).ready(function() {

    init();
   
});