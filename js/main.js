var canvas = document.getElementById("canvas");
var timer=0;
var interval=0;
var d = new Date();
var time = d.getHours();
var day=['./img/fondos/amanecer.jpg','./img/fondos/medio_dia.jpg','./img/fondos/noche.jpg'];
var tipo_edificios=['./img/edificios/edifi (8).png','./img/edificios/edifi (2).png','./img/edificios/edifi (3).png','./img/edificios/edifi (4).png','./img/edificios/edifi (5).png','./img/edificios/edifi (6).png'];
var tiempo='',buildings=[];
const gravedad=9.8;
var x=false;

var completedMusic = new Audio();
completedMusic.src = "./music/dbz.mp3";

var sexplosion = new Audio();
sexplosion.src = "./music/explosion.mp3";


var kame = new Audio();
kame.src = "./music/kame.mp3";

var ouch = new Audio();
ouch.src = "./music/ouch.mp3";

angle_gnome = document.getElementById( 'angulo_gnomo' );
velocity_gnomo= document.getElementById( 'velocidad_gnomo' );

angle_neighbord = document.getElementById( 'angulo_vecina' );
velocity_neighbord= document.getElementById( 'velocidad_vecina' );

var butDispara=document.getElementById('btn-shoot');


//clases

class Background {
    constructor(){
        this.ctx = canvas.getContext("2d");
        this.x= 0;
        this.y= 0;
        this.width= canvas.width;
        this.height= canvas.height;
        this.image= new Image();
       // this.image.src='.img/fondos/amanecer.jpg';
       //  console.log('time',time);
        if(time>=0&&time<=11){
            tiempo=day[0];
              console.log(' mañana');
        }
        else
        if(time>=12&&time<=20){
            tiempo=day[1];
            //console.log('tarde');
        }
        else
        if(time>=21&&time<24){
            tiempo=day[2];
            // console.log('noche');
        }
    }

    clean(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw(){
        this.image.src=tiempo;

        this.image.onload = () => {
        this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
         };

    }
}

class Building {
    constructor(tipo,x){
        //console.log('tipo',tipo);
        this.ctx = canvas.getContext("2d");
        this.x= x;
        this.y= 342;
        this.width= 220;
        this.height= 307;
        this.image= new Image();
        this.tipo=tipo;
    }
    draw(tipo){
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img,this.x,this.y,this.width,this.height);
        };
        img.src = tipo_edificios[tipo];
        // console.log('source',img.src);
    }

}

class Gnomo {
    constructor(x){
        this.ctx = canvas.getContext("2d");
        this.x= x[0];
        this.y= x[1];
        this.width= 64;
        this.height= 112;
        this.image= new Image();
    }
    draw(){
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img,this.x,this.y,this.width,this.height);
        };
        img.src = './img/characters/gnomo_ss.png'

    }
}
function make_gnomo(){
    var coordG=[];
    var coordx_gnomo =['900','700','1005'];  //las alturas en equis
    var coordy_gnomo=['243','355','413','550'];


    for (i = coordx_gnomo.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = coordx_gnomo[i - 1];
        coordx_gnomo[i - 1] = coordx_gnomo[j];
        coordx_gnomo[j] = k;
    }
    for (l = coordy_gnomo.length; l; l--) {
        m = Math.floor(Math.random() * l);
        // console.log('n',n);
        n = coordy_gnomo[l - 1];
        // console.log('m',m);
        coordy_gnomo[l - 1] = coordy_gnomo[m];
        coordy_gnomo[m] = n;
    }
    coordG[0]=parseInt( coordx_gnomo[0]);
    coordG[1]=parseInt( coordy_gnomo[0]);

    return coordG;

}

class Neighbor {
    constructor(coordenadas){

        this.ctx = canvas.getContext("2d");
        this.x= coordenadas[0];
        this.y= coordenadas[1];
        this.width= 75;
        this.height= 75;
        this.image= new Image();
        // console.log('equis',this.x);
        // console.log('yes',this.y);
    }
    draw(){
        // console.log('entro al draw vecina');
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img,this.x,this.y,this.width,this.height);
        };
        img.src = './img/characters/vecina.png'
    }


}


class Kaboom {
     constructor(){
        this.ctx = canvas.getContext("2d");
        this.x=0;
        this.y= 0;
        this.width= 700;
        this.height= 650;
        this.image= new Image();
    }
    draw(x,y){
		console.log("entro al draw de explosion",'valor x=',x,'valor de y=',y);
		
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img,x,y,this.width,this.height);
        };
        img.src = './img/characters/explosion.png'

    }
}


function colisiones () {
    console.log('chancla y',Math.trunc (chancla.y));
    console.log('gnomoss y',gnomoss.y+gnomoss.height);

    console.log('chancla x',Math.trunc (chancla.x));
    console.log('gnomoss x',gnomoss.x+gnomoss.width);
        if (
            gnomoss.x < chancla.x + chancla.width && gnomoss.x + gnomoss.width > chancla.x &&
            gnomoss.y< chancla.y + chancla.height && gnomoss.y + gnomoss.height > chancla.y
        )
        {
        console.log('choco');
            x=true;
            clearInterval(interval);
            fondo.ctx.font= '50px Avenir';
            fondo.ctx.fillText('Gano Vecina',210, 180);
			console.log("gonomo x",gnomoss.x,"gonomo y",gnomoss.y,)
			ouch.play();
			sexplosion.play();
			explosion.draw((gnomoss.x-300 ),(gnomoss.y-150 ));
			
            return x;
        }

}



