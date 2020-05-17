const socket = io();

socket.on('message', (message) => {
    console.log(message);
});


document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.message.value;
    socket.emit('sendMessage', msg, (err) => {
        if (err) return console.log('err ==> ', err);

        console.log('Message delivered!');
    });
})


document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) return alert('Geolocation not supported by browser');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location Shared');
            
        });

    });

});

