<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="d-flex a-center j-sb py-2 px-3 text-light-muted">
			<view class="iconfont icon-shanchu1" @click="goBack"></view>
			<view class="font-md" @click="forget">忘记密码</view>
		</view>
		<view class="p-5">
			<view class="font-big mb-5">密码登陆</view>
			<input class="border-bottom mb-4 uni-input px-0" type="text" placeholder="请输入手机号/邮箱/帐号" placeholder-class="text-light-muted" @focus="focus('username')" @blur="blur('username')" :class="focusClass.username?'input-border-color':''" v-model="username">
			<input class="border-bottom mb-4 uni-input px-0" type="text" placeholder="请输入密码" placeholder-class="text-light-muted" :class="focusClass.password?'input-border-color':''" @focus="focus('password')" @blur="blur('password')" v-model="password" password>
			<view class="py-2 w-100 d-flex a-center j-center main-bg-color text-white rounded font-md mb-4" hover-class="main-bg-hover-color" @click="submit">登陆</view>
			<label class="d-flex a-center" @click="check = !check">
				<checkbox :checked="check"></checkbox>
				<text class="text-light-muted font">已阅读并同意XXX协议</text>
			</label>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-ui/uni-status-bar/uni-status-bar.vue';
	export default {
		components: {
			uniStatusBar,
		},
		data() {
			return {
				username: '',
				password: '',
				check: true,
				focusClass: {
					username: false,
					password: false,
				},
				// 验证规则
				rules: {
					username: [
						{
							rule: /^[a-zA-Z]\w{5,7}$/,
							msg: '帐号必须以字母开头,长度在6-8之间,只能包含字母,数字,下划线',
						}
					],
					password: [
						{
							rule: /^.{5,20}$/,
							msg: '密码长度必须为5-20个字符',
						}
					]
				}
			}
		},
		methods: {
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			forget() {
				
			},
			focus(key) {
				this.focusClass[key] = true;
			},
			blur(key) {
				this.focusClass[key] = false;
			},
			// 表单验证
			validate(key) {
				var check = true;
				this.rules[key].forEach((v)=>{
					// 验证失败
					if (!(v.rule).test(this[key])) {
						uni.showToast({
							title: v.msg,
							icon: 'none',
						});
						check = false;
						return false;
					}
				});
				return check;
			},
			// 提交表单
			submit() {
				console.log(this.check);
				if (!this.check) {
					return uni.showToast({
						title: '请先阅读XXX协议',
						icon: 'none',
					})
				}
				// 验证用户名
				if (!this.validate('username')) return;
				// 验证密码
				console.log(this.validate('password'));
				if (!this.validate('password')) return;
				console.log('提交成功');
				uni.showLoading({
					title: '登陆中...',
					mask: true,
				});
				setTimeout(()=>{
					uni.hideLoading();
					uni.navigateBack({
						delta: 1,
					});
				},3000);
			},
		}
	}
</script>

<style>

</style>
