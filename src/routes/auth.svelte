<script>
	async function handleSignin() {}
</script>

<svelte:head>
	<title>signin here</title>
</svelte:head>

<section class="font-display  flex justify-center h-screen w-screen items-center">
	<div class="bg-primary px-8 py-12 rounded-sm w-1/4">
    <form on:submit|preventDefault={handleSignin} class="grid grid-cols-1 gap-4 ">
			<input
				type="email"
				placeholder="Enter your email here"
				required
				class="py-4 rounded-md px-4 focus:ring-2 focus:outline-none focus:ring-yellow-800"
			/>
			<input type="password" placeholder="password" required class="py-4 focus:ring-2 focus:outline-none focus:ring-yellow-800 rounded-md px-4" />

			<input type="submit"  value="signin" class="bg-white py-4 focus:ring-2 focus:outline-none focus:ring-yellow-800 px-8 font-bold cursor-pointer rounded-md" />
		</form>
	</div>
</section>
