
//limitando a data minima para hoje
const inputDateElement = document.getElementById("date");
inputDateElement.setAttribute("min", new Date().toISOString().split('T')[0]);

//console.log("dia de hoje", new Date().toISOString().split('T')[0])
//console.log("hora de agora", new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" , second: "2-digit"}))

//limitando a hora se o dia for hoje
//const inputTime = document.getElementById("time");

//pegando botao restart e criando evento
const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    window.location.reload();
});


//pegando o botao start e criando evento com click
const startBtn = document.getElementById("submit");
startBtn.addEventListener("click", () => {

    display = document.getElementById("timer");
          
    //chamando funcao que valida o forms
    validatingTheInputtedData();

    //coloca na tela o nome do evento inputado
    const paragraphEventName = document.getElementById("event");
    paragraphEventName.innerText = `event name: ${document.getElementById("txtNome").value}`;

    //newTimer(document.getElementById("txtNome").value, timer(display))
    timer(display);

});

//funcao que cria novo timer. sem o alarme ainda
const newTimer = (eventName, timer) => {
    const newTimerList = document.createElement("ul");
    newTimerList.innerHTML = `
        <h4 id="event">${eventName} </h4>
        <div id="timer" class="cronometro">
            ${timer}       
        </div>
    `
    document.getElementById("timers").appendChild(newTimerList)
    
} 
    
//clicando no botao start com o enter
document.addEventListener("keyup", event => {
    (event.key == "Enter") ? startBtn.click() : null;
});

let eventNameIsValid = true;
let dateIsValid = true;

//variavel pra ligar o alarme
let alarm = false;

//funcao que liga ou desliga o alarme
turnTheAlarmOnOrOff();

//funcao que dispara o cronometro
const timer = (display) => {

    //executar uma funcao a cada um segundo
    let interval = setInterval(() => {

        //capturando os valores inputados que irao mudar a cada segundo
        const inputtedDate = document.getElementById("date").value;
        let inputtedHour = document.getElementById('hour').value;
        let inputtedMinute = document.getElementById("minute").value;
        let inputtedSecond = document.getElementById("second").value;
        
        //montando a data no formato May 23, 2023 hh:MM:ss, considerando minutos, segundos, horas inputados
        const allTimeInputted = `${inputtedDate} ${inputtedHour}:${inputtedMinute}:${inputtedSecond}`;

        //contando os millissegundos desde a data inputada ate a data/hora atual
        const countDateMilisseconds = new Date(allTimeInputted).getTime();
        const now = new Date().getTime();
        let timer = countDateMilisseconds - now;
        console.log("timer", timer);

        //transformando os millissegundos em valores que aparecerao na tela (dias, horas, minutos e segundos)
        days = Math.floor(timer / (1000 * 60 * 60 * 24));
        hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timer % (1000 * 60)) / 1000);

        //mantendo dois caracteres no display - podia usar padStart() mas achei mais legivel assim pra mim
        addZeroBefore(days, hours, minutes, seconds, display);
   
        //colocando o cronometro no nome da aba
        timerInTheBrowserTitle(days, hours, minutes, seconds)
        
        timer = timer - 1;

        stopTimer(interval, timer)

    }, 1000);   
}

// funcao que faz validacao de formulario
const validatingTheInputtedData = () => {
    console.log("a funcao de validacao esta sendo chamada")

    const eventName = document.getElementById("txtNome").value;
    const date = document.getElementById("date").value;
    //const hr = document.getElementById("hour").value;
    //const min = document.getElementById("minute").value;
    //const sec = document.getElementById("second").value;

    //enviando mensagens de alerta para que o usuario preencha os campos corretamente
    if(eventName == "") {
        console.log(eventName)
        document.getElementById("msgErrorName").innerText = "type a event name";
        document.getElementById("txtNome").classList.add("input-is-invalid");
        eventNameIsValid = false;
    } else {
        eventNameIsValid = true;
        document.getElementById("msgErrorName").innerText = "";
        document.getElementById("txtNome").classList.remove("input-is-invalid");
    }

    if(date == "") {
        document.getElementById("msgErrorDate").innerText = "choose a date";
        document.getElementById("date").classList.add("input-is-invalid");
        dateIsValid = false;
    } else {
        dateIsValid = true;
        document.getElementById("msgErrorDate").innerText = "";
        document.getElementById("date").classList.remove("input-is-invalid");
    }

    //if(hour < 0 || hour > 24) {

    //}
}

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

const addZeroBefore = (days, hours, minutes, seconds, display) => {
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    //alterando o valor html do display pra mudar o cronometro na tela
    display.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
}

const timerInTheBrowserTitle = (days, hours, minutes, seconds) => {
    let title = document.getElementById("title");
    title.innerHTML = `${days}d:${hours}h:${minutes}m:${seconds}s`;
}

const stopTimer = (interval, timer) => {   
    
    console.log("name", eventNameIsValid);
    console.log("date", dateIsValid);

    if(!(eventNameIsValid && dateIsValid )) {       
        console.log("dados nao estao validos");
        timer = 0;
        display.innerHTML = "00d : 00h : 00m : 00s";
        //document.getElementById("msgError").innerHTML = "waiting for valid data. then, press 'create'";
        document.getElementById("title").innerText = "ERROR!"
        clearInterval(interval);
    } else if(timer < 0) {
        console.log("entrou em stop timer")
        clearInterval(interval);
        display.innerHTML = "it's finally time!";
        //tocando o alarme caso a checkbox esteja ligada
        if(alarm == true) {                
            const audio = document.getElementById("audio");
            audio.play();
        }
    } 
}


