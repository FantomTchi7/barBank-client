<script>
	import { stores } from '@sapper/app';
	import { onMount } from 'svelte';
	import Nav from '../components/Nav.svelte';

	const { session } = stores();

	export let segment;

	onMount(async () => {
		if (!$session.account) {
            const token = localStorage.getItem('jwt_token');

            if (token) {
                const response = await get('user', token);

                if (response._id) {
                    $session.account = response;
                } else {
                    localStorage.removeItem('jwt_token');
                }
            }
        }
	});
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>