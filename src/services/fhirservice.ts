import {autoinject} from "aurelia-framework";
import {Validator} from './validator'
import {FHIRobject} from '../models/fhirobj'
import {FHIR_Resource} from "../models/fhir";
import {HttpClient} from 'aurelia-http-client';
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

  constructor(private cfg:Config, private http:HttpClient){}

  public metadata(server_uri):Promise<any>{
    console.log("metadata for "+server_uri)
    return this.http.get(server_uri+"/metadata?_format=application/fhir+json").then(response=>{
      return JSON.parse(response.content)
    })
  }
  public init(server_uri:string){
    FHIR.oauth2.authorize(
      {
        client: {

          client_id: this.cfg.get("client_id"),
          scope: 'fhir',
          redirect_uri: this.getBaseURL()+this.cfg.get("client_redirect")
        },
        server: server_uri
      }) 
  }

  getBaseURL(){
    let ret=window.location.href
    let pos=ret.search(window.location.hash)
    if(pos>-1){
      ret=ret.substring(0,pos)
    }
    return ret;
  }

  public getSmartclient():Promise<any>{
    return new Promise((resolve,reject)=>{
      FHIR.oauth2.ready(smart=>{
        this.smart=smart;
        resolve(smart);
      });
    })

  }

}