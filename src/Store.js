import React from 'react';
import io from 'socket.io-client';

export const CTX = React.createContext();


const initialState = {
    general: [
        {from: 'aaron', msg: 'Hello'},
        {from: 'adekunle', msg: 'Hello'},
        {from: 'tola', msg: 'Hello'}
    ],
    topic2: [
        {from: 'aaron', msg: 'Hello'},
        {from: 'aaron', msg: 'Hello'},
        {from: 'aaron', msg: 'Hello'}
    ]

}

function reducer(state, action){
  
    const {from, msg} = action.payload;

    switch(action.type){
        case 'RECEIVE_MESSAGE':
            return {
             ...state,
             [action.payload.topic]: [
                 ...state[action.payload.topic],
                 {from, msg}
                ]
            }
        default: 
           return state
    }
}

let socket;

function sendChatAction(value) {
    socket.emit('chat message', value);
}


export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initialState);

    if (!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg){
            // $('#messages').append($('<li>').text(msg));
           dispatch({type: 'RECEIVE_MESSAGE', payload: msg})
          });
    }

    const user = 'aaron' + Math.random(100).toFixed(2);

   

    return (
        <CTX.Provider value={{allChats, sendChatAction, user}}>
            {props.children}
        </CTX.Provider>
    )
}
