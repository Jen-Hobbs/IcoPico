/*
 * A basic layout using the sizer plugin
 * Reference: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-sizer/
*/
import Phaser from "phaser";
import UIPlugin from '../node_modules/phaser3-rex-notes/templates/ui/ui-plugin.js';
import logoImg from "./assets/logo.png";

const x = 0;
const y = 0;
const minWidth = 500;
const minHeight = 500;

class Demo extends Phaser.Scene {
  constructor() {
      super({
          key: 'Demo'
      })
  }

  preload() {
    this.load.image("logo", logoImg);
  }

  create() {
    //create parent sizer container
    var sizer = this.rexUI.add.sizer(x, y, minWidth, minHeight, { orientation: 0, })
    
    //draw the layout
    sizer.layout();

    //add a border around the layout
    sizer.drawBounds(this.add.graphics(), 0xff0000);
  }

  update() {}
}

var config = {
  type: Phaser.AUTO,
  parent: 'wrapper',
  scale: {
    mode: Phaser.DOM.RESIZE,
    width:800,
    height:400,
    type: Phaser.AUTO,
    autoCenter: Phaser.Scale.autoCenter      
  },
  width: 800,
  height: 400,
  autoCenter: Phaser.Scale.autoCenter,
  //loads the UIPlugin before every scene loads
  plugins: {
      scene: [{
          key: 'rexUI',
          plugin: UIPlugin,
          mapping: 'rexUI'
      }]
  },
  scene: [Demo]
};

var game = new Phaser.Game(config);