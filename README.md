# IndexedDBServices
An IndexedDB Wrapper as  Service for Angualr Projects.
This simple typescript class whch can be copied to your Angualr projects and Inject as a service to create and managed IndexedDB.
~~~Once you Injected the Service you can call the servoce method
    this_idxdbsvc.initIdxDB()// to initialize the db store
    this_idxdbsvc.storeObject(storeName:string,objectItem{})
    this_idxdbsvc.getStoreItemByIndexKeyRange(storeName:string,indexName:string,IndexKeyRange:IDBKeyRange)
