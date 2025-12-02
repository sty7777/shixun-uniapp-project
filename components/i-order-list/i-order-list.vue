<template>
	<view>
		<view class="bg-white p-3 rounded-lg mt-2 mx-2" v-for="(item,index) in resdata" :key="index">
			<view class="flex align-center justify-between pb-3 border-bottom">
				<view class="text-muted font28">2024-12-12 15:00</view>
				<view class="text-danger font28">待支付</view>
			</view>
			<!-- 单个产品 -->
			<view class="py-3 flex align-start" v-if="index==1" @click="toShow(item)">
				<image src="/static/pro1.jpg" style="width: 150rpx;height: 150rpx;" class="flex-shrink mr-2 rounded"></image>
				<view class="flex-1">
					<view class="text-ellipsis-1 font32">现货供应抗震盘螺大量批发</view>
					<view class="flex align-center mt-2 font28">
						<text class="text-muted flex-shrink">类型：</text>
						<view class="flex-1 text-ellipsis-1">螺纹钢-20*20-GB2301-马场空</view>
					</view>
					<view class="flex align-center justify-between mt-2 ">
						<view class="text-danger">
							<text class="cny">99.9</text>
						</view>
						<view class="flex align-center justify-end font28">
							<text class="text-muted">数量：</text>
							<text>99</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 多个产品 -->
			<view class="flex align-center py-3" v-else @click="toShow(item)">
				<image src="/static/pro1.jpg" style="width: 150rpx;height: 150rpx;" class="flex-shrink mr-2 rounded"></image>
				<image src="/static/pro1.jpg" style="width: 150rpx;height: 150rpx;" class="flex-shrink mr-2 rounded"></image>
				<image src="/static/pro1.jpg" style="width: 150rpx;height: 150rpx;" class="flex-shrink mr-2 rounded"></image>
			</view>
			
			<view class="flex align-center justify-end pb-3 border-bottom">
				<view class="flex align-center font30 mr-2">
					<text class="text-muted">共</text>
					<text class="mx-1">1</text>
					<text class="text-muted">件商品</text>
				</view>
				<view class="flex align-center font28 mr-2">
					<text class="text-muted">运费</text>
					<text class="ml-1 cny text-warning">50</text>
					
				</view>
				<view class="flex align-center font28">
					<text class="text-muted">实付款</text>
					<text class="ml-1 cny text-danger">5000</text>
				</view>
			</view>
			<view class="flex align-center justify-end pt-3">
				<view class="bg-light text-muted font28 px-3 py-2 rounded-circle" @click="toEvaluate">评价</view>
				<view class="bg-light text-muted font28 px-3 py-2 rounded-circle ml-2">取消</view>
				<view class="bg-danger text-white font28 px-4 py-2 rounded-circle ml-2">确认收货</view>
				<view class="bg-success text-white font28 px-4 py-2 rounded-circle ml-2" @click="toPay">支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-order-list",
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
					url:'/pages/order/orderDetail'
				})
			},
			toPay(){
				uni.navigateTo({
					url:'/pages/order/pay'
				})
			},
			toEvaluate(){
				uni.navigateTo({
					url:'/pages/evaluate/add'
				})
			}
		}
	}
</script>

<style>

</style>