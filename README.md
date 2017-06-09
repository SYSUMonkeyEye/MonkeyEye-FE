# MonkeyEye-FE
> 猿眼电影订票系统前端开发仓库
```bash
# 安装依赖
npm install
# 项目启动（开发）
npm run dev
# 项目构建
npm run build
# 启动应用服务器（必须先完成构建）
npm run server
```

## 成品部分界面展示
![screenshot-0](images-for-readme/screenshot-0.png)
![screenshot-1](images-for-readme/screenshot-1.png)

## 1、协作规范
本仓库有2个分支，master和dev。主要在dev分支上进行开发和测试，功能完善之后再合并到master。
```txt
├─master
└─dev
```
#### 1.1、准备工作
在github上fork本仓库到你自己的github，将你fork之后的远程仓库克隆到本地，并在你的本地仓库上添加上游仓库，即源仓库。fork一般是fork了仓库的master分支，所以可能还需要自己去切出dev分支然后拉取源仓库dev分支上的内容。
```bash
git clone https://github.com/{你的github}/MonkeyEye-FE
# 上游的源仓库地址只需添加一次
git remote add upstream https://github.com/SYSUMonkeyEye/MonkeyEye-FE.git
# 切出dev分支并拉取源仓库dev分支上的内容
git checkout -b dev
git pull upstream dev
```

#### 1.2.1、协作方式-1
要开发某个模块的时候，在你的本地仓库创建一个分支，例如mydev。
```bash
git checkout -b mydev
```
切换之后你的本地仓库上就有3个分支了，如下所示。checkout之后会自动切换到mydev分支。
```txt
├─master
├─dev
└─mydev
```
在mydev分支上进行开发和测试，完成相应的功能或者模块，完成之后再切回到dev分支将mydev的内容合并到dev。
```bash
# mydev分支上提交你的更新
git add *
git commit -m "add something"
# 切换到dev分支
git checkout dev
```
由于在你开发过程中，我也可能在开发并且更新了仓库，为了避免冲突，在合并分支之前你还需要更新你本地仓库的dev分支。先在本地仓库上添加上游仓库upstream，上游仓库即我的仓库，然后使用pull命令从上游仓库拉取更新。
```bash
# 拉取上游的源仓库dev分支上的更新
git pull upstream dev
```
更新完dev之后，将mydev分支合并到dev分支并提交到你自己的远程仓库。完成之后，mydev分支就可以删除了，你也可以继续留着。
```bash
# 将mydev分支合并到dev，可能会有冲突需要自行解决
git merge mydev
# 推送到你自己的远程仓库，注意这里是push到origin dev，不是upstream dev
git push origin dev
# 删除mydev分支
git branch -d mydev
```
推送到自己的远程仓库后，就可以到github上面给我发Pull Request了，然后等待我合并你的代码。

#### 1.2.2、协作方式-2
嫌上面太麻烦？你也可以直接在fork之后的的dev分支上面进行开发，然后在发送PR之前先从源仓库拉取更新。
```bash
# 提交你的代码
git add *
git commit -m "add something"
# 拉取上游的源仓库dev分支上的更新，可能会有冲突需要自行解决
git pull upstream dev
# 推送到你自己的远程仓库，注意这里是push到origin dev，不是upstream dev
git push origin dev
```

#### 1.3、备注
所有拉取远程仓库的更新的操作请在本地仓库上使用命令行完成。
```bash
# 拉取上游的源仓库dev分支上的更新
git pull upstream dev
```
严禁通过其他做法拉取更新（例如在GitHub网站上通过网页操作进行更新然后在本地pull origin dev），以免造成不必要的合并冲突以及多余的commit。

