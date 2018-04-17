//arrays vacios para llenarlos con botones de tipo simbolo-numero-operacion.
var simbolos=[],
    numeros=[],
    operaciones=[],
    //expresiones regulares de botones
    test_simbolo= /simbolo/,
    test_numero= /numero/,
    test_operacion= /operacion/,
    //expresiones regulares de simbolos
    test_borrar= /borrar/,
    test_punto= /punto/,
    //expresiones regulares de operaciones
    test_sumar= /sumar/,
    test_restar= /restar/,
    test_multiplicar= /multiplicar/,
    //almacenamos el valor del input como cadena de texto en la sigt variable.
    valor_input= document.getElementById('input-calc'),
    //extraer todos los div con la clase boton y agruparlos en el array botones.
    botones = document.getElementsByClassName('boton'),
    //variable valor almacena siempre el valor que tiene el input en la actualidad.
    valor = '',
    //variables que guardaran resultados de sumas multiplicaciones divisiones y restas.
    dividir,
    sumar,
    restar,
    multiplicar,
    //Almacena el resultado obtenido por igual;
    resultadoDeIgual;
    

//RECORREMOS LOS BOTONES Y LOS DIVIMOS SEGUN EL TIPO EN DIFERENTES ARRAYS.
for(var i in botones){
    if(test_simbolo.test(botones[i].className)){
        simbolos.push(botones[i]);
    }else if(test_numero.test(botones[i].className)){
        numeros.push(botones[i]);
    }else if(test_operacion.test(botones[i].className)){
        operaciones.push(botones[i]);
    };
}
//COMPROBAMOS QUE LAS DIVISIONES SE REALIZEN BIEN 
//console.log(simbolos);
//console.log(numeros);
//console.log(operaciones);

//RECORREMOS LOS SIMBOLOS PARA PONERLOS A LA ESCUCHA
for(let a in simbolos){
    if(test_borrar.test(simbolos[a].className)){
        simbolos[a].addEventListener('click', Resetear);
    }else if(test_punto.test(simbolos[a].className)){ 
        simbolos[a].addEventListener('click', Agregar_punto);
    }else{
        simbolos[a].addEventListener('click', Simbolo_igual);
    }
}

//RECORREMOS LAS OPERACIONES PARA PONERLAS A LA ESCUCHA
/*****************************************************
    SOLO FALTA CONSEGUIR QUE LAS OPERACIONES NO SE 
    MOLESTEN ENTRE ELLAS ES DECIR QUE SI APRETO UNA
    NO PUEDA APRETAR OTRA Y ESTO TERMINE EN UN BUG.
 *****************************************************/
for(let o in operaciones){
    if(test_sumar.test(operaciones[o].className)){
        operaciones[o].addEventListener('click', Suma);
    }else if(test_restar.test(operaciones[o].className)){
        operaciones[o].addEventListener('click', Resta);
    }else if(test_multiplicar.test(operaciones[o].className)){
        operaciones[o].addEventListener('click', Multiplicacion);
    }else{
        operaciones[o].addEventListener('click', Division);
    }
}

//RECORREMOS LOS NUMEROS Y LOS PONEMOS TODOS A LA MISMA ESCUCHA
//LUEGO DENTRO DE LA FUNCION DISTINGIMOS CUAL NUMERO ES CUAL.
for (let n in numeros){
    numeros[n].addEventListener('click', Numeros);
}

//FUNCIONES CREADAS HASTA AHORA
var e;
function Resetear(){
    //por ahora solo resetea el input a 0.
    valor_input.value= '0';
    if(this.className == simbolos[0].className){
        simbolos[0].onfocus = (function(){
            sumar=undefined;
            multiplicar=undefined;
            dividir=undefined;
            restar=undefined;
            valor= '';
            transform= true;
            resultadoDeIgual= undefined;
            
        })();
    }
};

function Agregar_punto(){
    //comprobamos que funciona
    console.log('Agregar punto');
    //se evalua si hay o no todabia algun punto 
    if(!(/\./.test(valor_input.value))){
        valor_input.value += '.';
        valor= valor_input.value;
    }
    
};

function Simbolo_igual(){
    //comprobamos que funciona
    console.log('Simbolo igual');
    if(sumar || restar || multiplicar || dividir){
        if (sumar) {
            valor_input.value = Number(valor_input.value) + sumar;
            sumar = undefined;
            //este resultado tiene que ingresar al operando que aprete.
            resultadoDeIgual = Number(valor_input.value);
        } else if(restar){
            valor_input.value = restar - Number(valor_input.value);
            restar = undefined;
            resultadoDeIgual = Number(valor_input.value);
        }else if(multiplicar){
            valor_input.value = Number(valor_input.value) * multiplicar;
            multiplicar = undefined;
            resultadoDeIgual = Number(valor_input.value);
        }else{
            valor_input.value = dividir / Number(valor_input.value);
            dividir = undefined;
            resultadoDeIgual = Number(valor_input.value);
        }
    }
};


