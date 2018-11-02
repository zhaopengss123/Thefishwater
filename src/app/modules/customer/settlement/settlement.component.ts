import { HttpService } from 'src/app/ng-relax/services/http.service';
import { DatePipe } from '@angular/common';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss']
})
export class SettlementComponent implements OnInit {
  tableList:any = [];
  teacherList:any = [];
  classRoomList:any = [];
  employeeId:any = 0;
  roomId: any = 0;
  syllabusName: any = '';  
  dateIndex: any = 0;  
  startDate: any = '';
  endDate: any = '';
  nowtime: any = '';
  cardNumber:any = '';
  showstudentsForm:any = false;
  showListdetail: boolean = false;
  showRecord: boolean = false;
  mobilePhone:any = '';
  showName: any = '';
  showroomName:any = '';
  showemployeeName:any = '';
  studentdata:any = '';
  showAdjust:any = false;
  nowstartDate:any = '';
  nowendDate:any = '';
  showmodelts:any = false;
  memberName:any = '';
  callcurrentDate:any = '';
  SyllabusAllList:any = []; 
  radioValue:any = '';
  RecordList:any = [];
  showStopcard:any = false;
  stopcardMemberdetail:any = {};
  memberdetailTk:any = {};
  datalabelList:any = [];
  memberdetail:any = {
    name: '',
    parentName: '',
    birthday: '',
    sex: '',
    havacard: '',
  };
  studentInformation:any = {
    name:'',
    parentName:'',
    birthday:'',
    sex:'',
    havacard:'',
    mobilePhone:''
  }
  constructor(

    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,

  ) {
    this.seletdataList();
    this.nowDate();
    this.selectSyllabusAll();
    let dates =  new Date(); 
    let Month = (dates.getMonth() + 1) < 10 ? '0' + (dates.getMonth() + 1) : (dates.getMonth() + 1);
    let dayDate = (dates.getDate()) < 10 ? '0' + (dates.getDate()) : (dates.getDate());
    let years  = dates.getFullYear()+'';
    this.nowtime = years + Month + dayDate;
   
  }
seletdataList(){
  this.http.post('/scheduling/selectEmployee', {}, false).then(res => {
    this.teacherList = res.result.list;
  });
  
  this.http.post('/scheduling/selectSchedulingAll', {}, false).then(res => {
    this.classRoomList = res.result.list;
  });  
}
selectquery(){
  let paramJson: any = JSON.stringify({
    employeeId: this.employeeId,
    roomId: this.roomId,
    syllabusName: this.syllabusName,
    startDate: this.startDate,
    endDate: this.endDate
  });
  this.http.post('/curriculum/selectCondition', { paramJson }, false).then(res => {
    this.tableList = res.result;
    this.tableList.map( (item,index)=>{
      item.member.map( (items,indexs)=>{
        let expireDatearr = items.expireDate.split('-');
        let expireDatestr = expireDatearr[0] + expireDatearr[1] + expireDatearr[2];
        this.tableList[index].member[indexs].expireDate = expireDatestr;
        
      })
    })

  });
}
  datefun(index) {
    let now: any = new Date();
    let nowDayOfWeek = now.getDay();
    this.startDate = this.showWeekFirstDay(1 - nowDayOfWeek + index);
    this.endDate = this.showWeekFirstDay(7 - nowDayOfWeek + index);
    this.selectquery();
    if (!this.nowstartDate){
    this.nowstartDate = this.startDate;
    this.nowendDate = this.endDate
    }
  };
  showWeekFirstDay(i) {
    let that = this;
    var day3 = new Date();
    day3.setTime(day3.getTime() + i * 24 * 60 * 60 * 1000);
    let Month = (day3.getMonth() + 1) < 10 ? '0' + (day3.getMonth() + 1) : (day3.getMonth() + 1);
    let dayDate = (day3.getDate()) < 10 ? '0' + (day3.getDate()) : (day3.getDate());
    var s3 = day3.getFullYear() + "-" + Month + "-" + dayDate;
    return s3;
  }
  nowDate() {
    this.dateIndex = 0;
    this.datefun(0);
  };
  nextDate() {
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
  };
  ngOnInit() {
  }
  //查询弹框
  showstudents(data){
    this.studentInformation = {
      name: '',
      parentName: '',
      birthday: '',
      sex: '',
      havacard: '',
      mobilePhone: ''
    };
    this.mobilePhone = '';
    this.showstudentsForm = true;
    this.showName = data.name;
    this.showroomName = data.roomName;
    this.showemployeeName = data.employeeName;
    this.studentdata = data;
  }
  closestudentsForm(){
    this.showstudentsForm = false;
  }
  isstudentsForm(){
    //this.showstudentsForm = false;
    let paramJson: any = JSON.stringify({
      syllabusName: this.studentdata.name,
      currentDate: this.studentdata.currentDate,
      startTime: this.studentdata.startTime,
      endTime: this.studentdata.endTime,
      roomName: this.studentdata.roomName,
      employeeId: this.studentdata.employeeId,
      id: this.studentdata.id
    });
    
    if (!this.studentInformation){
      this.message.create('error', '学员信息不可以为空！');
      return false;
    }
    this.http.post('/curriculum/insertMemberMsg', { 
      paramJson,
      memberId: this.studentInformation.memberId,
      memberName: this.studentInformation.name,
      parentName: this.studentInformation.parentName,
    }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '添加成功！');
        this.showstudentsForm = false;
        this.selectquery();
      } else {
        this.message.create('error', res.info);
      }
    }); 
  }
