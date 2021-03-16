import React from 'react';
import { Typography, withStyles, Grid, Card, Hidden} from '@material-ui/core';
import {Link} from 'react-router-dom';
import styles from './styles'



class Decider extends React.Component {
	render() {
		const {classes} = this.props;
		return(
				<Grid direction="row" container justify='center' className={classes.decideContainer} spacing={8}>
					<Grid item direction="row" align='center' xs={12}>
						<Typography className={classes.deciderHeader}>
									
						</Typography >
						<Typography className={classes.deciderHeader2}>
							
						</Typography>
						<Typography className={classes.deciderHeader}>
									
						</Typography>
					</Grid>

					<Hidden  xsDown smDown mdDown lgDown>
						<Grid item xl={3}>
							
						</Grid> {/* empty placeholder for graphic */}
					</Hidden>
					<Grid container item  className={classes.body} xs={6} xl={6} sm={12} >
						<Link to='Technique'  style={{ textDecoration: 'none' }}>
							<Card className={classes.modeBtn}>
								<Typography className={classes.modeBtnLbl}>Technique</Typography>
								<Hidden xsDown smDown><Typography className={classes.descriptionLbl}>
									
								</Typography></ Hidden>
								
							</Card>
						</Link>
					
						<Link to='Performance' style={{ textDecoration: 'none' }}>
							<Card className={classes.modeBtn} >
								<Typography className={classes.modeBtnLbl}>Performance</Typography>
								<Hidden xsDown smDown><Typography className={classes.descriptionLbl}>
									
								</Typography></Hidden>
								
							</Card>
						</Link>
					</Grid>
					<Hidden  xsDown smDown mdDown lgDown>
						<Grid item xl={3}>
							
						</Grid> {/* empty placeholder for graphic */}
					</Hidden>
				</Grid>
		)
	}

}

export default withStyles(styles)(Decider);
