import {inject} from "aurelia-framework";
import {Validator} from './validator'
import {FHIRobject} from '../models/fhirobj'
import {FHIR_Resource} from "../models/fhir";
import 'fhirclient'
declare const FHIR;

export interface BundleResult {
  status: "ok" | "error"
  message?: string
  values?: Array<FHIRobject>
  count: number
  links?: Array<any>

}

export class FhirService{
  private smart=null;

  public init(){
    FHIR.oauth2.authorize(
      {
        client: {

          client_id: 'ch.webelexis.apps.sample.001',
          scope: 'fhir',
          redirect_uri: "http://localhost:9000/#/auth"
        },
        server: "http://localhost:8380/fhir"
      }) 
  }

  public getSmartclient():Promise<boolean>{
    return new Promise((resolve,reject)=>{
      FHIR.oauth2.ready(smart=>{
        this.smart=smart;
        resolve(true);
      });
    })

  }

}