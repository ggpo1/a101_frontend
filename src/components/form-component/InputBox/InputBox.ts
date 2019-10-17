import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {} })
export default class InputBox extends Vue {
    @Prop() public placeHolder!: string;
    @Prop() public inputMethod!: string;
    @Prop() public inputName!: string;
    @Prop() public value!: string;

    @Prop() public error!: boolean;

    public hasError: boolean = false;
    /**
     * update
     */
    public update(value: string) {
        if (value === '') {
            this.hasError = true;
        } else {
            this.hasError = false;
        }
    }

    /**
     * refreshRed
     */
    public refreshRed() {
       this.hasError = false; 
    }
}
