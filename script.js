//pegando o botao start
const btnStart = document.getElementById("submit");

let yearIsValid = true;
let monthIsValid = true;
let dayIsValid = true;
let eventNameIsValid = true;

//funcao do botao start
btnStart.addEventListener("click", () => {
    
    //pegando o cronometro que sera mostrado na tela    
    display = document.getElementById("timer");

    //chamando funcao que valida o forms
    validatingTheInputtedData();

    //coloca na tela o nome do evento inputado
    const paragraph = document.getElementById("event");
    paragraph.innerHTML = `event name: ${document.getElementById("txtNome").value}`;

    //chamando funcao que dispara cronometro
    timer(display);
});

//variavel pra ligar o alarme
let alarm = false;

//funcao que liga ou desliga o alarme
turnTheAlarmOnOrOff();

//funcao que dispara o cronometro
const timer = (display) => {

    //executar uma funcao a cada um segundo
    let intervalo = setInterval(() => {

        //capturando os valores inputados que irao mudar a cada segundo
        let year = document.getElementById("year").value;
        let month = document.getElementById("month").value;   
        let day = document.getElementById("day").value;
        let hours = document.getElementById('hour').value;
        let minutes = document.getElementById("minute").value;
        let seconds = document.getElementById("second").value;
        
        //montando a data no formato May 23, 2023 hh:MM:ss
        const date = `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`;

        //contando os millissegundos desde a data inputada ate a data/hora corrente
        const countDateMilisseconds = new Date(date).getTime();
        const now = new Date().getTime();
        let timer = countDateMilisseconds - now;

        //transformando os millissegundos em valores que aparecerao na tela (dias, horas, minutos e segundos)
        days = Math.floor(timer / (1000 * 60 * 60 * 24));
        hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timer % (1000 * 60)) / 1000);

        //mantendo dois caracteres no display
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //alterando o valor html do display pra mudar o cronometro na tela
        display.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

        //decrementando 1 do timer a cada 1s
        timer = timer - 1;

        //mudando o display quando o tempo acabar:
        if(timer < 0) {
            //parar de diminuir o timer
            clearInterval(intervalo); 
            
            if(!(yearIsValid && monthIsValid && dayIsValid & eventNameIsValid)) {
                console.log("dados nao estao validos");
                display.innerHTML = "waiting for valid data. then press 'create'";
            } else {
                display.innerHTML = `chegou o dia do evento ${document.getElementById("txtNome").value}!`;
                //tocando o alarme caso a checkbox esteja ligada
                if(alarm == true) {                
                    const audio = document.getElementById("audio");
                    audio.play();
                } 
            }          
        }
    }, 1000);   
}

//pegando botao restart
const btnRestart = document.getElementById("resetBtn");

//funcao do botao restart de att a pagina
btnRestart.addEventListener("click", () => {
    window.location.reload();
});

function turnTheAlarmOnOrOff() {
    const checkbox = document.querySelector("input[name=checkbox]");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            console.log("alarm is on");
            alarm = true;         
        } else {
            console.log("alarm is off");
            }
        })
}

// funcao que faz validacao de formulario
function validatingTheInputtedData() {

    const eventName = document.getElementById("txtNome").value;
    const year = document.getElementById("year").value;
    const month = document.getElementById("month").value;   
    const day = document.getElementById("day").value;
    const hours = document.getElementById('hour').value;
    const minutes = document.getElementById("minute").value;
    const seconds = document.getElementById("second").value;

    //pegando a data de hoje  
    let today = new Date();

    //pegando o mes atual
    let currentMonth = document.getElementById("month");
    currentMonth = today.getMonth() +1;

    //pegando o ano atual
    let currentYear = document.getElementById("year");
    currentYear = today.getFullYear();

    //pegando o dia atual
    let currentDay = document.getElementById("day");
    currentDay = today.getDate();

    //enviando mensagens de alerta para que o usuario preencha os campos corretamente
    if(eventName == "") {
        alert("please type the event name");
        eventNameIsValid = false;
        document.getElementById("txtNome").focus();

    } else if(year < currentYear) {
        alert("please type a valid year");
        document.getElementById("year").focus();
        yearIsValid = false;

    } else if(year == currentYear && month < currentMonth) {
        alert("please type a valid month");
        document.getElementById("month").focus();
        monthIsValid = false;

    } else if ((year == currentYear && month <= currentMonth) && day < currentDay) {
        alert("please type a valid day");
        dayIsValid = false;
    }

    //fazer com horas tbm


}