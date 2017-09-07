var sessionNumber2 = Math.floor(Math.random() * 1000000-1);
var instances = [];
var keys = [];
window.addEventListener("keydown", function(e) {
	'use strict';
	keys[e.keyCode] = true;
	for(var i in instances) {
		var instance = instances[i];
		if(instance.customKeys !== undefined && instance.time !== undefined) {
			log(instance.customKeys + " " + instance.time);
			for(i in instance.customKeys && instance.time === "single") {
				if(instance.customKeys[i] !== null) {
					if(instance.customKeys[i].keyCode !== null) {	
						if(keys[instance.customKeys[i].keyCode]) {
							if(instance.customKeys[i].action !== null) {
								instance.customKeys[i].action();
							}								
						}
					}
				}
			}
		}
	}


});
window.addEventListener("keyup", function(e) {
	'use strict';
	delete keys[e.keyCode];
});
function doLoop() {
	'use strict';
	window.requestAnimFrame(function() {
		doLoop();
	});
}
function hideInstance(instance) {
	'use strict';
	instance.hidden = true;
}
function showInstance(instance) {
	'use strict';
	instance.hidden = false;
}
function newInstance(instance) {
	'use strict';
	instances.push(instance);
}
function instanceLogic(instance) {
	'use strict';
	for(var i in instances) {
		if(instances[i].UUID === instance.UUID) {
			if(instance.customKeys !== undefined && instance.time !== undefined) {
				for(i in instance.customKeys && instance.time === "multi") {
					if(instance.customKeys[i] !== null) {
						if(instance.customKeys[i].keyCode !== null) {	
							if(keys[instance.customKeys[i].keyCode]) {
								if(instance.customKeys[i].action !== null) {
									instance.customKeys[i].action();
								}								
							}
						}
					}
				}
			}
			
			
			if(instance.movement !== undefined || instance.movement !== null) {
				if(instance.movement) {
					if(instance.arrows !== undefined || instance.arrows !== null && !keys[65] && !keys[87] && !keys[68] && !keys[83] && instance.arrows) {
						if(keys[37]) {
							switch(instance.arrowsPressed.left) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
						if(keys[38]) {
							switch(instance.arrowsPressed.up) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
						if(keys[39]) {
							switch(instance.arrowsPressed.right) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
						if(keys[40]) {
							switch(instance.arrowsPressed.down) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
					}
					if(instance.wasd !== undefined || instance.wasd !== null && !keys[37] && !keys[38] && !keys[39] && !keys[40] && instance.wasd && instance.wasdPressed !== undefined && instance.wasdPressed !== null) {
						if(keys[65]) {
							switch(instance.wasdPressed.a) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
						if(keys[87]) {
							switch(instance.wasdPressed.w) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
						if(keys[68]) {
							switch(instance.wasdPressed.d) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
						if(keys[83]) {
							switch(instance.wasdPressed.s) {
								case "goLeft":
									instance.x-=instance.speed;
								break;
								case "goRight":
									instance.x+=instance.speed;
								break;
								case "goUp":
									instance.y-=instance.speed;
								break;
								case "goDown":
									instance.y+=instance.speed;
								break;
									
								case "nothing":
								break;
							}
						}
					}
				}
			}
		}
	}
}
function instanceGetter(tUUID) {
	'use strict';
	for(var i in instances) {
		if(instances[i].UUID === tUUID) {
			return instances[i];
		}
	}
}
function drawInstance(instance) {
	'use strict';
	if(instance.type !== null || instance.type !== undefined && instance.display !== null || instance.display !== null) {
		var context = instance.context;
		if(instance.type === "image") {
			context.drawImage(instance.display, instance.x, instance.y, instance.width, instance.height);
		}
		if(instance.type === "color") {
			context.fillStyle = context.display;
			context.fillRect(instance.x, instance.y, instance.width, instance.height);
		}
	}
}
var intervalConsole = 0;
function autoClearConsole(interval) {
	'use strict';
	var max = interval;
	if(intervalConsole >= max) {
		intervalConsole = 0;
		console.clear();
	} else {
		intervalConsole++;
	}
}
var intervalRefresh = 0;
function autoRefresh(interval) {
	'use strict';
	var max = interval;
	if(intervalRefresh >= max) {
		intervalRefresh = 0;
		location.reload();
	} else {
		intervalRefresh++;
	}
}
function clearCanvas(canvas) {
	'use strict';
	var currentContext = canvas.getContext('2d');
	currentContext.clearRect(0,0,canvas.width, canvas.height);
}
function log(c) {
	'use strict';
	console.log(c);
}
window.requestAnimFrame = (function() {
	'use strict';
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
	       window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000/60);
		};
})();
doLoop();
log("Engine Init Completed! Session Number: " + sessionNumber2);
