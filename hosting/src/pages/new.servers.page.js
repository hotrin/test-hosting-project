import React from 'react';
import MainLayout from "../layouts/main.layout";
import { Grid, TextField, Typography, Button, Select, FormControl, MenuItem, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	formControl: {
		width: '100%',
	  },
}));

export default function NewServersPage() {
	const classes = useStyles();
	const inputLabel = React.useRef(null);
	const [value, setValue] = React.useState(1);
	const [toServerPage, setToServerPage] = React.useState(false);
	const [labelWidth, setLabelWidth] = React.useState(0);
	React.useEffect(() => {
		setLabelWidth(inputLabel.current.offsetWidth);
	  }, []);
	  
	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const ip = e.target.ip.value;
		const hostingId = e.target.hosting.value;
		const stringify = JSON.stringify({ name, ip, hostingId });
		const response = await fetch('http://localhost:4000/servers',
			{
				method: 'post',
				body: stringify,
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

 	if (toServerPage) {
		  return <Redirect to="/" />;
	 }

	return (
		<MainLayout>
			<Grid item xs={12}>
				<Typography variant="h2">New Server</Typography>
			</Grid>
			<form className={classes.form} noValidate onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="name"
							name="name"
							variant="outlined"
							required
							fullWidth
							id="serverName"
							label="Server Name"
							autoFocus
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="ip"
							label="IP"
							name="ip"
							autoComplete="ip"
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
								Age
        					</InputLabel>
							<Select
								name="hosting"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
							>
								<MenuItem value={1}>Microsoft</MenuItem>
								<MenuItem value={2}>RedHat</MenuItem>
								<MenuItem value={3}>AWS</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
				>
					Create Server
          		</Button>
			</form>
		</MainLayout>
	)
}

