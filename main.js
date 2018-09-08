// window.onmousemove = function (){
//     var x = window.event.clientX;
//     var y = window.event.clientY;
//     console.log('x',x,'y',y);
// };
//

var canvas = document.getElementById("canvas");

var gravity=8.9;
var d = new Date();
var time = d.getHours();
var day=['./img/fondos/amanecer.jpg','./img/fondos/medio_dia.jpg','./img/fondos/noche.jpg'];
var tipo_edificios=['./img/edificios/edifi(1).png','./img/edificios/edifi(2).png','./img/edificios/edifi(3).png','./img/edificios/edifi(4).png','./img/edificios/edifi(5).png','./img/edificios/edifi(6).png'];
var tiempo='',buildings=[];
const gravedad=9.8;

angle_gnome = document.getElementById( 'angulo_gnomo' );
velocity_gnomo= document.getElementById( 'velocidad_gnomo' );

angle_neighbord = document.getElementById( 'angulo_vecina' );
velocity_neighbord= document.getElementById( 'velocidad_vecina' );

var butDispara=document.getElementById('btn-shoot');

    //console.log('velocity_gnomo',velocity_gnomo);
//console.log(time,'hora');

//clases

class Background {
    constructor(){
        this.ctx = canvas.getContext("2d");

        this.x= 0;
        this.y= 0;
        this.width= canvas.width;
        this.height= canvas.height;
        this.image= new Image();
        if(time>=0&&time<=11){
            tiempo=day[0];
          //  console.log(' mañana');
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
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img,this.x,this.y,this.width,this.height);
        };
        img.src = tiempo;
    }
}

class Building {
    constructor(tipo,x){
        //console.log('tipo',tipo);
        this.ctx = canvas.getContext("2d");
        this.x= x;
        this.y= 300;
        this.width= 220;
        this.height= 400;
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
        this.x= x;
        this.y= 270;
        this.width= 112;
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
    var equis_gnomo = ['900','700','1005'];
    for (i = equis_gnomo.length; i; i--) {
        j = Math.floor(Math.random() * i);
        // console.log('j',j);
        k = equis_gnomo[i - 1];
        // console.log('k',k);
        equis_gnomo[i - 1] = equis_gnomo[j];
        equis_gnomo[j] = k;
    }
   // console.log('equis nomo',equis_gnomo[0]);

    var gnomoss=new Gnomo(equis_gnomo[0]);
    gnomoss.draw();
}

class Neighbor {
    constructor(x){
        this.ctx = canvas.getContext("2d");
        this.x= x;
        this.y= 250;
        this.width= 75;
        this.height= 75;
        this.image= new Image();
    }
    draw(){
        var img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img,this.x,this.y,this.width,this.height);
        };
        img.src = './img/characters/vecina.png'
    }
}

function make_neighbord(){
    var equis_neighbord = ['50','350','150'];
    for (i = equis_neighbord.length; i; i--) {
        j = Math.floor(Math.random() * i);
        // console.log('j',j);
        k = equis_neighbord[i - 1];
        // console.log('k',k);
        equis_neighbord[i - 1] = equis_neighbord[j];
        equis_neighbord[j] = k;
    }
   // console.log('equis vecina',equis_neighbord[0]);
    var vecina=new Neighbor(equis_neighbord[0]);
    // console.log('creacion de vecina',vecina.x);
    vecina.draw();
    return posVecina=equis_neighbord[0];
}

function make_building(){
    var tipo_edi = ['1','2','3','4','5','0'];
    for (i = tipo_edi.length; i; i--) {
        j = Math.floor(Math.random() * i);
        k = tipo_edi[i - 1];
        tipo_edi[i - 1] = tipo_edi[j];
        tipo_edi[j] = k;
    }
    // console.log('tipo_edi',tipo_edi);
    butDispara.onclick = function() {
        an_gno=parseInt(angle_gnome.value);
        vel_gno=parseInt(velocity_gnomo.value);

        // console.log('angulo', angle_gnome.value);
        // console.log('velocidad', velocity_gnomo.value);
        // total=an_gno+vel_gno;
       // console.log('valores de vecina',vecina);
        chancla= new Chancla(parseInt(posVecina));
        //chancla.draw();
        // console.log('pos vecina',posVecina);
        // console.log('pos chancla',chancla);
        puntoImpacto(an_gno,vel_gno);

         setInterval(aplicarFuerza, 10000/60);
    };


    function puntoImpacto(angulo,velocidad) {
        console.log('entro a punto de impacto');
        var radianes = (angulo* Math.PI )/ 180;

        //console.log('radianes', radianes);
        chancla.vx=velocidad * Math.cos( radianes );
        chancla.vy=velocidad * Math.sin( radianes ) - (gravedad * 0.3);
        // console.log('chancla.vx',chancla.vx);
        // console.log('chancla.vy',chancla.vy);

        chancla.drawfin(chancla.vx,chancla.vy);
        //chancla.draw();
        return radianes;
    }

    function aplicarFuerza(){

        console.log('entrozzzzz');
         ctx = canvas.getContext("2d");
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        puntoImpacto(an_gno,vel_gno);
        chancla.draw();

        chancla.x += chancla.vx;
        chancla.y += chancla.vy;

        console.log('chancla x', chancla.x);
        console.log('chancla y', chancla.y);
        // console.log('entro a la fuerzaaaaaaaaz');
    }

    var edificio0=new Building(tipo_edi[0],10);
    var edificio1=new Building(tipo_edi[1],200);
    var edificio2=new Building(tipo_edi[2],400);
    var edificio3=new Building(tipo_edi[3],600);
    var edificio4=new Building(tipo_edi[4],800);
    var edificio5=new Building(tipo_edi[5],1000);

    buildings.push(edificio0,edificio1,edificio2,edificio3,edificio4,edificio5);
  //  console.log('edifcios azar', buildings);
}


function drawBuildings() {
    buildings.forEach(function (edificio) {
        //console.log('tipo',edificio.tipo);
        edificio.draw(edificio.tipo);
    })
}

function make_stage(){
   // console.log('entro a make');
    make_building();
    drawBuildings();

}

class Chancla {
    constructor(x){
        this.ctx = canvas.getContext("2d");
        this.x= x+55;
        this.y= 230;
        this.vx= 5;
        this.vy= 2;
        this.width= 25;
        this.height= 25;
        this.image= new Image();
        this.image.src = './img/characters/chancla.png'
    }
    draw(){
        var img = new Image();

        img.onload = () => {
            this.ctx.drawImage(image,this.x,this.y,this.width,this.height);
        };

    }
    drawfin(x,y){
        var img = new Image();
        console.log('pos inicial','equis',x,'yes',y);
        console.log('pos sumada','equis',this.x+x,'yes',this.y+y);
        var posfinx=this.x+x;
        var posfiny=this.y+y;
        console.log(posfiny, 'posfiny');
        console.log(posfinx, 'posfinx');

        img.onload = () => {
            this.ctx.drawImage(img,posfinx,posfiny,this.width,this.height);
        };
        img.src = './img/characters/cubeta.png'
    }
}

//Creacion de objetos
var fondo=new Background();


fondo.clean();
fondo.draw();
make_stage();
make_gnomo();
make_neighbord();



