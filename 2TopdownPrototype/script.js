function loaded() {
	'use strict';
	var instances = [];
	var requiredImages = 0;
	var doneImages = 0;
	var images = [];
	var game = [];
	var d = [];
	d.toggle = false;
	game.backgroundCanvas = document.getElementById("backgroundCanvas");
	game.mainCanvas = document.getElementById("mainCanvas");
	game.guiCanvas = document.getElementById("guiCanvas");
	game.mainContext = game.mainCanvas.getContext("2d");
	instances.player = {};
	function init() {
		loop();
		instances.player = {
			hidden: false,
			type: "color",
			display: "red",
			canvas: game.mainCanvas,
			context: game.mainContext,
			movement:true,
			x: 0,
			y: 10,
			width: 32,
			height: 32,
			UUID: "26aafe25-fb0d-49f1-a288-571b159e9a39",
			arrows: true,
			arrowsPressed: {
				left: "goLeft",
				up: "goUp",
				right:"goRight",
				down:"goDown"
			},
			customKeys: [
				{
					keyCode: 73, //Key: I
					action: function() { //Gets called when key is pressed
						instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").x-=2;
						instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").y-=2;
					}
				},
				{
					keyCode: 66,
					time: "single", //multi/single
					action: function() {
						if(d.toggle) {
							instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").type="color";
							instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").display="orange";
							d.toggle = false;
						} else {
							d.toggle = true;
							instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").type="image";
							instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").display=images[4];
						}
						
					}
				}
			],
			speed: 4
		};
		newInstance(instances.player);
	}
	
	function loop() {
		
		window.requestAnimFrame(function() {
			loop();
		});
		update();
		render();
	}
	function update() {
		autoClearConsole(500);
		autoRefresh(20000);
		instanceLogic(instances.player);
	}
	function render() {
		clearCanvas(game.backgroundCanvas);
		clearCanvas(game.mainCanvas);
		clearCanvas(game.guiCanvas);
		drawInstance(instances.player);
	}
	function initImages(paths) {
		requiredImages = paths.length;
		for(var i in paths) {
			var img = new Image();
			img.src = paths[i];
			images[i] = img;
			images[i].onload = function() {
				doneImages++;
				if(doneImages >= requiredImages) {
					init();
				}
			};
		}
	}
	
	initImages(["crate.png", "crate2.png", "gradient.png","devtexture.png","devtexture2.png","devtexture3.png","devtexture4.png"]);
}



loaded();