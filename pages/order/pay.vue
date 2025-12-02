<template>
	<view>
		<view class="flex align-center justify-center py-5">
			<view class="text-center">
				<view class="text-muted font30">支付金额</view>
				<view class="font50 mt-2 cny">999.99</view>
			</view>
		</view>
		<view class="mx-2 mt-5 bg-white rounded-lg px-3">
			<view class="flex align-center justify-between py-3 border-dotted-bottom">
				<view class="flex align-center flex-1">
					<image src="/static/weixin.png" style="width: 100rpx;height: 100rpx;" class="mr-2 flex-shrink"></image>
					<view class="flex-1">
						<view class="font32">微信支付</view>
						<view class="mt-2 text-muted font28">推荐使用微信支付</view>
					</view>
				</view>
				<uni-icons type="circle" size="24" color="#cccccc"></uni-icons>
			</view>
			<view class="flex align-center justify-between py-3 border-dotted-bottom">
				<view class="flex align-center flex-1">
					<image src="/static/zhifubao.png" style="width: 100rpx;height: 100rpx;" class="mr-2 flex-shrink"></image>
					<view class="flex-1">
						<view class="font32">支付宝支付</view>
						
					</view>
				</view>
				<uni-icons type="circle" size="24" color="#cccccc"></uni-icons>
			</view>
			<view class="flex align-center justify-between py-3">
				<view class="flex align-center flex-1">
					<image src="/static/msyh.png" style="width: 100rpx;height: 100rpx;" class="mr-2 flex-shrink"></image>
					<view class="flex-1">
						<view class="font32">已付款支付</view>
						<view class="mt-2 text-muted font28">可用余额￥99.99</view>
					</view>
				</view>
				<uni-icons type="circle" size="24" color="#cccccc"></uni-icons>
			</view>
		</view>
		<view class="bg-danger rounded-circle text-white py-3 font32 text-center mx-auto mt-5" style="width: 550rpx;" @click="toPay">确认支付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toPay(){
				uni.navigateTo({
					url:'/pages/order/orderList'
				})
			},
		}
	}
</script>

<style>

</style>
