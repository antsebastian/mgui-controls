import { EventEmitter, Injectable, Output } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from, fromEvent, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { delay, map, mergeMap, switchMap, concatMap, take, first, concatAll, toArray, tap, share, shareReplay } from 'rxjs/operators';

@Injectable()
export class MguiImageResolverService implements Resolve<any> {

  constructor() { }

  loadImage(imagePath){
    return Observable.create((observer) => {
      var img = new Image();
      img.src = imagePath;
      img.onload = () => {
        observer.next(img);
        observer.complete();
      }
      img.onerror = (err) => {
        observer.error(err);
      }
    });
 }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return from(route.data.preloads).pipe(concatMap(this.loadImage)).pipe(toArray());
  }
}

