
var angulo=111,velocidad=111, vy,vx,x=0,y=0,gravedad=9.81;

    function trayectoria(angulo,velocidad) {


        // console.log('entro a punto de impacto');
        var radianes = (angulo * Math.PI) / 180;


        for(tiempo=1;tiempo<=10;tiempo++){
            vx = (velocidad * Math.cos(radianes)) ;
            vy = (velocidad * Math.sin(radianes) + ((1 / 2 * gravedad))) ;

            console.log(' x',  x);
            console.log(' y',  y);

            x +=  vx;
            y +=  vy;

        }

    }

    function punto__impacto(angulo,velocidad) {

        vmax= Math.pow(velocidad,2)

    }


    trayectoria(45,100);