import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ components: {  } })
export default class InputBox extends Vue {
    @Prop() public placeHolder!: string;
    @Prop() public inputMethod!: string;
    @Prop() public inputName!: string;
    @Prop() public value!: string;
}