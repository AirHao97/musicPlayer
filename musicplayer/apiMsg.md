登录成功：
response.data.code  == 200

## 登录api
```
手机号密码登录API:
http://localhost:3000/login/cellphone?phone=??&password=??

返回数据类型:
cookie数据：
response.data.cookie
token数据：
response.data.token


用户名：
response.data.profile.nickname
个性签名：
response.data.profile.signature
头像图：
response.data.profile.avatarUrl
背景图：
response.data.profile.backgrouUrl
生日：
response.data.profile.birthday


创建的歌单长度：
response.data.profile.playlistCount
我关注的人：
response.data.profile.follows
关注我的人：
response.data.profile.followeds
```

##获取账户信息api
```
http://localhost:3000/api1/user/account
返回的数据类型：
用户名：
response.data.profile.nickname
个性签名：
response.data.profile.signature
头像图：
response.data.profile.avatarUrl
背景图：
response.data.profile.backgrouUrl
生日：
response.data.profile.birthday
```

##获取歌单API
```
http://localhost:3000/user/playlist?uid=??&limit=??&&offset=??

返回的数据类型  => response.data.playlist为一个包含多个歌单数据的数组
歌单名字：
response.data.playlist[0].name
歌单id：
response.data.playlist[0].id
歌单背景图：
response.data.playlist[0].coverImgUrl
简介：
response.data.playlist[0].description
评论id：
response.data.playlist[0].commentThreadId
播放数量：
response.data.playlist[0].playCount
收藏数量：
response.data.playlist[0].subscribed
标签：
response.data.playlist[0].tags  => ['伤感','孤独','治愈']
歌曲数量：
response.data.playlist[0].trackCount
上次跟新时间：
response.data.playlist[0].updateTime
创建者信息
response.data.playlist[0].creator.nickname
response.data.playlist[0].creator.signature
response.data.playlist[0].creator.userId
response.data.playlist[0].creator.avatarUrl


```


##搜索歌曲api
```
http://localhost:3000/cloudsearch?keywords=xxx
默认搜索关键词则 keywords=default.
可选参数：limit 一次性返回的数量默认为30  offset偏移数量

返回数据类型：
总歌曲数：
response.data.result.songCount
歌曲数据:
response.data.result.songs    array类型，一次30条 单条数据response.data.result.songs[i] 为一个对象
（1） 歌曲名：
name
（2） 歌曲id：
id
（3） 歌手名字：
ar  数组对象，存放多个对象
例子：ar[0].name
（4） 专辑名称
al.name
（5）专辑图片
al.picUrl
```
##获取歌曲api
```
http://localhost:3000/song/url/v1?id=xxxx
可选参数：level
standard标准
exhigh 高品质
lossless 无损
Hi-Res Hi-Res

返回数据类型:
歌曲url
response.data.data[0].url
歌曲id
response.data.data[0].id
```
#获取歌曲详情
```
http://localhost:3000/song/detail?ids=xxx,xxx,xxx

```