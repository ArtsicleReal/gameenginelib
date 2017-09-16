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
	game.backgroundContext = game.backgroundCanvas.getContext("2d");
	instances.player = {};
	instances.wall = {};
	instances.map = {};
	instances.ai = {};
	function init() {
		loop();
		instances.ai = {
			UUID: "ce623a91-335f-4d69-a0a6-1b46401d409f",
			hidden: false,
			type: "color",
			display: "red",
			objectType: "ai",
			x: 40,
			y: 40,
			width: 5,
			height: 5,
			canvas: game.mainCanvas,
			context: game.mainContext,
			aiDelay: 100, //Delay between ai commands being called, has to be biggerthan 1, if it's 1 or less nothing will happen. 100=1 sec
			aiVar: 0, //aiVar is needed since the engine interacts with this. Set it to 0 always
			aiDone: false, //aiDone is needed since the engine interacts with this. Set it to false always
			collision: true,
			aiDo: function() {
				d.toggle = !d.toggle;	
			}, //aiDo is needed since the engine interacts with this. Set it to function(){}
			mouseEvents: [
				{
					type: "mouseup",
					do: function() {
						instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x = mousePos(game.mainCanvas, "x");
						instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y = mousePos(game.mainCanvas, "y");
						log(mousePos(game.guiCanvas,"x"));
						log(instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x + " " + instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y);
						log(mousePos(game.guiCanvas,"y"));
					}
				}
			],
			aiCommands: [
				{
					minChance: 1,
					maxChance: 5,
					chance: 1, //If the random number between 1 and 5 is 1, then activate the do function. This variable can be any number inbetween your min/max
					do: function() {
						if(instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x >= 0 + instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").width/2) {
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x-=instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed;
						}
						
					},
					cmd: true //Should this command be used, or should it not be used
				},
				{
					minChance: 1,
					maxChance: 5,
					chance: 1,
					do: function() {
						if(instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y >= 0) {
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y -= instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed;
						}
					},
					cmd: true
				},
				{
					minChance: 1,
					maxChance: 5,
					chance: 1,
					do: function() {
						if(instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y >= 0 && instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x >= 0 + instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").width/2) {
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y -= instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed;
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x-=instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed;
						}
					},
					cmd: true
				},
				{
					minChance: 1,
					maxChance: 5,
					chance: 1,
					do: function() {
						if(instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y <= game.mainCanvas.height-instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").height) {
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y += instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed;
						}
					},
					cmd: true
				},
				{
					minChance: 1,
					maxChance: 5,
					chance: 1,
					do: function() {
						if(instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x <= game.mainCanvas.width-instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").width) {
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x += instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed;
						}
					},
					cmd: true
				},
				{
					minChance: 1,
					maxChance: 5,
					chance: 1,
					do: function() {
						if(instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x <= game.mainCanvas.width-instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").width && instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y <= game.mainCanvas.height-instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").height) {
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").x += instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed;
							instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").y += instanceGetter("ce623a91-335f-4d69-a0a6-1b46401d409f").speed; //Use speed if you want to have collision
						}
					},
					cmd: true
				}
			],
			speed: 2
		};
		instances.wall = {
			UUID: "909ffc85-fdb6-47a7-92ef-917ecc5745d8",
			hidden: false,
			type: "image",
			display: images[2],
			objectType: "wall",
			x: 64,
			y: 64,
			width: 64,
			height: 64,
			canvas: game.mainCanvas,
			context: game.mainContext
		};
		instances.map = {
			UUID: "469ec721-815a-4571-b008-ff217dd7bbad",
			hidden: true,
			objectType: "tilemap", //Tilemaps do not need a "type"/"display"
			x: 100,
			y: 100,
			tileSize: 32,
			numbers: [
				{
					number: 0,
					type: "color",
					display: "green",
					collision: false
				},
				{
					number: 1,
					type: "image",
					display: images[4],
					collision: false
				},
				{
					number: 2,
					type: "image",
					display: images[3],
					collision: true
				},
				{
					number: 3,
					type: "color",
					display: "white",
					collision: true
				}
			],
			map: [
				[1,1,3,3,3,1,1,1],
				[0,1,1,1,1,1,1,2]
			],
			canvas: game.backgroundCanvas,
			context: game.backgroundContext,
			
		};
		instances.player = {
			hidden: false, //true/false
			type: "color", //color/image
			display: "black", //color(red,green,yellow,etc)/imagevariable
			objectType:"player", //Needed for collision
			collision: true, //Have the player collide with object types that are "wall", or "custom" with the "wall" property
			canvas: game.mainCanvas, //canvas var
			context: game.mainContext, //context var
			movement:true, //can move or not with arrowspressed/wasd pressed
			x: 10, //starting x
			y: 10, //starting y
			width: 32, //starting width
			height: 32, //starting height
			UUID: "26aafe25-fb0d-49f1-a288-571b159e9a39", //uuid, get one from https://www.uuidgenerator.net and put your random one there
			arrows: true, //move from arrows?
			arrowsPressed: { //yes
				left: "goLeft", //goLeft/goUp/goRight/goDown
				up: "goUp", //goLeft/goUp/goRight/goDown
				right:"goRight", //goLeft/goUp/goRight/goDown
				down:"goDown" //goLeft/goUp/goRight/goDown
			},
			customKeys: [
				{
					keyCode: 73, //Key: I
					time:"multi", //On press get fired multiple times (Use for movement)
					action: function() { //Gets called when key is pressed
						instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").x-=2;
						instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").y-=2;
					}
				},
				{
					keyCode: 66, //Key: B
					time: "single", //multi/single
					key: "keyup", //keyup/keydown, if down then single will repeat multiple times when held down forawhile, if up then its one time on key up. Only affects you if time = single, multi doesnt matter
					action: function() {
						if(d.toggle) { //D.toggle is my custom var, not part of the engine
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
			speed: 2,
			loops: [
				//Name these functions whatever you want, they'll be called nomatter what, as long as the "instanceLogic(instance)" statement is being called in a loop.
				function update58912() {
					if(instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").x <= 0) {
						instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").x += instanceGetter("26aafe25-fb0d-49f1-a288-571b159e9a39").speed;
					}
				}
			]
		};
		newInstance(instances.player);
		//newInstance(instances.wall);
		newInstance(instances.map);
		newInstance(instances.ai);
	}
	
	function loop() {
		
		window.requestAnimFrame(function() {
			loop();
		});
		update();
		render();
	}
	
	
	
	
	
	
	
	
	
	
	function update() {
		
		autoClearConsole(1000); //100 = 1 Second
		autoRefresh(20000); //100 = 1 Second
		instanceLogic(instances.player);
		//instanceLogic(instances.wall);
		instanceLogic(instances.map);
		instanceLogic(instances.ai);
	}
	function render() {
		clearCanvas(game.backgroundCanvas);
		clearCanvas(game.mainCanvas);
		clearCanvas(game.guiCanvas);
		drawInstance(instances.player);
		//drawInstance(instances.wall);
		drawInstance(instances.map);
		drawInstance(instances.ai);
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