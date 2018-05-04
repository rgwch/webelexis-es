/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/

import {FhirBundle, FHIR_Resource, FHIR_Patient, FHIR_ResourceEntry} from "../models/fhir";
import {FHIRobject, FhirObjectFactory} from "../models/fhirobj";
import {BundleResult} from "./fhirservice";


/**
 * The validator takes an object as received from a REST call and apply various checks and actions to that
 * object (which can be a JSON object or a String parseable to a JSON object)
 */
export class Validator {

  /**
   * Check a FHIRBundle for validity and return a BundleResult with the contents 
   * of that Bundle (values converted to FHIRobjects) or an error message.
   * 
   * @param check  the String or JSON object to check
   * @param factory a factory for the expected FHIRobject type
   */
  static checkFHIRBundle(check: string | FhirBundle, factory: FhirObjectFactory): BundleResult {
    var ans: FhirBundle
    if (typeof check == "string") {
      try {
        ans = JSON.parse(check as string)
      } catch (error) {
        console.log(error)
        return <BundleResult>{"status": "error", "message": "invalid json", count: 0}
      }
    } else {
      ans = check as FhirBundle
    }
    if (ans["resourceType"] !== "Bundle") {
      return <BundleResult>{
        "status" : "error",
        "message": "Bad or missing resourceType " + JSON.stringify(ans),
        count    : 0
      }
    }
    if (ans["type"] !== "searchset") {
      return <BundleResult>{"status": "error", "message": "Bad response from server", count: 0}
    }
    return <BundleResult>{
      "status": "ok",
      values  : ans.total==0 ? [] : ans.entry.map(obj => factory.createObject(obj.resource)),
      count   : ans.total,
      links   : ans.link
    }
  }

  /**
   * Retrieve an array safely (i.e. don't throw an exception if the object or the array does not exist)
   * @param fhir the fhirobject from which we want to read an array
   * @param name name of the array
   * @returns a (possibly empty) array, but never null or undefined
   */
  static getArray(fhir: any, name: string): Array<any> {
    if (fhir == undefined || name == undefined || fhir == null || name == null) {
      return []
    } else {
      var ret = fhir[name]
      return ret == null ? [] : ret
    }
  }

  /**
   * Retrieve a subobject safely (i.e. don't throw an expetion if the object or the subobjct does not exist)
   * @param fhir the parent fhirobject
   * @param name the nam of the subobject
   * @returns a possibly empty object, but never null or undefined
   */
  static getSubobject(fhir: any, name: string) {
    if (fhir == undefined || name == undefined || fhir == null || name == null) {
      return {}
    } else {
      var ret = fhir[name]
      return ret == null ? {} : ret
    }
  }

  /**
   * Retrieve a String safely (i.e. don't throw an expetion if the object or the string does not exist)
   * @param fhir the parent FHIR
   * @param name the name of the String
   * @returns a possibly empty string, but never null or undefined
   */
  static getString(fhir: any, name: string): String {
    if (fhir == undefined || name == undefined || fhir == null || name == null) {
      return ""
    } else {
      var ret = fhir[name]
      return ret == null ? "" : ret
    }
  }

  /**
   * Retrieve a number safely (i.e. don't throw an expetion if the object or the number does not exist)
   * @param fhir the parent Fhir object
   * @param name the name of the number element to retrieve.
   * @returns a number which is 0 in all undefined cases.
   */
  static getNumber(fhir: any, name: string): Number {
    if (fhir == undefined || name == undefined || fhir == null || name == null) {
      return 0
    } else {
      var ret = fhir[name]
      return ret == null ? 0 : ret
    }
  }


}
