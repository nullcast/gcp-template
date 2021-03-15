import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ButtonComponent } from './component/atom/button/button.component';
import { CheckboxComponent } from './component/atom/checkbox/checkbox.component';
import { LoadingComponent } from './component/atom/loading/loading.component';
import { OptionComponent } from './component/atom/option/option.component';
import { SelectComponent } from './component/atom/select/select.component';
import { TextComponent } from './component/atom/text/text.component';
import { TextareaComponent } from './component/atom/textarea/textarea.component';
import { ModalComponent } from './component/modal/modal.component';
import { CheckboxGroupComponent } from './component/molecule/checkbox-group/checkbox-group.component';
import { RadioGroupComponent } from './component/molecule/radio-group/radio-group.component';

import { BatchComponent } from './admin/component/page/batch/batch.component';
import { FormComponent } from './component/page/form/form.component';
import { IndexComponent } from './component/page/index/index.component';
import { ModalLayoutComponent } from './component/template/modal-layout/modal-layout.component';
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { SentryService } from './service/sentry.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoadingComponent,
    FormComponent,
    TextComponent,
    TextareaComponent,
    SelectComponent,
    ButtonComponent,
    RadioGroupComponent,
    CheckboxGroupComponent,
    CheckboxComponent,
    ModalComponent,
    ModalLayoutComponent,
    OptionComponent,
    BatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, environment.firebase.projectId),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: SentryService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
