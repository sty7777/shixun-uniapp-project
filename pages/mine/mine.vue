<template>
	<view>
		<view class="mybg">
			<view class="status_bar"></view>
			<view class="font36 text-center text-white py-2 px-2">个人中心</view>
			<view class="mx-2">
				<i-account />
				<view class="bg-dark overflow-hidden rounded-lg shadow-lg">
					<view class="flex align-center justify-between p-3 ">
						<view class="font-weight-bold font32 text-warning">开通会员</view>
						<view class="font28 text-white">享受更多专属权益</view>
					</view>
					<i-account-list :resdata="accountList" />
				</view>
			</view>
			<view class="mt-2 bg-white rounded-lg mx-3 px-3" v-if="gridList&&gridList.length>0">
				<i-nav-list :resdata="gridList"  />
			</view>
			<view class="mt-2 bg-white rounded-lg mx-3 px-3" v-if="myAppsList&&myAppsList.length>0">
				<i-nav-list :resdata="myAppsList" :column="5" @click="toList" />
			</view>
			<view class="mt-2 bg-white rounded-lg mx-3 px-3" v-if="barList&&barList.length>0">
				<i-my-list :resdata="barList" />
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridList:[{},{},{},{}],
				myAppsList:[{},{},{},{},{}],
				accountList:[{},{},{}],
				barList:[{},{},{},{},{},{},{},{},{},{},{}]
			}
		},
		methods: {
			toList(){
				uni.navigateTo({
					url:'/pages/order/orderList'
				})
			}
		}
	}
</script>

<style scoped>
.mybg{background-size: 750rpx 425rpx;background-position: top center; background-repeat: no-repeat;background-image: url('/static/bg.jpg')}
</style>
