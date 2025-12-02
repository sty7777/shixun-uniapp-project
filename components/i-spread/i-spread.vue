<template>
	<view class="overflow-hidden position-relative"  :class="[isShrink ? 'gui-transition-all' : '']"  :style="{height:reHeight}">
		<view :style="{ paddingBottom: !isBtn && isShrink ? '80rpx' : '0rpx' }">
			<slot></slot>
		</view>
		<text class="gui-spread-btn bg-white d-block opacity9" v-if="isBtn"  @tap="spreadContent"  :style="{fontSize:btnTxtSize, zIndex:zIndex, width:width}" > {{btnTxt}}</text>
		<text class="gui-spread-btn bg-white d-block opacity9" v-if="!isBtn && isShrink"  @tap="shrinkContent"  :style="{fontSize:btnTxtSize, zIndex:zIndex, width:width}">{{shrinkBtnTxt}}</text>
	</view>
</template>
<script>
export default {
	name  : "i-spread",
	props : {
		width       : { type : String, default : "690rpx" },
		height      : { type : String, default : "600rpx" },
		btnTxt      : { type : String, default : "展开全文" },
		btnTxtSize  : { type : String, default : "28rpx" },
		zIndex      : { type : Number, default : 1 },
		isShrink    : { type : Boolean,default : false},
		shrinkBtnTxt: { type : String, default : "收起"}
	},
	data() {
		return {
			reHeight: "600px",
			isBtn : true
		}
	},
	created(){
		this.reHeight = this.height;
	},
	methods: {
		spreadContent() {
			this.reHeight = '';
			this.isBtn    = false;
		},
		shrinkContent () {
			this.reHeight = this.height;
			this.isBtn    = true;
		}
	},
}
</script>
<style scoped>
.gui-spread-btn{height:91rpx; line-height:88rpx; position:absolute; z-index:999; left:0; bottom:-3rpx; text-align:center;font-size:28rpx;opacity:0.96;}
</style>
