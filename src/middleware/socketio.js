// import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';

let socket = null;

export function socketIoMiddleware(store) {
    
    return next => action => {
        const result = next(action);
        if(!socket) {
            return;
        }

        switch(action.type) {
            case 'server/connected-user': 
                let profile = store.getState().auth.profile;
                socket.emit('connected-user', profile);
                break;
            case 'server/update-user':
                socket.emit('update-user', action.payload.user);
                break;
            case 'server/join-room':
                socket.emit('join-room', action.payload);
                break;
            case 'server/leave-room':
                socket.emit('leave-room', action.payload);
                break;
            case 'server/new-message':
                socket.emit('new-message', action.payload);
                break;
            case 'server/sit-down-board':
                socket.emit('sit-down-board', action.payload);
                break;
            case 'server/new-move':
                socket.emit('new-move', action.payload);
                break;
            case 'server/four-new-move':
                socket.emit('four-new-move', action.payload);
                break;
        } 
     
        return result;
    }
}

export default function(store) {
    if (process.env.NODE_ENV === "production") {
        socket = io.connect('https://www.hellochess.com');
    } else if (process.env.NODE_ENV === "staging") {
        socket = io.connect('https://hellochess-dev-johnnyvf24.c9users.io');
    } else if(process.env.NODE_ENV === "dev2") {
        socket = io.connect('https://hellochess-johnnyvf24.c9users.io');
    } else {
        socket = io.connect('http://localhost:3000');
    }

    socket.on('connected-user', data => {
        store.dispatch({type: 'connected-user'});
    });
    
    //a list of all the rooms has been sent by the server
    socket.on('all-rooms', data => {
        store.dispatch({type: 'all-rooms', payload: data}); 
    });
    
    //User has successfully joined a room
    socket.on('update-room', data => {
        store.dispatch({type: 'update-room', payload: data}); 
    });
    
    socket.on('sit-down-w', data => {
        store.dispatch({type: 'sit-down-w', payload: data});
    });
    
    socket.on('sit-down-b', data => {
        store.dispatch({type: 'sit-down-b', payload: data});
    });
    
    socket.on('sit-down-g', data => {
        store.dispatch({type: 'sit-down-g', payload: data});
    });
    
    socket.on('sit-down-r', data => {
        store.dispatch({type: 'sit-down-r', payload: data});
    });
    
    socket.on('left-room', data => {
        store.dispatch({type: 'left-room', payload: data});
    });
    
    socket.on('user-room-left', data => {
        store.dispatch({type: 'user-room-left', payload: data});
    });
    
    socket.on('user-room-joined', data => {
        store.dispatch({type: 'user-room-joined', payload: data});
    });
    
    socket.on('disconnect', data => {
        store.dispatch({type: 'disconnect'});
    });
    
    socket.on('reconnect', data => {
        store.dispatch({type: 'reconnect'});
    });
    
    socket.on('game-started', data => {
       store.dispatch({type: 'game-started', payload: data});
    });
    
    socket.on('new-move', data => {
        store.dispatch({type: 'new-move', payload: data});
    });
    
    socket.on('four-new-move', data => {
        store.dispatch({type: 'four-new-move', payload: data});
    });
    
    socket.on('action', data => {
        store.dispatch(data);
    });
}

// let socketIoMiddleware = createSocketIoMiddleware(socket, ['server/']);

// export default socketIoMiddleware;
