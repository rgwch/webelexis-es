import {autoinject, noView} from 'aurelia-framework'
import {FhirService} from '../../services/fhirservice'
import {Config} from '../../config'

@autoinject
export class Ready{
  private loggedin="no";

  constructor(private fhir:FhirService, private cfg:Config){}

  async activate():Promise<any>{
    let result=await this.fhir.getSmartclient();
    this.cfg.globals.smart=result
    return result;
  }
}