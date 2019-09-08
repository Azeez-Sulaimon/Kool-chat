import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {CTX} from './Store';
import './App.css';

const useStyles = makeStyles(theme => ({
    root: {
      margin: '50px',
      padding: theme.spacing(3, 2),
    },

    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
       width: '30%',
       height: '350px',
       borderRight: '1px solid grey',
       backgroundColor: '#5ea3d0',
    },
    chatWindow: {
       width: '70%',
       height: '300px',
       padding: '20px',
       
    },
    chatBox: {
       width: '85%'
    },
    Button: {
      width: '15%'
    }
  }));

export default function Dashboard() {

    const classes = useStyles();
    
   
    // CTX store 
    const {allChats, sendChatAction, user} = useContext(CTX);
    const topics = Object.keys(allChats);

     //local state
     const [activeTopic, changeActiveTopic] = useState(topics[0]);
     const [textValue, changeTextValue] = useState('');
 

    return ( 
        <Paper className={classes.root}>
          <div>
           <h4 className="title">Kool Chat</h4>
            <h6 className="topic">{activeTopic}</h6>
          </div>
        
        {/* <Typography variant="h6" component="h6">
          {activeTopic}
        </Typography> */}
        <div className={classes.flex}>
            <div className={classes.topicsWindow}>
              <List>
                  {
                      topics.map(topic => (
                        <ListItem 
                        onClick={e => changeActiveTopic(e.target.innerText)}
                        key={topic} button>            
                        <ListItemText primary={topic} />
                        </ListItem>
                      ))
                  }
                 
              </List>
            </div>

            <div className={classes.chatWindow}>
                   {
                      allChats[activeTopic].map((chat, i) => (
                       <div className={classes.flex} key={i}>
                        <Chip label={chat.from} className="message-username" />
                        <Typography variant='body1' className="message-text" gutterBottom>{chat.msg}</Typography>
                       </div>
                      ))
                  }
            </div>
 
        </div>
        <div className={classes.flex}>

        <TextField
        label="Send a chat"
        className={classes.chatBox}
        value={textValue}
        onChange= {e => changeTextValue(e.target.value)}
       
        />
       <Button 
       variant="contained" 
       color="primary" 
       className={classes.button}
       onClick={() => {
        sendChatAction({from: user , msg:textValue, topic: activeTopic});
        changeTextValue('');
       }
       } 
       >
           Send
        </Button>
        </div>
      </Paper>
     );
};
 
