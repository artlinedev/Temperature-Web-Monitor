$(function () {
    var socket = io();

    socket.on('update', function(update) {
        document.getElementById("update").innerHTML = update;
    });
});