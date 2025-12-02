<template>
	<view class="login-wrapper">
		<!-- 1. 头部区域 -->
		<view class="header">
			<image class="logo" src="/static/logo.png" mode="aspectFit"></image>
			<view class="title">商家后台登录</view>
			<view class="subtitle">让生意更简单，管理更高效</view>
		</view>

		<!-- 2. 表单区域 -->
		<view class="form-box">
			<!-- 账号输入 -->
			<view class="input-item">
				<view class="label">账号</view>
				<input 
					class="input-control" 
					type="text" 
					v-model="username" 
					placeholder="请输入账号 (admin)" 
					placeholder-class="input-placeholder"
				/>
			</view>

			<!-- 密码输入 -->
			<view class="input-item">
				<view class="label">密码</view>
				<input 
					class="input-control" 
					:type="showPassword ? 'text' : 'password'" 
					v-model="password" 
					placeholder="请输入密码 (123456)" 
					placeholder-class="input-placeholder"
				/>
				<!-- 显隐切换 -->
				<view class="eye-btn" @click="togglePassword">
					{{ showPassword ? '隐藏' : '显示' }}
				</view>
			</view>
		</view>

		<!-- 3. 按钮区域 -->
		<view class="action-section">
			<button class="login-btn" hover-class="login-btn-hover" @click="handleLogin">
				立即登录
			</button>
		</view>

		<!-- 4. 底部展示 -->
		<view class="footer-options">
			<text class="option-text">忘记密码</text>
			<text class="divider">|</text>
			<text class="option-text">商家注册</text>
		</view>
		
		<view class="agreement-box">
			<text class="agree-text">登录即代表您同意《商家服务协议》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				showPassword: false,
				
				// --- 这里设置固定的账号和密码 ---
				fixedUser: 'admin',
				fixedPass: '123456'
			}
		},
		methods: {
			togglePassword() {
				this.showPassword = !this.showPassword;
			},
			
			handleLogin() {
				// 1. 基础非空校验
				if (!this.username) return uni.showToast({ title: '请输入账号', icon: 'none' });
				if (!this.password) return uni.showToast({ title: '请输入密码', icon: 'none' });

				// 2. 模拟网络请求加载效果
				uni.showLoading({ title: '登录中...' });

				setTimeout(() => {
					uni.hideLoading();

					// 3. 核心校验逻辑：判断输入是否等于固定账号密码
					if (this.username === this.fixedUser && this.password === this.fixedPass) {
						
						
						    // 1. 【新增】保存登录状态和用户信息到本地
						    // 以后在首页可以用 uni.getStorageSync('userInfo') 拿到它
						    uni.setStorageSync('hasLogin', true); 
						    uni.setStorageSync('userInfo', {
						        username: this.username,
						        role: 'admin',
						        token: 'mock-token-123456' // 模拟一个token
						    });
						
						// --- 校验通过 ---
						uni.showToast({
							title: '登录成功',
							icon: 'success',
							duration: 1500
						});

						// 延迟 1.5秒 跳转，让用户看清“登录成功”的提示
						setTimeout(() => {
							// 【重要】跳转逻辑
							// 场景A: 如果 /pages/index/index 是底部 TabBar 页面，必须用 switchTab
							uni.switchTab({
								url: '/pages/index/index',
								fail: () => {
									// 场景B: 如果首页只是普通页面（没有底部导航），switchTab 会失败，
									// 这里自动降级使用 reLaunch (关闭所有页面打开首页)
									uni.reLaunch({
										url: '/pages/index/index',
										fail: (err) => {
											// 如果还报错，说明 pages.json 里可能没配置这个路径
											uni.showToast({
												title: '跳转失败，请检查路径',
												icon: 'none'
											})
											console.error(err)
										}
									});
								}
							});
						}, 1500);

					} else {
						// --- 校验失败 ---
						uni.showToast({
							title: '账号或密码错误',
							icon: 'none'
						});
					}
				}, 1000); // 模拟1秒的网络延迟
			}
		}
	}
</script>

<style>
	/* 保持原有的 CSS 样式不变 */
	page { background-color: #ffffff; min-height: 100vh; }
	.login-wrapper { padding: 40rpx; display: flex; flex-direction: column; justify-content: center; height: 90vh; }
	.header { margin-bottom: 80rpx; display: flex; flex-direction: column; align-items: flex-start; }
	.logo { width: 100rpx; height: 100rpx; border-radius: 16rpx; margin-bottom: 24rpx; background-color: #f0f0f0; }
	.title { font-size: 44rpx; font-weight: bold; color: #333333; margin-bottom: 12rpx; }
	.subtitle { font-size: 26rpx; color: #999999; }
	.form-box { margin-bottom: 60rpx; }
	.input-item { display: flex; align-items: center; background-color: #f7f8fa; border-radius: 44rpx; height: 88rpx; padding: 0 32rpx; margin-bottom: 32rpx; border: 2rpx solid transparent; transition: all 0.3s; }
	.input-item:focus-within { background-color: #fff; border-color: #ff5000; box-shadow: 0 0 10rpx rgba(255, 80, 0, 0.1); }
	.input-item .label { width: 70rpx; font-size: 28rpx; font-weight: 600; color: #333; margin-right: 20rpx; }
	.input-control { flex: 1; font-size: 28rpx; color: #333; height: 100%; }
	.input-placeholder { color: #c0c4cc; }
	.eye-btn { font-size: 24rpx; color: #999; padding: 10rpx; }
	.action-section { margin-top: 20rpx; }
	.login-btn { background: linear-gradient(90deg, #ff9000, #ff5000); color: #ffffff; border-radius: 44rpx; font-size: 32rpx; font-weight: bold; height: 88rpx; line-height: 88rpx; border: none; box-shadow: 0 8rpx 16rpx rgba(255, 80, 0, 0.2); }
	.login-btn::after { border: none; }
	.login-btn-hover { opacity: 0.9; transform: scale(0.99); }
	.footer-options { display: flex; justify-content: center; align-items: center; margin-top: 40rpx; }
	.option-text { font-size: 26rpx; color: #666666; padding: 20rpx; }
	.divider { color: #eeeeee; margin: 0 10rpx; }
	.agreement-box { position: absolute; bottom: 40rpx; left: 0; right: 0; text-align: center; }
	.agree-text { font-size: 24rpx; color: #bbbbbb; }
</style>