import {DialogController} from 'aurelia-dialog'
import {autoinject} from 'aurelia-framework'

@autoinject
export class SelectServer{
  private url:string
 
  constructor(private controller:DialogController){}

  activate(params){
    this.url=params.url
  }
}