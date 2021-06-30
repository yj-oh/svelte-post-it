<script>
	import { onMount } from 'svelte';
	import { useNavigate, useLocation } from 'svelte-navigator';
	import firebase from 'firebase/app';
	import 'firebase/auth';

	const navigate = useNavigate();
	const location = useLocation();

	let isLogin = false;

	onMount(() => {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				isLogin = true;
			}
			else {
				navigate('/login', {
					state: { from: $location.pathname },
					replace: true,
				});
			}
		});
	});
</script>

{#if isLogin}
	<slot />
{/if}
