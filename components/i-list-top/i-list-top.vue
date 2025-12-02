<template>
	<view>
		<uni-row :gutter="30">
			<uni-col :span="12" v-for="(item,index) in resdata" :key="index" >
				<view class="bg-white mt-3 rounded-lg overflow-hidden pb-3"  @click="toShow(item.id)">
					<image src="/static/pro2.jpg" class="rounded-top-lg" style="width: 345rpx; height: 345rpx;" mode="aspectFill"></image>
					
					<view class="font28 text-ellipsis-1 px-2 mt-2">抗震盘螺</view>
					<view class="mt-1 font24 text-muted px-2 text-ellipsis-2 line2">副标题</view>
					<view class="mt-1 flex align-end px-2">
						<view class="text-danger">
							<text class="cny">3000.00</text>
						</view>
						<view class="font24 text-through cny ml-2 text-muted">5555.55</view>
					</view>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	export default {
		name:"i-list-top",
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
			toShow(id){
				uni.navigateTo({
					url:'/pages/detail/detail'
				})
			},
		}
	}
</script>

<style>

</style>