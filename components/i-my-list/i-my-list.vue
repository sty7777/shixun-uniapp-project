<template>
	<view>
		<view class="flex align-center justify-between py-3 active" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
			<view class="flex align-center flex-1">
				<image src="/static/weixin.png" style="width: 40rpx;height: 40rpx;" class="mr-2 flex-shrink"></image>
				<view class="flex-1 font30">编辑资料</view>
			</view>
			<uni-icons type="right" size="16" color="#dddddd"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-my-list",
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
				console.log('链接')
			}
		}
	}
</script>

<style scoped>
.active{border-bottom: 1rpx solid #f1f1f1;}
.active:last-child{border-bottom: 0rpx solid #f1f1f1;}
</style>