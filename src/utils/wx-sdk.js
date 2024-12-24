import wx from 'weixin-js-sdk'
import {getWxJsapiParams} from '@/api/index'
const configureWxJsSdk = function(url) {
	
	return new Promise((resolve, reject) => {

		getWxJsapiParams({url:window.location.href}).then(res=>{
				wx.config(res.data);				
				wx.ready(() => {				
					resolve();
				});
				wx.error((err) => {
					reject(err);
				});
			})
	});
	
};


export {
	configureWxJsSdk,
};