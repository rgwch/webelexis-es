import {autoinject} from 'aurelia-framework'
import {FhirService} from '../../services/fhirservice'

@autoinject
export class Ready{
  private loggedin="no";

  constructor(private fhir:FhirService){}

  async activate(){
    let result=await this.fhir.getSmartclient();
    this.loggedin=result ? "yes":"no"
  }
}