<template>
    <div class="warpper">
        <div class="regionBox" :style="{height:height}">
            <div class="headerBox">
                <div class="leftBox" @click="close">
                    <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/whiteBack.png" class="returnIcon" />
                    <text style="color:#ffffff;">{{title}}</text>
                </div>
            </div>
            <div class="timeSelectBox">
              <div class="leftTimeBox">
                  <div class="timeBox" >
                       <text  class="planDate" @click="getTime(1)">{{startDate.substring(0, 4) + '-' + startDate.substring(5, 7) + '-' + startDate.substring(8, 10)}}</text>
                       <text  class="planDate"  @click="getTime(2)" v-if="timeIndex!=0&&timeIndex!=1">至{{endDate.substring(0, 4) + '-' + endDate.substring(5, 7) + '-' + endDate.substring(8, 10)}}</text>
                  </div>
                  <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/timeChangeIcon.png" class="chengeTimeIcon"/>
              </div>
              <div class="rightTimeBox">
                 <text v-for="(item,index) in qselectList" :key="index" :class="[item.selected?'selects':'content']" @click="changeDate(item.index)">{{item.name}}</text>
              </div>
            </div>
            <div class="regionDataBox" style="padding-left:23px;padding-right:23px;">
                <div class="regionDataTitle">
                    <img class="regionIcon" src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/dataIcon1.png"/>
                    <text class="regionName">{{title}}</text>
                </div>
                <div class="regionDataContent">
                    <div class="regionDataItem">
                        <div class="itemTop">
                            <text class="colorSpace" style="background-color:#26B9A0;"></text>
                            <text class="itemName">身体测试</text>
                        </div>
                        <text class="itemData">{{bodyCheckCount}}</text>
                    </div>
                    <div class="regionDataItem">
                        <div class="itemTop">
                            <text class="colorSpace" style="background-color:#13C2C2;"></text>
                            <text class="itemName">训练方案</text>
                        </div>
                        <text class="itemData">{{trainProgramCount}}</text>
                    </div>
                    <div class="regionDataItem">
                        <div class="itemTop">
                            <text class="colorSpace" style="background-color:#9C72B8;"></text>
                            <text class="itemName">体验课</text>
                        </div>
                        <text class="itemData">{{trialCourseCount}}</text>
                    </div>
                    <div class="regionDataItem">
                        <div class="itemTop">
                            <text class="colorSpace" style="background-color:#108EE9;"></text>
                            <text class="itemName">训练课</text>
                        </div>
                        <text class="itemData">{{courseCount}}</text>
                    </div>
                    <div class="regionDataItem">
                        <div class="itemTop">
                            <text class="colorSpace" style="background-color:#FAC01E;"></text>
                            <text class="itemName">巡场服务</text>
                        </div>
                        <text class="itemData">{{patrolCount}}</text>
                    </div>
                </div>
            </div>
            <div class="regionContent" v-if="isRegion" style="background:#ffffff;" >
                 <div style="padding-left:23px;padding-bottom:33px;padding-top:30px;flex-direction: row;align-items: center;background-color: #F6F6F6;">
                    <img class="regionIcon" src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/dataIcon2.png"/>
                    <text class="regionName">区域/门店数据</text>
                 </div>
                  <list :style="{height:height-420}" style="background:#ffffff;" >
                    <cell>
                        <div class="regionDataBox" style="padding-left:10px;">                          
                            <div class="listItem" @click="toDetail(1,item.id)" v-for="(item,index) in regionList" :key="index" v-if="regionList.length!=0">
                                <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/regionBg.png" class="bgIcon"/>
                                <div class="listContent">
                                    <div class="listItemTop">
                                        <text class='dataName'>{{item.regionName}}</text>
                                        <text class="lines"></text>
                                    </div>
                                    <div class="listItemBottom">
                                        <div class="bottomItem">
                                            <text style="color:#999999;font-size:19px;margin-bottom:5px;">身体测试</text>
                                            <text style="color:#333333;font-size:32px;">{{item.bodyCheckCount}}</text>
                                        </div>
                                        <div class="bottomItem">
                                            <text  style="color:#999999;font-size:19px;margin-bottom:5px;">训练方案</text>
                                            <text style="color:#333333;font-size:32px;">{{item.trainProgramCount}}</text>
                                        </div>
                                        <div class="bottomItem">
                                            <text style="color:#999999;font-size:19px;margin-bottom:5px;">体验课</text>
                                            <text style="color:#333333;font-size:32px;">{{item.trialCourseCount}}</text>
                                        </div>
                                        <div class="bottomItem">
                                            <text style="color:#999999;font-size:19px;margin-bottom:5px;">训练课</text>
                                            <text style="color:#333333;font-size:32px;">{{item.courseCount}}</text>
                                        </div>
                                        <div class="bottomItem">
                                            <text style="color:#999999;font-size:19px;margin-bottom:5px;">巡场服务</text>
                                            <text style="color:#333333;font-size:32px;">{{item.patrolCount}}</text>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="listItem" @click="toDetail(2,item.clubId)" v-for="(item,index) in centerList" :key="index" v-if="centerList.length!=0">
                                    <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/regionBg.png" class="bgIcon"/>
                                    <div class="listContent">
                                        <div class="listItemTop">
                                            <text class='dataName'>{{item.clubName}}</text>
                                            <text class="lines"></text>
                                        </div>
                                        <div class="listItemBottom">
                                            <div class="bottomItem">
                                                <text style="color:#999999;font-size:19px;margin-bottom:5px;">身体测试</text>
                                                <text style="color:#333333;font-size:32px;">{{item.bodyCheckCount}}</text>
                                            </div>
                                            <div class="bottomItem">
                                                <text  style="color:#999999;font-size:19px;margin-bottom:5px;">训练方案</text>
                                                <text style="color:#333333;font-size:32px;">{{item.trainProgramCount}}</text>
                                            </div>
                                            <div class="bottomItem">
                                                <text style="color:#999999;font-size:19px;margin-bottom:5px;">体验课</text>
                                                <text style="color:#333333;font-size:32px;">{{item.trialCourseCount}}</text>
                                            </div>
                                            <div class="bottomItem">
                                                <text style="color:#999999;font-size:19px;margin-bottom:5px;">训练课</text>
                                                <text style="color:#333333;font-size:32px;">{{item.courseCount}}</text>
                                            </div>
                                            <div class="bottomItem">
                                                <text style="color:#999999;font-size:19px;margin-bottom:5px;">巡场服务</text>
                                                <text style="color:#333333;font-size:32px;">{{item.patrolCount}}</text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <div class="emptyBox"  v-if="regionList.length==0&&centerList.length==0" :style="{visibility: regionVisibility}">
                                <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png" class="emptyIcon"/>
                                <text class="emptyTxt"></text>
                           </div>
                        </div>
                    </cell>
                </list>
            </div>
            <div class="clubContent"  v-else>
                <div class="centerDataTitle">
                    <div class="titleLeft">
                        <img class="regionIcon" src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/dataIcon2.png"/>
                        <text class="regionName">数据排名</text>
                    </div>
                    <div class="titleRight">
                        <text class="dataName" v-for="(item,index) in sortList" :key="index" :class="[item.selected?'selectsItem':'contentItem']" @click="changeSort(item.index)">{{item.name}}</text>
                    </div>
                </div>
               <list :style="{height:height-420}" >
                    <cell>
                        <!-- <div class="centerDataBox" style="width:750px;background-color:#ffffff;">                       -->
                            <div class="rankingList">
                                <div class="rankingItem" v-for="(item,index) in trainerList" :key="index"  v-if="trainerList.length!=0">
                                    <div class="rankLeft" >
                                        <text class="rankNum numOne" v-if="index==0">{{index+1}}</text>
                                        <text class="rankNum numTwo" v-if="index==1">{{index+1}}</text>
                                        <text class="rankNum numThree" v-if="index==2">{{index+1}}</text>
                                        <text class="rankNum numElse" v-if="index>=3">{{index+1}}</text>
                                        <img :src="item.photo||'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultWoman.png'" class="memberAvatar"/>
                                        <text class="memberName" >{{item.name}}</text>
                                    </div>
                                    <div class="ranksRight">
                                        <text class="dataName contentItem">{{item.bodyCheckCount}}</text>
                                        <text class="dataName contentItem">{{item.programCount}}</text>
                                        <text class="dataName contentItem">{{item.trialCourseCount}}</text>
                                        <text class="dataName contentItem">{{item.completedCourseCount}}</text>
                                        <text class="dataName contentItem">{{item.patrolCount}}</text>
                                    </div>
                                </div>   
                                 <div class="emptyBox" v-if="trainerList.length==0" :style="{visibility: componentVisibility}">
                                    <img src="https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/emptyIcon.png" class="emptyIcon"/>
                                    <text class="emptyTxt">该区域暂无内容</text>
                                </div>                                                  
                            </div>
                           
                        <!-- </div> -->
                    </cell>
                </list>
            </div>
           
        </div>
    </div>
