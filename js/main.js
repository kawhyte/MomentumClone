// DOM elements 
const time  = document.getElementById('time');
const greeting  = document.getElementById('greeting');
const name  = document.getElementById('name');
const focus  = document.getElementById('focus');


// show time 
function showTime(){

    let today = new Date()
    //timey = today.getTime,
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    //set AM or PM
    const amPm  = hour >= 12 ? 'PM' : 'AM';

    // 12 Format
    hour = hour % 12 || 12

    //Output
     time.innerHTML =`${hour}<span>:<span>${min}<span>:<span>${sec}`;
 

    setTimeout(showTime,1000)
}


//run
let a = showTime();


