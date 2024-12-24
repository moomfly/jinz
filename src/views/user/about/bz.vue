<template>
	<div class="u-content">
    <nav-bar title="消费者权益保障措施说明 "></nav-bar>
<!--    <div class="u-content">
      <quill-editor v-model="content"  :editable="false" :readonly="true"  @focus="focus($event)"
                    :options="{modules:{toolbar:false}}"/>
    </div>-->
    <div class="ql-container  ">
      <div class="ql-editor" v-html="content">
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				content: `<p><span style="font-family: 宋体; font-size: 10.5pt">一、引言</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">本文旨在规范初善人电商平台（以下称“平台”）的消费者权益保障措施，明确用户在使用平台服务过程中遇到的损失由平台承担兜底赔付或协助追偿的机制，保障用户的合法权益，有效防范法律风险。</span></p><p><span style="font-family: 宋体; font-size: 10.5pt">&nbsp;</span></p><p class="MsoNormal">二、<span style="font-family: 宋体; font-size: 10.5pt">平台服务范围及责任规避</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">1.服务内容：平台主要为消费者提供各类寺庙、道馆等信众服务类的商家服务，包括但不限于线上祈福、购买商家相关产品、核销禅修班等。本平台不提供具体服务，所有服务由商家提供，平台仅提供软件使用权。</span></p><p class="MsoNormal">2. <span style="font-family: 宋体; font-size: 10.5pt">责任规避：</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">(1).初善人电商平台作为销售管理平台，不直接提供服务，所有服务由加盟商家提供。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">(2).平台仅行使违法监督权和提供软件使用权，不对商家行为承担责任。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">(3).所有商家需严格遵守中国法律法规，一经发现违法行为，平台有权清退该商家。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">&nbsp;</span></p><p class="MsoNormal">三、<span style="font-family: 宋体; font-size: 10.5pt">消费者权益保障措施</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">1.损失赔付机制：</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">(1).如用户因商家的服务或商品问题而产生损失，消费者无法联系或商家无法狗头协商赔付时，平台将先行对用户进行赔付，商家的追偿行为由平台进行。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">(2).用户需提供相关证明材料，以便平台核实情况。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">2.纠纷协商：</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">普通会员与商家发生纠纷，应首先与商家进行友好协商，尽可能达成一致。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">如协商无果，可向平台客服投诉，平台将协助双方进行调解。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">3.法律维权：</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">若商家存在违法行为，普通会员可向有关机关投诉或报警处理，平台将提供必要的协助。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">平台不对商家违法行为承担责任，但将配合有关机关的调查。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">4.清退处理：</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">如商家存在严重违法行为，平台有权对其进行清退，不再允许其在平台从事业务。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">普通会员如发现商家违法行为，可向平台举报，平台将积极处理并保护举报者的合法权益。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">&nbsp;</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">四、其他条款</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">服务器规定：商家应确保提供的服务在服务器上合法运行，且符合相关法律法规。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">违约责任：如商家违反法律及初善人协议规定，应承担相应的法律责任和经济赔偿责任。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">六、最终解释权</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">本消费者权益保障措施说明的最终解释权归上海利磊科技发展有限责任公司所有。</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">&nbsp;</span></p><p class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">&nbsp;</span></p><p style="text-align: right" class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">上海利磊科技发展有限责任公司&nbsp;</span></p><p style="text-align: right" class="MsoNormal"><span style="font-family: 宋体; font-size: 10.5pt">2024.10.28</span></p>`
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
      background: #ffffff;
    }
</style>
