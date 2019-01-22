import '../css/jquery-ui.css';
import '../scss/styles.scss';
import * as PIXI from 'pixi.js';
import $ from 'jquery';
import 'jquery-ui-bundle';
// import 'jquery-ui';
// import * as $ from 'webpack-jquery-ui';
import * as GSAP from 'gsap';
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

let sprites = [], dead = false;
//purp;
//, sprites = [], num_of_particles = 10000;


$( 'body' ).append( app.view );
// app.stage.addChild(fpsCounter);
$( 'body' ).on('click', ()=>{
  kill_all();
});

PIXI.loader
  .add( '../images/circle.png' )
  .add( '../images/purp.png' )
  .load( setup );


function setup(){

  //purp = new PIXI.Sprite( PIXI.loader.resources[ '../images/purp.png' ].texture );
  //purp.anchor.set( .5, .5 );
  //purp.position.set( innerWidth/2, innerHeight/2 );
  //app.stage.addChild( purp );
  //purp.visible = false;

  add_slider();

  app.stage.addChild(fpsCounter);

  animate_random();

}

function create_particles( num ){
  for( var i = 0; i < num; i++ ){
    let sprite = new PIXI.Sprite( PIXI.loader.resources[ '../images/circle.png' ].texture );
    sprite.position.set( utils.getRandomInt(0,innerWidth), utils.getRandomInt(0,innerHeight) );
    sprite.width = sprite.height = utils.getRandomInt( 0, 10 );
    app.stage.addChild( sprite );
    sprites.push( sprite );
  }
  dead = false;
}

function kill_all(){
  dead = true;
  // $('#slider').slider( 'values', [ 0, 100 ] );
  $('#num-particles-display').html('0 particles');
  for(var i = 0; i < sprites.length; i++)
    app.stage.removeChild(sprites[i]);
}

function add_slider(){
  $( 'body' ).append(`
    <div id="slider" style="display:block;position:absolute;z-index:2"></div>
    <div id='slider-text'>num of particles</div>
  `);
  $( ()=>{
    $( "#slider" ).slider({
      change: (e,ui)=>{
        kill_all();
        create_particles( ui.value*100 );
        $( '#num-particles-display' ).html(`${ui.value*100} particles`);
        animate_random();
      }
    });
  });
}

function animate_random(){
  if( dead != true ){
    for(var i = 0; i<sprites.length; i++){
      if(sprites[i]){
        animate_random_particle(sprites[i]);
      }
    }
  }
}

function animate_random_particle( p ){
  TweenLite.to(p, utils.random(5, 10), {
    x: utils.random( 0, innerWidth ),
    y: utils.random( 0, innerHeight ),
    ease: Power1.easeInOut,
    onComplete: animate_random_particle,
    onCompleteParams: [ p ]
  });
}


$( window ).resize( function(){
  // for(var i = 0; i<sprites.length; i++){
  //   if(sprites[i]){
  //     sprites[i].position.set( utils.getRandomInt(0, innerWidth), utils.getRandomInt(0,innerHeight) );
  //   }
  // }
  app.renderer.resize(innerWidth, innerHeight);
});