function Resta(){
    //comprobamos que funciona
    if(dividir || sumar || multiplicar){
        if(dividir){
            valor_input.value = dividir/Number(valor);
            dividir= Number(valor_input.value);
            valor =valor_input.value+'';
        }else if(sumar){
            valor_input.value = sumar+Number(valor);
            sumar= Number(valor_input.value);
            valor =valor_input.value+'';
        }else if(multiplicar){
            valor_input.value = multiplicar*Number(valor);
            multiplicar= Number(valor_input.value);
            valor =valor_input.value+'';
        }
    }
    console.log('Resta');
    //Resta
    if(restar != 0){
        if(restar){
            //el input realiza la suma
            valor_input.value = restar - Number(valor);
            //sumar adquiere el valor de input para luego realizar la siguiente suma.
            restar= Number(valor_input.value);
            valor =String(valor_input.value);
            transform= true;
        }else if(dividir){
            restar= dividir;
            valor =String(restar);
            dividir= undefined;
            transform= true;
        }else if(sumar){
            restar= sumar;
            valor =String(restar);
            sumar= undefined;
            transform= true;
        }else if(multiplicar){
            restar= multiplicar;
            valor =String(restar);
            multiplicar= undefined;
            transform= true;
        }else{
            if(resultadoDeIgual){
                restar = Number(resultadoDeIgual);
                valor = String(restar);
                resultadoDeIgual = undefined;
                transform = true;
            }else{
                restar = Number(valor);
            }
        }
    }else if(restar == 0){
        valor_input.value = restar - Number(valor);
        restar = Number(valor_input.value);
        valor =valor_input.value+'';
        transform=true;
    }
};

function Multiplicacion(){
    //comprobamos que funciona
    if(dividir || sumar || restar){
        if(dividir){
            valor_input.value = dividir/Number(valor);
            dividir= Number(valor_input.value);
            valor =valor_input.value+'';
        }else if(sumar){
            valor_input.value = sumar+Number(valor);
            sumar= Number(valor_input.value);
            valor =valor_input.value+'';
        }else if(restar){
            valor_input.value = restar-Number(valor);
            restar= Number(valor_input.value);
            valor =valor_input.value+'';
        }
    }
    console.log('Multiplicacion');
    if(multiplicar != 0){
        if(multiplicar){
            //el input realiza la suma
            valor_input.value = Number(valor)*multiplicar;
            //sumar adquiere el valor de input para luego realizar la siguiente suma.
            multiplicar= Number(valor_input.value);
            valor =String(valor_input.value);
            transform= true;
        }else if(dividir){
            multiplicar= dividir;
            valor =String(multiplicar);
            dividir= undefined;
            transform= true;
        }else if(restar){
            multiplicar= restar;
            valor =String(multiplicar);
            restar= undefined;
            transform= true;
        }else if(sumar){
            multiplicar= sumar;
            valor =String(multiplicar);
            sumar= undefined;
            transform= true;
        }else{
            if(resultadoDeIgual){
                multiplicar = Number(resultadoDeIgual);
                valor = String(multiplicar);
                resultadoDeIgual = undefined;
                transform = true;
            }else{
                multiplicar = Number(valor);
            }
        }
    }else if(multiplicar == 0){
        valor_input.value = Number(valor)*multiplicar;
        multiplicar= Number(valor_input.value);
        valor =valor_input.value+'';
        transform=true;
    }
};

function Division(){

    //OBSERVACION TENGO PROBLEMAS EN LA INTERACCION ENTRE LA SUMA Y LA DIVISION 
    //POR SEPARADO NO TIENEN PROBLEMAS
    
    if(multiplicar || sumar || restar){
        if(multiplicar){
            valor_input.value = multiplicar*Number(valor);
            multiplicar= Number(valor_input.value);
            valor =valor_input.value+'';
        }else if(sumar){
            valor_input.value = sumar+Number(valor);
            sumar= Number(valor_input.value);
            valor =valor_input.value+'';
        }else if(restar){
            valor_input.value = restar-Number(valor);
            restar= Number(valor_input.value);
            valor =valor_input.value+'';
        }
    }
    //comprobamos que funciona
    console.log('Division');
    if(dividir != 0){
        if(dividir){
            valor_input.value = dividir/Number(valor);
            dividir= Number(valor_input.value);
            valor =String(valor_input.value);
            transform= true;
        }else if(sumar){
                dividir=sumar;
                valor =String(dividir);
                sumar= undefined;
                transform= true;
        }else if(restar){
                dividir=restar;
                valor =String(dividir);
                sumar= undefined;
                transform= true;
        }else if(multiplicar){
            dividir=multiplicar;
            valor =String(dividir);
            sumar= undefined;
            transform= true; 
        }else{
            if(resultadoDeIgual){
                dividir = Number(resultadoDeIgual);
                valor = String(dividir);
                resultadoDeIgual = undefined;
                transform = true;
            }else{
                dividir = Number(valor);
            }
        }
    }else if(dividir == 0){
    valor_input.value = dividir/Number(valor);
    dividir= Number(valor_input.value);
    valor =String(valor_input.value);
    transform=true;
}
};
//HAY UN BUG CUANDO LAS OPERACIONES INTERACTUAN ENTRE SI PERO ALMENOS CADA UNA LA DIVISION Y LA SUMA OPERAN BIEN

