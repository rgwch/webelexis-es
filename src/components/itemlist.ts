import { bindable, autoinject } from "aurelia-framework";
import { FhirObjectFactory, FHIRobject } from "../models/fhirobj";
import { FhirService } from "../services/fhirservice";
import { EventAggregator } from "aurelia-event-aggregator";

export const SELECTED="ch.webelexis.itemlist.selected"


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
  exec(){
    let s=this.searchexpr
    if(!s || s.length==0 || s==="*" || s==="?"){
      s="%"
    }
    this.fhir.filter(this.definition.factory,this.definition.query(s)).then(values=>{
      this.values=this.doSort(values)
    })
  }

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