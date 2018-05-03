import {Router} from 'aurelia-router';
import {bindable,autoinject} from 'aurelia-framework';

@autoinject
export class Navbar{
    @bindable navrouter:Router;

}