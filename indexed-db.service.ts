/**
 * @author :Prajith R.
 * @prajith_ram
 * IndexedDB service class. 
 * An IndexedDB Wrapper as Service for Angualr Projects. 
 * This simple typescript class whch can be copied to your Angualr projects and Inject as a service to create and manage IndexedDB.
 */
import { Injectable } from '@angular/core';
import {Observable,of,Observer} from 'rxjs';
import { first, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {

  constructor() { 

  }
  /**
   * init your indexedDB here. Create DB, ObjectStore and Indexes.
   * Change below code to create yourown DB
   */
  public initIdxDB(){
      console.log("IndexedDBService:initIdxDB()")
      let idxDB=indexedDB.open("<<DBNAme>>",1)
      idxDB.onupgradeneeded=function(){
          console.log("IndexedDBService:initIdxDB():Initiallizing IndexedDB")
          let db=idxDB.result;
          db.createObjectStore("<<ObjectStoreName>>",{keyPath:'id',autoIncrement:true})
          .createIndex("<<IndexName>>",'<<IndexKey in your obectstore>>')
      }
      idxDB.onsuccess=function(){
        console.log("IndexedDBService:initIdxDB():sucess")
      }
      idxDB.onerror=function(){
        console.log("IndexedDBService:initIdxDB():error")
      }
  }
  /**
   * Add Objects to store
   * @param stroreName Storeobjects in given store. If No DB DB will created with all required stores
   * @param objectItem 
   */
  public  storeObject(stroreName:string,objectItem:{}){
    console.log("IndexedDBService:storeObject()")
        let idxDB=indexedDB.open("<<DBNAme>>")
        idxDB.onerror=function(){
          console.log("IndexedDBService:storeObject(): error")
        }
        idxDB.onsuccess=function(){
          let db=idxDB.result
          let transactionreq=db.transaction(stroreName,'readwrite')//start transaction
          let idxStore=transactionreq.objectStore(stroreName)
          let tranreq=idxStore.add(objectItem)
          tranreq.onsuccess=function(){
            console.log("idx Transaction sucess:"+tranreq.result)
            db.close()
          }
          tranreq.onerror=function(){}
            console.log("idx Transaction error:"+tranreq.error)
            db.close()
        }
  }//storeItem
  /**
   * Get Items in a Store by Key
   * @param stroreName 
   * @param key 
   */
  public getStoreItemByKey(stroreName:string,key:any){
      return new Observable<any>((Observer)=>{
          let idxDB=indexedDB.open("<<DBNAme>>").onsuccess=function(){
                let db=this.result
                let transactionreq=db.transaction(stroreName,'readonly')
                let idxStore=transactionreq.objectStore(stroreName)
                idxStore.get(key).onsuccess=function(val){
                  Observer.next(JSON.stringify(this.result))
                }
           }
      }).pipe(take(1));
  }
  /**
   * Get Items in a store using KeyRange
   * @param stroreName 
   * @param keyRange 
   */

  public getStoreItemByKeyRange(stroreName:string,keyRange:IDBKeyRange){
    return new Observable<any>((Observer)=>{
        let idxDB=indexedDB.open("<<DBNAme>>").onsuccess=function(){
              let db=this.result
              let transactionreq=db.transaction(stroreName,'readonly')
              let idxStore=transactionreq.objectStore(stroreName)
              idxStore.getAll(keyRange).onsuccess=function(val){
                Observer.next(JSON.stringify(this.result))
              }
         }
    }).pipe(take(1));
  }
  /**
   * Get All Items in a Store 
   * @param stroreName 
   */
  public getStoreAllItem(stroreName:string){
    return new Observable<any>((Observer)=>{
        let idxDB=indexedDB.open("<<DBNAme>>").onsuccess=function(){
              let db=this.result
              let transactionreq=db.transaction(stroreName,'readonly')
              let idxStore=transactionreq.objectStore(stroreName)
              idxStore.getAll().onsuccess=function(val){
                Observer.next(JSON.stringify(this.result))
              }
         }
    }).pipe(take(1));
  }
  /**
   * get All Items from store specifed index by IDBKeyRange
   * @param stroreName 
   * @param indexName 
   * @param inxedkeyRange 
   */
  public getStoreItemByIndexKeyRange(stroreName:string,indexName:string,inxedkeyRange:IDBKeyRange){
    return new Observable<any>((Observer)=>{
        let idxDB=indexedDB.open("<<DBNAme>>").onsuccess=function(){
              let db=this.result
              let transactionreq=db.transaction(stroreName,'readonly')
              let idxStoreIndex=transactionreq.objectStore(stroreName).index(indexName)
              idxStoreIndex.getAll(inxedkeyRange).onsuccess=function(val){
                Observer.next(JSON.stringify(this.result))
              }
         }
    }).pipe(take(1));
  }

  /**
   * Get all item from store for specified Index.
   * @param stroreName 
   * @param indexName 
   */

  public getStoreItemByIndexAll(stroreName:string,indexName:string){
    return new Observable<any>((Observer)=>{
        let idxDB=indexedDB.open("<<DBNAme>>").onsuccess=function(){
              let db=this.result
              let transactionreq=db.transaction(stroreName,'readonly')
              let idxStoreIndex=transactionreq.objectStore(stroreName).index(indexName)
              idxStoreIndex.getAll().onsuccess=function(val){
                Observer.next(JSON.stringify(this.result))
              }
         }
    }).pipe(take(1));
  }

/**
 * Get All keys for a store
 * @param stroreName 
 */

  public getStorekeys(stroreName:string){
    return new Observable<any>((Observer)=>{
        let idxDB=indexedDB.open("<<DBNAme>>").onsuccess=function(){
              let db=this.result
              let transactionreq=db.transaction(stroreName,'readwrite')
              let idxStore=transactionreq.objectStore(stroreName)
              idxStore.getAllKeys().onsuccess=function(val){
                Observer.next(JSON.stringify(this.result))
              }
         }
    }).pipe(take(1));
  }

}



/**
 * 
 * Refrence
 * All keys ≥ x	IDBKeyRange.lowerBound(x)
 * All keys > x	IDBKeyRange.lowerBound(x, true)
 * All keys ≤ y	IDBKeyRange.upperBound(y)
 * All keys < y	IDBKeyRange.upperBound(y, true)
 * All keys ≥ x && ≤ y	IDBKeyRange.bound(x, y)
 * All keys > x &&< y	IDBKeyRange.bound(x, y, true, true)
 * All keys > x && ≤ y	IDBKeyRange.bound(x, y, true, false)
 * All keys ≥ x &&< y	IDBKeyRange.bound(x, y, false, true)
 * The key = z	IDBKeyRange.only(z)
 * Usage IDBKeyRange.only('searchkey')
 * this._idxdbsvc.getStoreItemByIndexAll("wosetstore","status_idx").subscribe(res=>{
 *   console.log(res)
 * })
 */
