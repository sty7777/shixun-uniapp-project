<template>
	<view>
		<view class="p-3 rounded-lg bg-white mt-2" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
			<text class="font32 line15">{{item.title}}</text>
			<view class="mt-2" v-if="item.imgs.length==1">
				<image :src="item.imgs[0]" style="width:630rpx;height: 280rpx;" mode="aspectFill"></image>
			</view>
			<view class="mt-2" v-if="item.imgs.length==2">
				<uni-row :gutter="10">
					<uni-col :span="12" >
						<image :src="item.imgs[0]" style="width:310rpx;height: 200rpx;" mode="aspectFill"></image>
					</uni-col>
					<uni-col :span="12" >
						<image :src="item.imgs[1]" style="width:310rpx;height: 200rpx;" mode="aspectFill"></image>
					</uni-col>
				</uni-row>
			</view>
			<view class="mt-2" v-if="item.imgs.length >= 3">
				<uni-row :gutter="10">
					<uni-col :span="8" >
						<image :src="item.imgs[0]" style="width:203rpx;height: 150rpx;" mode="aspectFill"></image>
					</uni-col>
					<uni-col :span="8" >
						<image :src="item.imgs[1]" style="width:203rpx;height: 150rpx;" mode="aspectFill"></image>
					</uni-col>
					<uni-col :span="8" >
						<image :src="item.imgs[2]" style="width:203rpx;height: 150rpx;" mode="aspectFill"></image>
					</uni-col>
				</uni-row>
			</view>
			<view class="flex align-center justify-between mt-2">
				<view class="flex align-center">
					<uni-icons type="contact" size="16" color="#cccccc"></uni-icons>
					<text class="font24 text-muted">{{item.author}}</text>
				</view>
				<view class="flex align-center">
					<uni-icons type="eye" size="16" color="#cccccc"></uni-icons>
					<text class="font24 text-muted">{{item.views}}</text>
				</view>
				<view class="flex align-center">
					<uni-icons type="calendar" size="16" color="#cccccc"></uni-icons>
					<text class="font24 text-muted">{{item.createTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-news-list",
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
				this.$emit('click',item)
			}
		}
	}
</script>

<style>

</style>