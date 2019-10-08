import { Component, Prop, Vue } from 'vue-property-decorator';

export default class ButtonBox extends Vue {
    @Prop() public color!: string;
    @Prop() public title: string = '';
}