const inputDateElement = document.getElementById("date");
inputDateElement.setAttribute("min", new Date().toISOString().split('T')[0]);
//2023-02-13T16:34:35.941Z

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
    window.location.reload();
});

document.addEventListener("submit", (event) => {
    event.preventDefault();
    const eventNameElement = document.getElementById("eventName");
    eventNameElement.innerText = `event name: ${document.getElementById("txtNome").value}`;
    display = document.getElementById("timer");        
    timer(display);
});
    
//keyboard
document.addEventListener("keyup", event => {
    (event.key == "Enter") ? document.getElementById("createBtn").click() : null;
}); 

let alarm = false;
turnTheAlarmOnOrOff();

const timer = (display) => {

    const inputtedDate = document.getElementById("date").value;
    let inputtedHour = document.getElementById('hour').value;
    let inputtedMinute = document.getElementById("minute").value;
    let inputtedSecond = document.getElementById("second").value;

    let interval = setInterval(() => {
        //montando a data no formato data hh:MM:ss, considerando minutos, segundos, horas inputados
        const allTimeInputted = `${inputtedDate} ${inputtedHour}:${inputtedMinute}:${inputtedSecond}`;

        const countDateMilliseconds = new Date(allTimeInputted).getTime();
        const now = new Date().getTime();
        let timer = countDateMilliseconds - now;

        days = Math.floor(timer / (1000 * 60 * 60 * 24));
        hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((timer % (1000 * 60)) / 1000);

        //*padStart()
        addZeroBefore(days, hours, minutes, seconds, display);  
        timerInTheBrowserTitle(days, hours, minutes, seconds, timer)      
        timer = timer - 1;
        stopTimer(interval, timer);
    }, 1000);   
}

function turnTheAlarmOnOrOff() {
    const checkbox = document.querySelector("input[name=checkbox]");
    checkbox.addEventListener("change", function() {
        this.checked ? alarm = true : alarm = false;          
        })
}

const addZeroBefore = (days, hours, minutes, seconds, display) => {
    days = days < 10 ? "0" + days : days;
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
 if(timer < 0) {
        clearInterval(interval);
        display.innerHTML = "it's finally time!";
        if(alarm == true) {                
            const audio = document.getElementById("audio");
            audio.play();
        }
    }     
}