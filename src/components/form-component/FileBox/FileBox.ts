import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ components: {  } })
export default class FileBox extends Vue {
    @Prop() public name!: string;

    /**
     * changed
     */
    public changed() {
        // console.log($file);
        
    }
}