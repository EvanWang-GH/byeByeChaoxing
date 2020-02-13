'use strict';
//第一层子窗体
let subWindow1;
//第二层子窗体
let subWindow2;
//加载主文档
window.onload = function () {
    console.log("主窗体已加载");
    //初始化并开始程序
    init();
};

function selectPage() {
    let currPage = document.getElementsByClassName("tabtags")[0].getElementsByClassName("currents")[0];
    if (currPage==null){
        return
    }
    if (currPage.title !== "视频") {
        let pageList = document.getElementsByClassName("tabtags")[0].getElementsByTagName("span");
        for (let pageListKey in pageList) {
            if (pageList[pageListKey].title === "视频") {
                pageList[pageListKey].click();
            }
        }
    }
}

//判断是否已经完成
function isFinished() {
    let statClassList = subWindow1.document.getElementsByClassName("ans-attach-ct")[0].classList;
    return statClassList.contains("ans-job-finished");
}

function startPlay() {
    setInterval(function () {
        let video = subWindow2.document.getElementsByTagName("video")[0];
        video.muted = true;
        video.play();
    }, 100);
}

function getNextNode() {
    let playList = document.getElementsByTagName("h4");
    for (let playListKey in playList) {
        let no = parseInt(playListKey);
        if (!isNaN(no)) {
            if (playList[no].classList.contains("currents")) {
                return playList[no + 1];
            }
        }
    }
}

function goToNext() {
    let nextNode = getNextNode();
    nextNode.getElementsByTagName("a")[0].click();
}

function init() {
    setInterval(function () {
        selectPage();
        subWindow1 = document.getElementById("iframe").contentWindow;
        subWindow2 = subWindow1.document.getElementsByTagName("iframe")[0].contentWindow;
        console.log("检测中");
        if (isFinished()) {
            goToNext();
        } else {
            startPlay();
        }
    }, 1000);
}