import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '90vw',
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  let tabIndex = 0;
  let tabs = props.labels.map((element, tabIndex) => {return <Tab label={element} {...a11yProps(tabIndex++)} />})

  let contentIndex = 0
  let tabPanels = props.content.map((element, contentIndex) => {return (<TabPanel value={value} index={contentIndex++} dir={theme.direction} p={props.content.length}>
    {element}
    </TabPanel>)})

    // console.log(tabs.length)
    // console.log(tabPanels.length)
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
        {tabs}
          {/* <Tab label={props.labels[0]} {...a11yProps(0)} />
          <Tab label={props.labels[1]} {...a11yProps(1)} />
          <Tab label={props.labels[2]} {...a11yProps(2)} /> */}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
      {tabPanels}
        {/* <TabPanel value={value} index={0} dir={theme.direction}>
        {props.content[0]}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        {props.content[1]}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        {props.content[2]}
        </TabPanel> */}
      </SwipeableViews>
    </div>
  );
}