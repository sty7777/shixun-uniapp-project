<template>
	<view class="container">
		<!-- 1. 顶部导航栏 (仿图示) -->
		<view class="nav-bar">
			<scroll-view scroll-x class="nav-scroll">
				<view class="nav-item">服装</view>
				<view class="nav-item">婴童</view>
				<view class="nav-item">杂货</view>
				<view class="nav-item">洗护</view>
				<view class="nav-item active">志趣</view>
				<view class="nav-item">美食</view>
			</scroll-view>
		</view>

		<!-- 2. 页面标题区域 -->
		<view class="header-section">
			<view class="main-title">志趣</view>
			<view class="sub-title">周边精品，共享热爱</view>
		</view>

		<!-- 3. 商品列表区域 -->
		<view class="goods-list">
			<view class="goods-item" v-for="(item, index) in goodsList" :key="index">
				<!-- 商品图片 -->
				<image class="goods-img" :src="item.image" mode="aspectFill"></image>
				
				<view class="goods-info">
					<!-- 标题 -->
					<view class="goods-name">{{ item.name }}</view>
					
					<!-- 价格与库存 -->
					<view class="price-stock-row">
						<text class="price">¥ {{ item.price }}</text>
						<text class="stock">库存:{{ item.stock }}</text>
					</view>
					
					<!-- 下架按钮 -->
					<view class="action-row">
						<button class="btn-remove" size="mini" @click="removeItem(index)">下架商品</button>
					</view>
				</view>
			</view>
			
			<!-- 空状态提示 -->
			<view v-if="goodsList.length === 0" class="empty-tip">
				暂无商品，请点击右下角添加
			</view>
		</view>

		<!-- 4. 悬浮添加按钮 -->
		<view class="fab-add" @click="openModal">
			<text class="plus-icon">+</text>
			<text class="add-text">上架</text>
		</view>

		<!-- 5. 上架商品弹窗 (遮罩层 + 表单) -->
		<view class="modal-mask" v-if="showModal" @click.stop="closeModal">
			<view class="modal-content" @click.stop>
				<view class="modal-header">上架新商品</view>
				
				<scroll-view scroll-y class="modal-body">
					<view class="form-item">
						<text class="label">商品名称</text>
						<input class="input" v-model="form.name" placeholder="例如: 魔兽世界 手办" />
					</view>
					
					<view class="form-item">
						<text class="label">价格 (¥)</text>
						<input class="input" type="number" v-model="form.price" placeholder="0.00" />
					</view>
					
					<view class="form-item">
						<text class="label">库存数量</text>
						<input class="input" type="number" v-model="form.stock" placeholder="0" />
					</view>
					
					<view class="form-item">
						<text class="label">商品介绍</text>
						<textarea class="textarea" v-model="form.desc" placeholder="简要描述商品细节..." />
					</view>
					
					<view class="form-item">
						<text class="label">商品图片</text>
						<view class="upload-box" @click="chooseImage">
							<image v-if="form.image" :src="form.image" mode="aspectFill" class="preview-img"></image>
							<view v-else class="upload-placeholder">
								<text class="camera-icon">📷</text>
								<text>点击上传</text>
							</view>
						</view>
					</view>
				</scroll-view>

				<view class="modal-footer">
					<button class="btn-cancel" @click="closeModal">取消</button>
					<button class="btn-submit" @click="submitGoods">确认上架</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 模拟初始数据 (仿照你的图片)
				goodsList: [
					{
						name: '魔兽世界 纪念版 麻将套装',
						price: '1288',
						stock: 50,
						image: '/static/moshou1.jpg', // 示例网络图
						desc: '精美做工，收藏首选'
					},
					{
						name: '魔兽世界 部落·奥格瑞玛 帐篷',
						price: '499',
						stock: 120,
						image: 'https://img30.360buyimg.com/n7/jfs/t1/371703/15/2826/134337/692c39dcF2e55d00a/fb6bc3debd869701.jpg',
						desc: '户外露营必备'
					},
					{
						name: '魔兽世界 雷霆之怒逐风者的祝福之剑',
						price: '399',
						stock: 15,
						image: 'https://img30.360buyimg.com/n7/jfs/t1/279722/12/3069/66970/67d52d1eFdc9aa058/c4c36b7dc567795a.jpg',
						desc: '传说级武器周边'
					},
					{
						name: '魔兽世界 联盟·暴风城 收纳箱',
						price: '499',
						stock: 200,
						image: 'https://img30.360buyimg.com/n7/jfs/t1/318574/24/19725/78954/6884bdfcFedfbad6d/cba1fb92133830fd.jpg',
						desc: '居家整理神器'
					}
				],
				showModal: false, // 控制弹窗显示
				// 表单数据
				form: {
					name: '',
					price: '',
					stock: '',
					desc: '',
					image: ''
				}
			}
		},
		
		 // 【新增】监听页面显示
		    onShow() {
		        // 1. 检查有没有“暗号”
		        const shouldOpen = uni.getStorageSync('autoOpenAdd');
		        
		        // 2. 如果有，说明是从“发布商品”跳过来的
		        if (shouldOpen) {
		            // 打开弹窗 (调用你之前写好的方法)
		            this.openModal();
		            
		            // 3. 【重要】用完立马销毁暗号，防止下次正常点击“商品管理”进来时也弹出
		            uni.removeStorageSync('autoOpenAdd');
		        }
		    },
		
		methods: {
			// 1. 删除/下架商品
			removeItem(index) {
				uni.showModal({
					title: '确认下架',
					content: '确定要下架该商品吗？下架后将不再显示。',
					success: (res) => {
						if (res.confirm) {
							this.goodsList.splice(index, 1);
							uni.showToast({ title: '已下架', icon: 'none' });
						}
					}
				});
			},

			// 2. 打开弹窗
			openModal() {
				this.showModal = true;
			},

			// 3. 关闭弹窗并重置表单
			closeModal() {
				this.showModal = false;
				this.resetForm();
			},

			// 4. 选择图片
			chooseImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						// 这是一个临时路径，在真机上可以直接显示
						this.form.image = res.tempFilePaths[0];
					}
				});
			},

			// 5. 提交上架
			submitGoods() {
				// 简单的校验
				if (!this.form.name) return uni.showToast({ title: '请输入名称', icon: 'none' });
				if (!this.form.price) return uni.showToast({ title: '请输入价格', icon: 'none' });
				if (!this.form.image) return uni.showToast({ title: '请上传图片', icon: 'none' });

				// 添加到列表头部
				this.goodsList.unshift({
					name: this.form.name,
					price: this.form.price,
					stock: this.form.stock || 0,
					desc: this.form.desc,
					image: this.form.image
				});

				uni.showToast({ title: '上架成功', icon: 'success' });
				this.closeModal();
			},
			
			resetForm() {
				this.form = { name: '', price: '', stock: '', desc: '', image: '' };
			}
		}
	}