</template>
<!--需要设置swip-cell的父容器的宽度与swip-cell的宽度一致，
并且对于整体的样式，如圆角等，需要给到组件的父组件-->
<script>
     const storage = weex.requireModule('storage');
     var stream = weex.requireModule('stream'); 
     var modal=weex.requireModule("modal");
     var nativeMoudle= weex.requireModule('nativeModule');
    export default {
        data(){
            return{
                token:'eyJuYW1lIjoiRWxpemEiLCJwaG9uZSI6IjEzMjkxODM0OTQyIiwiYWNjb3VudElkIjo2LCJhY2NvdW50VHlwZSI6Miwid2VjaGF0SWQiOm51bGwsInRpY2tzIjoxNTU4NjAyNDQ0NzEyfQ==.pOk8SKFjMUjap+JjBQyEbnfYpVdYj4qnhzvui+DgoTQ=',
                webHost:'http://10.0.0.216:9090',
                qselectList:[
                  {name:'昨天',index:0,selected:false},
                  {name:'今天',index:1,selected:true},
                  {name:'本月',index:2,selected:false},
                  {name:'上月',index:3,selected:false}
                ],
                today:'',
                startDate:'',
                endDate:'',
                timeIndex:1,
                isRegion:true,
                sortList:[
                   {name:'体测',index:0,selected:true},
                   {name:'训练方案',index:1,selected:false},
                   {name:'体验课',index:2,selected:false},
                   {name:'训练课',index:3,selected:false},
                   {name:'巡场服务',index:4,selected:false}
                ],
                parentId:-1,
                currentData:null,
                patrolCount:'',
                courseCount:'',
                trialCourseCount:'',
                bodyCheckCount:'',
                trainProgramCount:'',
                regionList:[],
                centerList:[],
                currentRegion:null,
                title:'总区域',
                trainerList:[],
                selectedNum:1,
                regionVisibility: 'hidden',
                componentVisibility:'hidden'
            }
        },
        created(){
            var that=this;
            that.height = weex.config.env.deviceHeight;
            nativeMoudle.showProgressDialog(); 
            that.popHeight = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight+30;    
            var myDate = new Date();
            that.today=myDate.getFullYear()+'-'+((myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1))+'-'+(myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate());
            that.startDate=that.today;
            that.endDate=that.today;
            setTimeout(function(){
                that.getData(1,that.parentId);
            },50)
        },
        methods:{
            close(){                    
                var that=this;    
                 if(that.parentId!=-1){                
                    if(!that.isRegion){
                        that.isRegion=true;                                                      
                    }  
                    that.getData(1,that.parentId);              
                 }else{
                    nativeMoudle.close();
                 }
                    
            },
            getData(num,id){
                 var that=this;   
                 nativeMoudle.showProgressDialog();      
                 var arr=JSON.stringify({
                     'startDate':that.startDate,
                     'endDate':that.endDate
                 })                        
                 var URL=null;              
                 if(num==1){
                     URL=that.webHost+'/api/region/data/list/'+id;                
                 }else{
                     URL=that.webHost+'/api/trainer/team/report/'+id+'/new';                
                 }                      
                stream.fetch({
                    method: 'POST',
                    url: URL,
                    type:'json',
                    headers:{
                        "Content-Type": 'application/json',
                        'X-AUTH-TOKEN':that.token
                    },
                    body:arr
                    }, function(ret) {
                    if(ret.ok){        
                    nativeMoudle.progressDialogDismiss();                          
                            if(ret.data.status==0){   
                                 that.patrolCount=ret.data.data.patrolCount;
                                 that.courseCount=ret.data.data.courseCount;
                                 that.trialCourseCount=ret.data.data.trialCourseCount;
                                 that.bodyCheckCount=ret.data.data.bodyCheckCount;
                                 that.trainProgramCount=ret.data.data.trainProgramCount;                                  
                                if(id!=-1){
                                    that.title=ret.data.data.currentRegion.name;
                                    that.parentId=ret.data.data.currentRegion.parentId;
                                    that.currentRegion=ret.data.data.currentRegion;
                                }else{
                                    that.currentRegion=null;
                                    that.parentId=-1;
                                } 
                                 if(num==1){
                                        that.regionList=ret.data.data.regionInfosData;         
                                        that.centerList=ret.data.data.regionClubsData;                                                                       
                                     if(that.regionList.length==0&&that.centerList.length==0){
                                        that.regionVisibility = 'visible';
                                     } else{
                                         that.regionVisibility = 'hidden'; 
                                     }
                                }else{                                  
                                    if(ret.data.data.trainers.length>0){
                                        var arr=ret.data.data.trainers;
                                        arr.sort(function(a,b){
                                            return a.bodyCheckCount - b.bodyCheckCount;
                                        }) 
                                    //  nativeMoudle.toast(arr)
                                      that.trainerList=arr;                              
                                    }else{
                                       that.trainerList=[];                                      
                                    }                       
                                   if(that.trainerList.length==0){
                                        that.componentVisibility = 'visible';
                                    } else{
                                        that.componentVisibility = 'hidden'; 
                                    }
                                      
                                }                      
                            }else{
                                nativeMoudle.toastError(ret.data.message)
                            }
                    }else{
                        nativeMoudle.toastError('网络错误！');
                        setTimeout(function(){
                              nativeMoudle.close();
                        },100)
                    }
                
                    },function(response){
                });
            }, 
             changeDate(index){
                var myDate = new Date();
                this.timeIndex=index;
                for(var i=0,len=this.qselectList.length;i<len;i++){
                    if(index==this.qselectList[i].index){
                        this.qselectList[i].selected=true;
                    }else{
                        this.qselectList[i].selected=false;
                    }
                }
                if(index==1){
                    //今天
                    this.startDate=myDate.getFullYear()+'-'+((myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1))+'-'+(myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate());
                    this.endDate=myDate.getFullYear()+'-'+((myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1))+'-'+(myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate());
                }else if(index==0){
                    //昨天
                        myDate.setTime(myDate.getTime()-24*60*60*1000);
                        this.startDate = myDate.getFullYear()+"-" + ((myDate.getMonth()+1)<10?'0'+(myDate.getMonth()+1):(myDate.getMonth()+1)) + "-" + (myDate.getDate()<10?'0'+myDate.getDate():myDate.getDate());
                        this.endDate=this.today;             
                }else if(index==2){
                    //本月
                    var fullYear = myDate.getFullYear(); 
                    var month = myDate.getMonth() + 1; // getMonth 方法返回 0-11，代表1-12月
                    var endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
                    this.startDate = this.getThisMonth(myDate.setDate(1));//当月第一天
                    this.endDate = this.getThisMonth(myDate.setDate(endOfMonth));//当月最后一天
                }else if(index==3){
                    //上月
                        var year = myDate.getFullYear();
                        var month = myDate.getMonth();
                        if(month==0){
                            month = 12;
                            year = year-1;
                        }
                        if(month<10){
                            month = '0'+month;
                        }      
                        var myDates = new Date(year,month,0);
                        this.startDate = year+'-'+month+'-'+'01'; //上个月第一天
                        this.endDate = year+'-'+month+'-'+myDates.getDate();//上个月最后一天
                }   
                 this.getData(this.selectedNum,this.parentId);         
            },
            getThisMonth(targetDate){            
                    var D, y, m, d;
                    if (targetDate) {
                        D = new Date(targetDate);
                        y = D.getFullYear();
                        m = D.getMonth() + 1;
                        d = D.getDate();
                    } else {
                        y = new Date().getFullYear();
                        m = month;
                        d = date;
                    }
                    m = m > 9 ? m : '0' + m;
                    d = d > 9 ? d : '0' + d;
                    return y + '-' + m + '-' + d;
            },
            toDetail(num,id){
                var that=this;
                that.selectedNum=num;
                if(num==1){
                    that.isRegion=true;           
                }else{
                   that.isRegion=false; 
                }
                that.getData(num,id); 
            },
            changeSort(index){
                var that=this;
               for(var i=0,len=that.sortList.length;i<len;i++){
                   if(index==that.sortList[i].index){
                       that.sortList[i].selected=true;
                   }else{
                       that.sortList[i].selected=false;
                   }
               }
                var arr=that.trainerList;
               if(index==0){                 
                    arr.sort(function(a,b){
                        return a.bodyCheckCount - b.bodyCheckCount;
                    })                
               }else if(index==1){
                    arr.sort(function(a,b){ 
                        return a.programCount - b.programCount;
                    }) 
               }else if(index==2){    
                    arr.sort(function(a,b){ 
                        return a.trialCourseCount - b.trialCourseCount;
                    })       
               }else if(index==3){ 
                   arr.sort(function(a,b){ 
                        return a.completedCourseCount - b.completedCourseCount;
                    }) 
               }else if(index==4){  
                   arr.sort(function(a,b){ 
                        return a.patrolCount - b.patrolCount;
                }) 
               }
                that.trainerList=arr;  
            },
            getTime(num){    
                var that=this;
                if(that.timeIndex==0||that.timeIndex==1){
                    nativeMoudle.getDateDialog(that.startDate,function(map){
                         that.startDate=map.date; 
                         that.endDate=map.date;   
                         that.getData(that.selectedNum,that.parentId);                  
                    })
                }else if(that.timeIndex==2||that.timeIndex==3){
                    if(num==1){
                        nativeMoudle.getDateDialog(that.startDate,function(map){
                            that.startDate=map.date;  
                            that.getData(that.selectedNum,that.parentId);                         
                        })
                    }else if(num==2){                                                           
                        nativeMoudle.getDateDialog(that.endDate,function(map){
                           that.endDate=map.date; 
                           that.getData(that.selectedNum,that.parentId);                                                            
                       })
                    }                          
                }                
            },
        }
     }
