<template>
	<view>
		<view class="nav">
			<view class="nav-left">
				<scroll-view scroll-y style="height:100vh">
					<view class="nav-left-item" :class="categoryActive==index?'ac-white':' noac'" v-for="(item,index) in categoryList" @click="categoryClickMain(item,index)" :key="index">
						<view class="flex-1 text-center text-ellipsis-1" :class="categoryActive==index?'active':'noactive text-muted'">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="nav-right bg-white">
				<scroll-view scroll-y :scroll-top="scrollTop" @scroll="scroll" style="height:100vh" scroll-with-animation>
					<view class="nav-right-item" v-for="(item,index2) in subCategoryList" :key="index2" @click="categoryClickSub(item)">
						<image :src="item.logo" />
						<view class="text-ellipsis-1 mt-2">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "category",
		data() {
			return {
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				categoryActive: 0,
			}
		},
		props: {
			//主分类激活索引
			defaultActive: {
				type: Number,
				default: 0
			},
			//主分类List
			categoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//侧边分类List
			subCategoryList: {
				type: Array,
				default: () => {
					return null;
				}
			},
			//主分类点击事件
			categoryMainClick: {},
			//子分类点击事件
			categorySubClick: {}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(category, index) {
				this.$emit('categoryMainClick',category)
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
			},
			categoryClickSub(category) {
				this.$emit('categorySubClick',category)
			}
		},
		mounted() {
			this.categoryActive = this.defaultActive
			uni.getSystemInfo({
				success: res => {
					this.height = res.screenHeight;
				}
			})
		},
		watch: {
			subCategoryList(newValue, oldValue) {
				
			}
		},
	}
</script>

<style scoped>
	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 50px;
		border-bottom: solid 1px #f1f1f1;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right-item {
		width: 28%;
		float: left;
		text-align: center;
		padding:20rpx 5px;
		font-size: 12px;
	}

	.nav-right-item image {
		width: 50px;
		height: 50px;
	}

	.active {
		color: #F24544;
		border-left: 5px solid #F24544; 
	}
	.noactive {
		border-left: 5px solid #FFFFFF; 
	}
	.ac-white{background-color: #ffffff;border-right: 1 #ffffff solid;}
	.noac{border-right: solid 1px #f1f1f1;}
</style>
