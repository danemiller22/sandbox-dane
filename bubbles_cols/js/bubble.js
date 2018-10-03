window.Bubble = Bubble;


function Bubble(title, x, y, isbackend, parentbubble)
{
	this.title = new String(title);
	this.isbackend = isbackend;
	this.parentbubble = parentbubble;
	
	// Position
	this.x = x;
	this.y = y;
	
	this.radius = 50; //50;
	
	this.level = 1;
	//if (parentbubble) this.level = parentbubble.level + 1;
	
	// SOURCE:  http://stackoverflow.com/questions/1152024/best-way-to-generate-a-random-color-in-javascript
	if (this.isbackend === false) this.lineColor = '#99ffcc';
	else {
		this.lineColor = '#000000';
		while (this.lineColor == '#000000' || this.lineColor == '#FFFFFF' || this.lineColor == '#99ffcc' || this.lineColor.length < 7) {
			// beware 5-digit colors in the rare instance that random() == 0
			//if (this.lineColor.length < 7) console.log('color hex ' + this.lineColor + ' is too short! (' + this.title + ')'); 
			this.lineColor = "#"+((1<<24)*Math.random()|0).toString(16);
			
			//this.lineColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
			//this.lineColor = '#'+Math.floor(Math.random() * 16777216).toString(16);
			//this.lineColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
			//this.lineColor = 'rgb(' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ',' + Math.floor(Math.random()*255) + ')';
			
		}
	}
	
	this.links = [];
	//this.lines = [];
}


// ====== GET AND SET ======
Bubble.prototype.addLink = function(nwLnk){
	this.links.push(nwLnk);
	//this.lines.push(nwLnk);
};
//Bubble.prototype.addLine = function(nwLnk){
//	this.lines.push(nwLnk);
//};
Bubble.prototype.getWidth = function(){
	//return this.title.width("bold 12px Georgia") + 10;
	//return ctx.measureText(this.title).width,10,50)
	
	var myTitle = this.title;
	return this.title.width(ctx.font) + 10;
};
Bubble.prototype.getHeight = function(){
	return this.title.height("bold 12px Georgia") * (3/2);
};

Bubble.prototype.renderConnections = function(ctx, recIdx){
	
	beenrendered.push(this.title);
	
	//ctx.globalAlpha = 0.5;
	ctx.globalAlpha = 1.0;
	
	recIdx -= 1;
	//console.log(recIdx);
	if (recIdx >= 0) {
		// Render Bubble connections
		for(var i=0; i<this.links.length; i++) {
			
			// Use a unique color for lines to immediate (new) relations
			
			var meY, meX, themY, themX;
			
			// line
			if (this.isbackend === false) {
				meX = this.x + 0;
				meY = this.y + (this.getHeight() * 0.5);
				themX = this.links[i].x + (this.links[i].getWidth() * 1.22);
				themY = this.links[i].y + (this.links[i].getHeight() * 0.5);
				
				ctx.strokeStyle = this.links[i].lineColor;
				ctx.fillStyle = this.links[i].lineColor;
			} else {
				meX = this.x + (this.getWidth() * 1.22);
				meY = this.y + (this.getHeight() * 0.5);
				themX = this.links[i].x + 0;
				themY = this.links[i].y + (this.links[i].getHeight() * 0.5);
				
				ctx.strokeStyle = this.lineColor;
				ctx.fillStyle = this.lineColor;
			}
			ctx.lineWidth = 1.0;
			ctx.beginPath();
			ctx.moveTo(meX, meY);
			ctx.lineTo(themX, themY)
			ctx.stroke();
			
			
			// var meY, meX, themY, themX;
			// meX = this.x + (this.getWidth()/2);
			// meY = this.y + (this.getHeight() * 2/3);
			// themX = this.links[i].x + (this.links[i].getWidth()/2);
			// themY = this.links[i].y + (this.links[i].getHeight() * 2/3);
			
			// wedge
			// if (this.isbackend === false) {
				
				// ctx.strokeStyle = this.links[i].lineColor;
				// ctx.fillStyle = this.links[i].lineColor;
				
				// // wedge
				// var xOffset = 2;
				// var yOffset = -2;
				// //if (meX >= themX) yOffset = 5;
				// ctx.beginPath();
				// ctx.moveTo(meX, meY);
				// ctx.lineTo(themX + yOffset, themY)
				// ctx.lineTo(themX - yOffset, themY)
				// ctx.lineTo(meX, meY)
				// ctx.fill();
				
				// yOffset = 2;
				// ctx.beginPath();
				// ctx.moveTo(meX, meY);
				// ctx.lineTo(themX, themY + yOffset)
				// ctx.lineTo(themX, themY - yOffset)
				// ctx.lineTo(meX, meY)
				// ctx.fill();
				
				// ctx.beginPath();
				// ctx.rect(themX - yOffset, themY - yOffset, yOffset * 2, yOffset * 2);
				// ctx.fill();
				
			// } else {
				
				// ctx.strokeStyle = this.lineColor;
				// ctx.fillStyle = this.lineColor;
				
				// // wedge
				// var xOffset = 2;
				// var yOffset = -2;
				// //if (themX >= meX) yOffset = 5;
				// ctx.beginPath();
				// ctx.moveTo(themX, themY);
				// ctx.lineTo(meX + yOffset, meY)
				// ctx.lineTo(meX - yOffset, meY)
				// ctx.lineTo(themX, themY)
				// ctx.fill();
				
				// yOffset = 2;
				// ctx.beginPath();
				// ctx.moveTo(themX, themY);
				// ctx.lineTo(meX, meY + yOffset)
				// ctx.lineTo(meX, meY - yOffset)
				// ctx.lineTo(themX, themY)
				// ctx.fill();
				
				// ctx.beginPath();
				// ctx.rect(meX - yOffset, meY - yOffset, yOffset * 2, yOffset * 2);
				// ctx.fill();
				
			// }
			
			if (!inArray(this.links[i].title, beenrendered)) {
				//this.links[i].level = this.level + 1;
				this.links[i].renderConnections(ctx, recIdx);
				//this.links[i].render(ctx, recIdx);
			}
			//this.render(ctx, recIdx);
		}
		
	}
	
};

