<template>
	<view class="mx-2">
		<view class="bg-white rounded-lg p-3 mt-2">
			<textarea wrap="soft" v-model="message" id="textarea" style="height: 150rpx;" placeholder="粘贴信息，自动拆分姓名、电话和地址"></textarea>
			<view class="mt-1 text-right">
				<button size="mini" type="success" @click="parseAddress">识别</button>
			</view>
		</view>
		
		<view class="bg-white rounded-lg p-3 mt-3">
			<view class="flex align-center justify-between border-bottom border-light py-3">
				<view class="flex-1">
					<input class="font28" focus placeholder="姓名" v-model="userName" />
				</view>
				<view class="flex-1">
					<input class="font28" type="number" placeholder="联系方式" v-model="tel" />
				</view>
			</view>
			<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
				<view class=" border-bottom border-light py-3 flex align-center justify-between">
					<view class=" font28 flex align-center flex-1" v-if="province">{{province}}{{city}}{{district}}
					</view>
					<view class=" font28 text-light-black flex-1" v-else>省市区</view>
					<uni-icons type="right" color="#cccccc" size="20"></uni-icons>
				</view>
			</pick-regions>
			<view class=" border-bottom border-light py-3 flex align-center justify-between">
				<textarea v-model="address" autoHeight class="flex-1 font28" placeholder="详细地址（例如**街**号**）" />
			</view>
			<view class="flex align-center justify-between">
				<view class="flex align-center justify-between mt-2" @click="clear">
					<uni-icons type="trash-filled" size="16" color="#cccccc"></uni-icons>
					<text class="font24 ml-1 text-muted">清空当前信息</text>
				</view>
			</view>
		</view>
		<view class="fixed-bottom border-top  bg-white py-2 px-3">
			<view class="bg-danger py-3 font30 text-center text-white shadow rounded-circle" @click="toList">立即保存
			</view>
		</view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import AddressParse from 'address-parse';
	export default {
		data() {
			return {
				province: null,
				city: null,
				district: null,
				address: null,
				userName: null,
				tel: null,
				// 弹出验证信息
				message:null,
				msgType: null,
				messageText: null,
				region: [],
				defaultRegionCode: '110101'
			}
		},
		onLoad(options) {
			
		},

		methods: {
			parseAddress() {
				if (this.message != '') {
					const result = AddressParse.parse(this.message);
					this.userName = result[0].name
					this.tel = result[0].mobile
					this.address = result[0].details
					this.province = result[0].province
					this.city = result[0].city
					this.district = result[0].area
				} else {
					this.$toast('请输入您要识别的地址')
				}
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
				this.province = region[0].name
				this.city = region[1].name
				this.district = region[2].name
			},
			toList() {
				if (this.userName == null || this.userName == '') {
					this.msgType = "error"
					this.messageText = `请输入联系人姓名`
					this.$refs.message.open()
					return
				}
				if (this.tel == null || this.tel == '') {
					this.msgType = "error"
					this.messageText = `请输入联系人手机号`
					this.$refs.message.open()
					return
				}
				if (!/^1[3456789]\d{9}$/.test(this.tel)) {
					this.msgType = "error"
					this.messageText = `请输入正确手机号`
					this.$refs.message.open()
					return
				}
				if (this.province == null || this.province == '') {
					this.msgType = "error"
					this.messageText = `请选择地址`
					this.$refs.message.open()
					return
				}
				let datatem = {
					userName: this.userName,
					tel: this.tel,
					province: this.province,
					city: this.city,
					district: this.district,
					address: this.address,
				}
				uni.navigateTo({
					url:'/pages/order/addresslList'
				})
			},
			
			clear() {
				this.address = '',
					this.companyName = '',
					this.userName = '',
					this.tel = '',
					this.province = '',
					this.city = '',
					this.district = ''
			},

		}
	}
</script>

<style>

</style>