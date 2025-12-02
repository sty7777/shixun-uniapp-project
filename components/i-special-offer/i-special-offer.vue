<template>
	<view>
		<view class="ac flex align-start" v-for="(item,index) in resdata" :key="index" @click="toShow">
			<image src="/static/pro2.jpg" style="width: 190rpx;height: 190rpx;" class="flex-shrink mr-2"></image>
			<view class="flex-1">
				<view class="flex align-center">
					<text class="d-inline-block bg-danger font20 text-white px-1 line2 rounded mr-1">秒杀</text>
					<view class="flex-1 text-ellipsis-1 font32">现货供应 抗震盘螺 大量批发</view>
				</view>
				<view class="text-muted mt-2 font28 text-ellipsis-1">耐久性强：钢材具备较高的耐久性，能够承受长期使用和恶劣环境的影响</view>
				<view class="mt-2 flex align-center" >
					<view class="flex-1 rounded-circle overflow-hidden">
						<progress  :percent="50" stroke-width="5" activeColor="#e43d33" />
					</view>
					<view class="ml-3 flex-shrink text-muted font24">已售50%</view>
				</view>
				<view class="mt-2 flex align-center justify-between">
					<view class=" flex align-end ">
						<view class="text-danger">
							<text class="cny">99.9</text>
						</view>
						<view class="font24 text-through cny ml-2 text-muted" >199.99</view>
					</view>
					<view class="bg-danger rounded-circle px-3 py-1 font28 text-white">去抢购</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-special-offer",
		props:{
			resdata: {
			  type: Array,
			  default() {
			    return [];
			  },
			},
		},
		methods:{
			toShow(item){
				this.$emit('click',item)
			}
		}
	}
</script>

<style scoped>
.ac{border-bottom: 1rpx dotted #dddddd;padding:30rpx 0 ;}
.ac:last-child{border-bottom: 0rpx dotted #dddddd;padding:30rpx 0 0 0;}
</style>