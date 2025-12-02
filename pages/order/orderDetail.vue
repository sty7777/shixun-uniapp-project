<template>
	<view>
		<view class="orderbg">
			<view class="py-3">
				<uni-steps :options="list2" :active="active" active-color="#FFFFFF" deactiveColor="#FFFFFF" />
			</view>
			<view class="bg-white px-3 mx-2 rounded-lg">
				<view class="flex align-center py-3 border-bottom">
					<view class="flex align-center flex-1">
						<image src="/static/car.svg" style="width: 50rpx;height: 50rpx;" class="mr-1"></image>
						<view class="flex-1 text-muted font30">暂无物流信息</view>
					</view>
					<uni-icons type="right" size="16" color="#dddddd"></uni-icons>
				</view>
				<view class="flex align-center py-3">
					<uni-icons type="location" size="28" color="#333333"></uni-icons>
					<view class="flex-1 ml-2">
						<view class="flex align-center font32">
							<text>王连成</text>
							<text class="ml-3">15398080419</text>
						</view>
						<view class="mt-1 font30 line15">陕西省西安市新城区石家街128号东岸购机2008</view>
					</view>
				</view>
			</view>
			<view class="bg-white px-3 pb-3 mx-2 rounded-lg mt-2">
				<view class="py-3 flex align-start" v-for="(item,index) in 3" :key="index">
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
				<view class="border-top">
					<view class="flex align-center justify-between pt-3 font30">
						<view class="text-muted">商品金额</view>
						<view class="cny">599</view>
					</view>
					<view class="flex align-center justify-between pt-3 font30">
						<view class="text-muted">运费</view>
						<view class="cny">0</view>
					</view>
					<view class="flex align-center justify-between pt-3 font30">
						<view class="text-muted">优惠金额</view>
						<view class="cny">0</view>
					</view>
					<view class="flex align-center justify-between pt-3 font30">
						<view class="text-muted">应付金额</view>
						<view class="cny text-danger">599</view>
					</view>
					<view class="flex align-center justify-between pt-3 font30">
						<view class="text-muted">实付金额</view>
						<view class="cny text-danger">599</view>
					</view>
				</view>
			</view>
			<view class="bg-white px-3 pb-3 mx-2 rounded-lg mt-2">
				<view class="flex align-center justify-between pt-3 font30">
					<view class="text-muted">订单编号</view>
					<view>456465456464654560</view>
				</view>
				<view class="flex align-center justify-between pt-3 font30">
					<view class="text-muted">支付方式</view>
					<view>微信支付</view>
				</view>
				<view class="flex align-center justify-between pt-3 font30">
					<view class="text-muted">创建时间</view>
					<view>2022-12-12 15:00</view>
				</view>
				<view class="pt-3 font30">
					<view class="text-muted">购买备注</view>
					<view class="mt-2">456465456464654560</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="fixed-bottom bg-white p-2 p-2 flex align-center justify-end border-top">
			<view class="bg-light text-muted font28 px-3 py-2 rounded-circle" @click="toEvaluate">评价</view>
			<view class="bg-light text-muted font28 px-3 py-2 rounded-circle ml-2">取消</view>
			<view class="bg-danger text-white font28 px-4 py-2 rounded-circle ml-2">确认收货</view>
			<view class="bg-success text-white font28 px-4 py-2 rounded-circle ml-2" @click="toPay">支付</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0,
				list2: [{
					title: '待付款',
				}, {
					title: '代发货',
				}, {
					title: '待收货',
				}, {
					title: '待评价',
				}, {
					title: '已完成',
				}]
			}
		},
		methods: {
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
.orderbg{background-size: 750rpx 240rpx;background-position: top center; background-repeat: no-repeat;background-image: url('/static/bg.jpg');}
</style>