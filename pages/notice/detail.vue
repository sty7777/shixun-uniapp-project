<template>
	<view class="px-3">
		<view class="mt-2 font40 line15">关于严禁上传任何形式的侵犯出版社权利的资料（含电子书等）的公告</view>
		<view class="bg-hover-light p-2 mt-2  rounded flex align-center justify-between flex-wrap font24">
			<view class="flex align-center">
				<uni-icons type="contact" size="16" color="#cccccc"></uni-icons>
				<text class="font24 text-muted">管理员</text>
			</view>
			<view class="flex align-center">
				<uni-icons type="eye" size="16" color="#cccccc"></uni-icons>
				<text class="font24 text-muted">200</text>
			</view>
			<view class="flex align-center">
				<uni-icons type="calendar" size="16" color="#cccccc"></uni-icons>
				<text class="font24 text-muted">2022-12-12</text>
			</view>
		</view>
		<view class="mt-2">
			<u-parse :content="content" @preview="preview" @navigate="navigate" ></u-parse>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: "<div>亲爱的上传用户：<br />随着版权意识的觉醒，可能正规电子出版物的版权问题将越来越严重。本站将对逐步排查清理，已经存在的电子出版物将强行下架。并且要求广大上传用户不得上传侵犯出版社权利的资料，特别是电子书籍，论文等容易引起侵权纠纷的资料。<br />凡是侵犯出版社权利的资料，一律不得上传。任何上传这些资料的用户，将自行承担由此带来的纠纷和法律后果。<br /><div style='text-align:right'>2021.12.8<br />学科100</div></div>",
			}
		},

		methods: {
			preview(src, e) {
				// do something
			},
			navigate(href, e) {
				// do something
			},
		},
	}
</script>

<style>

</style>