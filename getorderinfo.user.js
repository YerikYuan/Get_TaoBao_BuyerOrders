// ==UserScript==
// @name         淘宝订单导出
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  淘宝网页版，已买到的宝贝页面会增加两个按。点击添加本页订单即可将订单添加到带保存的订单列表中，点击导出即可导出CSV文件。
// @author       Yerik Yuan
// @include      https://buyertrade.taobao*
// @require      https://lib.tstatic.cn/ajax/lodash/4.17.20/lodash.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

// https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js

function addButton(element, onclickFunc, value = "按钮", width = "60px", height = "60px") {
    const button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.style.height = height;
    button.style.width = width;
    button.style.align = "center";
    button.style.marginBottom = "10px";
    button.style.marginLeft = "250px";
    button.style.color = "white";
    button.style.background = "#409EFF";
    button.style.border = "1px solid #409EFF";

    button.onclick = function () {
        onclickFunc();
    }

    element.appendChild(button);
    element.insertBefore(button, element.childNodes[0]);
}

const orderListPage = /(http|https):\/\/buyertrade\.taobao.*?\/trade/g;
if (orderListPage.exec(document.URL)) {
    const orderListMain = document.getElementById("J_bought_main");
    addButton(orderListMain, addCurrentPageOrdersToList, "添加本页订单", "160px");
    addButton(orderListMain, exportOrders, "导出订单", "160px");
}



function toCsv(header, data, filename) {
    let rows = "";
    let row = header.join(",");
    rows += row + "\n";

    _.forEach(data, value => {
        rows += _.replace(value.join(","), '#', '@') + "\n";
    })

    let blob = new Blob(["\ufeff" +rows],{type: 'text/csv;charset=utf-8;'});
    let encodedUrl = URL.createObjectURL(blob);
    let url = document.createElement("a");
    url.setAttribute("href", encodedUrl);
    url.setAttribute("download", filename + ".csv");
    document.body.appendChild(url);
    url.click();
}

let orderList = {}
let listlength = 0;
function addCurrentPageOrdersToList() {

    const orders = document.getElementsByClassName("js-order-container");

    for (let order of orders) {

        let items = processOrder(order);

        if (!items) {
            continue;
        }
        _.forEach(items, (value, key) => {
            orderList[key] = value;
        })
    }
    if (listlength < Object.keys(orderList).length){
        listlength = Object.keys(orderList).length
        alert("本页订单已添加成功！");
    }else{
        alert("重复添加或添加失败！");
    }
}

function exportOrders() {

    const header = ["订单号", "下单日期", "商品明细", "商品链接", "单价", "数量", "运费", "实付款", "状态"];

    toCsv(header, orderList, "订单信息")
}


function processOrder(order) {
    let outputData = {};
    let textContent = order.textContent;
    let pattern = /(\d{4}-\d{2}-\d{2})订单号: ()/;
    let isExist = pattern.exec(textContent);

    if (!isExist) {
        console.log('暂未发现订单！');
    }else{
        const date = isExist[1];
        const id = order.querySelector("div[data-id]").getAttribute("data-id");

        let index = 0;
        var actualPay = 0;
        var freight =0;

        while (true) {
            let count = 0;
            actualPay = "---";
            freight = "---";

            let productQuery = order.querySelector("span[data-reactid='.0.7:$order-" + id + ".$" + id + ".0.1:1:0.$" + index + ".$0.0.1.0.0.1']");
            let priceQuery = order.querySelector("span[data-reactid='.0.7:$order-" + id + ".$" + id + ".0.1:1:0.$" + index + ".$1.0.1.1']");
            let countQuery = order.querySelector("p[data-reactid='.0.7:$order-" + id + ".$" + id + ".0.1:1:0.$" + index + ".$2.0.0']");
            let actualPayQuery = order.querySelector("span[data-reactid='.0.7:$order-" + id + ".$" + id + ".0.1:1:0.$" + index + ".$4.0.0.2.0.1']");
            /*let itemUrlQuery = order.querySelector("a[href]");*/
			let itemUrlQuery = order.querySelector("a[data-reactid='.0.7:$order-" + id + ".$" + id + ".0.1:1:0.$"+ index + ".$0.0.1.0.0']");
            let freightQuery = order.querySelector("span[data-reactid='.0.7:$order-" + id + ".$" + id + ".0.1:1:0.$"+ index + ".$4.0.1:$0.1']");


            if (productQuery === null) {
                break;
            }
            if (productQuery.textContent.indexOf("保险服务") != -1){
                index++;
                continue;
            }
            if (productQuery.textContent.indexOf("增值服务") != -1){
                index++;
                continue;
            }
            let price = priceQuery.textContent;

            if (countQuery != null){
                count = countQuery.textContent;
            }

            if (freightQuery != null){
                freight = freightQuery.textContent.replace("￥","");
            }

            if (actualPayQuery != null) {
                actualPay = actualPayQuery.textContent;
            }

            if (index === 0) {
                let statusQuery = order.querySelector("span[data-reactid='.0.7:$order-" + id + ".$" + id + ".0.1:1:0.$" + index + ".$5.0.0.0']");
                var status = statusQuery.textContent;
            }

            let itemUrl = itemUrlQuery.href

            index++;

            outputData[id + index] = [
                id,
                date,
                productQuery.textContent.replace(/,/g,"，"),
                itemUrl,
                parseFloat(price),
                count,
                freight,
                actualPay,
                status,
            ]
        }
    }

    return outputData;
}


