import '../scss/styles.scss';
import * as PIXI from 'pixi.js';
import $ from 'jquery';
//import 'jquery-ui-bundle';
import PixiFps from 'pixi-fps';
const fpsCounter = new PixiFps();
// modules
import utils from './modules/myutils.js';
// images
import '../images/circle.png';


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

$( 'body' ).append( app.view );
// app.stage.addChild(fpsCounter);

PIXI.loader
  .add( '../images/circle.png' )
  .load( setup );

function setup(){
  for( var i = 0; i<5000; i++ ){
    let sprite = new PIXI.Sprite( PIXI.loader.resources[ '../images/circle.png' ].texture );
    sprite.position.x = utils.getRandomInt( 0, innerWidth );
    sprite.position.y = utils.getRandomInt( 0, innerHeight );
    app.stage.addChild( sprite );
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
  app.renderer.resize(innerWidth, innerHeight);
});
