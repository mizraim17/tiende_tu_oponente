var canvas = document.getElementById("canvas");
var turno = 0;
var interval = 0;
var d = new Date();
var time = d.getHours();
var day = [
	"./img/fondos/amanecer.png",
	"./img/fondos/atardecer.png",
	"./img/fondos/noche.jpg"
];
var tipo_edificios = [
	"./img/edificios/edifi (1).png",
	"./img/edificios/edifi (2).png",
	"./img/edificios/edifi (3).png",
	"./img/edificios/edifi (4).png",
	"./img/edificios/edifi (5).png",
	"./img/edificios/edifi (6).png"
	// "./img/edificios/edifi (7).png"
];
var tiempo = "",
	buildings = [];
const gravedad = 9.8;
var x = false;

// var completedMusic = new Audio();
// completedMusic.src = "./music/dbz.mp3";
// completedMusic.muted = "muted";
// console.log("completedMusic", completedMusic);

var win = new Audio();
win.src = "./music/youwin.mp3";

var sexplosion = new Audio();
sexplosion.src = "./music/explosion.mp3";

var kame = new Audio();
kame.src = "./music/hadouken.mp3";

var ouch = new Audio();
ouch.src = "./music/ouch.mp3";

angle_gnome = document.getElementById("angulo_gnomo");
velocity_gnomo = document.getElementById("velocidad_gnomo");

angle_neighbord = document.getElementById("angulo_vecina");
velocity_neighbord = document.getElementById("velocidad_vecina");

var butDispara = document.getElementById("btn-shoot");
var butReinicia = document.getElementById("btn-restart");

//clases

class Background {
	constructor() {
		this.ctx = canvas.getContext("2d");
		this.x = 0;
		this.y = 0;
		this.width = canvas.width;
		console.log("canvas.width", canvas.width);

		this.height = canvas.height;
		this.image = new Image();

		// console.log("time", time);
		if (time >= 0 && time <= 11) {
			tiempo = day[0];
			// console.log(" mañana");
		} else if (time > 11 && time <= 20) {
			tiempo = day[1];
			// console.log("tarde");
		} else if (time > 20 && time < 24) {
			tiempo = day[2];
			// console.log("noche");
		}
	}

	clean() {
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	draw() {
		this.image.src = tiempo;

		this.image.onload = () => {
			this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		};
	}
}

class Building {
	constructor(tipo, x) {
		//console.log('tipo',tipo);
		this.ctx = canvas.getContext("2d");
		this.x = x;
		this.y = 342;
		this.width = 220;
		this.height = 307;
		this.image = new Image();
		this.tipo = tipo;
	}
	draw(tipo) {
		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
		};
		img.src = tipo_edificios[tipo];
		// console.log('source',img.src);
	}
}

class Gnomo {
	constructor(x) {
		this.ctx = canvas.getContext("2d");
		this.x = x[0];
		this.y = x[1];
		this.width = 75;
		this.height = 75;
		this.image = new Image();
	}
	draw() {
		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
		};
		img.src = "./img/characters/gnomo_ms.png";
	}
}
function make_gnomo() {
	let x = ["900", "700", "1005"],
		y = ["243", "355", "413", "550"],
		coordG = [];

	function generate_coord() {
		return Math.floor(Math.random() * 3);
	}

	coordG.push(parseInt(x[generate_coord()]));
	coordG.push(parseInt(y[generate_coord()]));

	return coordG;
}

class Neighbor {
	constructor(x) {
		this.ctx = canvas.getContext("2d");
		this.x = x[0];
		this.y = x[1];
		this.width = 75;
		this.height = 75;
		this.image = new Image();
		// console.log('equis',this.x);
		// console.log('yes',this.y);
	}
	draw() {
		// console.log('entro al draw vecina');
		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
		};
		img.src = "./img/characters/vecina.png";
	}
}

class Kaboom {
	constructor() {
		this.ctx = canvas.getContext("2d");
		this.x = 0;
		this.y = 0;
		this.width = 700;
		this.height = 650;
		this.image = new Image();
	}
	draw(x, y) {
		console.log("entro al draw de explosion", "valor x=", x, "valor de y=", y);

		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, x, y, this.width, this.height);
		};
		img.src = "./img/characters/explosion.png";
	}
}

class WinNeigbord {
	constructor() {
		this.ctx = canvas.getContext("2d");
		this.x = 100;
		this.y = 150;
		this.width = 438;
		this.height = 548;
		this.image = new Image();
	}
	draw() {
		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
		};
		img.src = "./img/fondos/win_vecina.png";
	}
}
class WinGnomo {
	constructor() {
		this.ctx = canvas.getContext("2d");
		this.x = 500;
		this.y = 100;
		this.width = 438;
		this.height = 548;
		this.image = new Image();
	}
	draw() {
		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
		};
		img.src = "./img/fondos/win_gnomo.png";
	}
}

