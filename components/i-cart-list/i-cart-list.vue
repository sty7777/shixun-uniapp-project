<template>
	<view>
		<view class="bg-white mt-2 px-2 py-3 flex align-center" v-for="(item,index) in resdata" :key="index">
			<uni-icons type="circle" size="24" color="#cccccc"></uni-icons>
			<view class="flex-1 ml-2 flex align-start">
				<image src="/static/pro1.jpg" style="width: 150rpx;height: 150rpx;" class="flex-shrink mr-2 rounded"></image>
				<view class="flex-1">
					<view class="flex align-center">
						<view class="text-ellipsis-1 font32 flex-1 mr-2">现货供应抗震盘螺大量批发</view>
						<uni-icons type="trash" size="20" color="#999999"></uni-icons>
					</view>
					<view class="flex align-center mt-2 font28">
						<text class="text-muted flex-shrink">类型：</text>
						<view class="flex-1 text-ellipsis-1">螺纹钢-20*20-GB2301-马场空</view>
					</view>
					<view class="flex align-center justify-between mt-2">
						<view class="text-danger">
							<text class="cny">99.9</text>
						</view>
						<uni-number-box  />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-cart-list",
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
		}
	}
</script>

<style>

</style>