import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function TimePicker(props) {

    const classes = useStyles();

    const handleInput = function(e){
        props.updateHour(e.target.value)
    }

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="time"
                label="Alarm clock"
                type="time"
                value={props.hour}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
                onChange={handleInput}
            />
        </form>
    );
}