<template>
	<view class="container">
		
		<!-- 1. 顶部资产卡片 (仿照图片布局，改用蓝色渐变) -->
		<view class="asset-card">
			<view class="card-top">
				<view class="asset-info">
					<text class="label">总资产 (元)</text>
					<text class="amount">{{ totalAssets.toFixed(2) }}</text>
				</view>
				<!-- 提现按钮 -->
				<view class="withdraw-btn" hover-class="btn-hover" @click="handleWithdraw">
					提现
				</view>
			</view>
			
			<view class="card-bottom">
				<view class="stat-item">
					<text class="sub-label">当前收益 (可提现)</text>
					<text class="sub-amount">{{ currentEarnings.toFixed(2) }}</text>
				</view>
		
			</view>
		</view>

		<!-- 2. 常用功能菜单 (仿照图片中间的图标栏) -->
		<view class="menu-grid">
			<view class="menu-item" @click="navTo('/pages/order/order')">
				<view class="icon-wrap red-icon">
					<uni-icons type="list" size="24" color="#ff4d4f"></uni-icons>
				</view>
				<text class="menu-text">订单记录</text>
			</view>
			<view class="menu-item">
				<view class="icon-wrap blue-icon">
					<uni-icons type="wallet" size="24" color="#2979ff"></uni-icons>
				</view>
				<text class="menu-text">收支明细</text>
			</view>
			<view class="menu-item">
				<view class="icon-wrap orange-icon">
					<uni-icons type="shop" size="24" color="#ff9000"></uni-icons>
				</view>
				<text class="menu-text">店铺设置</text>
			</view>
			<view class="menu-item">
				<view class="icon-wrap purple-icon">
					<uni-icons type="vip" size="24" color="#a18cd1"></uni-icons>
				</view>
				<text class="menu-text">会员管理</text>
			</view>
		</view>

		<!-- 3. 营销/签到板块 (仿照图片中间的两个方块) -->
		<view class="marketing-row">
			<view class="market-box box-yellow">
				<view class="box-text">
					<text class="box-title">每日经营报表</text>
					<text class="box-desc">查看今日数据</text>
				</view>
				<!-- 装饰图标 -->
				<uni-icons type="calendar-filled" size="30" color="#f6ca9d" class="box-icon"></uni-icons>
			</view>
			<view class="market-box box-pink">
				<view class="box-text">
					<text class="box-title">发放优惠券</text>
					<text class="box-desc">促进客户复购</text>
				</view>
				<uni-icons type="gift-filled" size="30" color="#ff9a9e" class="box-icon"></uni-icons>
			</view>
		</view>

		<!-- 4. 底部活动列表 (商家发起活动) -->
		<view class="activity-section">
			<!-- 拼团 -->
			<view class="activity-item">
				<view class="act-icon-box bg-red">
					<uni-icons type="personadd-filled" size="20" color="#fff"></uni-icons>
				</view>
				<view class="act-info">
					<text class="act-title">最新拼团活动</text>
					<text class="act-desc">创建多人拼团，快速裂变引流</text>
				</view>
				<button class="act-btn" size="mini">立即发布</button>
			</view>
			
			<!-- 秒杀 -->
			<view class="activity-item">
				<view class="act-icon-box bg-orange">
					<uni-icons type="fire-filled" size="20" color="#fff"></uni-icons>
				</view>
				<view class="act-info">
					<text class="act-title">当前限时秒杀</text>
					<text class="act-desc">设置限时低价，清理库存神器</text>
				</view>
				<button class="act-btn" size="mini">去设置</button>
			</view>
			
			<!-- 砍价 -->
			<view class="activity-item">
				<view class="act-icon-box bg-green">
					<uni-icons type="flag-filled" size="20" color="#fff"></uni-icons>
				</view>
				<view class="act-info">
					<text class="act-title">砍价活动</text>
					<text class="act-desc">邀请好友砍价，增加店铺曝光</text>
				</view>
				<button class="act-btn btn-disabled" size="mini">已结束</button>
			</view>
		</view>
        
        <!-- 退出登录按钮 -->
        <view class="logout-area">
            <button class="logout-btn" @click="handleLogout">退出登录</button>
        </view>
        
        <view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 总资产
				totalAssets: 10234.00,
				// 当前收益 (待提现)
				currentEarnings: 1560.50
			}
		},
		methods: {
			// 提现逻辑
			handleWithdraw() {
				if (this.currentEarnings <= 0) {
					uni.showToast({
						title: '暂无收益可提现',
						icon: 'none'
					});
					return;
				}

				uni.showLoading({ title: '提现处理中...' });

				setTimeout(() => {
					uni.hideLoading();
					
					// 1. 资金转换：收益 -> 余额
					this.totalAssets += this.currentEarnings;
					// 2. 收益清零
					this.currentEarnings = 0.00;

					uni.showModal({
						title: '提现成功',
						content: '收益已转入总资产账户，您可以自由支配。',
						showCancel: false,
						confirmText: '好的'
					});
				}, 1000);
			},

			// 页面跳转辅助
			navTo(url) {
				// 如果是 TabBar 页面用 switchTab，普通页面用 navigateTo
				// 这里演示跳转到订单页 (TabBar)
				if (url.includes('/order/order')) {
					uni.switchTab({ url });
				} else {
					uni.navigateTo({ url });
				}
			},
            
            // 退出登录
            handleLogout() {
                uni.showModal({
                    title: '提示',
                    content: '确定要退出商家后台吗？',
                    success: (res) => {
                        if(res.confirm) {
                            // 清除缓存
                            uni.removeStorageSync('hasLogin');
                            uni.removeStorageSync('userInfo');
                            // 关闭所有页面跳转到登录页
                            uni.reLaunch({
                                url: '/pages/login/login'
                            })
                        }
                    }
                })
            }
		}
	}
