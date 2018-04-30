import {Router, RouterConfiguration} from 'aurelia-router'
export class App {
  public configureRouter(config:RouterConfiguration, router: Router){
    config.map([
      {
        route: "",
        name: "login",
        moduleId: 'routes/init/login',
        title: "Log in"
      },{
        route: "auth",
        moduleId: "routes/init/ready",
        name:"auth",
        title: "Ready"
      }
    ])
  }
}
