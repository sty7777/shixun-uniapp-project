<template>
	<view>
		<view class="px-2 position-sticky bg-white">
			<view class="status_bar"></view>
			<view class="flex align-center">
				<uni-icons type="scan" size="30" color="#333333"></uni-icons>
				<view class="bg-light mx-2 p-2 flex-1 rounded-lg flex align-center">
					<uni-icons type="search" size="20" color="#999999"></uni-icons>
					<text class="text-muted font30">请输入关键字</text>
				</view>
				<uni-badge  :text="10" absolute="rightTop" size="small" :is-dot="true">
					<uni-icons type="chat" size="30" color="#333333"></uni-icons>
				</uni-badge>
				
			</view>
			<scroll-view scroll-x class="scroll-row" style="height: 90rpx;" :scroll-with-animation="true"
				:show-scrollbar="false">
				<view class="scroll-row-item px-3" @click="changeTab(index)" v-for="(item,index) in tabBars"
					:key="index">
					<text style="line-height: 88rpx;" class="d-block"
						:class="tabIndex === index ? 'font-weight700 font36 border-bottom border-danger text-danger':'font30'">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="px-2">
			<view class="mt-2">
				<i-swiper :resdata="swiperList" :height="280" :width="690" />
			</view>
			<view class="mt-2 bg-white rounded-lg">
				<i-nav-list :column="5" :resdata="swiperList" />
			</view>
			<view class="mt-2">
					<i-notice-list :resdata="noticeList" @click="moreNotice" @showClick="toNotice" />
			</view>
			<view class="p-3 bg-white mt-2">
				<i-title :more="true" @click="toList" title="今日推荐" />
				<view class="mt-3">
					<i-scroll-list :resdata="swiperList" @click="toShow" />
				</view>
			</view>
			<view class="p-3 bg-white mt-2">
				<i-title :countdown="true" :day="0" :hour="20" :minute="30" :second="40" title="特价专区" />
				<i-special-offer :resdata="swiperList" />
			</view>
			<i-list-top :resdata="swiperList" />
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [{}, {}, {}, {}, {}],
				tabIndex: 0,
				tabBars: [{
						name: '推荐'
					},
					{
						name: '现货市场'

					},
					{
						name: '供应链服务'
					},	
					{
						name: '物流服务'
					},
					{
						name: ''
					}
				],
				noticeList:[{},{}]
			}
		},
		  // onLoad 只会在页面初始化时执行一次
		onLoad() {
             console.log('首页加载了');
            // 这里可以放一些不需要每次显示都刷新的逻辑
		},
		
		  // ✅ onShow 每次页面显示都会执行（包括登录后跳回来）
		        onShow() {
		            console.log('首页显示了');
		            this.checkLoginAndLoadData();
		        },
		methods: {
			
			checkLoginAndLoadData() {
			                // 1. 从本地缓存获取登录状态
			                const hasLogin = uni.getStorageSync('hasLogin');
			                const userInfo = uni.getStorageSync('userInfo');
			                
			                if (hasLogin && userInfo) {
			                    // 登录成功，赋值给 data
			                    this.userInfo = userInfo;
			                    
			                    // 2. 这里执行你的业务逻辑，比如获取商家数据
			                    // this.getShopData(); 
			                } else {
			                    // 未登录，可能需要显示空状态或提示去登录
			                    console.log('未检测到登录信息');
			                    // uni.redirectTo({ url: '/pages/login/login' }); // 如果强制要求登录
			                }
			            },
			
			changeTab(index) {
				this.tabIndex = index
			},
			toShow(item) {
				console.log('链接')
			},
			toList() {

			},
			moreNotice() {
				uni.navigateTo({
					url:'/pages/notice/index'
				})
			},
			toNotice(item){
				uni.navigateTo({
					url:'/pages/notice/detail'
				})
			},
		}
	}
</script>

<style scoped>

</style>