<script>
	import { goto, stores } from '@sapper/app';
	import { post } from 'utils.js';

	const { session } = stores();

	let email = '';
	let password = '';
	let error = null;

	async function submit() {
		const response = await post(`auth/login`, { email, password });

		if (response.error) {
			error = response.error;
            return;
		}

		if (response.token) {
			localStorage.setItem('jwt_token', response.token);
			
            $session.account = response;
			goto('/');
		}
	}
</script>

<svelte:head>
	<title>Sign in • Accounts</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
				</p>

				{#if error}
                    <ul class="error-messages">
                        <li>{error}</li>
                    </ul>
                {/if}

				<form on:submit|preventDefault={submit}>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="email" required placeholder="Email" bind:value={email}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit">
						Sign in
					</button>
				</form>
			</div>
		</div>
	</div>
</div>