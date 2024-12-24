<template>
  <div>
    <nav-bar title=" 用户购买协议  "></nav-bar>
    <div class="u-content">
      <quill-editor v-model="content"  :editable="false" :readonly="true"  @focus="focus($event)"
                    :options="{modules:{toolbar:false}}"/>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				content: `
					<p>
					    <span style=";font-family:宋体;font-size:14px">为了确保平台运营的合法性、规范性以及保障用户权益，以下是</span><span style=";font-family:宋体;font-size:14px">协议</span><span style=";font-family:宋体;font-size:14px">内容：</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">一、协议目的</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span><span style="font-family:宋体">本协议旨在明确上海利磊科技发展有限责任公司（以下简称“</span></span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">”）与用户之间关于</span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">电商平台的权利义务。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span><span style="font-family:宋体">用户在使用</span></span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">电商平台提供的服务前，应仔细阅读并同意本协议的全部内容。如用户对协议内容有异议，请立即停止使用</span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">电商平台服务。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">3. </span><span style="font-family:宋体">用户在使用</span></span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">电商平台服务过程中，应遵守本协议及</span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">平台发布的各项规定，否则</span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">有权根据情况对用户采取相应的处罚措施。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">二、服务内容</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span></span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">电商平台</span><span style=";font-family:宋体;font-size:14px">，</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">以下称</span><span style="font-family:宋体">“平台”，</span></span><span style=";font-family:宋体;font-size:14px">为商家及会员提供各种</span><span style=";font-family:宋体;font-size:14px">寺庙及文化旅游</span><span style=";font-family:宋体;font-size:14px">服务，包括但不限于线上祈福、购买寺庙相关产品、核销禅修班等。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span><span style="font-family:宋体">平台为普通会员（消费者）、商家及代理商提供相应的服务支持，包括</span></span><span style=";font-family:宋体;font-size:14px">寺庙线上祈福、禅修班、会员及寺庙财务统计</span><span style=";font-family:宋体;font-size:14px">等功能。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">3. </span><span style="font-family:宋体">平台不直接提供服务，所有服务由加盟商家提供。</span></span><span style=";font-family:宋体;font-size:14px">平台</span><span style=";font-family:宋体;font-size:14px">仅行使违法监督权和提供平台软件使用权。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">三、用户责任</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span><span style="font-family:宋体">用户在使用平台服务时，应遵守中国法律法规，不得利用平台从事任何违法违规活动。</span></span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span><span style="font-family:宋体">商家</span></span><span style=";font-family:宋体;font-size:14px">使用自身商户主体，对初善人进行支付对接，由平台进行交易分账</span><span style=";font-family:宋体;font-size:14px">。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">3. </span><span style="font-family:宋体">普通会员与商家之间的交易纠纷应优先由双方协商解决，如无法达成一致，可向平台客服求助。</span></span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">4. </span><span style="font-family:宋体">用户应保管好自己的账号和密码，不得将账号密码泄露给他人，否则由此造成的损失由用户自行承担。</span></span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">四、服务费用</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span><span style="font-family:宋体">商家应按</span></span><span style=";font-family:宋体;font-size:14px">平台</span><span style=";font-family:宋体;font-size:14px">规定缴纳软件使用费</span><span style=";font-family:宋体;font-size:14px">、</span><span style=";font-family:宋体;font-size:14px">业务推广费、广告使用费等，商家所使用的相关费用</span><span style=";font-family:宋体;font-size:14px">，</span><span style=";font-family:宋体;font-size:14px">商家使用下级账户分账功能分账给平台，</span><span style=";font-family:宋体;font-size:14px">否则</span><span style=";font-family:宋体;font-size:14px">平台</span><span style=";font-family:宋体;font-size:14px">有权暂停或终止</span><span style=";font-family:宋体;font-size:14px">为</span><span style=";font-family:宋体;font-size:14px">其服务。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span></span><span style=";font-family:宋体;font-size:14px">消费者</span><span style=";font-family:宋体;font-size:14px">无需</span><span style=";font-family:宋体;font-size:14px">向平台</span><span style=";font-family:宋体;font-size:14px">支付</span><span style=";font-family:宋体;font-size:14px">平台</span><span style=";font-family:宋体;font-size:14px">费用，</span><span style=";font-family:宋体;font-size:14px">消</span><span style=";font-family:宋体;font-size:14px">费</span><span style=";font-family:宋体;font-size:14px">行为</span><span style=";font-family:宋体;font-size:14px">由</span><span style=";font-family:宋体;font-size:14px">服务消费者的</span><span style=";font-family:宋体;font-size:14px">商家收取。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">3. </span><span style="font-family:宋体">平台如有增值性的服务购买，由会员自行决定购买，由平台主体收取费用的增值服务，由平台进行售后服务。</span></span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">五、风险提示</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span><span style="font-family:宋体">用户在使用平台服务时，应注意个人信息保护，避免泄露个人隐私。</span></span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span><span style="font-family:宋体">用户应谨慎选择商家及服务，避免因商家行为造成的损失。</span></span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">3. </span></span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">不对商家提供的服务质量和</span><span style=";font-family:宋体;font-size:14px">产品</span><span style=";font-family:宋体;font-size:14px">承担责任，用户应自行承担使用风险。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">六、协议解释</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span><span style="font-family:宋体">本协议最终解释权归</span></span><span style=";font-family:宋体;font-size:14px">上海利磊科技发展有限责任公司</span><span style=";font-family:宋体;font-size:14px">所有。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span><span style="font-family:宋体">如用户对本协议有任何疑问或建议，可随时联系</span></span><span style=";font-family:宋体;font-size:14px">平台</span><span style=";font-family:宋体;font-size:14px">客服进行沟通。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">七、法律适用与争议解决</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span><span style="font-family:宋体">本协议适用中国法律。</span></span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span><span style="font-family:宋体">因本协议引起的争议，</span></span><span style=";font-family:宋体;font-size:14px">消费者与商户</span><span style=";font-family:宋体;font-size:14px">应尽量友好协商解决；协商不成的，任何一方均可向上海</span><span style=";font-family:宋体;font-size:14px">利磊科技发展有限责任公司</span><span style=";font-family:宋体;font-size:14px">提起</span><span style=";font-family:宋体;font-size:14px">投诉，上海利磊科技发展有限责任公司如无法协助解决，消费者或商户均可对另一方到上海市人民法院提起诉讼</span><span style=";font-family:宋体;font-size:14px">。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">八、其他</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">1. </span></span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">保留对本协议进行修改的权利，修改后的协议将在平台上公布并生效。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2. </span><span style="font-family:宋体">用户应定期关注并查阅</span></span><span style=";font-family:宋体;font-size:14px">初善人</span><span style=";font-family:宋体;font-size:14px">电商平台发布的协议和规定，以了解最新信息。</span>
					</p>
					<p>
					    <span style=";font-family:宋体;font-size:14px">&nbsp;</span>
					</p>
					<p style="text-align:right">
					    <span style=";font-family:宋体;font-size:14px">上海利磊科技发展有限责任公司</span>
					</p>
					<p style="text-align:right">
					    <span style=";font-family:宋体;font-size:14px"><span style="font-family:Calibri">2024.10.11</span></span>
					</p>
					<p>
					    <br/>
					</p>
				`
			}
		},
    methods:{
      focus(event){
        event.enable(false) //不可编辑
      }
    }
	}
</script>

<style lang="less" scoped>
    .u-content {
        padding: 24rpx;
      background: #ffffff;
    }
</style>
