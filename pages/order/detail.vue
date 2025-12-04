<template>
  <view class="container">
    <!-- 1. 顶部状态栏 -->
    <view class="status-header">
      <view class="status-text">{{ statusText }}</view>
      <view class="status-desc">{{ statusDesc }}</view>
    </view>

    <!-- 2. 地址/取货信息 -->
    <view class="section address-box">
      <view class="type-tag">{{ order.deliveryType === 'pickup' ? '自提' : '配送' }}</view>
      <view class="info">
        <view class="user-row">
          <text class="name">{{ order.buyerName }}</text>
          <text class="phone">138****0000</text> <!-- 模拟手机号 -->
          <view class="copy-btn" @click="makePhoneCall">拨打</view>
        </view>
        <view class="address-text" v-if="order.deliveryType === 'delivery'">
          {{ order.address }}
        </view>
        <view class="address-text" v-else>
          请买家到店自提
        </view>
      </view>
    </view>

    <!-- 3. 商品详情 -->
    <view class="section goods-box">
      <view class="goods-item">
        <image :src="order.image" mode="aspectFill" class="goods-img"></image>
        <view class="goods-info">
          <view class="name">{{ order.goodsName }}</view>
          <view class="spec">{{ order.spec }}</view>
          <view class="price-row">
            <text>¥{{ order.price }}</text>
            <text class="qty">x{{ order.quantity }}</text>
          </view>
        </view>
      </view>
      
      <view class="cell-row" style="margin-top: 20rpx;">
        <text class="label">商品总价</text>
        <text class="value">¥{{ order.totalPrice }}</text>
      </view>
      <view class="cell-row">
        <text class="label">实付款</text>
        <text class="value price-red">¥{{ order.totalPrice }}</text>
      </view>
    </view>

    <!-- 4. 订单信息 -->
    <view class="section info-box">
      <view class="cell-row">
        <text class="label">订单编号</text>
        <text class="value">{{ order.orderNo }}</text>
        <text class="copy-link" @click="copyText(order.orderNo)">复制</text>
      </view>
      <view class="cell-row">
        <text class="label">下单时间</text>
        <text class="value">{{ order.createTime }}</text>
      </view>
      <view class="cell-row" v-if="order.note">
        <text class="label">买家备注</text>
        <text class="value note-text">{{ order.note }}</text>
      </view>
    </view>

    <!-- 占位，防止底部按钮遮挡 -->
    <view style="height: 120rpx;"></view>

    <!-- 5. 底部操作栏 -->
    <view class="footer-bar">
      <!-- 仅作为示例，根据状态显示不同按钮 -->
      <block v-if="order.status === 'completed'">
         <button class="btn btn-gray">打印小票</button>
         <button class="btn btn-default">售后处理</button>
      </block>
      <block v-else>
         <button class="btn btn-primary">联系买家</button>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {} // 存放订单详情数据
    };
  },
  computed: {
    statusText() {
      const map = {
        'pending': '等待商家接单',
        'awaiting': '商家已接单',
        'completed': '订单已完成',
        'cancelled': '订单已取消'
      };
      return map[this.order.status] || '未知状态';
    },
    statusDesc() {
      if(this.order.status === 'pending') return '请尽快处理，超时将自动取消';
      if(this.order.status === 'awaiting') return '商品准备中或配送中';
      return '感谢您的使用';
    }
  },
  onLoad(options) {
    // 1. 获取上个页面传来的 ID
    this.orderId = options.id;
    
    // 2. 根据 ID 模拟请求后端获取详情
    this.loadOrderDetail(this.orderId);
  },
  methods: {
    loadOrderDetail(id) {
      // 模拟后端数据库中的所有订单 (实际开发中这里应该用 uni.request)
      const mockDatabase = [
        {
          id: 1,
          orderNo: '202310240001',
          status: 'pending',
          image: 'https://via.placeholder.com/100',
          goodsName: '香辣鸡腿堡套餐',
          spec: '中辣 + 可乐',
          price: '25.00',
          quantity: 1,
          totalPrice: '25.00',
          buyerName: '李同学',
          createTime: '2023-10-24 10:23:00',
          deliveryType: 'pickup',
          address: '',
          note: '不要放洋葱！',
        },
        {
          id: 2,
          orderNo: '202310240002',
          status: 'pending',
          image: 'https://via.placeholder.com/100',
          goodsName: '宿舍零食大礼包',
          spec: '混合口味',
          price: '45.00',
          quantity: 2,
          totalPrice: '90.00',
          buyerName: '王同学',
          createTime: '2023-10-24 09:15:00',
          deliveryType: 'delivery',
          address: '5号楼 302',
          note: '',
        },
        {
          id: 3,
          orderNo: '202310240003',
          status: 'awaiting',
          image: 'https://via.placeholder.com/100',
          goodsName: '二手教材-高等数学',
          spec: '九成新',
          price: '15.00',
          quantity: 1,
          totalPrice: '15.00',
          buyerName: '张同学',
          createTime: '2023-10-23 18:00:00',
          deliveryType: 'pickup',
          address: '',
          note: '',
        }
      ];

      // 查找对应ID的订单
      // 注意：URL传来的id通常是字符串，需要转换比较
      const target = mockDatabase.find(item => item.id == id);
      
      if (target) {
        this.order = target;
      } else {
        uni.showToast({ title: '未找到订单信息', icon: 'none' });
      }
    },
    makePhoneCall() {
      uni.makePhoneCall({
        phoneNumber: '13800000000' // 实际应从 order 数据中获取
      });
    },
    copyText(text) {
      uni.setClipboardData({
        data: text,
        success: () => {
          uni.showToast({ title: '复制成功', icon: 'none' });
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 页面背景 */
page {
  background-color: #f5f6f7;
}

.container {
  padding-bottom: 40rpx;
}

/* 1. 顶部状态栏 */
.status-header {
  background-color: #007aff;
  color: #fff;
  padding: 40rpx 30rpx 60rpx; /* 底部留多点给卡片重叠 */
  .status-text {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }
  .status-desc {
    font-size: 24rpx;
    opacity: 0.8;
  }
}

/* 通用卡片样式 */
.section {
  background-color: #fff;
  width: 690rpx;
  margin: 0 auto;
  border-radius: 16rpx;
  padding: 24rpx;
  box-sizing: border-box;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.03);
}

/* 2. 地址卡片 (向上浮动覆盖头部) */
.address-box {
  margin-top: -30rpx; 
  display: flex;
  align-items: flex-start;
  
  .type-tag {
    background-color: #007aff;
    color: #fff;
    font-size: 22rpx;
    padding: 4rpx 12rpx;
    border-radius: 6rpx;
    margin-right: 20rpx;
    margin-top: 6rpx;
  }
  
  .info {
    flex: 1;
    .user-row {
      display: flex;
      align-items: center;
      margin-bottom: 10rpx;
      .name { font-size: 30rpx; font-weight: bold; margin-right: 20rpx; }
      .phone { font-size: 26rpx; color: #666; }
      .copy-btn { margin-left: auto; color: #007aff; font-size: 24rpx; border: 1rpx solid #007aff; padding: 2rpx 10rpx; border-radius: 20rpx; }
    }
    .address-text {
      font-size: 28rpx;
      color: #333;
      line-height: 1.4;
    }
  }
}

/* 3. 商品卡片 */
.goods-box {
  .goods-item {
    display: flex;
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid #f8f8f8;
    
    .goods-img {
      width: 140rpx;
      height: 140rpx;
      border-radius: 8rpx;
      background-color: #eee;
      margin-right: 20rpx;
    }
    
    .goods-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name { font-size: 28rpx; color: #333; }
      .spec { font-size: 24rpx; color: #999; }
      .price-row {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        .qty { font-weight: normal; color: #999; font-size: 24rpx; }
      }
    }
  }
}

/* 4. 信息列表 */
.info-box {
  .note-text {
    color: #dd524d !important;
  }
}

/* 通用行样式 */
.cell-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16rpx;
  font-size: 26rpx;
  
  &:last-child { margin-bottom: 0; }
  
  .label { color: #999; }
  .value { color: #333; flex: 1; text-align: right; }
  .price-red { color: #dd524d; font-size: 32rpx; font-weight: bold; }
  .copy-link { color: #007aff; margin-left: 10rpx; }
}

/* 5. 底部固定栏 */
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  
  .btn {
    margin: 0;
    margin-left: 20rpx;
    font-size: 28rpx;
    border-radius: 34rpx;
    padding: 0 40rpx;
    height: 68rpx;
    line-height: 68rpx;
    
    &::after { border: none; }
    
    &.btn-gray { background-color: #f5f5f5; color: #666; }
    &.btn-default { background-color: #fff; border: 1rpx solid #ddd; color: #333; line-height: 66rpx; }
    &.btn-primary { background-color: #007aff; color: #fff; }
  }
}
</style>