## 2、项目结构
```txt
├─build：存放构建用到的相关文件
├─config：存放配置文件
├─data：存放伪数据以及数据生成器供前端开发使用；也可以存放图片等静态资源
├─src：前端开发的源码
│   ├─assets：图片等静态资源
│   ├─common：公共样式或js文件
│   │    ├─css：字体和图标文件
│   │    │  ├─font.css：字体文件
│   │    │  └─icon.css：图标文件
│   │    ├─sass：公共样式文件
│   │    └─utils：公共工具函数库
│   │       ├─DateUtils.js：处理时间日期的工具函数
│   │       ├─Form.js：表单工具函数
│   │       └─LazyLoad.js：实现图片懒加载
│   ├─components：前端组件
│   │    ├─auth：登录注册相关界面
│   │    │   ├─Load.vue：加载控件
│   │    │   ├─Signin.vue：登录界面
│   │    │   └─Signup.vue：注册界面
│   │    ├─comment：电影评论评分相关界面
│   │    │   └─MovieComment.vue：对电影进行评论评分界面
│   │    ├─main：应用的主体界面
│   │    │   ├─Main.vue：主体界面外层容器
│   │    │   ├─Me.vue：个人中心界面
│   │    │   └─Movies.vue：电影资讯界面
│   │    ├─movie：电影相关界面
│   │    │   ├─MovieDetail.vue：电影详情界面
│   │    │   └─MovieSearch.vue：电影搜索界面
│   │    ├─order：订单相关界面与组件
│   │    │   ├─MyOrders.vue：全部/待付款/待放映/已放映订单列表界面
│   │    │   ├─OrderDetail.vue：订单详情界面
│   │    │   ├─OrderPay.vue：付款界面
│   │    │   ├─PasswordInput.vue：支付密码输入控件
│   │    │   ├─Reservation.vue：确认下单界面
│   │    │   ├─SelectCoupon.vue：选优惠券界面
│   │    │   ├─SelectScreen.vue：选场次界面
│   │    │   └─SelectSeat.vue：选座位界面
│   │    └─profile：用户中心相关界面
│   │        ├─ChangeInfo.vue：修改个人信息界面
│   │        ├─Coupon.vue：优惠券组件
│   │        ├─Coupons.vue：优惠券列表界面
│   │        ├─MovieCollection.vue：收藏/想看/已看电影列表界面
│   │        └─UserInfo.vue：用户个人信息界面
│   ├─router：前端路由
│   │    └─index.js：前端路由信息配置文件
│   ├─store：应用的全局数据状态管理
│   │    ├─modules：数据状态模块
│   │    │   ├─auth.js：登录注册相关接口与数据状态
│   │    │   ├─comment.js：电影评价相关接口与数据状态
│   │    │   ├─coupon.js：优惠券相关接口与数据状态
│   │    │   ├─favorite.js：电影收藏相关接口与数据状态
│   │    │   ├─movies.js：电影相关接口与数据状态
│   │    │   ├─order.js：订单相关接口与数据状态
│   │    │   └─screen.js：场次相关接口与数据状态
│   │    └─index.js：数据状态模块配置文件
│   ├─App.vue：应用的最外层结构
│   └─entry.js：应用的入口文件；第三方组件和公共文件在此引入
└─app-server.js：应用服务器，提供构建后的前端静态资源，并进行接口代理
```
项目模块结构和界面跳转关系
![pages](./images-for-readme/pages.png)

## 3、开发规范
1. Vue组件文件名使用首字母大写驼峰形式命名，例如"HelloWorld.vue"；name属性采取小写形式，例如"hello-world"，以符合HTML标签的规范，例如<hello-world></hello-world>
2. 文件夹采用小写短线形式命名，例如"images-for-readme"
3. 代码缩进为2个空格；语句末尾全部不写分号；其他代码风格细节参考eslint的提示进行修改
4. 使用pug+sass+es6进行开发
5. 各个界面在路由中已经引入并写好跳转关系，如果界面中需要用到自定义组件请将组件放置在该界面所在的文件夹里面
6. 伪数据程程器和伪数据json文件都放置在data文件夹下面。生成器和json文件的命名格式为"xxx-genertor.js"和"xxx.json"，其实"xxx"为上述各个数据模型的英文名称
7. 样式大小单位使用rem，不使用px。html元素的font-size固定为100px，rem与px之间的换算公式：1rem = 100px

