import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

const hostingImages = [
	'https://cdn.vox-cdn.com/thumbor/NeSo4JAqv-fFJCIhb5K5eBqvXG4=/7x0:633x417/1200x800/filters:focal(7x0:633x417)/cdn.vox-cdn.com/assets/1311169/mslogo.jpg',
	'https://www.eweek.com/imagesvr_ez/b2bezp/2018/10/290x195redhat1.jpeg?alias=article_hero',
	'https://miro.medium.com/max/1200/1*tFl-8wQUENETYLjX5mYWuA.png'
]

const useStyles = makeStyles(
	createStyles({
		card: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
	}),
);

export default function ServerCard(props) {
	const { hosting_id, name, ip, status, hosting_name } = props;
	const classes = useStyles();
	const [checked, setChecked] = useState(!!status);
	const [toServerPage, setToServerPage] = React.useState(false);

	const handleDelete = async () => {
		const response = await fetch(`http://localhost:4000/servers/${props.id}`,
			{
				method: 'delete',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const json = await response.json();
		console.log(json);
		if (json.ok) {
			setToServerPage(true);
		} else {
			console.error('something went wrong');
		}
	}
	
	const handleCheck = async () => {
		const stringify = JSON.stringify({ serverId: props.id, status: !checked });
		const response = await fetch('http://localhost:4000/status',
			{
				method: 'put',
				body: stringify,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const json = await response.json();
		console.log(json);
		if (json.ok) {
			setChecked(prevState => !prevState);
		} else {
			console.error('something went wrong');
		}
	}
			
	if (toServerPage) {
		return <Redirect to="/" />;
   }

	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={hostingImages[hosting_id - 1]}
					title={hosting_name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">{name}</Typography>
					<Typography variant="body2" color="textSecondary" component="p">{ip}</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<FormControlLabel
					control={
						<Switch checked={checked} onChange={handleCheck} value="checkedA" />
					}
					label="Running"
				/>
				<Button size="small" color="primary" onClick={handleDelete}>
         		 	Delete
        		</Button>
			</CardActions>
		</Card>
	);
}