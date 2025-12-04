<template>
	<view class="page-container">
		
		<!-- 1. 顶部搜索区域 (淡蓝色背景) -->
		<view class="custom-header">
			<view class="search-bar">
				<uni-icons type="search" size="18" color="#999"></uni-icons>
				<input class="search-input" type="text" placeholder-class="ph-style"/>
			</view>
			<view class="header-icons">
				<uni-icons type="chat" size="24" color="#fff"></uni-icons>
				<text class="msg-badge">5</text>
			</view>
		</view>

		<!-- 2. 轮播图区域 (展示活动或公告) -->
		<view class="banner-box">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" indicator-active-color="#fff" indicator-color="rgba(255,255,255,0.5)">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<view class="swiper-item" :style="{backgroundColor: item.color}">
						<text class="banner-text">{{ item.text }}</text>
						<!-- 实际开发请换成 <image :src="item.img" mode="aspectFill"></image> -->
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- 3. 通知简报 (仿照图片中间的条) -->
		<view class="notice-bar">
			<view class="notice-left">
				<text class="notice-tag">商城头条</text>
			</view>
			<swiper class="notice-swiper" vertical autoplay circular interval="3000">
				<swiper-item v-for="(item, index) in notices" :key="index">
					<text class="notice-content">{{ item }}</text>
				</swiper-item>
			</swiper>
			<uni-icons type="arrowright" size="14" color="#999"></uni-icons>
		</view>

		<!-- 4. 宫格导航 (金刚区 - 商家功能) -->
		<!-- 仿照图片的圆形图标布局 -->
		<view class="grid-menu">
			<view class="grid-item" v-for="(menu, index) in menuList" :key="index" @click="handleMenuClick(menu.name)">
				<view class="icon-box" :style="{ background: menu.bg }">
					<!-- 这里可以用 image 标签，暂时用文字图标代替 -->
					<uni-icons :type="menu.icon" size="26" color="#fff"></uni-icons>
				</view>
				<text class="grid-text">{{ menu.name }}</text>
			</view>
		</view>

		<!-- 5. 核心数据看板 (仿照图片底部的超值爆款区域) -->
		<!-- 改为展示经营数据，UI保持卡片式 -->
		<view class="dashboard-section">
			<view class="section-header">
				<text class="section-title">经营数据</text>
				<view class="section-tag">实时更新</view>
			</view>
			
			<view class="card-row">
				<!-- 左侧大卡片 -->
				<view class="card big-card">
					<view class="card-info">
						<text class="card-title">今日销售额</text>
						<text class="card-desc">比昨日增长 12%</text>
						<button class="card-btn">查看详情</button>
					</view>
					<image class="card-img" src="/static/logo.png" mode="aspectFit"></image> <!-- 装饰图 -->
				</view>

				<!-- 右侧两小卡片 -->
				<view class="right-col">
					<view class="card small-card">
						<view class="card-info">
							<text class="card-title">待发货订单</text>
							<text class="card-desc warning-text">12 笔待处理</text>
						</view>
						<view class="card-icon-wrap blue-bg">
							<uni-icons type="cart-filled" color="#409eff" size="20"></uni-icons>
						</view>
					</view>
					<view class="card small-card">
						<view class="card-info">
							<text class="card-title">库存预警</text>
							<text class="card-desc">3 款商品不足</text>
						</view>
						<view class="card-icon-wrap cyan-bg">
							<uni-icons type="shop-filled" color="#19be6b" size="20"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 6. 底部留白 -->
		<view style="height: 50rpx;"></view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swiperList: [
					{ color: '#a0cfff', text: '双12活动报名开启', img: '' },
					{ color: '#8cc5ff', text: '商家后台操作指南', img: '' },
					{ color: '#409eff', text: '严禁违规刷单公告', img: '' }
				],
				// 通知数据
				notices: [
					'您有一笔新的退款申请待处理',
					'本周平台服务费账单已生成',
					'关于加强商品主图审核的通知'
				],
				// 宫格菜单 (模拟图片中的10个图标)
				menuList: [
					{ name: '商品管理', icon: 'shop', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
					{ name: '发布商品', icon: 'plusempty', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
					{ name: '订单管理', icon: 'list', bg: 'linear-gradient(135deg, #fa709a, #fee140)' },
					{ name: '营销中心', icon: 'fire', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
					{ name: '客户消息', icon: 'chatboxes', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
					{ name: '数据报表', icon: 'navigate', bg: 'linear-gradient(135deg, #89f7fe, #66a6ff)' },
					{ name: '财务对账', icon: 'wallet', bg: 'linear-gradient(135deg, #ff9a9e, #fecfef)' },
					{ name: '评价管理', icon: 'star', bg: 'linear-gradient(135deg, #cfd9df, #e2ebf0)' }, // 灰色系
					{ name: '店铺设置', icon: 'gear', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
					{ name: '帮助中心', icon: 'help', bg: 'linear-gradient(135deg, #8fd3f4, #84fab0)' },
				]
			}
		},
		methods: {
			handleMenuClick(name) {
				// 这里处理点击逻辑，比如跳转到刚才写的商品展示页
				if(name === '商品管理') {
					   uni.switchTab({
					            url: '/pages/goods/goods'
					        });
				} 
				else if (name === '订单管理') {
				            uni.switchTab({
				                url: '/pages/cart/cart'  // 假设你的订单页路径是这个
				            });
				        } 
				 else if (name === '发布商品') {
				            // A. 设置一个“暗号”，告诉商品页：一会你打开的时候，要把弹窗弹出来
				            uni.setStorageSync('autoOpenAdd', true);
				            
				            // B. 跳转到商品页
				            uni.switchTab({
				                url: '/pages/goods/goods'
				            });
				        }		
				else {
					uni.showToast({
						title: '点击了 ' + name,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	/* --- 全局背景 --- */
	page {
		background-color: #f5f7fa; /* 很浅的灰蓝色背景 */
	}
	
	.page-container {
		display: flex;
		flex-direction: column;
	}

	/* --- 1. 头部搜索 (蓝色主题) --- */
	.custom-header {
		/* 这里的背景使用了蓝色渐变 */
		background: linear-gradient(to right, #2979ff, #64b5f6);
		padding: 20rpx 30rpx 80rpx 30rpx; /* 底部留白给轮播图 */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.search-bar {
		flex: 1;
		height: 64rpx;
		background-color: #ffffff;
		border-radius: 32rpx;
		display: flex;
		align-items: center;
		padding: 0 24rpx;
		margin-right: 20rpx;
	}
	
	.search-input {
		flex: 1;
		font-size: 28rpx;
		margin-left: 10rpx;
		color: #333;
	}
	
	.ph-style {
		color: #999;
	}
	
	.header-icons {
		position: relative;
		width: 60rpx;
		text-align: center;
	}
	
	.msg-badge {
		position: absolute;
		top: -5rpx;
		right: -5rpx;
		background-color: #ff4d4f; /* 消息红点保留红色，醒目 */
		color: #fff;
		font-size: 20rpx;
		padding: 0 8rpx;
		border-radius: 20rpx;
	}

	/* --- 2. 轮播图 (浮动在Header之上) --- */
	.banner-box {
		margin: -60rpx 24rpx 0 24rpx; /* 负边距实现重叠效果 */
		border-radius: 16rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 16rpx rgba(41, 121, 255, 0.2);
	}
	
	.swiper {
		height: 280rpx;
	}
	
	.swiper-item {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.banner-text {
		color: #fff;
		font-size: 40rpx;
		font-weight: bold;
		letter-spacing: 4rpx;
	}

	/* --- 3. 通知简报 --- */
	.notice-bar {
		margin: 20rpx 24rpx;
		background-color: #fff;
		border-radius: 12rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
	}
	
	.notice-left {
		border-right: 1rpx solid #eee;
		padding-right: 20rpx;
		margin-right: 20rpx;
	}
	
	.notice-tag {
		font-family: 'Times New Roman', serif;
		font-weight: bold;
		font-size: 30rpx;
		color: #2979ff; /* 蓝色字体 */
		font-style: italic;
	}
	
	.notice-swiper {
		flex: 1;
		height: 40rpx;
	}
	
	.notice-content {
		line-height: 40rpx;
		font-size: 26rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	/* --- 4. 宫格菜单 --- */
	.grid-menu {
		background-color: #fff;
		margin: 0 24rpx 20rpx 24rpx;
		border-radius: 16rpx;
		padding: 30rpx 0;
		display: flex;
		flex-wrap: wrap;
	}
	
	.grid-item {
		width: 20%; /* 一行5个 */
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.icon-box {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 12rpx;
		/* 阴影让图标更有质感 */
		box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.1); 
	}
	
	.grid-text {
		font-size: 24rpx;
		color: #555;
	}

	/* --- 5. 经营数据/超值爆款区域 --- */
	.dashboard-section {
		margin: 0 24rpx;
		background: #fff; /* 渐变淡蓝背景，仿图片下方 */
		border-radius: 16rpx;
		padding: 24rpx;
		background: linear-gradient(to bottom, #e3f2fd, #ffffff 30%); 
	}
	
	.section-header {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	.section-title {
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
		margin-right: 12rpx;
	}
	
	.section-tag {
		background: linear-gradient(to right, #ff7e5f, #feb47b); /* 保留一点暖色做对比 */
		color: #fff;
		font-size: 20rpx;
		padding: 2rpx 12rpx;
		border-radius: 20rpx 20rpx 20rpx 0;
	}
	
	.card-row {
		display: flex;
		justify-content: space-between;
	}
	
	/* 卡片通用 */
	.card {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
	}
	
	/* 左侧大卡片 */
	.big-card {
		width: 48%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #f0f9eb; /* 极淡的绿色背景或其他淡色 */
	}
	
	.card-info {
		display: flex;
		flex-direction: column;
	}
	
	.card-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 8rpx;
	}
	
	.card-desc {
		font-size: 22rpx;
		color: #999;
		margin-bottom: 16rpx;
	}
	
	.warning-text {
		color: #ff9000;
	}
	
	.card-btn {
		background: linear-gradient(to right, #409eff, #2979ff);
		color: #fff;
		font-size: 22rpx;
		border-radius: 24rpx;
		padding: 0 20rpx;
		line-height: 44rpx;
		align-self: flex-start;
		margin: 0;
	}
	
	.card-img {
		width: 100%;
		height: 120rpx;
		margin-top: 10rpx;
	}
	
	/* 右侧列 */
	.right-col {
		width: 48%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.small-card {
		height: 150rpx; /* 控制高度 */
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.small-card:last-child {
		margin-bottom: 0;
	}
	
	.card-icon-wrap {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.blue-bg { background-color: #ecf5ff; }
	.cyan-bg { background-color: #e8f8f5; }
	
</style>