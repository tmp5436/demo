import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SocialLoginComponent } from './components/social-login/social-login.component';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {ErrorInterceptor} from './helpers/error.interceptor';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {TokenInterceptor} from './helpers/token.interceptor';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { CategoriesComponent } from './components/categories/categories.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { CategoryComponent } from './components/category/category.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('132881880043-logcl1evsro58htse5k52chbcffm8fip.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('172744623957538')
  }
]);

export function provideConfig() {
  return config;
}

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'new-category', component: NewCategoryComponent},
  { path: 'categories', component: CategoriesComponent},
  { path: 'category/:id', component: CategoryComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    SocialLoginComponent,
    LoginComponent,
    ProfileComponent,
    NewCategoryComponent,
    CategoriesComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    RouterModule.forRoot(
      routes),
    FormsModule,
    InfiniteScrollModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: AuthServiceConfig, useFactory: provideConfig },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
