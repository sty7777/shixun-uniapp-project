<template>
	<view>
		<scroll-view scroll-x class="scroll-row" >
			<view class="scroll-row-item mr-2" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
				<image src="/static/pro1.jpg" style="width: 190rpx;height: 190rpx;" mode="aspectFill"></image>
				<view class="font30 text-ellipsis mt-2" style="width:190rpx;">螺纹钢螺纹钢螺2222纹钢</view>
				<view class="font30 cny text-danger mt-1">99.99</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"i-special-offer",
		props:{
			resdata:{
				type:Array,
				default() {
				  return [];
				},
			},
			
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