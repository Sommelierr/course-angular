import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { UserComponent } from './user/user.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { BookCollectionDetailsComponent } from './book-collection-details/book-collection-details.component';
import { AlcoholCollectionDetailsComponent } from './alcohol-collection-details/alcohol-collection-details.component';
import { EditCollectionComponent } from './collection-edit/collection-edit.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { AlcoholCreateComponent } from './alcohol-create/alcohol-create.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditComponent } from './book-edit/book-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user/:userId', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
  { path: 'user/:userId/cc', component: CreateCollectionComponent},
  { path: 'user/:userId/:collectionType/b/:collectionId', component: BookCollectionDetailsComponent},
  { path: 'user/:userId/:collectionType/a/:collectionId', component: AlcoholCollectionDetailsComponent},
  { path: 'user/:userId/:collectionType/:collectionId/edit', component: EditCollectionComponent},
  { path: 'user/:userId/:collectionType/b/:collectionId/createBook', component: BookCreateComponent},
  { path: 'user/:userId/:collectionType/a/:collectionId/createAlcohol', component: AlcoholCreateComponent},
  { path: 'user/:userId/:collectionType/b/:collectionId/:bookId', component: BookDetailsComponent},
  { path: 'user/:userId/:collectionType/b/:collectionId/:bookId/edit', component: BookEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }