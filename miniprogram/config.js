var data = {
      //云开发环境id
      env: 'cloud1-7gh312wo5541b5b9',
      
      //客服联系方式
      kefu: {
            weixin: 'handsomel_v',
            qq: '2775085562',
            // gzh: '', //公众号二维码必须为网络地址
            // phone: '' //如果你不设置电话客服，就留空
      },
      //校区
      campus: [{
                  name: '安理山南新校区',
                  id: 0
            },
      ],
      //配置学院，建议不要添加太多，不然前端不好看
      college: [{
                  name: '通用',
                  id: -1
            },
            {
                  name: '计算机',
                  id: 0
            },
            {
                  name: '经管',
                  id: 1
            },
            {
                  name: '土木',
                  id: 2
            },
            {
                  name: '力物',
                  id: 3
            },
            {
                  name: '地环',
                  id: 4
            },
            {
                  name: '安全',
                  id: 5
            },
            {
                  name: '化工',
                  id: 6
            },
            {
                  name: '采矿',
                  id: 7
            },
            {
                  name: '电气',
                  id: 8
            },
            {
                  name: '机械',
                  id: 9
            },
            {
              name: '外国语',
              id: 10
        },
        {
          name: '医学院',
          id: 11
    },
            
            
            {
                  name: '材料',
                  id: 12
            },
            
            {
                  name: '其它',
                  id: 13
            },
      ],
}
//下面的就别动了
function formTime(creatTime) {
      let date = new Date(creatTime),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
      if (M < 10) {
            M = '0' + M;
      }
      if (D < 10) {
            D = '0' + D;
      }
      if (H < 10) {
            H = '0' + H;
      }
      if (m < 10) {
            m = '0' + m;
      }
      if (s < 10) {
            s = '0' + s;
      }
      return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}

function days() {
      let now = new Date();
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();
      if (month < 10) {
            month = '0' + month;
      }
      if (day < 10) {
            day = '0' + day;
      }
      let date = year + "" + month + day;
      return date;
}
module.exports = {
      data: JSON.stringify(data),
      formTime: formTime,
      days: days
}