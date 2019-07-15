import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';

export const mainListItems = (
	<div>
		<Link to="/">
			<ListItem button>

				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="All Servers" />
			</ListItem>
		</Link>
		<Link to="/new">
			<ListItem button>

				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="New Server" />

			</ListItem>
		</Link>
	</div >
);