<template>
	<view >
		<view class="flex align-center justify-center bg-white p-3" @click="toAddress">
			<view class="text-center">
				<uni-icons type="plusempty" size="20" color="#999999"></uni-icons>
				<view class="text-muted font28 mt-2">请选择收货地址</view>
			</view>
		</view>
		<!-- <view class="bg-white p-3 flex align-center">
			<uni-icons type="location" size="20" color="#333333"></uni-icons>
			<view class="flex-1 mx-2">
				<view class="flex align-center font32">
					<text>王连成</text>
					<text class="ml-3">15398080419</text>
				</view>
				<view class="mt-1 font30 line15">陕西省西安市新城区石家街128号东岸购机2008</view>
			</view>
			<uni-icons type="right" size="16" color="#999999"></uni-icons>
		</view> -->
		<view class="px-3 mt-2 bg-white">
			<i-pro-list :resdata="list" />
		</view>
		<view class=" mt-2 bg-white">
			<view class="flex align-center justify-between p-3 border-bottom" @click="toCoupon">
				<view class="flex align-center">
					<text class="d-block px-1 line2 mr-2 font24 bg-danger text-white rounded">券</text>
					<text class="font28">优惠券</text>
				</view>
				<view class="text-danger font28">请选择优惠券</view>
			</view>
			<view class="flex align-center justify-between p-3">
				<view class="flex align-center">
					<text class="d-block px-1 line2 mr-2 font24 bg-warning text-white rounded">商</text>
					<text class="font28">商家促销</text>
				</view>
				<view class="text-muted font28">暂无可用优惠</view>
			</view>
		</view>
		<view class=" mt-2 bg-white">
			<view class="flex align-center justify-between p-3 border-bottom">
				<text class="font28 text-muted">商品金额</text>
				<view class="cny font-weight-bold">9999</view>
			</view>
			<view class="flex align-center justify-between p-3 border-bottom">
				<text class="font28 text-muted">优惠金额</text>
				<view class="cny text-danger">-99.9</view>
			</view>
			<view class="flex align-center justify-between p-3">
				<text class="font28 text-muted">运费</text>
				<view class="font28">免运费</view>
			</view>
			
		</view>
		<view class="mt-2 bg-white p-3">
			<view class="font30 mr-2">备注信息</view>
			<textarea placeholder="请输入备注信息" class="font30 mt-2 w-100" style="height: 100rpx;"></textarea>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="fixed-bottom bg-white py-2 border-top">
			<view class="flex align-center justify-between px-3">
				<view class="flex align-center font32">
					<text class="text-muted">实付金额：</text>
					<view class="cny font-weight-bold">999.00</view>
				</view>
				<view class="bg-danger text-white px-4 rounded-circle py-2 font30" @click="toPay">立即支付</view>
			</view>
		</view>
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
			toPay(){
				uni.navigateTo({
					url:'/pages/order/pay'
				})
			},
			toAddress(){
				uni.navigateTo({
					url:'/pages/order/addresslList'
				})
			},
			toCoupon(){
				uni.navigateTo({
					url:'/pages/order/couponList'
				})
			},
		}
	}
</script>

<style>

</style>
