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

import { AccountFirestoreRepository, IAccountRepository } from 'domain/account/repository';
import { AccountDomainService } from 'domain/account/service/account-domain.service';
import {
  ActionFirestoreRepository,
  ActionPropertyFirestoreRepository,
  UserActionPropertyFirestoreRepository
} from 'domain/action/repository';
import { IActionPropertyRepository } from 'domain/action/repository/action-property.repository';
import { IActionRepository } from 'domain/action/repository/action.repository';
import { IUserActionPropertyRepository } from 'domain/action/repository/user-action-property.repository';
import { ActionDomainService } from 'domain/action/service/action-domain.service';
import { ActionPropertyDomainService } from 'domain/action/service/action-property-domain.service';
import { IUserChangelogRepository, IUserServicePropertyChangelogRepository } from 'domain/changelog';
import { IUserActionPropertyChangelogRepository } from 'domain/changelog/repository/user-action-property-changelog.repository';
import { ChangelogDomainService } from 'domain/changelog/service/changelog-domain.service';
import {
  QuestionnaireFirestoreRepository,
  QuestionnairePropertyFirestoreRepository,
  UserQuestionnaireFirestoreRepository,
  UserQuestionnairePropertyFirestoreRepository
} from 'domain/questionnaire';
import { IQuestionnairePropertyRepository } from 'domain/questionnaire/repository/questionnaire-property.repository';
import { IQuestionnaireRepository } from 'domain/questionnaire/repository/questionnaire.repository';
import { IUserQuestionnairePropertyRepository } from 'domain/questionnaire/repository/user-questionnaire-property.repository';
import { IUserQuestionnaireRepository } from 'domain/questionnaire/repository/user-questionnaire.repository';
import { QuestionnaireDomainService } from 'domain/questionnaire/service/questionnaire-domain.service';
import { QuestionnairePropertyDomainService } from 'domain/questionnaire/service/questionnaire-property-domain.service';
import { ServiceFirestoreRepository } from 'domain/service';
import { IServiceRepository } from 'domain/service/repository/service.repository';
import { ServiceDomainService } from 'domain/service/service/service-domain.service';
import { ChildFirestoreRepository, IUserRepository, UserFirestoreRepository } from 'domain/user/repository';
import { IChildRepository } from 'domain/user/repository/child.repository';
import { UserDomainService } from 'domain/user/service/user-domain.service';
import { FirestoreService } from 'frontend/lib/service/gcp/firestore.service';
import { IFirestoreService } from 'gcp/service/firestore.service';
import { IndexComponent } from './component/page/index/index.component';
import { ModalLayoutComponent } from './component/template/modal-layout/modal-layout.component';
import { CustomInterceptor } from './interceptor/custom.interceptor';
import { SentryService } from './service/sentry.service';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoadingComponent,
    TextComponent,
    TextareaComponent,
    SelectComponent,
    ButtonComponent,
    RadioGroupComponent,
    CheckboxGroupComponent,
    CheckboxComponent,
    ModalComponent,
    ModalLayoutComponent,
    OptionComponent
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
    },
    {
      provide: IFirestoreService,
      useClass: FirestoreService
    },
    {
      provide: AccountDomainService,
      useFactory: (accountRepository: IAccountRepository) => new AccountDomainService(accountRepository),
      deps: [IAccountRepository]
    },
    {
      provide: IAccountRepository,
      useFactory: (firestoreService: IFirestoreService) => new AccountFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: ActionDomainService,
      useFactory: (actionRepository: IActionRepository, actionPropertyDomainService: ActionPropertyDomainService) =>
        new ActionDomainService(actionRepository, actionPropertyDomainService),
      deps: [IActionRepository, ActionPropertyDomainService]
    },
    {
      provide: ActionPropertyDomainService,
      useFactory: (propertyRepository: IActionPropertyRepository, userPropertyRepository: IUserActionPropertyRepository) =>
        new ActionPropertyDomainService(propertyRepository, userPropertyRepository),
      deps: [IActionPropertyRepository, IUserActionPropertyRepository]
    },
    {
      provide: IActionRepository,
      useFactory: (firestoreService: IFirestoreService) => new ActionFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: IActionPropertyRepository,
      useFactory: (firestoreService: IFirestoreService) => new ActionPropertyFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: IUserActionPropertyRepository,
      useFactory: (firestoreService: IFirestoreService) => new UserActionPropertyFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: ChangelogDomainService,
      useFactory: (
        userActionPropertyChangelogRepository: IUserActionPropertyChangelogRepository,
        userServicePropertyChangelogRepository: IUserServicePropertyChangelogRepository,
        userChangelogRepository: IUserChangelogRepository
      ) =>
        new ChangelogDomainService(userActionPropertyChangelogRepository, userServicePropertyChangelogRepository, userChangelogRepository),
      deps: [IUserActionPropertyChangelogRepository, IUserServicePropertyChangelogRepository, IUserChangelogRepository]
    },
    {
      provide: QuestionnaireDomainService,
      useFactory: (
        questionnaireRepository: IQuestionnaireRepository,
        userQuestionnaireRepository: IUserQuestionnaireRepository,
        questionnairePropertyDomainService: QuestionnairePropertyDomainService
      ) => new QuestionnaireDomainService(questionnaireRepository, userQuestionnaireRepository, questionnairePropertyDomainService),
      deps: [IQuestionnaireRepository, IUserQuestionnaireRepository, QuestionnairePropertyDomainService]
    },
    {
      provide: QuestionnairePropertyDomainService,
      useFactory: (propertyRepository: IQuestionnairePropertyRepository, userPropertyRepository: IUserQuestionnairePropertyRepository) =>
        new QuestionnairePropertyDomainService(propertyRepository, userPropertyRepository),
      deps: [IQuestionnairePropertyRepository, IUserQuestionnairePropertyRepository]
    },
    {
      provide: IQuestionnairePropertyRepository,
      useFactory: (firestoreService: IFirestoreService) => new QuestionnairePropertyFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: IUserQuestionnairePropertyRepository,
      useFactory: (firestoreService: IFirestoreService) => new UserQuestionnairePropertyFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: IQuestionnaireRepository,
      useFactory: (firestoreService: IFirestoreService) => new QuestionnaireFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: IUserQuestionnaireRepository,
      useFactory: (firestoreService: IFirestoreService) => new UserQuestionnaireFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: ServiceDomainService,
      useFactory: (serviceRepository: IServiceRepository) => new ServiceDomainService(serviceRepository),
      deps: [IServiceRepository]
    },
    {
      provide: IServiceRepository,
      useFactory: (firestoreService: IFirestoreService) => new ServiceFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: UserDomainService,
      useFactory: (userRepository: IUserRepository, childRepository: IChildRepository) =>
        new UserDomainService(userRepository, childRepository),
      deps: [IUserRepository, IChildRepository]
    },
    {
      provide: IUserRepository,
      useFactory: (firestoreService: IFirestoreService) => new UserFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    },
    {
      provide: IChildRepository,
      useFactory: (firestoreService: IFirestoreService) => new ChildFirestoreRepository(firestoreService),
      deps: [IFirestoreService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