function Suma(){
    //no devo resetear cuando lo aprete 
    //devo resetear cuando presione un numero
    //Resetear();
    if(multiplicar || dividir || restar){
        if(multiplicar){
            valor_input.value = multiplicar*Number(valor);
            multiplicar= Number(valor_input.value);
            valor =String(valor_input.value);
        }else if(dividir){
            valor_input.value = dividir/Number(valor);
            dividir= Number(valor_input.value);
            valor =String(valor_input.value);
        }else if(restar){
            valor_input.value = restar-Number(valor);
            restar= Number(valor_input.value);
            valor =String(valor_input.value);
        }
    }
    //Suma
    if(sumar != 0){
        if(sumar){
            //el input realiza la suma
            valor_input.value = Number(valor)+sumar;
            //sumar adquiere el valor de input para luego realizar la siguiente suma.
            sumar= Number(valor_input.value);
            valor =String(valor_input.value);
            transform= true;
        }else if(dividir){
            sumar= dividir;
            valor =String(sumar);
            dividir= undefined;
            transform= true;
        }else if(restar){
            sumar= restar;
            valor =String(sumar);
            restar= undefined;
            transform= true;
        }else if(multiplicar){
            sumar= multiplicar;
            valor =String(sumar);
            multiplicar= undefined;
            transform= true;
        }else{
            if(resultadoDeIgual){
                sumar = Number(resultadoDeIgual);
                valor = String(sumar);
                resultadoDeIgual = undefined;
                transform = true;
            }else{
                sumar = Number(valor);
            }
        }
    }else if(sumar == 0){
        valor_input.value = Number(valor)+sumar;
        sumar= Number(valor_input.value);
        valor =String(valor_input.value);
        transform=true;
    }
};
var transform= true;
function Numeros(e){
    //comprobamos que funciona
    console.log('Numeros');
    console.log(e.target.className)
    //EN ESTA FUNCION DEVO DISERNIR CUAL NUMERO ES CUAL PARA IMPRIMIRLO EN EL INPUT.
    if((sumar != undefined)||(restar != undefined)||(multiplicar != undefined)||(dividir != undefined)){
        console.log(transform)
        if(transform){
            valor_input.value = '';
            transform=false;
            // sumar = undefined;
            // restar= undefined;
            // multiplicar= undefined;
            // dividir= undefined;
        };
           
       switch(e.target.className){
            case numeros[0].className:
                valor_input.value +='7';
                valor= valor_input.value;
                break;
            case numeros[1].className:
                valor_input.value +='8';
                valor= valor_input.value;
                break;
            case numeros[2].className:
                valor_input.value +='9';
                valor= valor_input.value;
                break;
            case numeros[3].className:
                valor_input.value +='4';
                valor= valor_input.value;
                break;
            case numeros[4].className:
                valor_input.value +='5';
                valor= valor_input.value;
                break;
            case numeros[5].className:
                valor_input.value +='6';
                valor= valor_input.value;
                break;
            case numeros[6].className:
                valor_input.value +='1';
                valor= valor_input.value;
                break;
            case numeros[7].className:
                valor_input.value +='2';
                valor= valor_input.value;
                break;
            case numeros[8].className:
                valor_input.value +='3';
                valor= valor_input.value;
                break;
            case numeros[9].className:
                valor_input.value +='0';
                valor= valor_input.value;
                break;
        }
    }else{
        //verifica si en el input hay un zero solo 
        //en caso de aver solo un cero lo elimina y continua haci el switch.
        if(valor_input.value == '0'){
            valor_input.value = '';
        }

        //este switch verifica cual numero fue presionado
        //y en vase a que numero sea lo agrega al valor del 
        //input, Ademas iguala el input actual a la variable valor 
        //de esta forma almacenando siempre lo que tenemos en el input
        //en la variable valor.
        switch(e.target.className){
            case numeros[0].className:
                valor_input.value +='7';
                valor= valor_input.value;
                break;
            case numeros[1].className:
                valor_input.value +='8';
                valor= valor_input.value;
                break;
            case numeros[2].className:
                valor_input.value +='9';
                valor= valor_input.value;
                break;
            case numeros[3].className:
                valor_input.value +='4';
                valor= valor_input.value;
                break;
            case numeros[4].className:
                valor_input.value +='5';
                valor= valor_input.value;
                break;
            case numeros[5].className:
                valor_input.value +='6';
                valor= valor_input.value;
                break;
            case numeros[6].className:
                valor_input.value +='1';
                valor= valor_input.value;
                break;
            case numeros[7].className:
                valor_input.value +='2';
                valor= valor_input.value;
                break;
            case numeros[8].className:
                valor_input.value +='3';
                valor= valor_input.value;
                break;
            case numeros[9].className:
                valor_input.value +='0';
                valor= valor_input.value;
                break;
        }
    }
    //solo verifica el valor de valor 
    console.log(valor);
    
}
    
    
    
    
    