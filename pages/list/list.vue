<template>
	<view>
		<view class="bg-white flex align-center font32 position-sticky">
			<view class="flex-1 text-center">
				<text class="d-inline-block border-bottom py-3 text-danger border-danger font-weight-bold">综合推荐</text>
			</view>
			<view class="flex-1 text-center">
				<text class="d-inline-block border-bottom py-3 text-muted border-white ">销量优先</text>
			</view>
			<view class="flex-1 text-center">
				<text class="d-inline-block border-bottom py-3 text-muted border-white ">价格排序</text>
			</view>
			<view class="flex-shrink mx-3" @click="toDrawer">
				<uni-icons type="settings" size="24" color="#333333"></uni-icons>
			</view>
		</view>
		<view class="px-2">
			<i-list-top :resdata="list"  />
		</view>
		<i-nodata title='空空如也' subtitle="别忘了买点什么犒赏下自己哦~" src="/static/zanwu.png" :isBtn="true" @click="toMore" />
		
		<uni-drawer ref="showRight" mode="right" :mask-click="true" >
			<view >
				<view class="info">
					<text class="info-text">右侧遮罩只能通过按钮关闭，不能通过点击遮罩关闭</text>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[{},{},{},{},{},{},{},{},{},{},]
			}
		},
		methods: {
			toDrawer(){
				this.$refs.showRight.open()
			},
			toMore(){
				
			}
		}
	}
</script>

<style>

</style>