export const STORAGE="ch.webelexis.v3"

export interface AppData{
  server_url?:string
}

export class Config {

  public setString(name: string, value:string){
    const store=this.loadStore();    
    store[name]=value;
    localStorage.setItem(STORAGE,JSON.stringify(store))
  }

  public getString(name:string):string{
    const store=this.loadStore()
    return store[name]
  }

  public removeString(name:string){
    const store=this.loadStore()
    delete store[name]
    localStorage.setItem(STORAGE,JSON.stringify(store))
  }

  public get(name: string): string {
    return(this.prefs[name] || this.prefs["default_"+name])
  }

  public loadStore():AppData{
    try{
      return JSON.parse(localStorage.getItem(STORAGE)) || {}
    }catch(ex){
      console.log("invalid store")
      return <AppData>{} 
    }
  }
  prefs = {
      default_client_id: "ch.webelexis.aurelia.v3",
      default_client_redirect: "#/auth",
      default_server_url: "http://localhost:8380/fhir"
  }

  public globals = {
    server:null,
    smart:null,
    currentRoles:["patient","mpa","doctor"]
  }
}