</script>

<style>
	/* --- 全局样式 --- */
	page {
		background-color: #f7f7f7;
		min-height: 100vh;
	}
	
	.container {
		padding-bottom: 120rpx; /* 防止内容被底部按钮遮挡 */
	}

	/* --- 1. 顶部导航 --- */
	.nav-bar {
		background-color: #fff;
		height: 88rpx;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #eee;
		position: sticky;
		top: 0;
		z-index: 10;
	}
	
	.nav-scroll {
		white-space: nowrap;
		width: 100%;
		padding: 0 20rpx;
	}
	
	.nav-item {
		display: inline-block;
		margin-right: 40rpx;
		font-size: 30rpx;
		color: #666;
		line-height: 80rpx;
		position: relative;
	}
	
	.nav-item.active {
		color: #000;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.nav-item.active::after {
		content: '';
		position: absolute;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 40rpx;
		height: 4rpx;
		background-color: #ff5000;
		border-radius: 4rpx;
	}

	/* --- 2. 头部标题 --- */
	.header-section {
		background-color: #fff;
		padding: 30rpx 0;
		text-align: center;
		margin-bottom: 20rpx;
	}
	
	.main-title {
		font-size: 36rpx;
		font-weight: 500;
		color: #333;
		margin-bottom: 10rpx;
	}
	
	.sub-title {
		font-size: 24rpx;
		color: #999;
	}

	/* --- 3. 商品列表 (双列布局) --- */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 20rpx;
	}

	.goods-item {
		width: 48%; /* 双列 */
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		overflow: hidden;
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
		display: flex;
		flex-direction: column;
	}

	.goods-img {
		width: 100%;
		height: 340rpx; /* 保持图片正方形或长方形 */
		background-color: #eeeeee;
	}

	.goods-info {
		padding: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goods-name {
		font-size: 28rpx;
		color: #333;
		line-height: 1.4;
		margin-bottom: 16rpx;
		/* 限制两行显示 */
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.price-stock-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.price {
		font-size: 34rpx;
		color: #d13a3a; /* 仿图示的深红色 */
		font-weight: bold;
	}
	
	.stock {
		font-size: 22rpx;
		color: #999;
	}
	
	.action-row {
		border-top: 1rpx solid #f0f0f0;
		padding-top: 16rpx;
		text-align: right;
	}

	.btn-remove {
		background-color: #fff;
		border: 1rpx solid #ddd;
		color: #666;
		font-size: 24rpx;
		padding: 0 20rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
	}
	
	.empty-tip {
		width: 100%;
		text-align: center;
		color: #999;
		margin-top: 100rpx;
	}

	/* --- 4. 悬浮添加按钮 (FAB) --- */
	.fab-add {
		position: fixed;
		right: 40rpx;
		bottom: 60rpx;
		width: 110rpx;
		height: 110rpx;
		background: linear-gradient(135deg, #ff9000, #ff5000);
		border-radius: 50%;
		box-shadow: 0 6rpx 20rpx rgba(255, 80, 0, 0.4);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}
	
	.plus-icon {
		color: #fff;
		font-size: 40rpx;
		line-height: 1;
		margin-top: -5rpx;
	}
	
	.add-text {
		color: #fff;
		font-size: 20rpx;
	}

	/* --- 5. 弹窗样式 --- */
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.6);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.modal-content {
		width: 85%;
		background-color: #fff;
		border-radius: 20rpx;
		overflow: hidden;
		max-height: 80vh;
		display: flex;
		flex-direction: column;
	}

	.modal-header {
		padding: 30rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		border-bottom: 1rpx solid #eee;
	}

	.modal-body {
		padding: 30rpx;
		overflow-y: auto;
	}

	.form-item {
		margin-bottom: 30rpx;
	}

	.form-item .label {
		display: block;
		font-size: 28rpx;
		color: #333;
		margin-bottom: 16rpx;
	}

	.form-item .input {
		background-color: #f7f8fa;
		height: 80rpx;
		padding: 0 20rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
	}
	
	.form-item .textarea {
		background-color: #f7f8fa;
		width: 100%;
		height: 160rpx;
		padding: 20rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		font-size: 28rpx;
	}

	.upload-box {
		width: 160rpx;
		height: 160rpx;
		background-color: #f7f8fa;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border: 1rpx dashed #ccc;
	}
	
	.upload-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #999;
		font-size: 24rpx;
	}
	
	.camera-icon {
		font-size: 40rpx;
		margin-bottom: 10rpx;
	}
	
	.preview-img {
		width: 100%;
		height: 100%;
	}

	.modal-footer {
		display: flex;
		border-top: 1rpx solid #eee;
	}

	.modal-footer button {
		flex: 1;
		background-color: #fff;
		border-radius: 0;
		font-size: 30rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	
	.modal-footer button::after {
		border: none;
	}
	
	.btn-cancel {
		color: #666;
	}
	
	.btn-submit {
		color: #ff5000;
		font-weight: bold;
		border-left: 1rpx solid #eee;
	}
</style>