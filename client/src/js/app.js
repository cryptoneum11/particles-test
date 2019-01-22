import '../css/jquery-ui.css';
import '../scss/styles.scss';
import * as PIXI from 'pixi.js';
import $ from 'jquery';
import 'jquery-ui-bundle';
import * as GSAP from 'gsap';
import PixiFps from 'pixi-fps';
const fpsCounter = new PixiFps();
// modules
import utils from './modules/myutils.js';
import hittest from './modules/hittest.js';
// images
import '../images/circle.png';
// import '../images/purp.png';


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

let sprites = [],
    multiplier = 150,
    dead = false;

$( 'body' ).append( app.view );

PIXI.loader
  .add( '../images/circle.png' )
  .load( setup );


function setup(){
  add_slider();
  app.stage.addChild(fpsCounter);
  $.ajax({
    type: 'get',
    url: './route',
    success: data=>{
      create_particles( data*multiplier );
      animate_random();
      $('.ui-slider-handle')
        .css('left', data+'%').css('width', '5%').css('text-align', 'center')
        .html(data+'%');
      $( '#num-particles-display' ).html(`${data*multiplier} particles`);
    }
  });
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
  $('#num-particles-display').html('0 particles');
  for(let i = 0; i < sprites.length; i++){
    app.stage.removeChild(sprites[i]);
  }
}

function add_slider(){
  $( 'body' ).append(`
    <div id="slider" style="display:block;position:absolute;z-index:2"></div>
    <div id='slider-text'>num of particles</div>
  `);
  $( ()=>{

    $( "#slider" ).slider({
      slide: (e,ui)=>{
        $('.ui-slider-handle').html(ui.value+'%');
      },
      change: (e,ui)=>{
        kill_all();
        //console.log( 'in slider change' );
        // console.log( ui.value );
        $.ajax({
          type: 'post',
          url: `./route/${ ui.value }`,
          success: data=>{
            console.log( 'in ajax post' );
            location.reload();
          }
        });
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
    scaleX: utils.random( .2, 2 ),
    scaleY: utils.random( .2, 2 ),
    ease: Power1.easeInOut,
    onComplete: animate_random_particle,
    onCompleteParams: [ p ]
  });
}


$( window ).resize( function(){
  app.renderer.resize(innerWidth, innerHeight);
});