function colisiones() {
	// console.log('chancla y',Math.trunc (chancla.y));
	// console.log('gnomoss y',gnomoss.y+gnomoss.height);
	// console.log('chancla x',Math.trunc (chancla.x));
	// console.log('gnomoss x',gnomoss.x+gnomoss.width);
	if (
		gnomoss.x < chancla.x + chancla.width &&
		gnomoss.x + gnomoss.width > chancla.x &&
		gnomoss.y < chancla.y + chancla.height &&
		gnomoss.y + gnomoss.height > chancla.y
	) {
		console.log("choco");
		x = true;
		clearInterval(interval);

		//console.log("gonomo x",gnomoss.x,"gonomo y",gnomoss.y,)
		ouch.play();
		sexplosion.play();
		explosion.draw(gnomoss.x - 300, gnomoss.y - 150);
		ganoV();
	}
}

function ganoV() {
	ganoVecina.draw();
	win.play();
}

function ganoG() {
	ganoGnomo.draw();
	win.play();
}

function colisionesV() {
	// console.log('chancla y',Math.trunc (chancla.y));
	// console.log('gnomoss y',gnomoss.y+gnomoss.height);
	// console.log('chancla x',Math.trunc (chancla.x));
	// console.log('gnomoss x',gnomoss.x+gnomoss.width);
	if (
		vecina.x < cubeta.x + cubeta.width &&
		vecina.x + vecina.width > cubeta.x &&
		vecina.y < cubeta.y + cubeta.height &&
		vecina.y + vecina.height > cubeta.y
	) {
		console.log("choco");
		x = true;
		clearInterval(interval);
		fondo.ctx.font = "50px Avenir";
		fondo.ctx.fillText("Gano Vecina", 210, 180);
		//console.log("gonomo x",gnomoss.x,"gonomo y",gnomoss.y,)
		ouch.play();
		sexplosion.play();
		explosion.draw(vecina.x - 300, vecina.y - 150);
		ganoG();
		return x;
	}
}

function make_neighbord() {
	let coorx_neighbord = ["50", "150", "250", "350"],
		coory_neigbord = ["270", "375", "440", "575"],
		coordNeigh = [],
		maxRan = 4;

	coordNeigh[0] = parseInt(coorx_neighbord[Math.floor(Math.random() * maxRan)]);
	coordNeigh[1] = parseInt(coory_neigbord[Math.floor(Math.random() * maxRan)]);

	return coordNeigh;
}

function make_building() {
	let tipo_edi = [],
		i = 0;

	while (tipo_edi.length != 6) {
		ranNumb = Math.floor(Math.random() * 6).toString();
		if (tipo_edi.indexOf(ranNumb) == -1) {
			tipo_edi[i] = ranNumb.toString();
			i++;
		}
	}

	var edificio0 = new Building(tipo_edi[0], 10);
	var edificio1 = new Building(tipo_edi[1], 210);
	var edificio2 = new Building(tipo_edi[2], 410);
	var edificio3 = new Building(tipo_edi[3], 610);
	var edificio4 = new Building(tipo_edi[4], 810);
	var edificio5 = new Building(tipo_edi[5], 1010);

	buildings.push(
		edificio0,
		edificio1,
		edificio2,
		edificio3,
		edificio4,
		edificio5
	);
}

butReinicia.onclick = function() {
	console.log("q trae canvas", canvas.ctx);
	location.reload();
	console.log("entor a reincia ");
	start();
};

$("#btn-shoot").on("click", function(e) {
	e.preventDefault();

	if ($("#gnomo").hasClass("show")) {
		$("#gnomo").hide();
		$("#vecina").show();
		console.log("entro if gnomo ");
	} else {
		$("#vecina").hide();
		$("#gnomo").show();
		console.log("entro a else vecina");
	}
});

