<script>
	import { Router, Route } from 'svelte-navigator';
	import PrivateRoute from './components/PrivateRoute.svelte';
	import BoardList from './components/BoardList.svelte';
	import Board from "./components/Board.svelte";
	import Login from './components/Login.svelte';
	import './firebase';
</script>

<main>
	<Router>
		<Route path='login'>
			<Login />
		</Route>

		<PrivateRoute path="/" let:location>
			<BoardList />
			<Board />
		</PrivateRoute>
	</Router>
</main>

<style>
	main {
		display: flex;
		height: 100%;
	}
</style>
