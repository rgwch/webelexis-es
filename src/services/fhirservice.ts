/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/
import { autoinject } from "aurelia-framework";
import { Validator } from './validator'
import { FHIRobject, FhirObjectFactory } from '../models/fhirobj'
import { FHIR_Resource, FhirBundle } from "../models/fhir";
import { HttpClient } from 'aurelia-http-client';
import { Config } from "../config"

import 'fhirclient'
declare const FHIR;

export interface BundleResult {
  status: "ok" | "error"
  message?: string
  values?: Array<FHIRobject>
  count: number
  links?: Array<any>

}
/**
 * This class handles all interactions with the Smart-On-Fhir library and the FHIR server.
 */
@autoinject
export class FhirService {
  private smart = null;

  constructor(private cfg: Config, private http: HttpClient) { }

  /**
   * retrieve server metadata (https://www.hl7.org/fhir/http.html#capabilities)
   * @param server_uri 
   */
  public metadata(server_uri): Promise<any> {
    console.log("metadata for " + server_uri)
    return this.http.get(server_uri + "/metadata?_format=application/fhir+json").then(response => {
      return JSON.parse(response.content)
    })
  }

  /**
   * Initialize a Smart-On-FHIR session. The oauth2-Framework will redirect to the client_redirect address
   * after successful authentication and authorization.
   * @param server_uri 
   */
  public init(server_uri: string) {
    FHIR.oauth2.authorize(
      {
        client: {

          client_id: this.cfg.get("client_id"),
          scope: 'fhir',
          redirect_uri: this.getBaseURL() + this.cfg.get("client_redirect")
        },
        server: server_uri
      })
  }

  getBaseURL() {
    let ret = window.location.href
    let pos = ret.search(window.location.hash)
    if (pos > -1) {
      ret = ret.substring(0, pos)
    }
    return ret;
  }

  /**
   * Fetch the SmartClient. This will only work after successful autentication and authorization,
   * e.g. by a previous call to init() (see above)
   */
  public getSmartclient(): Promise<any> {
    return new Promise((resolve, reject) => {
      FHIR.oauth2.ready(smart => {
        this.smart = smart;
        resolve(smart);
      });
    })

  }

  /**
   * search the FHIR server for a given datatype and convert the result to an
   * array of FHIRobjects
   * 
   * @param factory the factory for the queried FHIRobject subtype (see src/models/*)
   * @param query a query (form depends of the queried type, see FHIR documentation)
   */
  public async filter(factory: FhirObjectFactory, query): Promise<Array<FHIRobject>> {
    if(this.smart==null){
      let sm=await this.getSmartclient()
    }
    return this.smart.api.search({ type: factory.subtype, query: query }).then(results => {
      let result = Validator.checkFHIRBundle(results.data as FhirBundle, factory)
      return result.values;
    })
  }

}