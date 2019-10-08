<template>
  <div class="contentbar-wrapper">
    <div class="admin-wrapper admin-partners-wrapper" v-if="contentState === 'partners'">
      <h3>Партнеры</h3>
      <button @click="partnerBlockClick(null, 'create')" class="button-box">добавить</button>
      <div
        class="partner-block"
        v-for="(elem, i) in partnersSource"
        v-bind:key="i"
        :id="'part_' + i"
      >
        <div class="info-block"><a @click="partnerBlockClick(elem, 'select')" href="#">{{ elem.partnerInfo.companyName }}</a></div>
        <div class="info-block">{{ elem.partnerInfo.fullName }}</div>
        <div class="info-block">{{ elem.partnerInfo.companyState }}</div>
        <div class="info-block">{{ elem.partnerInfo.phoneNumber }}</div>
        <div class="info-block">{{ elem.city }}</div>
        <div class="info-block buttons-wrapper">
          <div @click="partnerBlockClick(elem, 'edit')" class="btn edit-button" >изменить</div>
          <div @click="partnerBlockClick(elem, 'delete')" class="btn remove-button">удалить</div>
        </div>
        
      </div>
      <ModalView @modalClose="modalClose" :pages="partnerInfoModalPages" :companies="partnerCompanies" :ModalMode="'INFORM'" :ModalInformSource="ModalInformSource" v-if="modalPartnerInfoState" />
      <ModalView @modalClose="modalClose" @addNewPartner="AddNewPartner" @updateValue="CreatePartnerValueUpdate" :ModalMode="'CREATE'" :ModalCreateSource="ModalCreateSource" v-if="modalPartnerCreateState" />
    </div>
    <div class="admin-wrapper admin-companies-wrapper" v-if="contentState === 'companies'">
      <h3>Компании</h3>
    </div>
    <div class="admin-wrapper admin-documents-wrapper" v-if="contentState === 'documents'">
      <h3>Документы</h3>
    </div>
  </div>
</template>

<script lang="ts" src="./ContentBar.ts" />

<style scoped>
.contentbar-wrapper {
  width: 70%;
  height: 85%;
  margin-top: 5%;
  background: white;
  border-radius: 15px;
  margin-right: 5%;
  display: flex;
  justify-content: center;
  overflow-x: none;
  overflow-y: auto;
  font-size: 14pt;
}
.admin-wrapper {
  width: 90%;
  height: 90%;
  margin-top: 2.5%;
}
.admin-partners-wrapper {
}

#part_0 {
  margin-top: 4%;
}

.partner-block {
  margin-top: 2%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  line-height: 40px;
  border: 1px solid #cfcfcf;
  box-shadow: 0 0 2pt 1pt #cfcfcf;
}


.info-block {
  width: 30%;
  font-size: 85%;
  cursor: pointer;
}
.info-block > a {
    color: black;

}

.btn {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 15px;
    font-size: 70%;
    font-weight: 600;
}

.edit-button {
    border: 1px solid #5cb95c;
    
}
.remove-button {
    border: 1px solid red;
    margin-left: 2%;
}

.buttons-wrapper {
    display: flex;
    
}

.button-box {

    width: 100%;
    height: 30px;
    border-radius: 5px;
    background: #5cb95c;
    color: white;
    padding: 0;
    margin-top: 15px;
    border: none;
    padding: 5px;
    border: 1px solid transparent;
    outline: none;
}

.button-box:focus {
    box-shadow: 0 0 1pt 0.5pt #cfcfcf;
}

.green {
    background: #5cb95c;
    color: white;
}
</style>