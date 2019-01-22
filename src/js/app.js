import '../scss/styles.scss';
import * as PIXI from 'pixi.js';
import $ from 'jquery';
//import 'jquery-ui-bundle';
import PixiFps from 'pixi-fps';
const fpsCounter = new PixiFps();
// modules
import utils from './modules/myutils.js';
import hittest from './modules/hittest.js';
// images
import '../images/circle.png';
import '../images/purp.png';


let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

let app = new PIXI.Application({
    width: innerWidth,         // default: 800
    height: innerHeight,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;

let purp, sprites = [], num_of_particles = 20000;


$( 'body' ).append( app.view );
// app.stage.addChild(fpsCounter);

PIXI.loader
  .add( '../images/circle.png' )
  .add( '../images/purp.png' )
  .load( setup );


function setup(){

  purp = new PIXI.Sprite( PIXI.loader.resources[ '../images/purp.png' ].texture );
  purp.anchor.set( .5, .5 );
  purp.position.set( innerWidth/2, innerHeight/2 );
  app.stage.addChild( purp );
  purp.visible = false;

  for( var i = 0; i < num_of_particles; i++ ){
    let sprite = new PIXI.Sprite( PIXI.loader.resources[ '../images/circle.png' ].texture );
    sprite.position.set( utils.getRandomInt(0,innerWidth), utils.getRandomInt(0,innerHeight) );
    sprite.width = sprite.height = utils.getRandomInt( 0, 10 );
    app.stage.addChild( sprite );
    sprites.push( sprite );
  }

  // add_slider();

  app.stage.addChild(fpsCounter);
}

// function add_slider(){
//   $( 'body' ).append(`<div id="slider" style="display:block;position:absolute;z-index:2"></div>`);
//   $( ()=>{
//     $( "#slider" ).slider();
//
//   });
// }



$( window ).resize( function(){
  purp.position.set( innerWidth/2, innerHeight/2 );
  for(var i = 0; i<sprites.length; i++){
    if(sprites[i])
      sprites[i].position.set( utils.getRandomInt(0,innerWidth), utils.getRandomInt(0,innerHeight) );
  }
  app.renderer.resize(innerWidth, innerHeight);
});
