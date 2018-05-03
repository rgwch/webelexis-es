import { Router, RouterConfiguration, Redirect, Next, NavigationInstruction } from 'aurelia-router'
import { Session, User } from './services/session'
import 'bootstrap'
import { autoinject } from 'aurelia-framework';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router
    config.addAuthorizeStep(AuthorizeStep)
    config.map([
      {
        route: ["", "login"],
        name: "login",
        moduleId: 'routes/init/login',
        title: "Log in",
        nav: false
      }, {
        route: "auth",
        moduleId: "routes/init/ready",
        name: "auth",
        title: "Ready"
      }, {
        route: "patient",
        moduleId: "routes/patients/search",
        name: "patients",
        title: "Patienten",
        nav: true,
        settings: { authRole: "user" }
      },
      {
        route:"test",
        moduleId: "routes/patients/index",
        name: "Test",
        title: "Test",
        nav: true
      },
      {
        route: "info",
        moduleId: "routes/init/info",
        name: "info",
        title: "Info",
        nav: true,
        settings: { authRole: "user" }
      }
    ])
  }
}

@autoinject
class AuthorizeStep {

  constructor(private session: Session) { }
  run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
    console.log(navigationInstruction.config.name)
    if (navigationInstruction.config.name === 'login') {
      return next();
    }
    let neededRole = navigationInstruction.config.settings ? navigationInstruction.config.settings.authRole : null
    if (neededRole) {
      if (this.session.hasRole(neededRole)) {
        return next();
      } else {
        return next.cancel(new Redirect("login"))

      }
    } else {
      console.log("no authentication needed")
      return next()

    }
  }
}