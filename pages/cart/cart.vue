<template>
	<view class="px-2">
		<!-- <view class="text-right">
			<text class="d-inline-block px-3 font28 text-muted bg-light py-1 rounded-circle">清空失效产品</text>
		</view> -->
		<i-cart-list :resdata="list" />
		<view class="cu-tabbar-height"></view>
		<view class="flex align-center justify-between fixed-bottom bg-white py-2">
			<view class="flex align-center pl-2">
				<view class="flex align-center mr-1" @click="changeALL">
					<uni-icons :type="isAll?'checkbox-filled':'circle'" size="24" :color="isAll?'#e43d33':'#CCCCCC'"></uni-icons>
					<text class="ml-1 font28">全选</text>
				</view>
				<view class="border-light border text-muted rounded-circle px-3 py-1 font24 mr-1">删除</view>
				<view class="border-danger border text-danger rounded-circle px-3 py-1 font24">清空</view>
			</view>
			<view class="flex align-center pr-2">
				<view class="font-weight-bold cny mr-2">123465.11</view>
				<view class="bg-danger rounded-circle px-3 text-white py-1 font30" @click="toOrderAdd">结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{},{},{},{},{},{},{}],
				isAll:false,
			}
		},
		methods: {
			changeALL(){
				this.isAll = !this.isAll
			},
			toOrderAdd(){
				uni.navigateTo({
					url:'/pages/order/orderAdd'
				})
			},
		}
	}
</script>

<style>

</style>
