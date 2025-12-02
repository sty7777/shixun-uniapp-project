<template>
	<view>
		<view class="flex align-center py-3 " v-if="userid">
			<view class="flex-1 flex align-center">
				<image :src="!avatar?'/static/avatar.png':avatar" style="width: 120rpx;height: 120rpx;"
					class="rounded-circle mr-2"></image>
				<view class="flex-1">
					<view class="font34 text-white">{{nickname}}</view>
					<view class="text-white font28 mt-2 ">{{userid}}</view>
				</view>
			</view>
			<!-- <uni-icons type="right" size="18" color="#333333" ></uni-icons> -->
		</view>
		<view class="flex align-center py-3 " v-else>
			<image src="/static/avatar.png" style="width: 120rpx;height: 120rpx;" class="rounded-circle mr-2"></image>
			<view class="flex-1">
				<view class="font34 text-white">点击登录</view>
				<view class="text-white font24 mt-2 ">一键登录，体验更多功能</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "i-account",
		props: {
			avatar: {
				type: String,
				default () {
					return '/static/avatar.png';
				},
			},
			nickname: {
				type: String,
				default () {
					return null;
				},
			},
			userid: {
				type: String,
				default () {
					return null;
				},
			},
		},
		data() {
			return {

			};
		},
		methods: {
			toShow() {
				console.log('链接')
			}
		}
	}
</script>

<style>

</style>