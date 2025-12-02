<template>
	<view>
		<view class="py-3 flex align-start border-dotted-bottom" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
			<image src="/static/icon.jpg" style="width: 80rpx;height: 80rpx;" class="mr-2 rounded-circle flex-shrink"></image>
			<view class="flex-1">
				<view class="flex align-center justify-between">
					<view class="font28 text-muted">铁云链用户</view>
					<view class="font24 text-muted mt">2024-12-12 12:00</view>
				</view>
				<view class="font28 line2 text-ellipsis-2 mt-1">货物很好，物理很快</view>
				<view class="flex align-center mt-2 font28">
					<text class="text-muted flex-shrink">购买类型：</text>
					<view class="flex-1 text-ellipsis-1">螺纹钢-20*20-GB2301-马场空</view>
				</view>
		
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-evaluate-list",
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
				uni.navigateTo({
					url:'/pages/evaluate/detail'
				})
			}
		}
	}
</script>

<style>

</style>