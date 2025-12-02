<template>
	<view>
		<view class="flex align-center justify-center">
			<view class="text-center">
				<image :src="src" style="width: 300rpx;height: 248rpx;"></image>
				<view class="font32 text-center">{{title}}</view>
				<view class="mt-2 font28 text-muted text-center" v-if="subtitle">{{subtitle}}</view>
				<view class="mt-3 text-center" v-if="isBtn">
					<text class="px-5 py-2 font28 bg-danger text-white rounded-circle" @click="toShow">随便逛逛</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-nodata",
		props:{
			src:{
				type:String,
				default(){
					return '/static/zanwu.png'
				}
			},
			title:{
				type:String,
				default(){
					return '空空如也'
				}
			},
			subtitle:{
				type:String,
				default(){
					return null
				}
			},
			isBtn:{
				type:Boolean,
				default(){
					return true
				}
			}
		},
		methods:{
			toShow(){
				this.$emit('click')
			},
		}
	}
</script>

<style>

</style>