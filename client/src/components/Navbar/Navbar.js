import React  from 'react';
import useStyles from './NavbarStyles';
import { AppBar, Typography} from '@material-ui/core';
import memories from '../../images/memories.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const classes = useStyles();

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to="/"
					className={classes.heading}
					variant="h2"
					align="center"
				>
					Memories
				</Typography>
				<img className={classes.image} src={memories} alt="icon" height="60" />
			</div>
		</AppBar>
	);
};

export default Navbar;