butDispara.onclick = function() {
	kame.play();
	an_gno = parseInt(angle_gnome.value);
	vel_gno = parseInt(velocity_gnomo.value);
	an_vec = parseInt(angle_neighbord.value);
	vel_vec = parseInt(velocity_neighbord.value);

	interval = setInterval(aplicarFuerza, 1000 / 60);
};
function aplicarFuerza() {
	ctx = canvas.getContext("2d");
	// ctx.clearRect(0, 0, canvas.width, canvas.height);

	if (turno === 0) {
		// console.log('entrop al turno 1');
		fondo.draw();
		drawBuildings();
		vecina.draw();
		gnomoss.draw();
		cubeta.draw();
		// cubeta.clean();
		puntoImpacto(an_vec, vel_vec);
	} else {
		fondo.draw();
		drawBuildings();
		vecina.draw();
		gnomoss.draw();
		cubeta.draw();
		puntoImpactoV(an_gno, vel_gno);
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
	console.log("entro a cambiar turno", fondo);
	clearInterval(interval);
	fondo.ctx.font = "30px Avenir";
	fondo.ctx.fillText("Le toca a tu oponente", 210, 180);
	turno = 1;
}
function puntoImpacto(angulo, velocidad) {
	// console.log('angulo',angulo);
	// console.log('velocidad',velocidad);

	var radianes = (angulo * Math.PI) / 180;
	// console.log("radianes", radianes);

	chancla.vx = (velocidad * Math.cos(radianes)) / 15;
	chancla.vy = (velocidad * Math.sin(radianes) - (1 / 2) * gravedad) / 100;

	chancla.x += chancla.vx;
	chancla.y -= chancla.vy;

	chancla.drawfin(chancla.vx, chancla.vy);

	// console.log("chancla.vx", chancla.x);
	// console.log("chancla.vy--->", chancla.y);
	// console.log("fondo.width--->", fondo.height);

	colisiones();

	if (chancla.x > fondo.width || chancla.y < -60) {
		console.log("entro al if");
		console.log("cha y", chancla.y);
		console.log("cha x", chancla.x);
		console.log("fon x", fondo.width);
		console.log("fond y", fondo.height);
		console.log("entro al if");
		changeturn();
	}
}

function puntoImpactoV(angulo, velocidad) {
	// console.log('angulo',angulo);
	// console.log('velocidad',velocidad);

	var radianes = (angulo * Math.PI) / 180;
	// console.log('radianes',radianes);

	cubeta.vx = ((velocidad * Math.cos(radianes)) / 15) * -1;
	cubeta.vy = (velocidad * Math.sin(radianes) - (1 / 2) * gravedad) / 100;

	cubeta.x += cubeta.vx;
	cubeta.y -= cubeta.vy;

	cubeta.drawfin(cubeta.vx, cubeta.vy);

	// console.log('cubeta.vx', cubeta.x);
	console.log("cubeta--->", cubeta.y);
	console.log("cubetaxxxxxxx>", cubeta.x);
	console.log("fondo.width--->", fondo.width);

	colisionesV();

	if (cubeta.x < fondo.width || cubeta.y < -95) {
		console.log("entro al if");
		console.log("cha y", cubeta.y);
		console.log("cha x", cubeta.x);
		console.log("fon x", fondo.width);
		console.log("fond y", fondo.height);
		console.log("entro al if");
		changeturn();
	}
}

function drawBuildings() {
	buildings.map((edificio, i) => {
		edificio.draw(edificio.tipo);
	});
}

function make_stage() {
	make_building();
	drawBuildings();
}

class Chancla {
	constructor(x, y) {
		this.ctx = canvas.getContext("2d");
		console.log("x-cha", x);
		this.x = x + 40;
		this.y = y - 30;
		this.vx = x + 55;
		this.vy = y;
		this.width = 55;
		this.height = 55;
		this.image = new Image();
	}
	draw() {
		// console.log('emtro al draw chancla' );
		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
		};
		img.src = "./img/characters/chancla.png";
	}

	drawfin(x, y) {
		var img = new Image();
		// console.log('pos inicial','equis',x,'yes',y);
		// console.log('pos sumada','equis',this.x+x,'yes',this.y+y);
		var posfinx = this.x + x;
		var posfiny = this.y + y;
		// console.log('posfin y',posfiny);
		// console.log('posfin x',posfinx);

		img.onload = () => {
			this.ctx.drawImage(img, posfinx, posfiny, this.width, this.height);
		};
		img.src = "./img/characters/chancla.png";
	}
}

class Cube {
	constructor(x, y) {
		this.ctx = canvas.getContext("2d");
		console.log("x", x);

		this.x = x + 50;
		this.y = y - 50;
		this.vx = x + 55;
		this.vy = y;
		this.width = 55;
		this.height = 90;
		this.image = new Image();
	}
	draw() {
		console.log("emtro al draw cubeta");
		var img = new Image();
		img.onload = () => {
			this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
		};
		img.src = "./img/characters/cubeta.png";
	}

	clean() {
		// context.clearRect(0, 0, width, height);
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	drawfin(x, y) {
		var img = new Image();
		// console.log('pos inicial','equis',x,'yes',y);
		// console.log('pos sumada','equis',this.x+x,'yes',this.y+y);
		var posfinx = this.x + x;
		var posfiny = this.y + y;
		// console.log('posfin y',posfiny);
		// console.log('posfin x',posfinx);

		img.onload = () => {
			this.ctx.drawImage(img, posfinx, posfiny, this.width, this.height);
		};
		img.src = "./img/characters/cubeta.png";
	}
}

//Creacion de objetos
var fondo = new Background();
var vecina = new Neighbor(make_neighbord());
var gnomoss = new Gnomo(make_gnomo());
var chancla = new Chancla(vecina.x, vecina.y);
var cubeta = new Cube(gnomoss.x, gnomoss.y);
var explosion = new Kaboom();
var ganoVecina = new WinNeigbord();
var ganoGnomo = new WinGnomo();

// console.log('vecina', vecina.x);

function start() {
	fondo.clean();
	fondo.draw();
	make_stage();
	vecina.draw();
	gnomoss.draw();
	chancla.draw();
	cubeta.draw();

	document.getElementById("iniciar").onclick = function() {
		let music_background = document.getElementById("audioIntro");
		music_background.play();
	};
}
start();
