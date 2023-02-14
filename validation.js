$(document).ready(function() {
    $("#form").validate({
        rules:{
            eventName:{
                required: true,
            },
            eventDate:{
                required: true
            },
            eventHour:{
                min: 00,
                max: 23                    
            },
            eventMinute: {
                min: 00,
                max: 59
            },
            eventSecond: {
                min: 00,
                max: 59
            },
        },
        messages:{
            eventName:{
                required: "please type an event name",
            },
            eventDate:{
                required: "please choose a date"
            },
            eventHour:{
                min: "please type a valid hour",
                max: "please type a valid hour"
            },
            eventMinute: {
                min: "please type a valid min",
                max: "please type a valid min"
            },
            eventSecond: {
                min: "please type a valid sec",
                max: "please type a valid sec"
            },
        }
    });
});