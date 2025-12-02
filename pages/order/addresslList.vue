<template>
	<view class="px-2">
		<i-address-list :resdata="list" @click="toShow" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{},{},{}]
			}
		},
		methods: {
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url:'/pages/order/addressAdd'
				})
			},
			toShow(item){
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
