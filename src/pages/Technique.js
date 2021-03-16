import React from 'react';
import {Link} from 'react-router-dom';
import { withStyles, Grid, Divider, Card, Typography, Hidden} from '@material-ui/core';
import styles from './styles';


class Technique extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userMode: this.props.userMode
		};
	}
	render(){
		const {classes} = this.props;
		return (
			<Grid container  justify='center' className={classes.techniqueBody}>
				<Grid item  xs={12}>
					<h1 className={classes.techniqueHeader}>Technique</h1>
					<Divider variant="middle" className={classes.divider}/>
				</Grid>
				<Hidden smDown mdDown xsDown>
					<Grid container justify='center' xl={12} className={classes.topIconGrid} >
						{/* SCALES */}
						<Link to='/modules/1' className="link" style={{ textDecoration: 'none'}}>
							<Card linktarget="/modules/1" className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Scales</Typography>
							</Card>
						</Link>
						{/* INTERVALS */}
						<Link to='/modules/3' className="link" style={{ textDecoration: 'none' }}>
							<Card linkTarget="/modules/3" className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Intervals</Typography>
							</Card>
						</Link>
						{/* CHORDS */}
						<Link to='/modules/2'className="link" style={{ textDecoration: 'none'}}>
							<Card linktarget="/modules/2" className={classes.icons} >
								
								<Typography className={classes.iconLabel}>Chords</Typography>
							</Card>
						</Link>
					</Grid>
					{/* BOTTOM ROW ICONS */}
					{/* MELODIES */}
					<Grid container justify='center' className={classes.bottomIconGrid}>
						<Link to='/modules/4' className="link" style={{ textDecoration: 'none'}}>
							<Card className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Sing Backs</Typography>
							</Card>
						</Link>
						{/* PROGRESSIONS */}
						<Link to='/modules/5' className="link" style={{ textDecoration: 'none'}}>
							<Card className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Harmonizations</Typography>
							</Card>
						</Link>
					</Grid>
				</Hidden>

				{/* ######################################################################## */
				/*  FOLLOWING SECTION RENDERS SAME GRID BUT FOR SMALLER WINDOWS (sm, md, xs)
				/*	######################################################################## */}

				<Hidden lgUp xlup>
				<Grid container justify='center' xl={12} className={classes.topIconGrid} >
						{/* SCALES */}
						<Link to='/modules/1' className="link" style={{ textDecoration: 'none'}}>
							<Card linktarget="/modules/1" className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Scales</Typography>
							</Card>
						</Link>
						{/* INTERVALS */}
						<Link to='/modules/3' className="link" style={{ textDecoration: 'none' }}>
							<Card linkTarget="/modules/3" className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Intervals</Typography>
							</Card>
						</Link>
				</Grid>
				<Grid container justify='center' xl={12} className={classes.midIconGrid} >
						{/* CHORDS */}
						<Link to='/modules/2'className="link" style={{ textDecoration: 'none'}}>
							<Card linktarget="/modules/2" className={classes.icons} >
								
								<Typography className={classes.iconLabel}>Chords</Typography>
							</Card>
						</Link>
						<Link to='/modules/4' className="link" style={{ textDecoration: 'none'}}>
							<Card className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Sing Backs</Typography>
							</Card>
						</Link>
					</Grid>
					{/* BOTTOM ROW ICONS */}
					{/* MELODIES */}
					<Grid container justify='center' className={classes.bottomIconGrid}>
						{/* PROGRESSIONS */}
						<Link to='/modules/5' className="link" style={{ textDecoration: 'none'}}>
							<Card className={classes.icons}>
								
								<Typography className={classes.iconLabel}>Harmonizations</Typography>
							</Card>
						</Link>
					</Grid>
				</Hidden>
				
			</Grid>
		);
		}

	}

export default withStyles(styles)(Technique);
