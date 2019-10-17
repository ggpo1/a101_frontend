import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {  } })
export default class ErrorModal extends Vue {
    @Prop() public errorData!: { title: string, text: string };
}