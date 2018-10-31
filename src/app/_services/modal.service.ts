import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ModalService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    private ministry: object

    constructor(private router: Router) {
        // clear alert message on route change
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    // only keep for a single location change
                    this.keepAfterNavigationChange = false;
                } else {
                    // clear alert
                    this.subject.next();
                }
            }
        });
    }

    setMinistry(ministry) {
      console.log(ministry)
      this.ministry = ministry
    }

    getMinistry() {
      return this.ministry
    }
}