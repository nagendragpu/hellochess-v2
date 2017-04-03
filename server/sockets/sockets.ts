const Notifications = require('react-notification-system-redux');
const {mapObject} = require('../utils/utils');
const Elo = require('elo-js');
import Connection from './Connection';
import Player from '../../models/players/Player';
import Room from '../../models/rooms/Room';


module.exports.socketServer = function(io) {
    let conn = new Connection(io);
    io.on('connection', (socket) => {
        require('./listeners/connection')(io, socket, conn);
        require('./listeners/room')(io, socket, conn);
    });
};
