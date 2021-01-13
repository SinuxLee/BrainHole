cc.Class({
    properties: {
        uidStorage: null,
        localStorage: null,
        uidKey: "uid",
        localStorageKey: "localStorage",
    },
    ctor() {
        this.init();
    },
    init() {
        this.uidStorage = {};
        this.localStorage = {
            uid: 0
        };
        if (cc.sys.localStorage.getItem(this.localStorageKey)) {
            var localStorage = JSON.parse(cc.sys.localStorage.getItem(this.localStorageKey));
            if (localStorage) {
                for (var key in localStorage) {
                    this.localStorage[key] = localStorage[key];
                }
            }
        }
        //部分数据绑定到uid上，个人设置等
        if (cc.sys.localStorage.getItem(this.uidKey + "_" + this.uid)) {
            var uidStorage = JSON.parse(cc.sys.localStorage.getItem(this.uidKey + "_" + this.uid));
            if (uidStorage) {
                for (let key in uidStorage) {
                    this.uidStorage[key] = uidStorage[key];
                }
            }
        }
    },
    setUidItem(key, value) {
        this.uidStorage[key] = value;
        this.saveUidItem();
    },
    setItem(key, value) {
        this.localStorage[key] = value;
        this.saveItem();
    },
    getUidItem(key) {
        return this.uidStorage[key];
    },
    getItem(key) {
        return this.localStorage[key];
    },
    saveUidItem() {
        var str = JSON.stringify(this.uidStorage);
        cc.sys.localStorage.setItem(this.uidKey + "_" + this.uid, str);
    },
    saveItem() {
        var str = JSON.stringify(this.localStorage);
        cc.sys.localStorage.setItem(this.localStorageKey, str);
    },
    cleanUidItem() {
        cc.sys.localStorage.removeItem(this.uidKey + "_" + this.uid);
    },
    cleanItem() {
        cc.sys.localStorage.removeItem(this.localStorageKey);
    }
});