## 4、数据模型
电影(Movie)
```json
{
    "movie": {
        "id": "uid, 数据库ID",
        "name": "string, 电影名称",
        "poster": "string, 海报链接",
        "movieType": "string, 电影类型, 动作/冒险/爱情/喜剧等",
        "playingType": "string, 播放类型, 2D/3D/国语/外语等",
        "playingTime": "date, 上映日期",
        "duration": "integer, 电影时长",
        "rating": "integer, 电影评分, 取值范围0-5",
        "description": "string, 电影简介"
    },
    "example": {
        "id": "0db1a2e4bf7e42dfb2bde06c81eaca91",
        "name": "速度与激情8",
        "poster": "/static/images/poster/dheusidewhxj289f74gsuc78.png",
        "movieType": "冒险 动作",
        "playingType": "英语 3D",
        "playingTime": "1493001432820",
        "duration": "136",
        "rating": "5",
        "description": "一位神秘女子Cipher（查理兹·塞隆 饰）的出现，她引诱多米尼克走上犯罪道路，令整个队伍卷入信任与背叛的危机"
    }
}
```
场次(Screen)
```json
{
    "screen": {
        "id": "uid, 数据库ID",
        "movieId": "uid, 数据库ID",
        "price": "double, 本场次电影票价格",
        "ticketNum": "integer, 本场次售票数量",
        "time": "date, 开始放映的时间"
    },
    "example": {
        "id": "58cc02902b0f45ad80938b125aade2d0",
        "movieId": "fc57ab4586284680a4285db878cab44e",
        "price": "48",
        "ticketNum": "120",
        "time": "1493001432820"
    }
}
```
推荐(Recommend)
```json
{
    "recommend": {
        "id": "uid, 数据库ID",
        "movieId": "uid, 数据库ID"
    },
    "example": {
        "id": "c4b6e699a6d44abb968ce7cc05b2ffeb",
        "movieId": "7e3b99a9a89e42748f389bf94650ef4b"
    }
}
```
用户(User)
```json
{
    "user": {
        "username": "string, 用户名/账号",
        "password": "string, 登录密码",
        "payPassword": "string, 支付密码",
        "nickname": "string, 昵称",
        "avatar": "string, 头像链接",
        "description": "string, 个签",
        "money": "double, 用户账户余额"
    },
    "example": {
        "username": "18819210086",
        "password": "xxxxxxxx",
        "payPassword": "xxxxxxx",
        "nickname": "风不定，人初静",
        "avatar": "/static/images/user/18819253798.png",
        "description": "风不定，人初静，明日落红应满径。",
        "money": "1234.56"
    }
}
```
收藏关系(favorite)
```json
{
    "favorite": {
        "id": "uid, 数据库ID",
        "username": "string, 用户名",
        "movieId": "uid, 电影的数据库ID"
    },
    "example": {
        "id": "8bf8a8998bcd4d9cba380107e46785c",
        "username": "18819210086",
        "movieId": "7e3b99a9a89e42748f389bf94650ef4b"
    }
}
```
优惠券(Coupons)
```json
{
    "coupons": {
        "id": "uid, 数据库ID",
        "discount": "double, 折扣, 5%、10%等",
        "condition": "double, 使用条件, 例如满60元可用",
        "username": "string, 用户名",
        "expiredTime": "date, 过期时间",
        "status": "integer, 优惠券状态, 0: 未使用, 1: 已使用, 2: 已失效"
    },
    "example": {
        "id": "760f4f2150e84b5989f1149b80addb11",
        "discount": "0.1",
        "conditions": "36",
        "username": "18819212345",
        "expiredTime": "1497628800000",
        "status": "0"
    }
}
```
订单(Order)
```json
{
    "order": {
        "id": "uid, 数据库ID",
        "movieId": "uid, 电影的数据库ID",
        "screenId": "uid, 场次的数据库ID",
        "seat": "string, 座位",
        "price": "double, 订单总额",
        "username": "string, 用户名",
        "status": "integer, 订单类型, 0:未支付, 1:待取票, 2:未上映, 3:待评价",
        "couponsId": "uid, 优惠券的数据库ID",
        "createTime": "date, 订单创建时间"
    },
    "example": {
        "id": "0201c7a8d99c41d9a6666d38a7a6363f",
        "movieId": "fc57ab4586284680a4285db878cab44e",
        "screenId": "58cc02902b0f45ad80938b125aade2d0",
        "seat": "36,37",
        "price": "80",
        "username": "18819210086",
        "status": "0",
        "couponsId": "760f4f2150e84b5989f1149b80addb11",
        "createTime": "1496546632000"
    }
}
```
评价(Comment)
```json
{
    "comment": {
        "id": "uid, 数据库ID",
        "username": "string, 用户名",
        "movieId": "uid, 电影的数据库ID",
        "rating": "integer, 评分, 取值范围0-5",
        "content": "string, 评价内容"
    },
    "example": {
        "id": "13ee9e892892496e84b10ab392b333d9",
        "username": "18819210086",
        "movieId": "fc57ab4586284680a4285db878cab44e",
        "rating": "5",
        "content": "很好看，很刺激！！！"
    }
}
```

![DBModel](images-for-readme/DomainModel.png)
