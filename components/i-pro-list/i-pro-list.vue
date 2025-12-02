<template>
	<view>
		<view class="py-3 flex align-start acborder" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
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
	</view>
</template>

<script>
	export default {
		name:"i-pro-list",
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
	.acborder{border-bottom: 1rpx dotted #dddddd;}
	.acborder:last-child{border-bottom: 0rpx dotted #dddddd;}
</style>