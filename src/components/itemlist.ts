/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/

import { bindable, autoinject } from "aurelia-framework";
import { FhirObjectFactory, FHIRobject } from "../models/fhirobj";
import { FhirService } from "../services/fhirservice";
import { EventAggregator } from "aurelia-event-aggregator";

export const SELECTED="ch.webelexis.itemlist.selected"

/**
 * An Itemlist ist a "GoldenHammer" display element for all kinds of FHIRobjects. Create a ItemListDef and 
 * bind it to a ItemList component that's all. For an example, see src/routes/patients/index.
 * Note: the custom element is named "item-list", see src/routes/patients/index.html.
 * 
 * If the user clicks on one of the list elements, fire a "SELECTED" event.
 */

export interface ItemListDef{
  fields:Array<{
    sorter: (a,b)=>number,
    name: string,
    field: string
  }>,
  placeholder:string
  factory:FhirObjectFactory
  label:(FHIRobject)=>string
  query: (filter:string)=>any
}

@autoinject
export class ItemList{

  @bindable definition:ItemListDef
  private searchexpr:string
  private values:Array<FHIRobject>
  private sortField;
  private classes={}

  constructor(private fhir:FhirService, private ea:EventAggregator){
    this.sortField=0
  }

  attached(){
       this.definition.fields.forEach(fld=>{this.classes[fld.field]="clickable"})
  }
  /**
   * This is called when the user hit enter on the search field. Send a query to the FhirService.
   * If the search field is empty or is a "*", convert ist to a "%"" to initiate a "match all" filter.
   */
  exec(){
    let s=this.searchexpr
    if(!s || s.length==0 || s==="*" || s==="?"){
      s="%"
    }
    this.fhir.filter(this.definition.factory,this.definition.query(s)).then(values=>{
      this.values=this.doSort(values)
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  }

  /**
   * Sort the list
   * @param field field on which to sort (as defined in the ItemListDef)
   */
  sort(field:string){
    this.definition.fields.forEach(fld=>{this.classes[fld.field]="clickable"})
    this.classes[field]="clickable selected"
    this.sortField=this.definition.fields.findIndex(f=>f.field===field)
    this.values=this.doSort(this.values)
  }
  doSort(values:Array<FHIRobject>):Array<FHIRobject>{
    return values.sort(this.definition.fields[this.sortField].sorter)
  }

  clicked(element){
    this.ea.publish(SELECTED,element)
  }
}