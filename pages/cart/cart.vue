<template>
  <view class="container">
    
    <!-- 1. 顶部数据概览卡片 -->
    <view class="dashboard-card">
      <view class="stat-item">
        <text class="num">{{ stats.todayOrders }}</text>
        <text class="label">今日订单</text>
      </view>
      <view class="stat-item">
        <text class="num highlight">{{ stats.pendingOrders }}</text>
        <text class="label">待处理</text>
      </view>
      <view class="stat-item">
        <text class="num price">¥{{ stats.todayIncome }}</text>
        <text class="label">今日收入</text>
      </view>
    </view>

    <!-- 2. 筛选与标签栏 (吸顶) -->
    <view class="sticky-header">
      <view class="tabs">
        <view 
          class="tab-item" 
          v-for="(tab, index) in tabs" 
          :key="index" 
          :class="{ active: currentTab === index }"
          @click="switchTab(index)"
        >
          {{ tab.name }}
          <view class="badge" v-if="tab.count > 0">{{ tab.count }}</view>
        </view>
      </view>
      
      <view class="filter-bar">
        <picker mode="selector" :range="timeFilters" @change="handleTimeFilter">
          <view class="filter-item">
            <text>{{ currentTimeFilter }}</text>
            <text class="iconfont">▼</text>
          </view>
        </picker>
        <view class="filter-item" @click="showCategoryFilter">
          <text>全部分类</text>
          <text class="iconfont">▼</text>
        </view>
      </view>
    </view>

    <!-- 3. 订单列表 -->
    <scroll-view scroll-y class="order-list">
      <view class="order-card" v-for="item in filteredOrders" :key="item.id">
        
        <view class="card-header">
          <text class="order-no">订单号：{{ item.orderNo }}</text>
          <!-- 使用计算后的属性 -->
          <text class="status-text" :class="item.statusClass">
            {{ item.statusText }}
          </text>
        </view>

        <view class="goods-box">
          <image :src="item.image" mode="aspectFill" class="goods-img"></image>
          <view class="goods-info">
            <view class="goods-name">{{ item.goodsName }}</view>
            <view class="goods-spec">规格: {{ item.spec }}</view>
            <view class="goods-price-row">
              <text class="price">¥{{ item.price }}</text>
              <text class="qty">x{{ item.quantity }}</text>
            </view>
          </view>
        </view>

        <view class="summary-box">
          <view class="row">
            <text class="label">买家:</text>
            <text class="value">{{ item.buyerName }}</text>
          </view>
          <view class="row">
            <text class="label">时间:</text>
            <text class="value">{{ item.createTime }}</text>
          </view>
           <view class="row">
            <text class="label">方式:</text>
            <text class="value tag">{{ item.deliveryType === 'pickup' ? '自提' : '配送' }}</text>
            <text class="value" v-if="item.deliveryType === 'delivery'">{{ item.address }}</text>
          </view>
          <view class="row note" v-if="item.note">
            <text class="label">备注:</text>
            <text class="value red">{{ item.note }}</text>
          </view>
          <view class="total-row">
            <text>共{{ item.quantity }}件</text>
            <text class="total-price">合计: ¥{{ item.totalPrice }}</text>
          </view>
        </view>

        <view class="action-box">
          <!-- A. 待处理 -->
          <template v-if="item.status === 'pending'">
            <button class="btn btn-outline-danger" @click="handleReject(item)">拒绝接单</button>
            <button class="btn btn-primary" @click="handleAccept(item)">立即接单</button>
          </template>

          <!-- B. 待取货/配送 -->
          <template v-if="item.status === 'awaiting'">
            <view class="location-tip" v-if="item.deliveryType === 'pickup'">
              <text>📍 需到店自提</text>
            </view>
            <button class="btn btn-primary" @click="handleComplete(item)">
              {{ item.deliveryType === 'pickup' ? '标记已取货' : '标记已送达' }}
            </button>
          </template>

          <!-- C. 已完成/全部 -->
          <template v-if="item.status === 'completed'">
            <button class="btn btn-default" @click="viewDetail(item)">查看详情</button>
          </template>
        </view>
      </view>

      <view v-if="filteredOrders.length === 0" class="empty-state">
        <text>暂无相关订单</text>
      </view>
      
      <view class="safe-area-bottom"></view>
    </scroll-view>
  </view>
</template>

<script>
// Vue 2 写法：不使用 script setup，不引入 ref
export default {
  data() {
    return {
      stats: {
        todayOrders: 12,
        pendingOrders: 3,
        todayIncome: '458.00'
      },
      timeFilters: ['今日', '本周', '本月'],
      currentTimeFilter: '今日',
      tabs: [
        { name: '待处理', status: 'pending', count: 3 },
        { name: '待取货', status: 'awaiting', count: 5 },
        { name: '已完成', status: 'completed', count: 0 },
        { name: '全部', status: 'all', count: 0 }
      ],
      currentTab: 0,
      allOrders: [
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
          createTime: '10:23',
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
          createTime: '09:15',
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
          createTime: '昨天 18:00',
          deliveryType: 'pickup',
          address: '',
          note: '',
        }
      ]
    };
  },
  computed: {
    filteredOrders() {
      const statusKey = this.tabs[this.currentTab].status;
      
      // 1. 筛选逻辑
      let list = this.allOrders;
      if (statusKey !== 'all') {
        list = list.filter(item => item.status === statusKey);
      }
      
      // 2. 映射逻辑 (处理状态文字和颜色)
      return list.map(item => {
        return {
          ...item,
          statusText: this.getStatusText(item.status),
          statusClass: this.getStatusColor(item.status)
        }
      });
    }
  },
  methods: {
    getStatusText(status) {
      const map = {
        'pending': '待接单',
        'awaiting': '待取货',
        'completed': '已完成',
        'cancelled': '已取消'
      };
      return map[status] || status;
    },
    getStatusColor(status) {
      if(status === 'pending') return 'text-orange';
      if(status === 'awaiting') return 'text-blue';
      if(status === 'completed') return 'text-green';
      return 'text-gray';
    },
    switchTab(index) {
      this.currentTab = index;
    },
    handleTimeFilter(e) {
      this.currentTimeFilter = this.timeFilters[e.detail.value];
      uni.showToast({ title: `筛选: ${this.currentTimeFilter}`, icon: 'none' });
    },
    showCategoryFilter() {
      uni.showToast({ title: '点击了分类筛选', icon: 'none' });
    },
    updateOrderStatus(id, newStatus) {
      const index = this.allOrders.findIndex(o => o.id === id);
      if (index !== -1) {
        // Vue 2 需要注意数组响应式更新，但修改对象属性通常是响应式的
        this.allOrders[index].status = newStatus;
        // 如果视图不更新，可以使用: this.$set(this.allOrders[index], 'status', newStatus);
      }
    },
    handleAccept(item) {
      uni.showLoading({ title: '处理中' });
      setTimeout(() => {
        this.updateOrderStatus(item.id, 'awaiting');
        this.stats.pendingOrders--;
        uni.hideLoading();
        uni.showToast({ title: '已接单', icon: 'success' });
      }, 500);
    },
    handleReject(item) {
      const reasons = ['缺货', '信息有误', '无法配送', '其他原因'];
      uni.showActionSheet({
        itemList: reasons,
        success: (res) => {
          const reason = reasons[res.tapIndex];
          uni.showModal({
            title: '确认拒绝?',
            content: `原因: ${reason}`,
            success: (modalRes) => {
              if (modalRes.confirm) {
                this.updateOrderStatus(item.id, 'cancelled');
                this.stats.pendingOrders--;
                uni.showToast({ title: '已拒绝', icon: 'none' });
              }
            }
          })
        }
      });
    },
    handleComplete(item) {
      const actionText = item.deliveryType === 'pickup' ? '确认已取货?' : '确认已送达?';
      uni.showModal({
        title: '确认操作',
        content: actionText,
        success: (res) => {
          if (res.confirm) {
            this.updateOrderStatus(item.id, 'completed');
            uni.showToast({ title: '已完成', icon: 'success' });
          }
        }
      });
    },
    viewDetail(item) {
      uni.navigateTo({
        url: `/pages/order/detail?id=${item.id}`
      });
    }
  }
};
</script>

<style lang="scss">
/* 样式与之前保持一致即可 */
$primary-color: #007aff; 
$success-color: #4cd964;
$warning-color: #f0ad4e;
$danger-color: #dd524d;
$bg-color: #f5f6f7;
$text-main: #333;
$text-sub: #999;

page { background-color: $bg-color; height: 100%; }
.container { display: flex; flex-direction: column; height: 100vh; }

