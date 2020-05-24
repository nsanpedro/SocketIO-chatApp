'use strict';
const socket = io();

const messageForm = document.querySelector('#message-form');
const formInput = messageForm.querySelector('input');
const formBtn = messageForm.querySelector('button');
const sendLocation = document.querySelector('#send-location');

socket.on('message', (message) => {
    console.log(message);
});


messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageForm.setAttribute('disabled', 'disabled');
    

    const msg = e.target.elements.message.value;
    
    socket.emit('sendMessage', msg, (err) => {
        if (err) return console.log('err ==> ', err);

        messageForm.removeAttribute('disabled');
        formInput.value = '';
        formInput.focus();

        console.log('Message delivered!');
    });
})


sendLocation.addEventListener('click', () => {
    if (!navigator.geolocation) return alert('Geolocation not supported by browser');

    sendLocation.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            sendLocation.removeAttribute('disabled');
                console.log('Location Shared');
        });

    });

});