</script>
<style scoped>
    .regionBox{
        background-color: #ffffff;
    }
    .headerBox{
        width: 750px;
        height: 70px;
        align-items: center;
        background-color: #4C5160;
        justify-content: space-between;
        padding-left: 19px;
        padding-right: 19px;
        flex-direction: row;
    }
    .leftBox{
        align-items: center;
        justify-content: space-between;
        color: #ffffff;
        flex-direction: row;
    }
    .returnIcon{
       width: 28px;
       height: 28px; 
       margin-right: 8px;
    }
    .addIcon{
      width: 21px;
      height: 21px; 
      color:  #4C5160;
    }
    .timeSelectBox{
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background-color: #4C5160;
      padding-bottom: 25px;
    }
    .leftTimeBox{
      flex-direction: row;
      align-items: center;
      margin-left: 23px;
    }
    .timeBox{
      margin-right: 7px;
      flex-direction: row;
      align-items: center;
    }
    .planDate{
      color: #FFFFFF;
      font-size: 24px;   
      font-weight: 600;
    }
    .chengeTimeIcon{
      width: 8px;
      height: 7px;
      margin-top:15px;
    }
    .rightTimeBox{
      flex-direction: row;
      align-items: center;
      margin-right: 23px;
    }
    .listContent{
        flex-direction: column;
    }
    .selects{
        width: 68px;
        height: 28px;
        border-color: #A5A8AF;
        border-style: solid;
        border-width: 1px;
        line-height: 28px;
        text-align: center;
        color: #FFFFFF;
        font-size: 17px;
        margin-left: 19px;
        background-color: #A5A8AF;
        border-radius: 15px;
    }
    .content{
        width: 68px;
        height: 28px;
        border-color: #A5A8AF;
        border-style: solid;
        border-width: 1px;
        line-height: 28px;
        text-align: center;
        color: #FFFFFF;
        font-size: 17px;
        margin-left: 19px;
        background-color: #4C5160;
        border-radius: 15px;
    }
    .regionDataBox{
        background-color: #ffffff;
        /* padding: 0 23px; */
        margin-bottom: 10px;
    }
    .regionDataTitle{
      margin-top: 33px;
      margin-bottom: 33px;
      flex-direction: row;
      align-items: center;
      background-color: #ffffff;
    }
    .regionIcon{
        width: 30px;
        height: 30px;
        margin-right: 15px;
    }
    .regionName{
        color: #4C5160;
        font-size: 26px;
        font-weight: 600;
    }
    .regionDataContent{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-right:28px;
        padding-bottom: 33px;
    }
    .itemTop{
      flex-direction: row;
       align-items: center;
        margin-bottom: 26px;
    }
    .colorSpace{
        width: 6px;
        height: 11px;
        border-radius: 3px;
        margin-right: 12px;
    }
    .itemName{
        color: #999999;
        font-size: 19px;
    }
    .itemData{
        color: #666666;
        font-size: 46px;
        font-weight: bold;
    }
    .listItem{
        width:729px;
        height:233px;
    }
    .bgIcon{
        width: 729px;
        height: 233px;
        position: absolute;
        top:0;
        left: 0;
    }
    .listItemTop{
        margin-top: 36px;
        margin-left: 36px;
        margin-bottom: 25px;
    }
    .dataName{
        color: #C9AB82;
        font-size: 32px;
        margin-bottom: 3px;
    }
    .lines{
        width: 36px;
        height: 4px;
        background-color:#C9AB82; 
    }
    .listItemBottom{
        flex-direction: row;
        padding-left: 36px;
        padding-right: 36px;
        align-items: center;
        justify-content: space-between;
        width:729px;
    }
    .centerDataTitle{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        background-color: #F6F6F6;
        padding-top: 23px;
        padding-bottom: 23px;
    }
    .titleLeft{
        margin-left: 23px;
        flex-direction: row;
    }
    .titleRight{
        align-items: center;
        /* justify-content: space-between; */
        padding-right: 10px;
        flex-direction: row;

    }
    .contentItem{
        color: #999999;
        font-size: 18px;
        width: 98px;
        text-align: center;
        line-height: 38px;
    }
    .selectsItem{
        width: 98px;
        height: 38px;
        color: #ffffff;
        background-color: #108EE9;
        font-size: 18px;
        text-align: center;
        line-height: 38px;
        border-radius: 100px;
    }
    .rankingList{
        background-color: #ffffff;
        width: 750px;
    }
    .rankingItem{
       height: 100px;
       align-items: center;
       justify-content: space-between;
       flex-direction: row;
       border-bottom-color: #F6F6F6;
       border-bottom-style: solid;
       border-bottom-width: 1px;
    }
    .rankLeft{
        flex-direction: row;
        align-items: center;
    }
    .rankNum{
        width: 30px;
        height: 33px;
        font-size: 23px;
        border-radius: 4px;
        margin-left: 25px;
        margin-right:15px;
        line-height: 33px;
        text-align: center;
    }
    .memberAvatar{
        width: 44px;
        height: 44px;
        border-radius: 100px;
        margin-right: 15px;
    }
    .memberName{
        color: #333333;
        font-size: 20px;
        width: 85px;
        height: 38px;
        line-height: 38px;
        lines:1;
    }
    .numOne{
         background-color:#FFDA26;
         color: #ffffff;
    }
     .numTwo{
         background-color:#B5C0C9;
         color: #ffffff;
    }
    .numThree{
        background-color:#E67D2B;
        color: #ffffff;
    }
    .numElse{
         background-color:#FFFFFF;
        color: #333333;
    }
    .emptyBox{
        width: 750px;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        height: 600px;
    }
    .emptyIcon{
        width: 455px;
        height: 233px;
    }
    .emptyTxt{
        color: rgba(0, 0, 0, 0.45);
        font-size: 23px;
    }
    .ranksRight{
        align-items: center;
        flex-direction: row;
         padding-right: 10px;
    }
</style>