function make_neighbord(){
    var coorx_neighbord = ['50','350','250','150'];
    var coory_neigbord=['270','375','440','575'];
   // var coory_neigbord=['440'];
    var coord=[];
    for (i = coorx_neighbord.length; i; i--) {
        j = Math.floor(Math.random() * i);
        // console.log('j',j);
        k = coorx_neighbord[i - 1];
        // console.log('k',k);
        coorx_neighbord[i - 1] = coorx_neighbord[j];
        coorx_neighbord[j] = k;
    }
 for (l = coory_neigbord.length; l; l--) {
        m = Math.floor(Math.random() * l);
        // console.log('n',n);
        n = coory_neigbord[l - 1];
        // console.log('m',m);
     coory_neigbord[l - 1] = coory_neigbord[m];
     coory_neigbord[m] = n;
    }

    coord[0]=parseInt( coorx_neighbord[0]);
    coord[1]=parseInt( coory_neigbord[0]);

    return coord;
}

function make_building(){
    var tipo_edi = ['0','1','2','3','4','5'];
    for (i = tipo_edi.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = tipo_edi[i - 1];
        tipo_edi[i - 1] = tipo_edi[j];
        tipo_edi[j] = k;
    }

    var edificio0=new Building(tipo_edi[0],10);
    var edificio1=new Building(tipo_edi[1],210);
    var edificio2=new Building(tipo_edi[2],410);
    var edificio3=new Building(tipo_edi[3],610);
    var edificio4=new Building(tipo_edi[4],810);
    var edificio5=new Building(tipo_edi[5],1010);

    buildings.push(edificio0,edificio1,edificio2,edificio3,edificio4,edificio5);
    // console.log('entro a generar edificios al azar' );
}

// console.log('tipo_edi',tipo_edi);
    butDispara.onclick = function() {
		kame.play();
        an_gno=parseInt(angle_gnome.value);
        vel_gno=parseInt(velocity_gnomo.value);
        an_vec=parseInt(angle_neighbord.value);
        vel_vec=parseInt(velocity_neighbord.value);
		
     //   console.log('angulo', an_gno);

        if(interval!==undefined) {
            console.log('emtor if udnefiend',interval);
            interval = setInterval(aplicarFuerza, 1000 / 60);
        }
    };
    function aplicarFuerza(){

         ctx = canvas.getContext("2d");
        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        if(x===false){
            fondo.draw();
            drawBuildings();
            vecina.draw();
            gnomoss.draw();
            puntoImpacto(an_vec,vel_vec);
        }
        else{
            console.log('else feooooo');
            fondo.draw();
            drawBuildings();
            vecina.draw();
        }
        // fondo.draw();
        // drawBuildings();
        // vecina.draw();
        // gnomoss.draw();
        // puntoImpacto(an_vec,vel_vec);
        //chancla.draw();
        // console.log('chancla x', chancla.x);
        // console.log('chancla y', chancla.y);
        // console.log('entro a la fuerzaaaaaaaaz');
    }
function changeturn() {
    console.log('entro a cambiar turno', fondo);

    clearInterval(interval);
    fondo.ctx.font= '30px Avenir';
    fondo.ctx.fillText('Le toca a tu oponente',210, 180);

}
    function puntoImpacto(angulo,velocidad) {
    // console.log('angulo',angulo);
    // console.log('velocidad',velocidad);

    var radianes = (angulo* Math.PI )/ 180;
   // console.log('radianes',radianes);

    chancla.vx =  (velocidad * Math.cos(radianes))/15 ;
    chancla.vy =   ((velocidad * Math.sin(radianes) - ((1 / 2 * gravedad)))/100)  ;

    chancla.x += chancla.vx;
    chancla.y -= (chancla.vy);

    chancla.drawfin(chancla.vx, chancla.vy);

    // console.log('chancla.vx', chancla.x);
    // console.log('chancla.vy', chancla.y);
        colisiones();

    if(chancla.x>fondo.width||chancla.y>fondo.height){

        console.log('entro al if');
        console.log('cha y',chancla.y);
        console.log('cha x',chancla.x);
        console.log('fon x',fondo.width);
        console.log('fond y',fondo.height);
        console.log('entro al if');
        changeturn();


    }
}

function drawBuildings() {
    buildings.forEach(function (edificio) {
        //console.log('tipo',edificio.tipo);
        edificio.draw(edificio.tipo);
    })
}

function make_stage(){
     // console.log('entro a make supuestamente el 1');
    make_building();
    drawBuildings();

}

    class Chancla {
        constructor(x,y){
            this.ctx = canvas.getContext("2d");
            this.x= x+40;
            this.y= y-30;
            this.vx= x+55;
            this.vy= y;
            this.width= 55;
            this.height= 55;
            this.image= new Image();
        }
        draw(){
            // console.log('emtro al draw chancla' );
            var img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img,this.x,this.y,this.width,this.height);
            };
            img.src = './img/characters/chancla.png'
        }

    drawfin(x,y){
        var img = new Image();
        // console.log('pos inicial','equis',x,'yes',y);
        // console.log('pos sumada','equis',this.x+x,'yes',this.y+y);
        var posfinx=this.x+x;
        var posfiny=this.y+y;
        // console.log('posfin y',posfiny);
        // console.log('posfin x',posfinx);

        img.onload = () => {
            this.ctx.drawImage(img,posfinx,posfiny,this.width,this.height);
        };
        img.src = './img/characters/chancla.png'
    }
}

//Creacion de objetos
var fondo=new Background();
var vecina=new Neighbor(make_neighbord());
var gnomoss=new Gnomo(make_gnomo());
var chancla=new Chancla(vecina.x,vecina.y);
var explosion=new Kaboom();

// console.log('vecina', vecina.x);


fondo.clean();
fondo.draw();
make_stage();
gnomoss.draw();
vecina.draw();
chancla.draw();
completedMusic.play();


