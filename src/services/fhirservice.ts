import {autoinject} from "aurelia-framework";
import {Validator} from './validator'
import {FHIRobject} from '../models/fhirobj'
import {FHIR_Resource} from "../models/fhir";
import {Config} from "../config"

import 'fhirclient'
declare const FHIR;

export interface BundleResult {
  status: "ok" | "error"
  message?: string
  values?: Array<FHIRobject>
  count: number
  links?: Array<any>

}
@autoinject
export class FhirService{
  private smart=null;

  constructor(private cfg:Config){}

  public init(){
    FHIR.oauth2.authorize(
      {
        client: {

          client_id: this.cfg.get("client_id"),
          scope: 'fhir',
          redirect_uri: this.cfg.get("client_redirect")
        },
        server: this.cfg.get("server_url")
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