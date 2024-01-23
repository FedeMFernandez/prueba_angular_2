import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './commons/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingController } from './commons/components/loading/loading.controller';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {

  isLoading: boolean = false;
  loadingSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.loadingController.onLoading.subscribe((value) => this.isLoading = value);
    if (this.authService.loggedIn) {
      this.router.navigate(['shopping']);
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
}
