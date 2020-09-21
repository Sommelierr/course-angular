import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BookCollectionDetailsComponent } from './book-collection-details/book-collection-details.component';
import { AlcoholCollectionDetailsComponent } from './alcohol-collection-details/alcohol-collection-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AlcoholDetailsComponent } from './alcohol-details/alcohol-details.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { UserComponent } from './user/user.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { EditCollectionComponent } from './collection-edit/collection-edit.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { MatFormFieldModule} from '@angular/material/form-field'
import {MatChipsModule} from '@angular/material/chips';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { BookEditComponent } from './book-edit/book-edit.component';
import { AlcoholEditComponent } from './alcohol-edit/alcohol-edit.component';
import {MatButtonModule} from '@angular/material/button';
import { AlcoholCreateComponent } from './alcohol-create/alcohol-create.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    UserComponent,
    CreateCollectionComponent,
    BookCollectionDetailsComponent,
    AlcoholCollectionDetailsComponent,
    EditCollectionComponent,
    BookCreateComponent,
    AlcoholCreateComponent,
    BookDetailsComponent,
    AlcoholDetailsComponent,
    BookEditComponent,
    AlcoholEditComponent
    
  ],
  imports: [
    MatFormFieldModule,
    MatChipsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
