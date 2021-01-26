import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { Route, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function EventCard(props) {
    const classes = useStyles();

    const viewEvent = () => {
        // Route to view event page
        props.viewEvent(props.event)
    }

    const assignEventRequest = () => {
        props.assignEventRequest(props.event)
    }

    let photoSrc
    const occasion = props.event.occasion.toLowerCase()
    switch (occasion) {
        case 'wedding': photoSrc = '/images/wedding.jpg'
            break
        case 'birthday': photoSrc = '/images/birthday.jpg'
            break
        case 'baptism': photoSrc = '/images/baptism.png'
            break
        case 'engagement': photoSrc = '/images/engagement.jpg'
            break
        case 'graduation': photoSrc = '/images/graduation.png'
            break
        default: photoSrc = ''
    }
    if(!props.display){
            return null
    }
    let requestBtn = null
    if(props.userType== 'organiser' && props.showAssignmentBtn){
        requestBtn = <Button onClick={assignEventRequest}>Request for assignment</Button>
    }
    return (
        <Card className={classes.root}>
            <CardHeader
                title={props.event.title}
                subheader={props.event.date}
            />
            <CardMedia
                className={classes.media}
                image={photoSrc}
                title={occasion}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Client's address: {props.event.client.address}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Start hour: {props.event.startHour} - End hour: {props.event.endHour}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Number of guests: {props.event.numOfGuests}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button onClick={viewEvent}>View</Button>
                {requestBtn}
            </CardActions>
        </Card>
    );
}