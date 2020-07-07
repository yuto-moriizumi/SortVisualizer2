"use strict";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let data;
const NUM_DATA = 500, RANGE_DATA = 500;
canvas.width = (NUM_DATA + 1) * 2;
canvas.height = RANGE_DATA;
let p,stack=[];
generate();

function generate() {
    p = 0;
    data = [];
    do {
        data.push(Math.floor(Math.random() * RANGE_DATA) + 1) - 1;
    } while (data.length <= NUM_DATA);
    stack.push([0,data.length-1]);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = "rgb(" + Math.min(255, 255 * 2 - data[i] / RANGE_DATA * 255 * 2) + ", " + Math.min(data[i] / RANGE_DATA * 255 * 2, 255) + ", 0) ";
        ctx.moveTo(i * 2, RANGE_DATA);
        ctx.lineTo(i * 2, RANGE_DATA - data[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

function bubbleSort() {
    if (p >= data.length - 1)  return true;
    for (let j = data.length - 1; j > p; j--) {
        if (data[j] < data[j - 1]) {
            const tmp = data[j];
            data[j] = data[j - 1];
            data[j - 1] = tmp;
        }
    }
    draw();
    p++;
    return false;
}

function selectSort() {
    if (p >= data.length - 1) return true;    
    let lowest = p;
    for (let j = p + 1; j < data.length; j++) {
        if (data[j] < data[lowest]) {
            lowest = j;
        }
    }
    const temp = data[p];
    data[p] = data[lowest];
    data[lowest] = temp;
    draw();
    p++;
    return false;
}

function quickStart(l=0,r=data.length-1){
    if(l>=r) return true;
    let a=quickSort(l,r);
    return quickStart(l,a-1) && quickStart(a+1,r);
}

function quickSort(){
    if(stack.length<1) return true;
    const range=stack.pop();
    let i=range[0]-1,j=range[1];
    if(range[0]>=range[1]) return false;
    while(true){
        while(data[++i]<data[range[1]]);
        while(data[--j]>data[range[1]]&&i<j);
        if(i>=j) break;
        const temp=data[i];
        data[i]=data[j];
        data[j]=temp;
    }
    const temp=data[i];
    data[i]=data[range[1]];
    data[range[1]]=temp;
    draw();
    stack.push([range[0],i-1]);
    stack.push([i+1,range[1]]);
    //console.log(stack);
    return false;
}

function insertion(){
    if(p>=data.length) return true;
    for (let j = p; j >0; j--) {
        if(data[j]>data[j-1]) break;
        const tmp=data[j];
        data[j]=data[j-1];
        data[j-1]=tmp;    
    }
    p++;
    draw();
    return false;
}

function sortStart(type) {
    let f = () => { return false };
    switch (type) {
        case "bubble":
            f=bubbleSort;
            break;
        case "select":
            f=selectSort;
            break;
        case "quick":
            f=quickSort;
            break;
        case "insertion":
            f=insertion;
            break;
        default:
            break;
    }
    const roop = setInterval(() => {
        if (f()) {
            clearInterval(roop);
            ctx.font = "18px 'ＭＳ Ｐゴシック'";
            ctx.fillStyle = "red";
            ctx.fillText("ソート済みです", 10, 75);
        }
    })
}

function sleep(msec) {
    return new Promise(function (resolve) {
        setTimeout(function () { resolve() }, msec);
    })
}

async function start() {
    await sleep(50);
}

