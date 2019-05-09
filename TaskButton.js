/**
 * @classdesc
 * A custom class for a task button
 * @class TaskButton
 * @extends Phaser.GameObjects.Sprite
// @params
// Scene:	The Scene to which this Game Object belongs.
// 		  	A Game Object can only belong to one Scene at a time
// x:		position
// y: 		position
// texture: The key of the Texture this Game Object will use to render with
// position: The index position that the Game Object is in
// icon: 	The key of the icon
// type: 	The type of task
// title:	The title string of the task
// description: The description string of the task 
// callback
 **/
 
class TaskButton extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, texture, index, icon, type, title, description, isActive, callback) {
		super(scene, x, y, texture);
		//make interactive on create
			//useHandCursor - sets hoverability to true
		this.setInteractive({ useHandCursor: true })
		.on('pointerover', () => this.enterButtonHoverState() )
		.on('pointerout', () => this.enterButtonRestState() )
		.on('pointerdown', () => this.enterButtonActiveState() )
		.on('pointerup', () => {
		  this.enterButtonHoverState();
		  //callback(this.index);
		});
	}

	enterButtonActiveState() {
		//this.setStyle({ fill: '#0ff' });
	}

	enterButtonHoverState() {
		//user clicked 

		// this.clickButton.setStyle({ fill: '#ff0'});
	}
	
	enterButtonRestState() {
		// this.clickButton.setStyle({ fill: '#0f0'});
	}
	
	enterButtonActiveState() {
		// this.clickButton.setStyle({ fill: '#0ff' });
	}
	
	
}