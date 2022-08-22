const buttonStart = document.querySelector('.buttonStart');
const jugada = document.querySelector('#jugada');
const buttonDobla = document.querySelector('.buttonDobla'); 
const mensaje = document.querySelector('.mensaje');
const look1 = document.querySelector('.look1');
const look2 = document.querySelector('.look2');
const look3 = document.querySelector('.look3');
const look4 = document.querySelector('.look4');
const start = document.querySelector('.start');
const dobla = document.querySelector('.dobla');
const sonido = cargarSonido("sonido.flac");
const sonidoStop = cargarSonido("sonido2.flac");
const sonidoPremio = cargarSonido("sonido3.flac");
let play = false
let visibleGiro = false
let puntos = 15
let monedas 
let costo
const banner = 'banner';

/** asignamos frutas a los numeros del azar y añadimos al array las frutas */
function azar(num1,num2,num3){
    let array = [] ;

/** elegimos numero aleatorios y asignamos frutas */
/** num1 aleatorio */
  
    if (num1 == 0){
        num1 = '🍒'
    } else if (num1 == 1){
        num1 = '🍓'
    }else if (num1 == 2){
        num1 = '🍍'
    }else if (num1 == 3){
        num1 = '🥝'
    }else if (num1 == 4){
        num1 = '🍉'
    }
    console.log ('num1 = ',num1);
       
/** num2 aleatorio */
    
    if (num2 == 0){
        num2 = '🍒'
    } else if (num2 == 1){
        num2 = '🍓'
    }else if (num2 == 2){
        num2 = '🍍'
    }else if (num2 == 3){
        num2 = '🥝'
    }else if (num2 == 4){
        num2 = '🍉'
    }console.log ('num2 = ',num2);
   
/** num3 aleatorio */
   
    if (num3 == 0){
        num3 = '🍒'
    } else if (num3 == 1){
        num3 = '🍓'
    }else if (num3 == 2){
        num3 = '🍍'
    }else if (num3 == 3){
        num3 = '🥝'
    }else if (num3 == 4){
        num3 = '🍉'
    }console.log ('num3 = ',num3);
    
    apuesta(num1,num2,num3);

/** añadimos frutas al array */

    array.push(num1,num2,num3);
    console.log('guarda el array de frutas ',array);   
}

/** escuchamos el click, comprobamos que los puntos no pasen de 0 y ejecutamos play y refrespuntos */
buttonStart.addEventListener('click',() => { 
    console.log('click del START/STOP');

     /** activ/desac sonido */
    if (!play) {
        startSonido()
        } else {stopSonido();
            stopResetSonido();
            sonidoParada()}
      
    document.getElementById('mensajeBanner').classList.remove(banner);
    document.getElementById('mensajeBanner').innerHTML = '';

    costo = 1
    ruleta(costo)  
})

/** mismo click dobla */
buttonDobla.addEventListener('click',() => {
    console.log('click del DOBLA/STOP');

    document.getElementById('mensajeBanner').classList.remove(banner);
    document.getElementById('mensajeBanner').innerHTML = ''
   
    if (puntos == 1){
        mensajeSinMonedas()
        return
    }else if (puntos >= 0){

        /** activ/desac sonido */
        if (!play) {
            startSonido()
            } else {stopSonido();
                stopResetSonido();
                sonidoParada()
            }
    
        costo = 2
        ruleta(costo)
    }
}) 

/** creamos numeroa al azar  */
function numAzar(costo){
                   
    let num1 = parseInt(Math.random()*5);
    let num2 = parseInt(Math.random()*5);
    let num3 = parseInt(Math.random()*5);

    azar(num1,num2,num3);

    premio(num1,num2,num3,costo)
}

/** funcion de añadir frutas a html para ver frutas en pantalla */
function apuesta(num1,num2,num3){

    console.log('vemos resultado frutas en pantalla');
    
    document.getElementById('primFrut').innerHTML = num1
    document.getElementById('segunFrut').innerHTML = num2
    document.getElementById('terceFrut').innerHTML = num3
}

/** refrescamos los puntos totales en pantalla */
function refresPuntos(puntos){
      
    document.getElementById('puntos').innerHTML = puntos;
    console.log('escribe en pantalla', puntos, 'monedas')
}

/** cumprueba premio, sumamos los puntos segun el premio */
function premio(num1,num2,num3,costo){
    
    console.log('comprobamos si hay premio');
    if (num1 === num2 && num1 === num3) {
        console.log('GANAS!!!!!!');
        
        if (num1 == 0){
            puntos = puntos + (2*costo)
            monedas = (2*costo);
            console.log('suma: ',monedas, 'monedas')
        } else if (num1 == 1){
            puntos = puntos + (5*costo)
            monedas = (5*costo);
            console.log('suma: ',monedas, 'monedas')
        }  else if (num1 == 2){
            puntos = puntos + (10*costo)
            monedas = (10*costo);
            console.log('suma: ',monedas, 'monedas')
        }  else if (num1 == 3){
            puntos = puntos + (20*costo)
            monedas = (20*costo);
            console.log('suma: ',monedas, 'monedas')
        }  else if (num1 == 4){
            puntos = puntos + (30*costo)
            monedas = (30*costo);
            console.log('suma: ',monedas, 'monedas')
        } mensajePremio(monedas);
    } refresPuntos(puntos);  
}

