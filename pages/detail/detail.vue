<template>
	<view>
		<i-swiper :resdata="piclist" :width="750" :height="750" :round='false' />
		<view class="bg-white p-3">
			<view class="flex align-center">
				<text class="d-inline-block bg-danger font20 text-white px-1 line2 rounded mr-1">秒杀</text>
				<view class="flex-1 text-ellipsis-1 font32">现货供应 抗震盘螺 大量批发</view>
			</view>
			<view class="text-muted mt-2 font28 text-ellipsis-1">耐久性强：钢材具备较高的耐久性，能够承受长期使用和恶劣环境的影响</view>
			<view class=" flex align-end mt-2">
				<view class="text-danger">
					<text class="cny">99.9</text>
				</view>
				<view class="font24 text-through cny ml-2 text-muted">199.99</view>
			</view>
			<view class=" flex align-center justify-between mt-2">
				<view class="flex align-center font28">
					<text class="text-muted ">销量：</text>
					<text>96</text>
				</view>
				<view class="flex align-center font28">
					<text class="text-muted ">库存：</text>
					<text>365</text>
				</view>
				<view class="flex align-center font28">
					<text class="text-muted ">浏览量：</text>
					<text>989898</text>
				</view>
			</view>
		</view>
		<view class="bg-light-danger px-2 py-2 font28 flex align-center justify-between">
			<view class="flex align-center flex-1">
				<uni-icons type="starhalf" size="20" color="#e43d33"></uni-icons>
				<text class="ml-1 text-danger">该产品分享后可享受49.9减10红包</text>
			</view>
			<view class="flex align-center justify-end">
				<text class="text-danger">立即分享</text>
				<uni-icons type="right" size="14" color="#e43d33"></uni-icons>
			</view>
		</view>
		<view class="bg-white p-3 flex align-center font28 flex align-center border-bottom border-light" @click="openPop">
			<view class="flex-1 flex align-center">
				<text class="d-block flex-shrink text-muted" style="width: 150rpx;">购买类型</text>
				<view class="flex-1">螺纹钢</view>
			</view>
			<uni-icons type="right" size="16" color="#cccccc"></uni-icons>
		</view>
		<view class="bg-white p-3 flex align-center font28 flex align-center border-bottom border-light">
			<view class="flex-1 flex align-center">
				<text class="d-block flex-shrink text-muted" style="width: 150rpx;">优惠券</text>
				<view class="flex-1 text-danger">领取优惠券</view>
			</view>
			<uni-icons type="right" size="16" color="#cccccc"></uni-icons>
		</view>
		<view class="bg-white p-3 flex align-center font28 flex align-center border-bottom border-light">
			<view class="flex-1 flex align-center">
				<text class="d-block flex-shrink text-muted" style="width: 150rpx;">促销活动</text>
				<view class="flex-1">
					<view class="line2">领取优惠券</view>
					<view class="line2">领取优惠券</view>
					<view class="line2">领取优惠券</view>
					<view class="line2">领取优惠券</view>
					<view class="line2">领取优惠券</view>
				</view>
			</view>
			<uni-icons type="right" size="16" color="#cccccc"></uni-icons>
		</view>
		<view class="bg-white p-3 flex align-center font28 flex align-center">
			<view class="flex-1 flex align-center">
				<text class="d-block flex-shrink text-muted" style="width: 150rpx;">服务</text>
				<view class="flex-1">
					<text>7天无理由退款</text>
					<text class="ml-2">假一赔十</text>
				</view>
			</view>
			<uni-icons type="right" size="16" color="#cccccc"></uni-icons>
		</view>
		<view class="bg-white p-3 mt-2">
			<view class="flex align-center justify-between" @click="toEvaluate">
				<view class="flex align-center">
					<text class="font32">评价</text>
					<text class="font28 text-muted">（30）</text>
				</view>
				<view class="flex align-center font28">
					<text>好评率</text>
					<text class="ml-1 text-muted">100%</text>
					<uni-icons type="right" size="16" color="#cccccc"></uni-icons>
				</view>
			</view>
			<i-evaluate-list :resdata="evaluateList" />
			<view class="text-center pt-3 font28" @click="toEvaluate">全部评价</view>
		</view>
		<view class="mt-2 bg-white p-3">
			<view class="font32 font-weight-bold">图文详情</view>
			<i-spread width="690rpx" height="2000rpx" :isShrink="true">
				<u-parse  :content="content" @preview="preview" @navigate="navigate"></u-parse>
			</i-spread>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="bg-white fixed-bottom">
			<view class=" px-2 py-1 border-top flex align-center">
				<view class="flex-1 flex align-center ">
					<view class="text-center flex-1" @click="toIndex">
						<uni-icons type="home" size="20" color="#333333"></uni-icons>
						<view class="font24">首页</view>
					</view>
					<view class="text-center flex-1" @click="toCart">
						<uni-icons type="cart" size="20" color="#333333"></uni-icons>
						<view class="font24">购物车</view>
					</view>
					<view class="text-center flex-1" @click="changeCollection">
						<uni-icons :type="isCollection?'heart-filled':'heart'" size="20" :color="isCollection?'#e43d33':'#333333'"></uni-icons>
						<view class="font24 " :class="isCollection?'text-danger':''">收藏</view>
					</view>
				</view>
				<view class="flex-2 flex align-center ml-2">
					<view class="bg-warning text-white text-center py-2 font30 line15 rounded-circle-left flex-1">加入购物车</view>
					<view class="bg-danger text-white text-center py-2 font30 line15 rounded-circle-right flex-1">立即购买</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="bg-white p-3 rounded-top-lg">
				<view class="flex align-center">
					<image src="/static/pro1.jpg" style="width: 120rpx;height: 120rpx;" class="mr-2 flex-shrink"></image>
					<view class="flex-1">
						<view class="text-danger font32">
							<text class="cny">99.9</text>
						</view>
						<view class="flex align-center font28 mt-2">
							<text class="text-muted">库存：</text>
							<text>1111</text>
						</view>
						<view class="flex align-center font28 mt-2">
							<text class="text-muted">已选：</text>
							<text>螺纹钢-20*20-GB2301-马场空</text>
						</view>
					</view>
				</view>
				<view class="font28 mt-2">材质</view>
				<view class="flex align-center flex-wrap">
					<view class="bg-light text-muted font24 px-3 py-2 mr-2 mt-2 rounded-circle" v-for="(item,index) in 10" :key="index">20*20</view>
				</view>
				<view class="font28 mt-2">规格</view>
				<view class="flex align-center flex-wrap">
					<view class="bg-light text-muted font24 px-3 py-2 mr-2 mt-2 rounded-circle" v-for="(item,index) in 10" :key="index">20*20</view>
				</view>
				<view class="font28 mt-2 flex align-center justify-between">
					<text>数量</text>
					<uni-number-box  />
				</view>
				<view class="bg-warning rounded-circle mt-3 text-white py-2 font30 text-center" @click="closePop">确认选择</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isCollection:false,
				piclist: [{}, {}],
				content: '<div><img src="https://www.77wenku.com/fileroot1/2021-8/13/0b68f48a-c3f0-41d6-83f3-042d75850077/0b68f48a-c3f0-41d6-83f3-042d758500771.gif"  alt="专题20 应用题综合（函数、不等式、方程）-三年（2019-2021）中考真题数学分项汇编（全国通用）（原卷版）_第1页" width="100%" /></div><div><img src="https://www.77wenku.com/fileroot1/2021-8/13/0b68f48a-c3f0-41d6-83f3-042d75850077/0b68f48a-c3f0-41d6-83f3-042d758500771.gif"  alt="专题20 应用题综合（函数、不等式、方程）-三年（2019-2021）中考真题数学分项汇编（全国通用）（原卷版）_第1页" width="100%" /></div>',
				evaluateList:[{},{}]
			}
		},
		methods: {
			openPop(){
				this.$refs.popup.open()
			},
			closePop(){
				this.$refs.popup.close()
			},
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			},
			changeCollection(){
				this.isCollection = !this.isCollection
			},
			toIndex(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			toCart(){
				uni.switchTab({
					url:'/pages/cart/cart'
				})
			},
			toEvaluate(){
				uni.navigateTo({
					url:'/pages/evaluate/list'
				})
			},
			
		}
	}
</script>

<style scoped>
	.bg-light-danger {
		background-color: #fad8d6;
	}
</style>