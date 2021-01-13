window.adManager = {};


adManager.supportAdVideo = false;

adManager.openAdVideo = function () {
    console.log("请用各平台的 openAdVideo 方法覆盖该方法!!!");
};

adManager.adVideoPlayEnd = function () {
    console.log("请用各平台的 adVideoPlayEnd 方法覆盖该方法!!!");
    console.log(arguments);
};