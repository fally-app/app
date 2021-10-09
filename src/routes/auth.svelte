<svelte:head>
  <title>Auth</title>
</svelte:head>

<script>
  async function handleSignin(){}
</script>


<section class="flex justify-center h-screen w-screen items-center">
  <div class="font-display bg-red-200 px-8 py-12 rounded-md">
  <h3 class="text-center font-extrabold text-xl py-2 mb-4">Login here</h3>
  <div>
    <form on:submit|preventDefault={handleSignin}>
     <input type="email" placeholder="Enter your email here" required class="py-4 rounded-md px-8"/>
     <input type="submit" value="login" class="bg-red-500 text-white py-4 px-8 cursor-pointer rounded-md"/>
   </form>
  </div>
  </div>
</section>
