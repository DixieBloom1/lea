import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AlertComponent } from './alert/alert.component';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {


  isLoginMode = true;
  isLoading = false;
  private closeSub!: Subscription;
  alertHost: any;

  loginError = false;
  loginForm!: FormGroup;
  loginErrorMessage = '';
  error: any;
  email!: FormControl;
  password!: FormControl


  constructor(
    private formBuilder: FormBuilder,
    // private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) {}




    ngOnInit(){
     /*  this.email = new FormControl('', Validators.required)
      this.password = new FormControl('', Validators.required)
      this.loginForm = new FormGroup({
        email: this.email,
        password: this.password
      }); */
    }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }


  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password); //kada imamo return value of signup moramo napraviti subscribe()
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/main']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
        this.loginErrorMessage = `Wrong username and/or password`;
      }
    );

    form.reset();

  }



  onHandleError() {
    this.error = '';
  }

  private showErrorAlert(message: string) {
    //const alertComp = new AlertComponent(); //radi kao typescript kod, ali ne kao angular kod
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    if (this.alertHost) {
      const hostViewConstainerRef = this.alertHost.viewContainerRef;
    hostViewConstainerRef.clear();

    const componentRef = hostViewConstainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe(); // to remove component
      hostViewConstainerRef.clear();
    })
    }
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
