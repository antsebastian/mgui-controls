import {EventEmitter, Injectable, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, of, Operator, pipe, Subject, Subscriber, TeardownLogic} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import {catchError, first, map, tap, throttleTime} from 'rxjs/operators';
import { debug } from 'util';


// https://stackoverflow.com/questions/12844893/is-it-possible-to-use-getters-setters-in-typescript-interfaces
// https://github.com/Microsoft/TypeScript/issues/15247


@Injectable()
export abstract class CRUDService<T> {

  abstract getItems(): Observable<T[]>;

  abstract addItems(items: T[]);

  abstract addItem(item: T);

  abstract deleteItem(item: T);

}

export class CRUDBehaviourService<T> extends CRUDService<T>{

  private itemsSubject = new BehaviorSubject<T[]>([]);
  private _items = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  /*
 notes on cloning - cloning is done to keep the service from calling next multiple times,
 the idea 1) is clone the array, make changes to all elements and call next once.
          2) cloning the array keeps consumers from changing objects with out notifying 3rd party subscribers.
 BUT - The view has to re-init all elements every call, which is performance issue.

    private cloneItems() {
      return _.cloneDeep(this.itemsSubject.getValue());
    }
  */

  // TODO: add a way to to batch updates and then call next for CRUD edits, maybe IEditable
  // add load file method

  addItem(item: T) {
    this.itemsSubject.getValue().push(item);
//    const items = this.cloneItems();
//    items.push(_.cloneDeep(item));
    this.itemsSubject.next(this.itemsSubject.getValue());
  }

  compare(obj1: T, obj2: T) : boolean {
    const ret = obj1 === obj2;
    console.debug(`${obj1}, ${obj2} ${ret}` );
    return ret;
  }

  deleteItem(deleteItem: T) {
//    const items = this.cloneItems();
    _.remove(this.itemsSubject.getValue(), item => this.compare(item, deleteItem));
    this.itemsSubject.next(this.itemsSubject.getValue());
    console.debug(JSON.stringify(this.itemsSubject.getValue()) );

  }

  addItems(items: T[]) {

  }

  getItems() {
    return this._items;
  }
}

export class Contact {

  firstName: string;
  avatarFileName: string;
  largeAvatarFileName: string;
  description: string;
  largeDescription: string;

  constructor() {
  }
}

export class ContactsMockService extends CRUDService<Contact> {

  private itemsSubject = new BehaviorSubject<Contact[]>([]);
  private _items = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    super();
    const contacts$ = this.http.get<Contact[]>('../assets/starwars/contactlist.mockdata.json');

    console.log('contact ');
    contacts$.pipe(first())
      .subscribe((contacts) => {
        contacts.forEach((c) => {
          c.avatarFileName = '../assets/starwars/' + c.avatarFileName;
          c.largeAvatarFileName = '../assets/starwars/' + c.largeAvatarFileName;

          this.itemsSubject.getValue().push(c);
        });
        this.itemsSubject.next(this.itemsSubject.getValue());
      }, (error) => {
        console.log(error.message);
      }, () => {
        console.log('completed');
      });


  }

  /*
 notes on cloning - cloning is done to keep the service from calling next multiple times,
 the idea 1) is clone the array, make changes to all elements and call next once.
          2) cloning the array keeps consumers from changing objects with out notifying 3rd party subscribers.
 BUT - The view has to re-init all elements every call, which is performance issue.

    private cloneItems() {
      return _.cloneDeep(this.itemsSubject.getValue());
    }
  */

  // TODO: add a way to to batch updates and then call next for CRUD edits, maybe IEditable

  addItem(item: Contact) {
    this.itemsSubject.getValue().push(item);
//    const items = this.cloneItems();
//    items.push(_.cloneDeep(item));
    this.itemsSubject.next(this.itemsSubject.getValue());
  }

  deleteItem(deleteItem: Contact) {
//    const items = this.cloneItems();
    _.remove(this.itemsSubject.getValue(), item => item.firstName === deleteItem.firstName);
    this.itemsSubject.next(this.itemsSubject.getValue());
  }

  addItems(items: Contact[]) {

  }

  getItems() {
    return this._items;
  }
}
