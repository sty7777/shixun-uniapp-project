<template>
	<view>
		<view class="flex align-center justify-between">
			<text class="d-block font32 font-weight-bold">{{title}}</text>
			<view v-if='countdown'>
				<uni-countdown :day="day" :hour="hour" :minute="minute" :second="second" color="#FFFFFF" :font-size="12" background-color="#000000" />
			</view>
			<view v-if='more' class="flex align-center" @click="toShow">
				<text class="font28">查看更多</text>
				<uni-icons type="right" size="14" color="#999999"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-title-time",
		props:{
			title:{
				type:String,
				default() {
				  return '特价专区';
				},
			},
			day:{
				type:Number,
				default() {
				  return null;
				},
			},
			hour:{
				type:Number,
				default() {
				  return null;
				},
			},
			minute:{
				type:Number,
				default() {
				  return null;
				},
			},
			second:{
				type:Number,
				default() {
				  return null;
				},
			},
			countdown:{
				type:Boolean,
				default() {
				  return false;
				},
			},
			more:{
				type:Boolean,
				default() {
				  return false;
				},
			},
			
		},
		data() {
			return {
				
			};
		},
		methods:{
			toShow(){
				this.$emit('click')
			}
		}
		
	}
</script>

<style>

</style>