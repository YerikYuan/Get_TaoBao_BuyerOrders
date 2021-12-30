# Get buyer order info from web taobao.com
## Install
1. Install a user script manager
+ Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
+ Firefox: [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/), [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/), or [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)
+ Safari: [Tampermonkey](http://tampermonkey.net/?browser=safari) or [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
+ Microsoft Edge: [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
+ Tampermonkey is recommonded for all browsers.
2. Download ZIP with all files from my project and unzip it.
3. Install this extension in Tempermonkey extension of your web browser.
## Useage
1. Login in your taobao account and switch to "my orders"
2. Two added button shows on top of the page.
3. First press "添加本页订单" to add all order info on current page.
4. Navigate to other pages to add more order info (DO NOT REFRESH the page!).
5. Press "导出订单" after you add all order info you need.
6. Engjoy!
## Limitation
1. You can only add all the info in one page, add info of as specific order is not suuported.
2. Items with "保险服务" and "增值服务" is omitted automatically. 
## Security
Pure front-end info extraction, sensitive info related to accont and password is not recorded.
# 在网页版的taobao.com获取买家订单信息
## 安装
1. 安装对应你浏览器的插件管理器。
+ Chrome: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) or [Violentmonkey](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
+ Firefox: [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/), [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/), or [Violentmonkey](https://addons.mozilla.org/firefox/addon/violentmonkey/)
+ Safari: [Tampermonkey](http://tampermonkey.net/?browser=safari) or [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)
+ Microsoft Edge: [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
+ 推荐使用Tampermonkey，保证兼容性。
2. 下载本项目的全部文件，并解压zip压缩包。
3. 在你的浏览器的Tempermonkey扩展中安装压缩包中的js文件。
## 使用
1. 登录你的淘宝账号，并切换到“我的订单”页面。
2. 在页面顶部将出现两个新的按钮，一个是“添加本页订单”，另一个是“导出订单”。
3. 首先点击 "添加本页订单" 按钮，将整页的订单信息添加到待导出的列表中。
4. 可以切换到其他页面，添加其他页面信息（全程请勿刷新）。
5. 添加完成后，点击"导出订单"。
6. Engjoy!
## 已知限制
1. 订单信息必须整页添加，不能单独增加某一条订单信息.
2. "保险服务" 和 "增值服务" 等项是自动忽略的. 
## 安全
纯前端信息提取，账号密码等信息不会被记录。