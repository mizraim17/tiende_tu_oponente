
var angulo=0,velocidad=0, vy=0,vx=0,x=0,y=0;

    function trayectoria(angulo,velocidad) {


        // console.log('entro a punto de impacto');
        var radianes = (angulo * Math.PI) / 180;


        for(tiempo=1;tiempo<=10;tiempo++){
            vx = velocidad * Math.cos(radianes) * tiempo;
            vy = (velocidad * Math.sin(radianes) + ((1 / 2 * gravedad) * (tiempo * tiempo))) ;
            console.log(' vx',  x);
            console.log(' vy',  y);
            x +=  vx;
            y +=  vy;

        }

    }

    function punto__impacto(angulo,velocidad) {

        vmax= Math.pow(velocidad,2)

    }


    trayectoria(45,10);