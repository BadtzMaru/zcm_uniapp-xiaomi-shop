<template>
	<view class="_popup" :class="popupClass">
		<view class="_mask" @tap.stop="$emit('hide')"></view>
		<view class="_body">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			popupClass: {
				type: String,
				default: 'none',
			}
		}
	}
</script>

<style>
	._popup , ._mask{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
	}
	._popup{
		z-index: 2000;
		display: none;
	}
	._mask{
		z-index: 2002;
		background-color: rgba(0,0,0,0.5);
	}
	._popup ._body{
		position: fixed;
		bottom: -1035rpx;
		width: 92%;
		padding: 0 4%;
		height: 1035rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		z-index: 2003;
		border-radius: 20rpx 20rpx 0 0;
	}
	._popup.show{
		display: block;
	}
	
	.show .mask{
		animation: showPopupMask 0.2s linear both;
	}
	.show ._body{
		animation: showPopupBody 0.2s linear both;
	}
	.hide ._mask{
		animation: hidePopupMask 0.2s linear both;
	}
	.hide .body{
		animation: hidePopupBody 0.2s linear both;
	}
	@keyframes showPopupMask{
		0%{opacity: 0;}
		100%{opacity: 1;}
	}
	@keyframes hidePopupMask{
		0%{opacity: 1;}
		100%{opacity: 0;}
	}
	@keyframes showPopupBody{
		0%{transform: translateY()(0);}
		100%{transform: translateY(-100%);}
	}
	@keyframes hidePopupBody{
		0%{transform: translateY(-100%);}
		100%{transform: translateY(0);}
	}
	._popup.hide{
		display: block;
	}
	.popup.none{
		display: none;
	}
</style>
