import { bindable } from "aurelia-framework";
import { FhirObjectFactory, FHIRobject } from "../models/fhirobj";
import { FhirService } from "../services/fhirservice";

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

export class ItemList{
  @bindable definition:ItemListDef
  private searchexpr:string
  private values:Array<FHIRobject>
  private sortField;
  constructor(private fhir:FhirService){
    this.sortField=0
  }

  exec(){
    this.fhir.filter(this.definition.factory,this.definition.query(this.searchexpr)).then(values=>{
      this.values=this.doSort(values)
    })
  }

  doSort(values:Array<FHIRobject>):Array<FHIRobject>{
    return values.sort(this.definition.fields[this.sortField].sorter)
  }
}