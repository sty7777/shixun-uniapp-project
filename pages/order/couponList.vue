<template>
	<view class="px-2">
		<view class="overflow-hidden mt-2 flex align-stretch rounded-lg">
			<view class="bg-white p-3 flex-2 flex flex-column justify-between ">
				<view class="flex align-center">
					<text class="d-block px-2 line2 mr-2 font24 bg-danger text-white rounded-circle">全场通用</text>
					<text class="font24">满5000减200</text>
				</view>
				<view class="mt-1">
					<view class="text-muted font24">有效期：</view>
					<view class="font24 mt-1">2025-12-12 15:00~2025-12-12 15:00</view>
				</view>
				
			</view>
			<view class="bg-danger p-3 flex-1 text-center dotted">
				<view class="font50 cny text-white">200</view>
				<view class="font28 text-white mt-1">满5000使用</view>
				<view class="mt-2">
					<text class="d-inline-block px-2 line2 py mr-2 font24 bg-white text-danger rounded-circle">立即使用</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	 .dotted {
	        position: relative;
	    }
 .dotted:before {
        content: ' ';
        width: 0;
        height: 100%;
        position: absolute;
        /* 小球形状 */
        border-right: 6px dotted white;
        left: -3px;
        top: 0px;
    }
    .dotted::after {
        content: ' ';
        width: 0;
        height: 100%;
        position: absolute;
        /* 小球形状 */
        border-right: 6px dotted white;
        right: -3px;
        top: 0px;
    }
</style>
