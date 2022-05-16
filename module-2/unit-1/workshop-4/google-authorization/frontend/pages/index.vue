<template>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
    <div>
      <div class="text-3xl font-medium text-black">GetGoogle</div>
      <button
        class="mt-5 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        @click="$router.push('/login')"
      >
        Login
      </button>
    </div>
  </div>
</template>