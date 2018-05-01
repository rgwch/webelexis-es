import {Router} from 'aurelia-router';
import {bindable,autoinject} from 'aurelia-framework';
import {Config} from './config'

@autoinject
export class Navbar{
    @bindable public navrouter:Router;

    constructor(private cfg:Config){}
}