/* 顶部数据卡片 */
.dashboard-card {
  background: linear-gradient(135deg, $primary-color, #00c6ff);
  color: #fff;
  padding: 30rpx 20rpx;
  display: flex;
  justify-content: space-around;
  
  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .num { font-size: 40rpx; font-weight: bold; margin-bottom: 10rpx; &.highlight { font-size: 44rpx; color: #fff; } &.price { font-size: 44rpx; } }
    .label { font-size: 24rpx; opacity: 0.9; }
  }
}

/* 吸顶头部 */
.sticky-header { position: sticky; top: 0; z-index: 99; background-color: #fff; box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05); }

/* 标签栏 */
.tabs {
  display: flex; justify-content: space-around; padding: 20rpx 0; border-bottom: 1rpx solid #eee;
  .tab-item {
    position: relative; font-size: 28rpx; color: $text-sub; padding-bottom: 10rpx;
    &.active { color: $primary-color; font-weight: bold; border-bottom: 4rpx solid $primary-color; }
    .badge { position: absolute; top: -10rpx; right: -20rpx; background-color: $danger-color; color: #fff; font-size: 20rpx; padding: 2rpx 8rpx; border-radius: 20rpx; }
  }
}

/* 筛选栏 */
.filter-bar {
  display: flex; padding: 15rpx 30rpx; background-color: #fff; font-size: 26rpx; color: #666;
  .filter-item { margin-right: 40rpx; display: flex; align-items: center; .iconfont { font-size: 20rpx; margin-left: 6rpx; } }
}

/* 订单列表 */
.order-list {
  flex: 1; padding: 20rpx; box-sizing: border-box;
  .order-card {
    background-color: #fff; border-radius: 16rpx; padding: 24rpx; margin-bottom: 24rpx; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.02);
    .card-header {
      display: flex; justify-content: space-between; font-size: 24rpx; margin-bottom: 20rpx; padding-bottom: 10rpx; border-bottom: 1rpx solid #f8f8f8;
      .order-no { color: #999; }
      .status-text { 
        font-weight: bold; 
        &.text-orange { color: $warning-color; }
        &.text-blue { color: $primary-color; }
        &.text-green { color: $success-color; }
        &.text-gray { color: #ccc; }
      }
    }
    .goods-box {
      display: flex; margin-bottom: 20rpx;
      .goods-img { width: 140rpx; height: 140rpx; border-radius: 8rpx; background-color: #eee; margin-right: 20rpx; }
      .goods-info {
        flex: 1; display: flex; flex-direction: column; justify-content: space-between;
        .goods-name { font-size: 28rpx; font-weight: bold; color: $text-main; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .goods-spec { font-size: 24rpx; color: #999; background-color: #f8f8f8; padding: 4rpx 10rpx; border-radius: 6rpx; align-self: flex-start; }
        .goods-price-row { display: flex; justify-content: space-between; align-items: flex-end; .price { font-size: 32rpx; color: $text-main; font-weight: bold; } .qty { font-size: 26rpx; color: #999; } }
      }
    }
    .summary-box {
      font-size: 26rpx; color: #666; margin-bottom: 20rpx;
      .row {
        margin-bottom: 8rpx; display: flex;
        .label { width: 80rpx; color: #999; }
        .value { flex: 1; &.tag { background: #e1f3ff; color: $primary-color; padding: 0 8rpx; border-radius: 4rpx; font-size: 22rpx; margin-right: 10rpx; flex: none; } &.red { color: $danger-color; } }
      }
      .total-row { display: flex; justify-content: flex-end; align-items: center; margin-top: 10rpx; padding-top: 10rpx; border-top: 1rpx dashed #eee; .total-price { font-size: 30rpx; color: $text-main; font-weight: bold; margin-left: 20rpx; } }
    }
    .action-box {
      display: flex; justify-content: flex-end; align-items: center;
      .location-tip { font-size: 24rpx; color: $primary-color; margin-right: auto; }
      .btn {
        margin: 0 0 0 20rpx; font-size: 26rpx; padding: 0 30rpx; height: 60rpx; line-height: 60rpx; border-radius: 30rpx;
        &::after { border: none; }
        &.btn-primary { background-color: $primary-color; color: #fff; }
        &.btn-outline-danger { background-color: #fff; color: $danger-color; border: 1rpx solid $danger-color; line-height: 58rpx; }
        &.btn-default { background-color: #f8f8f8; color: #666; border: 1rpx solid #ddd; line-height: 58rpx; }
      }
    }
  }
}
.empty-state { text-align: center; color: #999; padding-top: 100rpx; font-size: 28rpx; }
.safe-area-bottom { height: env(safe-area-inset-bottom); }
</style>