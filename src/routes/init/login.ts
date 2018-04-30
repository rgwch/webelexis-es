import {autoinject} from 'aurelia-framework'
import {FhirService} from '../../services/fhirservice'

@autoinject
export class Login{

  constructor(private fhir:FhirService){}
  login(){
    this.fhir.init()
  }
}