export class Config {

  public get(name: string): string {
    return(this.prefs[name] || this.prefs["default_"+name])
  }

  prefs = {
      default_client_id: "ch.webelexis.apps.sample.001",
      default_client_redirect: "http://localhost:9000/#/auth",
      default_server_url: "http://localhost:8380/fhir"
  }
}