<script>

</script>

<div id='wrap'>
	<section>
		<article>
			<header>Online Post-it</header>
			<div class='content-area'>
				<input placeholder='ID'/><br />
				<input type='password' placeholder='Password' />
				<div class='forget-area'>
					<span>Forgot password?</span>
				</div>
				<input class='login-btn' type='button' value='LOGIN'/>
				<div class='sign-up-area'>
					<span>Sign up</span>
				</div>
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
	article {
		position: relative;
		width: 320px;
		height: 290px;
		top: 50%;
		box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}
	header {
		height: 2.5rem;
		color: #9e8700;
		font-weight: bold;
	}
	.content-area {
		padding: 2rem 3rem;
		text-align: center;
		overflow: hidden;

		input {
			margin: 0.5rem 0;
			padding: 0.7rem;
			width: 100%;
			border: none;
		}
		input.login-btn {
			background-color: #f56e04;
			color: #ffffff;
			cursor: pointer;

			&:hover {
				background-color: #e46400;
			}
		}
		div {
			padding: 0 0.5rem;
			font-size: 10px;
			text-align: center;

			span:hover {
				text-decoration: underline;
				cursor: pointer;
			}
		}
		div.forget-area {
			display: flex;
			justify-content: flex-end;
		}
	}
</style>
