<template>
	<view>
		<view class="flex align-center justify-between bg-white py-3">
			<view class="flex-1 text-center" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
				<view class="font32">100</view>
				<view class="text-muted  font24 mt-1">优惠券</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-account-list",
		props:{
			resdata:{
				type:Array,
				default() {
				  return [];
				},
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toShow(item){
				console.log("链接")
			}
		}
	}
</script>

<style>

</style>