Bubble.prototype.render = function(ctx, recIdx){
	
	beenrendered.push(this.title);
	
	recIdx -= 1;
	//console.log(recIdx);
	
	if (recIdx >= 0) {
		// Render Linked Bubbles
		for(var i=0; i<this.links.length; i++) {
			if (!inArray(this.links[i].title, beenrendered)) {
				//this.links[i].level = this.level + 1;
				this.links[i].render(ctx, recIdx);
			}
		}
	}
	
	// Render Bubble
	ctx.font = "bold 12px Tahoma"; //"bold 12px Georgia";
	ctx.lineWidth = 0.5;
	ctx.globalAlpha = 1.0;
	
	// Get Title
	var myTitle = this.title; // + " (" + (this.level) + ")";
	var xTxt = this.getWidth();
	var yTxt = this.getHeight(); //this.title.height(ctx.font) * (3/2); //20;
	
	/*
	// Special highlight around root
	if (this.level == 1) {
		
		var lvl1margin = 5;
		ctx.beginPath();
		ctx.strokeStyle = '#ffff00'; //'#00ad2e';
		ctx.lineWidth = 4.0;
		roundRect(ctx, this.x - lvl1margin, this.y - lvl1margin, xTxt + (lvl1margin*2), yTxt + (lvl1margin*2), 10, true);
		ctx.stroke();
	}
	*/
	
	// Personal color of this Bubble
	ctx.fillStyle = this.lineColor;
	ctx.strokeStyle = this.lineColor;
	
	if (this.lineColor !== ctx.fillStyle) console.log('missing color: ' + this.lineColor);
	
	ctx.beginPath();
	if (this.isbackend == false) {
		// Rim in dark blue
		ctx.strokeStyle = '#0000FF';
		ctx.lineWidth = 2.0;
		ctx.rect(this.x, this.y, xTxt, yTxt);
	} else {
		// Rounded rectangle
		roundRect(ctx, this.x, this.y, xTxt, yTxt, 10, true);
	}
	ctx.fill();
	ctx.stroke();
	
	// Render title
	ctx.beginPath();
	//if (colorisdark(this.lineColor) > 200) ctx.fillStyle = "black";
	if (colorisdark(ctx.fillStyle) > 200) ctx.fillStyle = "black";
	else ctx.fillStyle = "white";
	ctx.textAlign = "left"; 
	ctx.fillText(myTitle, this.x + 5, this.y + this.getHeight() * (2/3));
	
};


// ====== AUTOMATE ======
Bubble.prototype.getHasLink = function(dbname, arrFound){
	//if (this.title === dbname) return true; // redundant, but there for safety
	if (this.title === dbname) return this; // redundant, but there for safety
	if (!arrFound) arrFound = [];
	for(var i=0; i < this.links.length; i++) {
		if (this.links[i].title == dbname) {
			//return true;
			return this.links[i];
		} else {
			if (!inArray(this.links[i].title, arrFound)) {
				if (this.links[i].getHasLink(dbname, arrFound) == true) {
					return true;
				} else {
					//console.log(dbname + " not found in " + this.links[i].title);
				}
			}
		}
	}
	return false;
};

Bubble.prototype.setLinkPositions = function(recIdx = 0){
	
	//this.parentbubble = myparent;
	
	beenrendered.push(this.title);
	if (!inArray(this.title, collisionchecklist)) collisionchecklist.push(this.title);
	
	this.x = 500;
	if (this.isbackend == true) {
		this.x = 10;
		this.y = yB;
		yB += this.getHeight() + yRowOffset;
	} else {
		this.x = 800;
		this.y = yF;
		yF += this.getHeight() + yRowOffset;
	}
	
	//if (xMax < this.x + this.getWidth()) xMax = this.x + this.getWidth() + 10;
	//if (yMax < yB) canvas.height = yB + 10;
	
	recIdx -= 1;
	if (recIdx < 0) return;
	
	// Recursion
	for(var i=0; i<this.links.length; i++) {
		if (!inArray(this.links[i].title, beenrendered)) {
			this.links[i].level = this.level + 1;
			this.links[i].parentbubble = this;
			this.links[i].setLinkPositions(recIdx);
		}
	}
	
};

Bubble.prototype.hasOverlap = function(bubble2){
	var rec1 = { x: this.x - this.getWidth()/2, y: this.y - this.getHeight()/2, width: this.getWidth(), height: this.getHeight() };
	var rec2 = { x: bubble2.x - bubble2.getWidth()/2, y: bubble2.y - bubble2.getHeight()/2, width: bubble2.getWidth(), height: bubble2.getHeight() };
	if (hasOverlap(rec1, rec2) > 0) return true;
	return false;
};