//预约时学员信息查询
  selectshowstudents(){
    
    this.http.post('/curriculum/selectMemberMsg', { mobilePhone: this.mobilePhone }, false).then(res => {
      if(res.code==1000){
          if(res.result.length){
            this.studentInformation = res.result[0];
            this.studentInformation.havacard = this.studentInformation.havacard == 0 ? '体验' : '正式'; 
          }else{
            this.message.create('error', '无学员信息~');
          }
      }else{
        this.message.create('error', res.info); 
      }
    }); 
  }

  details(data){
    this.studentdata = data;
    this.showListdetail = true;
    
  }
  closeListdetail(){
    this.showListdetail = false;    
  }

  //延期弹框
  memberRecord(memberId, studentdata){
    this.showRecord = true;
    this.http.post('/curriculum/memberRecord', { memberId: memberId }, false).then(res => {
      if (res.code == 1000) {
        this.memberdetail = res.result;
        this.memberdetail.courseName = studentdata.name;
        this.memberdetail.currentDate = studentdata.currentDate;
        this.memberdetail.startTime = studentdata.startTime;
        this.memberdetail.endTime = studentdata.endTime;
        if (this.memberdetail.havacard == 0){
          this.memberdetail.havacard = '体验';
        }else{
          this.memberdetail.havacard = '正式';
        }
      } else {
        this.message.create('error', res.info);
      }
    }); 
  }

  closeRecord(){
    this.showRecord = false;
  }
  isRecord(){
    let paramJson: any = JSON.stringify({
      syllabusName: this.memberdetail.courseName,
      currentDate: this.memberdetail.currentDate,
      startDate: this.nowstartDate,
      endDate: this.nowendDate,
      startTime: this.memberdetail.startTime,
      endTime: this.memberdetail.endTime,
      memberId: this.memberdetail.memberId
    });
    this.http.post('/curriculum/postponedMemberRecord', { paramJson }, false).then(res => {
      if (res.code == 1000) { 
        this.showmodelts = true;
        this.callcurrentDate = res.result.currentDate;
      }else{
        this.message.create('error', res.info);
      }
    }); 
  }
  closemodelts(){
    this.showmodelts = false;
    this.showRecord = false;
  }


  //调课
  Adjust(memberId,memberName){
    this.showAdjust = true;
    this.radioValue = '';
    this.RecordList = [];
    this.datalabelList = [];
    this.http.post('/curriculum/selectMsg', { memberId: memberId }, false).then(res => {
      if (res.code == 1000) {
        this.memberdetailTk = res.result.list;
        console.log(this.memberdetailTk);
      }else{
        this.message.create('error', res.info);
      }
    }); 
  }

  closeAdjust(){
    this.showAdjust = false;    
  }
  isAdjust(status){
    if (!this.datalabelList.length){
      this.message.create('error', '请选择课程');
      return false;
    }
    let paramJson: any = JSON.stringify({
      babyNumber: this.memberdetailTk.babyNumber,
      status : status,
      name: this.memberdetailTk.name,
      parentName: this.memberdetailTk.parentName,
      cardNumber: this.memberdetailTk.cardNumber,
      memberId: this.memberdetailTk.memberId,
      cardCode: this.memberdetailTk.cardCode,
      list: this.datalabelList
    });

    this.http.post('/curriculum/deleteMemberRecord', { memberId: this.memberdetailTk.memberId }, false).then(res => {
      if (res.code == 1000) {
        //调课
        this.http.post('/curriculum/insertMemberRecord', { paramJson }, false).then(res => {
                if (res.code == 1000) {
                  this.message.create('success', '调课成功！');
                  this.showAdjust = false;
                  this.showListdetail = false;
                  this.selectquery();
                } else {
                  this.message.create('error', res.info);
                }
              });     
      } else {
        this.message.create('error', res.info);
      }
    });     
  }
  //查询课程类别
  selectSyllabusAll(){
    this.http.post('/scheduling/selectSyllabusAll', {  }, false).then(res => {
      if (res.code == 1000) {
        this.SyllabusAllList =  res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    }); 
  }
//办卡选课中课表展示
  selectlabel(){
    this.http.post('/curriculum/selectIdRecord', { syllabusName: this.radioValue }, false).then(res => {
      if (res.code == 1000) {
        this.RecordList = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  //点击会员停卡
  memberStopcard(memberId){
    this.stopcardMemberdetail = {};
    this.showStopcard = true;
    this.http.post('/curriculum/selectMsg', { memberId: memberId }, false).then(res => {
      if (res.code == 1000) {
        this.stopcardMemberdetail = res.result.list;
      } else {
        this.message.create('error', res.info);
      }
    });
  }
//关闭停卡
  closeStopcard(){
    this.showStopcard = false;
  }
//确认停卡
  isStopcard(){
    console.log(this.stopcardMemberdetail);
    if (!this.stopcardMemberdetail.reopenDate){
      this.message.create('error','日期不能为空');
      return false;
    }
    let paramJson: any = JSON.stringify({
      reopenDate: this.format.transform(this.stopcardMemberdetail.reopenDate, 'yyyy-MM-dd'),
      id: this.stopcardMemberdetail.id,
      name: this.stopcardMemberdetail.name
    });
    this.http.post('/memberCard/pauseCard', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        this.message.create('success', '操作成功！');
        this.showStopcard = false;
        this.showListdetail = false;
        this.selectquery();
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  //选择课程
  datalabelChange(data){
    if (data.checked){
      this.datalabelList.push(data);
    }else{
      this.datalabelList.map((item,index)=>{
        if (item.id == data.id){
          this.datalabelList.splice(index, 1);
        }
      })
    }
    console.log(this.datalabelList);
  }

}
