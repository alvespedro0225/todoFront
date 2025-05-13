import { Injectable } from '@angular/core';
import { cacheData } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}

  private cache = sessionStorage;
  set(key: string, value: any, storageTime: number = 300) {
    const now = Date.now();
    let object: cacheData = {
      data: value,
      expiration: now + storageTime * 1000,
      creation: now,
    };
    this.cache.setItem(key, JSON.stringify(object));
  }

  get<T>(key: string): T | null {
    const value = this.cache.getItem(key);

    if (!value) return null;

    const object = JSON.parse(value) as cacheData;

    if (object.expiration <= Date.now()) {
      this.delete(key);
      return null;
    }

    return object.data as T;
  }

  private delete(key: string) {
    this.cache.removeItem(key);
  }
  clear() {
    this.cache.clear();
  }
}
