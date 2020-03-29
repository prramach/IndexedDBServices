# IndexedDBServices
An IndexedDB Wrapper as  Service for Angualr Projects.
This simple typescript class whch can be copied to your Angualr projects and Inject as a service to create and manage IndexedDB.
~~~
    Once you Injected the Service you can call the service method
    this_idxdbsvc.initIdxDB()// to initialize the db store
    this_idxdbsvc.storeObject(storeName:string,objectItem{})
    this_idxdbsvc.getStoreItemByIndexKeyRange(storeName:string,indexName:string,IndexKeyRange:IDBKeyRange)
    
    Since All the methods retruns OBservable  you should subcribe to all methods as below
     this._idxdbsvc.getStoreItemByIndexAll("<<StoreName>","<<IndexName>>").subscribe(res=>{
        console.log(res)
   }
~~~
You should Initialize and create your database in initIdxDB() method first before you can use the service methods. Also you should boot strap the initIdxDB() when app loads or call the initIdxDB when your first angular modules iniit , ngOnit() 
Ths service code created with  smaple db , sample store and Index . Modify the InitIdxDB() as per your requirements. Once the DB setup you can Inject the service in any angualr class to interact with your DB. Make sure you pass upgarde version on each release to upgrade client stored DBs.

Pease note this is the simplest version of the code . I will add more feratures and refine the code in future versions.  
Thanks @prajith_ram


