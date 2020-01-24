import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { RoutePart } from '../models/route-part.model';

@Injectable({
  providedIn: 'root'
})
export class RoutesPartsService {

  generateRouteParts(snapshot: ActivatedRouteSnapshot): RoutePart[] {
    let routeParts: RoutePart[] = [];
    if (snapshot) {

      if (snapshot.firstChild) {
        routeParts = routeParts.concat(this.generateRouteParts(snapshot.firstChild));
      }

      if (snapshot.data['title'] && snapshot.url.length) {
        routeParts.push({
          title: snapshot.data['title'],
          breadcrumb: snapshot.data['breadcrumb'],
          url: snapshot.url[0].path,
          urlSegments: snapshot.url,
          params: snapshot.params
        });
      }
    }
    return routeParts;

  }
}
