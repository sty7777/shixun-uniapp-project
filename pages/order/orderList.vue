<template>
	<view class="flex flex-column" style="height: 100vh;">
		<view class="flex align-center justify-between pt-3 bg-white flex-shrink">
			<view  v-for="(item,index) in tabBar" :key="index" class="flex-1 text-center " @click="changeTab(index)">
				<text :class="tabIndex==index?'text-danger font-weight-bold':'text-muted'">{{item}}</text>
				<view :class="tabIndex==index?'bg-danger':''" style="width: 30rpx;height: 10rpx;" class="rounded-lg d-block mx-auto mt-2 "></view>
			</view>
		</view>
		<swiper class="flex-1" :current="tabIndex"  @change="swiperChange" >
			<swiper-item class="flex" v-for="(item,index) in tabBar" :key="index">
				<scroll-view  class="flex-1"  scroll-y="true">
					<i-order-list :resdata="tabBar"></i-order-list>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex:0,
				tabBar:['全部','待付款','待发货','待收货','待评价']
			}
		},
		methods: {
			changeTab(index){
				this.tabIndex = index
			},
			swiperChange(e){
				this.tabIndex = e.detail.current
			}
		}
	}
</script>

<style scoped>

</style>
