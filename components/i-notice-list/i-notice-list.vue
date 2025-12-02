<template>
	<view class="flex align-center rounded-lg bg-white p-2">
		<view class="mr-2 border-right pr-2 flex-shrink border-light">
			<uni-icons type="notification" size="20" color="#e43d33"></uni-icons>
		</view>
		<swiper class="swiperNotice flex-1"   :ndicator-dots="false"
		  autoplay
		  :interval="3000" 
		  :duration="1000" 
	      :vertical="true"   
	      :circular="true">
		  <swiper-item v-for="(item,index) in resdata" :key="index" >
		    <view class="font28 text-ellipsis-1"  @tap="toNotice(item)">特别公告：禁止上传 任何 涉及 第三方版权资料</view>
		  </swiper-item>
		</swiper>
		<text class="font28 ml-2 text-muted" @click="toNews">更多</text>
	</view>
</template>

<script>

	export default{
		props:{
			resdata:{
				type:Array,
				default() {
				  return [];
				},
			},
		},
		// 计算属性
		
		methods:{
			toNotice(item){
				this.$emit('showClick',item)
			},
			toNews(){
				this.$emit('click')
			}
		}
	}
</script>

<style>
.swiperNotice {
	  height: 50rpx; line-height: 50rpx;
	}
</style>
