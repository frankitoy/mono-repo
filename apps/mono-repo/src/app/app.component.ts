import { Title } from '@angular/platform-browser';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ThemeService } from '@shared';

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

    public title: Title,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private renderer: Renderer2,
    // private routePartsService: RoutePartsService,
    private themeService: ThemeService,
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
        const routeParts = [];
        // const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
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
