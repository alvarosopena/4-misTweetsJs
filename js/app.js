//Variables
const formulario = document.querySelector("#formulario");
const listaTw = document.querySelector("#lista-tweets");
let tweets = [];

//Event Listeners
eventlisteners ();

function eventlisteners(){
    //Cuando el usario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTw);

    //Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse( localStorage.getItem ("tweets") ) || []; //los trae de LS o hace un arreglo vacío

        console.log(tweets);

        crearHTML();
    })
}


//Funciones
function agregarTw(e){
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;

    //validación
    if(tweet === ""){
        mostrarError("No puede ir vacio")
        return;
    }

    const twObj = {
        id:Date.now(),
        tweet: tweet,
    }

    //Añadir al arrego de tweets
    tweets = [... tweets, twObj];
    console.log(tweets);

    //una vez agregado vamos a crear el HTML
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}

//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    //Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
   
    //Elimina la alerta despues de 3 seg
    const errores = document.querySelectorAll(".error");

    if( errores.length === 0 ){
        contenido.appendChild(mensajeError);
    }

    setTimeout(() => {
       
        mensajeError.remove();
    }, 3000);

}

//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0 ){
        tweets.forEach( tweet => {
            //Agregar boton eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText="X";

            //añadir la funcion de eliminar 
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id); //le pasamos el id del objtw que construimos
            }

            //Crear html
            const li = document.createElement("li");

            //añadir el texto
            li.innerText = tweet.tweet;

            //asignar boton
            li.appendChild(btnEliminar);

            //agregarlo en el html
            listaTw.appendChild(li);
        });

    };

    sincronizarStorage();
}

//Agrega los tw actuales a LS
function sincronizarStorage(){
    localStorage.setItem("tweets" , JSON.stringify(tweets))
}

//limpiar HTML
function limpiarHTML(){
    while ( listaTw.firstChild ) {
        listaTw.removeChild(listaTw.firstChild);
    }
}

//elimina Tweet
function borrarTweet(id){
    tweets = tweets.filter ( tweet => tweet.id !== id) //Se arma el nuevo arreglo con los id que no seleccionamos para borrar
    console.log(tweets)

    crearHTML();
}