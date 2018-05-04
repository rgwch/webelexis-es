/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/

 /**
  * Handle persistent values. We use the browser's LocalStorage by default. Thus, if
  * LocalStorage is turned off, persistence of configuration values such as server address
  * will not work.
  */
export const STORAGE="ch.webelexis.v3"

export interface AppData{
  server_url?:string
}

export class Config {

  /**
   * persist a named string

   * @param name 
   * @param value 
   */
  public setString(name: string, value:string){
    const store=this.loadStore();    
    store[name]=value;
    localStorage.setItem(STORAGE,JSON.stringify(store))
  }

  /**
   * retrieve a named string
   * @param name 
   */
  public getString(name:string):string{
    const store=this.loadStore()
    return store[name]
  }

  /**
   * delete a named string from persistence
   * @param name 
   */
  public removeString(name:string){
    const store=this.loadStore()
    delete store[name]
    localStorage.setItem(STORAGE,JSON.stringify(store))
  }

  public get(name: string): string {
    return(this.prefs[name] || this.prefs["default_"+name])
  }

  /**
   * load the PersistenceStore
   */
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
  }
}
