/************************************************************
 * This file is part of Webelexis(tm)
 * Copyright (c) 2018 by G. Weirich
 * 
 * Webelexis is licensed under the terms of the included
 * LICENSE file.
 *************************************************************/
import { Session } from '../services/session'
import { autoinject } from 'aurelia-framework';
/** 
 * Decide whether a route should be displayed in the menu or not.
 * if the Route has an assiciated RoleId: Check, if currentRoles contain this RoleId.
 * If there is no user logged-in, show only routes without RoleId.
*/

@autoinject
export class RouteFilterValueConverter {

  constructor(private session: Session) { }

  public toView(routes) {
    return routes.filter(route => {
      let doShow=false;
      if (route.settings && route.settings.authRole) {
        doShow=this.session.hasRole(route.settings.authRole)
      } else {
        doShow=true;
      }
      return doShow;
    });
  }
}
