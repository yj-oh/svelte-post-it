<script>
	import { onMount } from 'svelte';
	import firebase from 'firebase/app';
	import * as firebaseui from 'firebaseui';
	import 'firebase/auth';
	import 'firebaseui/dist/firebaseui.css';

	onMount(() => {
		let ui = new firebaseui.auth.AuthUI(firebase.auth());

		const uiConfig = {
			callbacks: {
				signInSuccessWithAuthResult: function() {
					return true;
				},
			},
			signInFlow: 'popup',
			signInSuccessUrl: '/',
			signInOptions: [
				{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					requireDisplayName: false
				},
				{
					provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				},
			],
			tosUrl: '/',
		};

		ui.start('#firebaseui-auth-container', uiConfig);
	});
</script>

<div id='wrap'>
	<section>
		<article>
			<header>Online Post-it</header>
			<div class='content-area'>
				<div id='firebaseui-auth-container'></div>
			</div>
		</article>
	</section>
</div>

<style lang='scss'>
	@import '../../public/post-it';

	div#wrap {
		@include grid-background;
		position: relative;
		width: 100%;
		height: 100%;
	}
	section {
		position: relative;
		top: 30vh;
		display: table;
		margin: 0 auto;
	}
	div#wrap article {
		position: relative;
		width: 360px;
		top: 50%;
		box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}
	.content-area {
		padding: 1rem;
		text-align: center;
		overflow: hidden;
	}
</style>
