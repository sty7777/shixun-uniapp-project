<template>
	<view>
		<view class="bg-white rounded-lg mb-2 p-3" v-for="(item,index) in resdata" :key="index" @click="toShow(item)">
			<view class="border-dotted-bottom pb-3">
				<view class="flex align-center font32">
					<text>王连成</text>
					<text class="ml-3">15398080419</text>
				</view>
				<view class="mt-1 font30 line15">陕西省西安市新城区石家街128号东岸购机2008</view>
			</view>
			<view class="flex align-center justify-between pt-3">
				<view class="flex align-center">
					<uni-icons type="circle-filled" size="20" color="#e43d33"></uni-icons>
					<text class="font30 ml-1 text-danger">设为默认</text>
				</view>
				<view class="flex align-center justify-end">
					<uni-icons type="compose" size="20" color="#999999" class="mr-3"></uni-icons>
					<uni-icons type="trash" size="20" color="#999999"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"i-address-list",
		props:{
			resdata:{
				type:Array,
				default() {
				  return [];
				},
			}
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