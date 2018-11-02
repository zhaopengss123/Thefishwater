import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/ng-relax/services/http.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  dateArr:any = [];
  dayList:any = [];
  weekList:any = [];
  startDate: any = '';
  endDate: any = "";
  dataSet: any = "";
  Tuesday: any = "";
  Wednesday: any = "";
  Thursday: any = "";
  Friday: any = "";
  Saturday: any = "";
  dateIndex: any = 0;
  formList: any = [];
  mobilePhone: any = '';
  radioValue1:any = 'A';
  radioValue2:any = 'A';
  monthList:any = [];

  constructor(
    private http: HttpService,
    private message: NzMessageService,
    private format: DatePipe, 
  ) {
    this.nowDate();
    this.getmonthList();
   }

  nowDate() {
    this.dateIndex = 0;
    this.datefun(0);
  
  };
  prveDate() {
    this.dateIndex--;
    this.datefun(this.dateIndex * 7);

  };
  nextDate() {
    this.dateIndex++;
    this.datefun(this.dateIndex * 7);
  };
  datefun(index) {
    let now: any = new Date();
    let nowDayOfWeek = now.getDay();
    this.startDate = this.showWeekFirstDay(1 - nowDayOfWeek + index);
    this.Tuesday = this.showWeekFirstDay(2 - nowDayOfWeek + index);
    this.Wednesday = this.showWeekFirstDay(3 - nowDayOfWeek + index);
    this.Thursday = this.showWeekFirstDay(4 - nowDayOfWeek + index);
    this.Friday = this.showWeekFirstDay(5 - nowDayOfWeek + index);
    this.Saturday = this.showWeekFirstDay(6 - nowDayOfWeek + index);
    this.endDate = this.showWeekFirstDay(7 - nowDayOfWeek + index);
    this.getDayListquery1();
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
  getDayListquery1() {
    let startDate = this.startDate;
    let endDate = this.endDate;
    this.http.post('/curriculum/dailySchedule', { startDate, endDate }, false).then(res => {
      if (res.code == 1000) {
        this.weekList = res.result.list
      } else {
        this.message.create('error', res.info);
      }
    });
  }
  getDayListquery(){
    if(!this.dateArr.length){
      this.message.create('error', '日期不能为空'); 
      return false;
    }
      let startDate = this.format.transform(this.dateArr[0], 'yyyy-MM-dd');
      let endDate = this.format.transform(this.dateArr[1], 'yyyy-MM-dd');
    this.http.post('/curriculum/dailySchedule', { startDate, endDate}, false).then(res => {
      if (res.code == 1000) {
        this.dayList = res.result.list
      }else{
        this.message.create('error', res.info); 
      }
    }); 
  }
  tabcurr(index){
  
  }
 get_month_date() {
   var oDate = new Date(Date.parse("2018-05-01"));
  oDate.setMonth(oDate.getMonth());
  oDate.setMonth(oDate.getMonth() + 1);
  oDate.setDate(1);
  oDate.setMonth(oDate.getMonth());
  oDate.setDate(0);
  return oDate.getDate();
}
getmonthList(){
  let daynum = this.get_month_date();
  let myDate = new Date(Date.parse("2018-05-01")); 
  let getDay = myDate.getDay();
  let fgetDay = -getDay; 
  let sdaynum = getDay == 7 ? (-(7 - (7 - getDay)) + 2) : (-(7 - (7 - getDay))-6) ;
  
  for (let i = sdaynum; i<daynum; i++ ){ 
  
  let monJson = {
    num1: i+1  ,
    num2: i+2,
    num3: i+3,
    num4: i+4,
    num5: i+5,
    num6: i+6,
    num7: i+7,
  }
  this.monthList.push(monJson);
  }
}

  ngOnInit() {
  }

}
