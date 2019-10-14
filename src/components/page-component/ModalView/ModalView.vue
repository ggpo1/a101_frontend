<template>

  <aside v-if="ModalMode === 'INFORM'" class="modal" id="modal">
    <header class="modal-header">
      <h2 class="modal-title">{{ ModalInformSource.title }}</h2>
      <div class="modal-exit-button" @click="$emit('modalClose')">
        <div>
          &#10006;
        </div>
      </div>
    </header>
    <section v-if="ModalPage === 0" class="modal-content">
      <div class="inform-label" classs v-for="(elem, i) in ModalInformSource.components" v-bind:key="i">
        <div style="display: flex; flex-direction: column; justify-content: center;">
          <strong>{{ elem.title }}:</strong>
        </div>
        <div>
          <LabelBox v-if="elem.type === 2 && (elem.hasHint === false || elem.hasHint === undefined)" :title="elem.text" />
          <a href="#" v-if="elem.type === 2 && elem.hasHint === true">
            {{ elem.text }}
          </a>          
        </div>
      </div>
    </section>
    <section v-else-if="ModalPage === 1" class="modal-list">
      <div v-if="modalPage2State === 'companies'">
        <div class="partner-block" v-for="(item, i) in companies" v-bind:key="i" :id="'part_' + i">
          <div class="info-block"><a @click="partnerBlockClick(item, '123select')" href="#">{{ item.companyName }}</a></div>
          <div class="info-block">{{ item.contactPersonFullName }}</div>
          <div class="info-block">{{ item.contactPersonCompanyState }}</div>
          <div class="info-block">{{ item.contactPersonPhoneNumber }}</div>
          <div class="info-block">{{ item.city.cityName }}</div>
          <div class="info-block">{{ getStatus(item.status) }}</div>
        </div>
      </div>
      <div v-else-if="modalPage2State === 'documents'">
        <div class="partner-block" v-for="(item, i) in documents" v-bind:key="i" :id="'part_' + i">
          <div class="info-block">{{ item.documentName }}</div>
          <div class="info-block">{{ getDocStatus(item.documentStatus) }}</div>
          <div class="info-block"><a :href="'http://192.168.50.8:44336/api/document/download?name=' + item.documentName" :download="item.documentName">скачать</a></div>
        </div>
      </div>
      <div v-else-if="modalPage2State === 'else'">
        
      </div>
    </section>
    <footer class="footer">
      <a v-for="(item, i) in pages" href="#" @click="ModalPage = i" v-bind:key="i">{{ item.title }}</a>
    </footer>
  </aside>

  <aside v-else-if="ModalMode === 'EDIT'" class="modal" id="modal">
    <header class="modal-header">
      <h2 class="modal-title">{{ ModalEditSource.title }}</h2>
      <div class="modal-exit-button" @click="$emit('modalClose')">
        <div>
          &#10006;
        </div>
      </div>
    </header>
    <section></section>
    <footer class="footer">
      <button @click="$emit('addNewPartner')" class="button-box">сохранить</button>
    </footer>
  </aside>

  <aside v-else-if="ModalMode === 'CREATE'" class="modal" id="modal">
    <header class="modal-header">
      <h2 class="modal-title">{{ ModalCreateSource.title }}</h2>
      <div class="modal-exit-button" @click="$emit('modalClose')">
        <div>
          &#10006;
        </div>
      </div>
    </header>
    <section class="modal-content">
      <div class="inform-label" classs v-for="(elem, i) in ModalCreateSource.components" v-bind:key="i">
        <div style="display: flex; flex-direction: column; justify-content: center;">
          <strong>{{ elem.title }}:</strong>
        </div>
        <div>
          <LabelBox v-if="elem.type === 2" :title="elem.text" />
          <InputBox v-else-if="elem.type === 0" :inputName="elem.name" @updateValue="(i, n) => $emit('updateValue', i, n)" :title="elem.title" :id="'login_input_' + i" :inputMethod="elem.inputMethod" :placeHolder="elem.placeHolder" />
          <SelectBox v-else-if="elem.type === 3" :name="elem.name" @updateValue="(i, n) => $emit('updateValue', i, n)" :selectOptions="elem.selectOptions" />
          <FileBox v-else-if="elem.type === 4" :name="elem.name" @updateValue="(i, n) => $emit('updateValue', i, n)" />
        </div>
      </div>
    </section>
    <footer class="footer">
      <button @click="$emit('addNew')" class="button-box">создать</button>
    </footer>
  </aside>

</template>

<script lang="ts" src="./ModalView.ts" />

<style scoped>
/* Стили для неактивного модального окна */
.modal {
    background: #fff;
    position: absolute;
    width: 55%;
    border-radius: 5px;
    height: 55%;
    box-shadow: 0 3px 7px rgba(0,0,0,.25);
    -moz-box-shadow: 0 3px 7px rgba(0,0,0,.25);
    -webkit-box-shadow: 0 3px 7px rgba(0,0,0,.25);
    border: 1px solid #cfcfcf;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    cursor: default;
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;  
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: auto; 
    margin-right: auto; 
    font-size: 15pt;
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
/* Активация модального окна в состоянии :target 
.modal:target {
    top: 50%;
    transition: all 0.4s ease-in-out;
    -moz-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
}*/

.modal header, .modal footer {
    background: #e6e6e6;/* f7f7f7 */
    border-bottom: 1px solid #e7e7e7;
    border-radius: 5px 5px 0 0;
    -moz-border-radius: 5px 5px 0 0;
    -webkit-border-radius: 5px 5px 0 0;
}
.modal footer {
    border:none;
    border-top: 1px solid #e7e7e7;
    border-radius: 0 0 5px 5px;
    -moz-border-radius: 0 0 5px 5px;
    -webkit-border-radius: 0 0 5px 5px;
}
.modal section, .modal header, .modal footer {
    padding: 15px;
    z-index: 200;
}
.modal h2 {
    margin: 0;
}
.modal .btn {
    float: right;
}

.modal-header {
  display: flex;
  justify-content: space-between;
}

.modal-title {
  width: 100%;
  

}

.footer {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}

.modal-content {
  font-size: 100%;
  overflow: auto;
  height: 100%;
}

.modal-list {
  font-size: 80%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.modal-exit-button {
  color: red;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}

.inform-label {
  margin-top: 4%;
  display: flex;
  width: 100%;
  
}

.inform-label > div:first-child {
  width: 30%;
  text-align: left;
}

.inform-label > div {
  width: 60%;
  text-align: center;
}
.button-box {
    cursor: pointer;
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