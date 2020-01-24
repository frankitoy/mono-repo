import { Title } from '@angular/platform-browser';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RoutesPartsService, ThemeService } from '@shared';

import { environment } from '../environments/environment';

@Component({
  selector: 'mr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  private _ngUnsubscribe: Subject<void> = new Subject<void>();

  appTitle = environment.appName;
  pageTitle = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private routePartsService: RoutesPartsService,
    private themeService: ThemeService,
    private title: Title
  ) { }

  ngOnInit() {
    this._changePageTitle();
  }

  ngOnDestroy() {
    this._ngUnsubscribe.next();
    this._ngUnsubscribe.complete();
  }

  ngAfterViewInit() {
    this.themeService.applyMatTheme(this.renderer);
  }

  private _changePageTitle(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(_ => {
        const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
        if (!routeParts.length) {
          return this.title.setTitle(this.appTitle);
        }

        this.pageTitle = routeParts
          .reverse()
          .map((part) => part.title )
          .reduce((partA, partI) => `${partA} > ${partI}`);

        this.pageTitle += ` | ${this.appTitle}`;
        this.title.setTitle(this.pageTitle);
    });
  }
}
