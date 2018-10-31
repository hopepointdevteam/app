import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalService } from '../_services'

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html'
})

export class ModalComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    ministry: any;

    constructor(private modalService: ModalService) { 
    }

    ngOnInit() {
      setTimeout(() => {
        this.ministry = this.modalService.getMinistry()
        console.log(this.ministry)
      }, 2000)
      
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}