</script>

<style>
	/* 全局背景 */
	page {
		background-color: #f5f7fa;
	}
	
	.container {
		padding: 24rpx;
	}

	/* --- 1. 资产卡片 --- */
	.asset-card {
		/* 核心改动：红色改成了清爽的蓝色渐变 */
		background: linear-gradient(135deg, #2979ff, #64b5f6);
		border-radius: 20rpx;
		padding: 40rpx 30rpx;
		color: #fff;
		box-shadow: 0 8rpx 20rpx rgba(41, 121, 255, 0.3);
		margin-bottom: 30rpx;
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40rpx;
	}

	.asset-info {
		display: flex;
		flex-direction: column;
	}

	.asset-info .label {
		font-size: 26rpx;
		opacity: 0.9;
		margin-bottom: 10rpx;
	}

	.asset-info .amount {
		font-size: 60rpx;
		font-weight: bold;
		letter-spacing: 2rpx;
	}

	/* 提现按钮样式：白色胶囊 */
	.withdraw-btn {
		background-color: rgba(255, 255, 255, 0.9);
		color: #2979ff;
		padding: 10rpx 30rpx;
		border-radius: 40rpx;
		font-size: 26rpx;
		font-weight: bold;
		box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.1);
	}
	
	.btn-hover {
		opacity: 0.8;
		transform: scale(0.98);
	}

	.card-bottom {
		display: flex;
		justify-content: space-between;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
	}

	.sub-label {
		font-size: 24rpx;
		opacity: 0.8;
		margin-bottom: 6rpx;
	}

	.sub-amount {
		font-size: 32rpx;
		font-weight: 500;
	}

	/* --- 2. 菜单网格 --- */
	.menu-grid {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx 0;
		display: flex;
		justify-content: space-around;
		margin-bottom: 24rpx;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.icon-wrap {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10rpx;
	}

	.menu-text {
		font-size: 26rpx;
		color: #333;
	}

	/* --- 3. 营销方块 --- */
	.marketing-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 24rpx;
	}

	.market-box {
		width: 48%;
		height: 140rpx;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}

	.box-yellow { background-color: #fff7e6; }
	.box-pink { background-color: #fff0f0; }

	.box-text {
		z-index: 2;
	}
	
	.box-title {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.box-desc {
		font-size: 22rpx;
		color: #999;
	}
	
	.box-icon {
		opacity: 0.8;
	}

	/* --- 4. 活动列表 --- */
	.activity-section {
		background-color: #fff;
		border-radius: 16rpx;
		padding: 0 24rpx;
	}

	.activity-item {
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-bottom: 1rpx solid #f8f8f8;
	}
	
	.activity-item:last-child {
		border-bottom: none;
	}

	.act-icon-box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 24rpx;
	}
	
	.bg-red { background: linear-gradient(135deg, #ff7676, #f54ea2); }
	.bg-orange { background: linear-gradient(135deg, #ffbc4e, #ff814a); }
	.bg-green { background: linear-gradient(135deg, #6fd48e, #3ac276); }

	.act-info {
		flex: 1;
	}

	.act-title {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
		display: block;
		margin-bottom: 6rpx;
	}

	.act-desc {
		font-size: 24rpx;
		color: #999;
	}

	.act-btn {
		background-color: #fff;
		border: 1rpx solid #2979ff;
		color: #2979ff;
		border-radius: 30rpx;
		padding: 0 30rpx;
		font-size: 24rpx;
		line-height: 50rpx;
	}
	
	.act-btn::after { border: none; }

	.btn-disabled {
		border-color: #ddd;
		color: #999;
		background-color: #f5f5f5;
	}
    
    /* 退出按钮 */
    .logout-area {
        margin-top: 40rpx;
    }
    .logout-btn {
        background-color: #fff;
        color: #ff4d4f;
        font-size: 30rpx;
    }
    .logout-btn::after { border: none; }
</style>