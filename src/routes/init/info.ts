import {Config} from '../../config'
import { autoinject } from 'aurelia-framework';

@autoinject
export class Info{
    private server={}
    constructor(private cfg:Config){}

    attached(){
        this.server=this.cfg.globals.server
    }
}