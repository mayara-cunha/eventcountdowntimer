const inputDateElement = document.getElementById("date");
inputDateElement.setAttribute("min", new Date().toISOString().split('T')[0]);

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    window.location.reload();
});

const startBtn = document.getElementById("submit");
startBtn.addEventListener("click", () => {

    display = document.getElementById("timer");
          
    validatingTheInputtedData();

    const paragraphEventName = document.getElementById("event");
    paragraphEventName.innerText = `event name: ${document.getElementById("txtNome").value}`;

    timer(display);
});
    
//keyboard
document.addEventListener("keyup", event => {
    (event.key == "Enter") ? startBtn.click() : null;
});

let eventNameIsValid = true;
let dateIsValid = true;

let alarm = false;
turnTheAlarmOnOrOff();

const timer = (display) => {



    let interval = setInterval(() => {
        
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

        days = Math.floor(timer / (1000 * 60 * 60 * 24));
        hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timer % (1000 * 60)) / 1000);

        //podia usar padStart() mas achei mais legivel assim pra mim
        addZeroBefore(days, hours, minutes, seconds, display);
   
        timerInTheBrowserTitle(days, hours, minutes, seconds, timer)
        
        timer = timer - 1;

        stopTimer(interval, timer);
    }, 1000);   
}

const validatingTheInputtedData = () => {

    const eventName = document.getElementById("txtNome").value;
    const date = document.getElementById("date").value;
    //const hr = document.getElementById("hour").value;
    //const min = document.getElementById("minute").value;
    //const sec = document.getElementById("second").value;

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
    checkbox.addEventListener("change", function() {
        this.checked ? alarm = true : alarm = false;          
        })
}

const addZeroBefore = (days, hours, minutes, seconds, display) => {
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.innerHTML = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
}

const timerInTheBrowserTitle = (days, hours, minutes, seconds, timer) => {
    let title = document.getElementById("title");
    title.innerHTML = `${days}d:${hours}h:${minutes}m:${seconds}s`;
    if (timer < 0) {
        title.innerText = "it's finally time!";
    } 
}

const stopTimer = (interval, timer) => {   
    if(!(eventNameIsValid && dateIsValid )) {       
        timer = 0;
        display.innerHTML = "00d : 00h : 00m : 00s";
        document.getElementById("title").innerText = "ERROR!"
        clearInterval(interval);
    } else if(timer < 0) {
        clearInterval(interval);
        display.innerHTML = "it's finally time!";
        //tocando o alarme 
        if(alarm == true) {                
            const audio = document.getElementById("audio");
            audio.play();
        }
    }     
}