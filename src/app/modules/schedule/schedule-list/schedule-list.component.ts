import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  isTeacher: any = "";

  teacherList: any = [];
  startDate:any = '';
  endDate:any = "";
  dataSet:any = "";
  Tuesday:any = "";
  Wednesday:any ="";
  Thursday:any  = "";
  Friday:any = "";
  Saturday:any = "";
  dateIndex:any = 0;
  formList:any = [];
  mobilePhone:any = '';
  tablecurr:any = 0;
  currformList: any = "";
  member:any = {};
  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe,

  ) {
    this.selectEmployee();
    this.nowDate();
  }
  tabcurr(i){
    this.tablecurr = i;
    
  }
  nowDate(){
    this.dateIndex = 0;
    this.datefun(0);
    if (this.tablecurr == 0) { 
      if (this.isTeacher != "") {
        this.queryList();
      }
    }else{
      if (this.isTeacher != "") {
        this.squeryList();
      }     
    }
  };
  prveDate(){
    this.dateIndex--;
    this.datefun(this.dateIndex*7);  
    if (this.tablecurr == 0) {
      this.queryList();
    } else {
      this.squeryList();
    } 
  };
  nextDate(){
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
    if(this.tablecurr == 0){
      this.queryList();   
    }else{
      this.squeryList();  
    }   
  };
  datefun(index){
    let now: any = new Date();
    let nowDayOfWeek = now.getDay();
    this.startDate = this.showWeekFirstDay(1 - nowDayOfWeek + index);
    this.Tuesday = this.showWeekFirstDay(2 - nowDayOfWeek + index);
    this.Wednesday = this.showWeekFirstDay(3 - nowDayOfWeek + index);
    this.Thursday = this.showWeekFirstDay(4 - nowDayOfWeek + index);
    this.Friday = this.showWeekFirstDay(5 - nowDayOfWeek + index);
    this.Saturday = this.showWeekFirstDay(6 - nowDayOfWeek + index);
    this.endDate = this.showWeekFirstDay(7 - nowDayOfWeek + index);
  };
  selectEmployee(){
    let that = this;
    that.http.post('/scheduling/selectEmployee', {}, false).then(res => {
      if(res.code==1000){
        that.teacherList = res.result.list;
      }
    }); 
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
  queryList(){
    let that = this;
    if (that.isTeacher==""){
      this.message.create('error', '请选择主教老师');
      return false;
    }
    let paramJson:any = JSON.stringify({
      startDate: that.startDate,
      endDate: that.endDate,
      employeeId: that.isTeacher
    });
    that.http.post('/curriculum/selectTeacher', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        that.formList = res.result.list;
        console.log(res.result.list);
      }else{
        that.formList = [];
      }
    }); 
  };
  squeryList(){
    let that = this;
    let isMobile = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    if (!isMobile.test(that.mobilePhone)) {
      this.message.create('error', '请输入正确的手机号');
      return false; 
    }
    let paramJson: any = JSON.stringify({
      startDate: that.startDate,
      endDate: that.endDate,
      mobilePhone: that.mobilePhone
    });
    that.http.post('/curriculum/selectMemberReserve', { paramJson }, false).then(res => {
      if (res.code == 1000) {
        that.currformList = res.result.list;
        that.member = res.result.member;
      }else{
        that.currformList = [];
        that.member = {};
      }
    });
  }
  ngOnInit() {
  }

}
