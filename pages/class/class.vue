<template>
	<view>
		<i-category :categoryList="categoryList" :subCategoryList="subCategoryList" @categoryMainClick="categoryMainClick" @categorySubClick="categorySubClick"></i-category>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categoryList: [],
				subCategoryList: []
			}
		},
		onShow() {
		    console.log('商品页显示了');
		    // this.checkLoginAndLoadData();
		},
		mounted() {
			for (var i = 0; i < 20; i++) {
				var subList = [];
				for (var j = 0; j < 30; j++) {
					subList.push({
						"name": "分类" + i + ":商品" + j,
						"logo": "/static/pro.jpg"
					})
				}
				this.categoryList.push({
					"name": "分类" + i,
					"subCategoryList": subList
				})
			}
			this.subCategoryList = this.categoryList[0].subCategoryList;
		},
		methods: {
			categoryMainClick(category) {
				this.subCategoryList = category.subCategoryList;
			},
			categorySubClick(category) {
				uni.navigateTo({
					url:'/pages/list/list'
				})
			}
		}
	}
</script>

<style>

</style>