var sessionNumber2 = Math.floor(Math.random() * 1000000-1);
var instances = [];
var keys = [];
var mousedown = false;
window.addEventListener("keydown", function(e) {
	'use strict';
	keys[e.keyCode] = true;
	for(var i in instances) {
		var instance = instances[i];
		if(instance.customKeys !== undefined) {
			for(i in instance.customKeys) {
				if(instance.customKeys[i].time !== null && instance.customKeys[i].key !== null) {
					if(instance.customKeys[i].keyCode !== null && instance.customKeys[i].time == "single" && instance.customKeys[i].key === "keydown") {	
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
window.addEventListener("mousedown",function() {
	'use strict';
	mousedown = true;
	for(var i in instances) {
		var instance = instances[i];
		if(instance.mouseEvents !== null) {
			for(var l in instance.mouseEvents) {
				var e = instance.mouseEvents[l];
				if(e.type === "mousedown") {
					e.do();
				}
			}
		}
	}
});
var x;
var y;
window.addEventListener("mouseup",function() {
	'use strict';
	mousedown = false;
	for(var i in instances) {
		var instance = instances[i];
		if(instance.mouseEvents !== null) {
			for(var l in instance.mouseEvents) {
				var e = instance.mouseEvents[l];
				if(e.type === "mouseup") {
					e.do();
				}
			}
		}
	}
});
window.addEventListener("mousemove",function() {
	'use strict';
	for(var i in instances) {
		var instance = instances[i];
		if(instance.mouseEvents !== null) {
			for(var l in instance.mouseEvents) {
				var e = instance.mouseEvents[l];
				if(e.type === "mousemove") {
					e.do();
				}
			}
		}
	}
});
function mouseDown() {
	'use strict';
	return mousedown;
}
function mousePos(canvas, m) {
	'use strict';
	var l = window.addEventListener("mousemove",function(e) {
		var target = canvas;
		x = e.clientX - target.offsetLeft;
		y = e.clientY - target.offsetTop;

	});
	window.removeEventListener("mousemove", l);
	if(m == "x") {
		return x;
	} else if(m == "y"){
		return y;
	}
}

window.addEventListener("keyup", function(e) {
	'use strict';
	
	for(var i in instances) {
		var instance = instances[i];
		if(instance.customKeys !== undefined) {
			for(i in instance.customKeys) {
				if(instance.customKeys[i].time !== null && instance.customKeys[i].key !== null) {
					if(instance.customKeys[i].keyCode !== null && instance.customKeys[i].time == "single" && instance.customKeys[i].key === "keyup") {	
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
	var i;
	if(instance.loops !== undefined && instance.loops !== null) {
		for(i in instance.loops) {
			instance.loops[i]();
		}
	}
	for(i in instances) {
		if(instances[i].UUID === instance.UUID) {
			if(instance.customKeys !== undefined) {
				for(i in instance.customKeys) {
					if(instance.customKeys[i] !== null && instance.time !== null) {
						if(instance.customKeys[i].keyCode !== null && instance.customKeys[i].time === "multi") {	
							if(keys[instance.customKeys[i].keyCode]) {
								if(instance.customKeys[i].action !== null) {
									instance.customKeys[i].action();
								}								
							}
						}
					}
				}
			}
			
			if(instance.objectType === "ai") {
				if(instance.aiVar >= instance.aiDelay && !instance.aiDone) {
					instance.aiVar = 0;
					for(var l in instance.aiCommands) {
						var cmd = instance.aiCommands[l];
						var rnd = Math.random() * (cmd.maxChance - cmd.minChance) + cmd.minChance;
						if(Math.round(rnd) === cmd.chance && cmd.cmd) {
							instance.aiDo = cmd.do;
							instance.aiDone = true;
							
						}
					}
					
				} else {
					instance.aiVar++;
					if(instance.aiVar === instance.aiDelay-1) {
						instance.aiDone = false;
						
					}
				}
				instance.aiDo();
			}
			if(instance.objectType === "ai" && instance.collision) {
				for(var j in instances) {
					var instance2 = instances[j];
					if(instance2.objectType === "tilemap") {
						for(var m in instance2.numbers) {
							for(var i in instance2.map) {
								for(var l in instance2.map[i]) {
									if(instance2.numbers[m].collision === true) {
										//log(instance.x + " " + instance.y);
										if(instance2.map[i][l] === instance2.numbers[m].number){
											var x = instance2.x+instance2.tileSize*l;
											var y = instance2.y+instance2.tileSize*i;
											var tileSize = instance2.tileSize;
											if(instance.x <= x+tileSize+instance.speed && instance.y <= tileSize+y && instance.y+instance.height >= y && instance.x >= x) {
												instance.x+=instance.speed;
											}
											if(instance.y <= y+tileSize+instance.speed && instance.x <= x+tileSize && instance.x+instance.width >= x && instance.y >= y) {
												instance.y+= instance.speed;
											}
											if(instance.x+instance.width >= x-instance.speed/0.9 && instance.x <= x+tileSize-instance.speed && instance.y + instance.height >= y && instance.y <= y + tileSize) {
												instance.x-=instance.speed;
											}
											if(instance.y+instance.height >= y-instance.speed && instance.x+instance.width >= x+instance.speed && instance.y <= y && instance.x <= x + tileSize) {
												instance.y-=instance.speed;
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if(instance.objectType === "player" && instance.collision) {
				for(var j in instances) {
					var instance2 = instances[j];
					if(instance2.objectType === "wall") {
						if(instance.x <= instance2.x+instance2.width+instance.speed && instance.y <= instance2.height+instance2.y && instance.y+instance.height >= instance2.y && instance.x >= instance2.x) {
							instance.x+=instance.speed;
						}
						if(instance.y <= instance2.y+instance2.height+instance.speed && instance.x <= instance2.x+instance2.width && instance.x+instance.width >= instance2.x && instance.y >= instance2.y) {
							instance.y+= instance.speed;
						}
						if(instance.x+instance.width >= instance2.x-instance.speed/0.9 && instance.x <= instance2.x+instance2.width-instance.speed && instance.y + instance.height >= instance2.y && instance.y <= instance2.y + instance2.height) {
							instance.x-=instance.speed;
						}
						if(instance.y+instance.height >= instance2.y-instance.speed && instance.x+instance.width >= instance2.x+instance.speed && instance.y <= instance2.y && instance.x  <= instance2.x + instance2.width) {
							instance.y-=instance.speed;
						}
					}
					if(instance2.objectType === "tilemap") {
						for(var m in instance2.numbers) {
							for(var i in instance2.map) {
								for(var l in instance2.map[i]) {
									if(instance2.numbers[m].collision === true) {
										//log(instance.x + " " + instance.y);
										if(instance2.map[i][l] === instance2.numbers[m].number){
												var x = instance2.x+instance2.tileSize*l;
												var y = instance2.y+instance2.tileSize*i;
												var tileSize = instance2.tileSize;
												if(instance.x <= x+tileSize+instance.speed && instance.y <= tileSize+y && instance.y+instance.height >= y && instance.x >= x) {
													instance.x+=instance.speed;
												}
												if(instance.y <= y+tileSize+instance.speed && instance.x <= x+tileSize && instance.x+instance.width >= x && instance.y >= y) {
													instance.y+= instance.speed;
												}
												if(instance.x+instance.width >= x-instance.speed/0.9 && instance.x <= x+tileSize-instance.speed && instance.y + instance.height >= y && instance.y <= y + tileSize) {
													instance.x-=instance.speed;
												}
												if(instance.y+instance.height >= y-instance.speed && instance.x+instance.width >= x+instance.speed && instance.y <= y && instance.x <= x + tileSize) {
													instance.y-=instance.speed;
												}
										}
									}
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
	if(instance.type === null || instance.display === null || instance.objectType === null || instance.hidden === null) {
		
	}
	if(instance.type === undefined || instance.display === undefined || instance.objectType === undefined || instance.hidden === undefined) {
		if(instance.objectType !== "tilemap" && instance !== undefined) {
			console.error("Either instance.type, instance.display, instance.objectType, or instance.hidden are not defined! Object Type: " + instance.objectType + ", UUID: " + instance.UUID + "! If this error only appears on startup, ignore it!");
		}
		if(instance === undefined) {
			console.error("Instance is undefined!");
		}
	}
	if(instance.type !== null && instance.type !== undefined && instance.display !== null && instance.display !== null && instance.objectType!==null && instance.hidden !== null) {
		var context = instance.context;
		if(instance.hidden && instance.objectType !== "tilemap") {
			
		} else {
			if(instance.type === "image") {
				context.drawImage(instance.display, instance.x, instance.y, instance.width, instance.height);
			}
			if(instance.type === "color") {
				context.fillStyle = instance.display;
				context.fillRect(instance.x, instance.y, instance.width, instance.height);
			}
		}

	}
	
	if(instance.objectType !== null && instance.map !== null && instance.numbers !== null && instance.hidden !== null) {
		if(instance.objectType === "tilemap") {
		for(var l in instance.numbers) {
			for(var i in instance.map) {
				for(var j in instance.map[i]) {
						switch(instance.map[i][j]) {
							case instance.numbers[l].number:
								if(instance.numbers[l].type === "color") {
									instance.context.fillStyle = instance.numbers[l].display;
									instance.context.fillRect(j*instance.tileSize+instance.x,i*instance.tileSize+instance.y,instance.tileSize,instance.tileSize);
								}
								if(instance.numbers[l].type === "image") {
									instance.context.drawImage(instance.numbers[l].display,j*instance.tileSize+instance.x,i*instance.tileSize+instance.y,instance.tileSize,instance.tileSize)
								}
							break;
						}
					}
				}
			}
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
