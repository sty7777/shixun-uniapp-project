<template>
	<view>
		<view class="flex align-center flex-wrap pb-3">
			<view class=" text-center pt-3" :class="column==5?'w-20':'w-25'" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
				<image src="/static/icon.jpg" style="width: 80rpx;height: 80rpx;" class="rounded-lg"></image>
				<view class="text-muted font24 mt-1 text-ellipsis-1">标题</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-nav-list",
		props:{
			column:{
				type:Number,
				default() {
				  return 4;
				},
			},
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
				this.$emit('click',item)
			}
		}
	}
</script>

<style>

</style>