/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/

import {Session} from '../../services/session'
import { autoinject } from 'aurelia-framework';
import {Validator} from '../../services/validator'
import { FhirBundle, FHIR_Patient } from '../../models/fhir';
import { Patient, PatientFactory} from '../../models/patient'
type sortfield="lastName"|"firstName"|"birthDate"
type sortmode="asc"|"desc"

@autoinject
export class Search{
    searchexpr="";
    searchterm="Name oder Vorname"
    patients:Array<Patient>
    actPatient:Patient;
    
    sortField: sortfield ="lastName";
    sortMode: sortmode="desc"
    field1="clickable"
    field2="clickable"
    field3="clickable"

    constructor(private pf:PatientFactory, private session:Session){
        
    }
    doSearch(){
        console.log("looking for "+this.searchexpr)
        this.session.getSmartClient().api.search({type: "Patient", query: {name: this.searchexpr}}).then(results=>{
            let result=Validator.checkFHIRBundle(results.data as FhirBundle, this.pf)
            this.patients=this.doSort(result.values as Array<Patient>,this.sortField)
        })
    }

    selectPatient(index:number){
        this.actPatient=this.patients[index]
    }

    isSelected(field){
      if(field===this.sortField){
        return true;
      }
    }
   
    sort(field:sortfield){
      this.patients=this.doSort(this.patients,field)
    }

    doSort(arr:Array<Patient>,field:sortfield):Array<any>{
      this.sortField=field;
      this.field1=this.field2=this.field3="clickable";
      switch(field){
        case "firstName": 
          this.field2="clickable selected"
          return arr.sort((a:Patient,b:Patient)=>a.firstName[0].localeCompare(b.firstName[0]));

    
        case "lastName":
          this.field1="clickable selected" 
          return arr.sort((a:Patient,b:Patient)=>a.lastName[0].localeCompare(b.lastName[0])); 

        case "birthDate": 
          this.field3="clickable selected";
          return arr.sort((a:Patient,b:Patient)=>{
          return (a.fhir as FHIR_Patient).birthDate.localeCompare((b.fhir as FHIR_Patient).birthDate)
        })
      }
    }
}