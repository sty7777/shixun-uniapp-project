<template>
	<view>
		<uni-swiper-dot :info="resdata" :current="current" :dots-styles="dotsStyles">
			<swiper :style="'height:'+height+'rpx'" @change="change">
				<swiper-item v-for="(item ,index) in resdata" :key="index" class=" overflow-hidden" :class="round?'rounded-lg':''">
					<view class="overflow-hidden" :class="round?'rounded-lg':''" @click="toShow(item)">
						<image src="/static/banner.jpg" :style="'height:'+ height +'rpx'+';width:'+ width +'rpx'" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	export default {
		name:"iSwiper",
		props:{
			resdata: {
			  type: Array,
			  default() {
			    return [];
			  },
			},
			width:{
				type: Number,
				default() {
				  return 0;
				},
			},
			height:{
				type: Number,
				default() {
				  return 0;
				},
			},
			round:{
				type: Boolean,
				default() {
				  return true;
				},
			}
			
		},
		data() {
			return {
				current: 0,
				dotsStyles: {
					backgroundColor: 'rgba(255, 90, 95,0.3)',
					border: '1px rgba(255, 90, 95,0.3) solid',
					color: '#fff',
					selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
					selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
				},
			};
		},
		methods:{
			change(e) {
				this.current = e.detail.current
			},
			toShow(item){
				this.$emit('click',item)
			}
		}
	}
</script>

<style scoped>

</style>