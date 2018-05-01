export class Config {

  public get(name: string): string {
    return(this.prefs[name] || this.prefs["default_"+name])
  }

  prefs = {
      default_client_id: "ch.webelexis.aurelia.v3",
      default_client_redirect: "#/auth",
      default_server_url: "http://localhost:8380/fhir"
  }

  public globals = {
    server:null,
    smart:null
  }
}
