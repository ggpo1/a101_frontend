<template>
  <aside class="modal" id="modal">
    <header class="modal-header">
      <h2 class="modal-title">{{ errorData.title }}</h2>
      <div class="modal-exit-button" @click="$emit('modalClose')">
        <div>
          &#10006;
        </div>
      </div>
    </header>
    <section class="modal-content">
      <div class="inform-label">
          <div style="display: flex; width: 100%; justify-content: center;">
            <strong><span class="red-star">{{ errorData.text }}</span></strong>
          </div>
      </div>
      <div class="modal-exit-button">
        <div style="">
          &nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </section>
  </aside>
</template>

<script lang="ts" src="./ErrorModal.ts" />

<style scoped>
.modal {
    background: #fff;
    position: absolute;
    width: 30%;
    border-radius: 5px;
    height: 25%;
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
  display: flex;
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
  
  width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center;
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

.error-msg-wrapper {
  width: 100%;
}

.error-msg {
  color: red;
}

.red-star {
  color: red;
  font-size: 100%;
}
</style>