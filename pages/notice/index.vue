<template>
	<view class="px-2">
		<i-news-list :resdata="newsList" @click="toShow" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList:[
					{
						title      : '新闻标题文本',
						author     : '某某作者',
						createTime : '2020.09.05',
						imgs       : [],
						views      : 98052
					},
					{
						id         : 2, 
						title      : '新闻标题文本长文本新闻标题文本长文本新闻标题文本长文本',
						author     : '某某作者',
						createTime : '2020.09.05',
						imgs       : [],
						views      : 8052
					},
					{
						title      : '新闻标题文本，新闻标题文本',
						author     : '某某作者',
						createTime : '2020.09.05',
						imgs       : [],
						views      : 62012
					},
				]
			}
		},
		methods: {
			toShow(item){
				uni.navigateTo({
					url:'/pages/notice/detail'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}
</style>
