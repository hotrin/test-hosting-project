import React from 'react';
import MainLayout from "../layouts/main.layout";
import { useFetch } from '../hooks/fetch.hooks';
import { Grid } from '@material-ui/core';
import ServerCard from '../components/server.card';

export default function ServersPage() {
	const [data, loading, err] = useFetch('http://localhost:4000/servers');
	if (loading) return <MainLayout><div>loading</div></MainLayout>;
	if (err) return <MainLayout><div>error from server</div></MainLayout>;
	return (
		<MainLayout>
			{data.map(server => (
				<Grid item xs={3}>
					<ServerCard {...server} />
				</Grid>
			))}
		</MainLayout>
	)
}

