<template>
	<footer class="default">
        <button class="_btn save primary" @click='$parent.$emit("save")'>Save</button>
		<button class="_btn cancel light" @click='$parent.$emit("close")'>Cancel</button>
	</footer>
</template>
<script>
	export default{
		props: ['item'],
		mounted(){

		}
	}
</script>