/** mensaje para reiniciar el juego */
function finjuego(){
    alert('               Fin del Juego!!!... Te quedaste sin monedas                                Quieres jugar de nuevo??')
    
    document.getElementById('mensajeBanner').classList.add(banner);
    
    console.log('aparece banner de inicio juego');
    
    document.getElementById('mensajeBanner').innerHTML = 'Vamos a intentarlo de nuevo..............................    MUCHA SUERTE!!!'
   
    puntos = 15 ;
    
    document.getElementById('puntos').innerHTML = puntos; 
    
    stopSonido();
    stopResetSonido()  
}

/** mensaje Ganas monedas */
function mensajePremio(monedas) {
    sonidoGana()
    console.log('aparece banner de ganar');
    document.getElementById('mensajeBanner').classList.add(banner);
    document.getElementById('mensajeBanner').innerHTML = `ENHORABUENA!!!  HAS GANADO............................    ${monedas} MONEDAS 💰`
 
    console.log('Ganas....', monedas , ' monedas')
}

/** mensaje monedas isuficientes */
function mensajeSinMonedas(){
    console.log('aparece banner de monedas insuficientes');
    document.getElementById('mensajeBanner').classList.add(banner);
    document.getElementById('mensajeBanner').innerHTML = `NO tienes monedas suficientes para jugar doble!!!!... solo te queda 1 MONEDA 💰`
}

// /** creamos movimiento ruleta de las frutas START Y STOP */
function ruleta(costo){
    if (puntos == 0){
        finjuego();
        return
    } else if (puntos > 0){
   
        if (!visibleGiro){ 
            console.log('gira las frutas');
            console.log('intercambio de la visibilidad de las frutas')
            look1.style.display= 'flex';
            look2.style.display= 'flex';
            look3.style.display= 'flex';
            look4.style.display= 'none';
            visibleGiro = true;
            document.getElementById('start').innerHTML = 'STOP';
            document.getElementById('dobla').innerHTML = 'STOP';
        
            return visibleGiro
        } 
        
        if (visibleGiro){ 
            console.log('para de girar las frutas');
            console.log('intercambio de la visibilidad de las frutas')
            
            look1.style.display= 'none';
            look2.style.display= 'none';
            look3.style.display= 'none';
            look4.style.display= 'flex';

            visibleGiro = false

            document.getElementById('start').innerHTML = 'START';
            document.getElementById('dobla').innerHTML = 'DOBLA';
            
            puntos = puntos - costo;
            numAzar(puntos,costo);
                   
            return visibleGiro
        }
    }
}     

// */ Carga un sonido a través de su fuente y lo metemos en html
function cargarSonido(fuente) {
    const sonido = document.createElement("audio");
    sonido.src = fuente;
    sonido.setAttribute("preload", "auto");
    sonido.setAttribute("controls", "none");
    sonido.style.display = "none"; 
    document.body.appendChild(sonido);
    return sonido;
};

/** carga sonido2 */
function cargarSonido2(fuente) {
    const sonidoStop = document.createElement("audio");
    sonidoStop.src = fuente;
    sonidoStop.setAttribute("preload", "auto");
    sonidoStop.setAttribute("controls", "none");
    sonidoStop.style.display = "none"; // <-- oculto
    document.body.appendChild(sonidoStop);
    return sonido2;
};

/** carga sonido3 */
function cargarSonido3(fuente) {
    const sonidoPremio = document.createElement("audio");
    sonidoPremio.src = fuente;
    sonidoPremio.setAttribute("preload", "auto");
    sonidoPremio.setAttribute("controls", "none");
    sonidoPremio.style.display = "none"; // <-- oculto
    document.body.appendChild(sonidoStop);
    return sonidoPremio;
};

// reproducir sonidoPremio
function sonidoGana(){
    console.log('reproduce sonido premio')
    sonidoPremio.play();
}

// reproducir sonidoStop
function sonidoParada(){
    console.log('reproduce sonido stop')
    sonidoStop.play();
}

// reproducir sonido
function startSonido(){
    console.log('reproduce sonido start')
    sonido.play();
    play = true;
    return play
}

/** parar sonido */     
function stopSonido(){
    sonido.pause()
    play = false;
    return play
};  

/** resetear sonido */
function stopResetSonido(){
    sonido.currentTime = 0;
};

