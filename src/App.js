import React, { Component } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_red.css';
import ReactTooltip from 'react-tooltip';
import './App.css';
import { ScheduleGridComponent } from './components/ScheduleGridComponent/ScheduleGridComponent';

const today = new Date();
var todayDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

let eventsData = [{
  eventDate: todayDate,
  startTime: "09:00",
  endTime: "15:30",
  title: "Blue",
  colorCode: '#bbcfea',
  borderColorCode: '#9BACC0'
},
{
  eventDate: todayDate,
  startTime: "09:00",
  endTime: "14:30",
  title: "Green",
  colorCode: '#7ace6c',
  borderColorCode: '#3c7a31'
},
{
  eventDate: todayDate,
  startTime: "09:30",
  endTime: "11:30",
  title: "Brown",
  colorCode: '#c09127',
  borderColorCode: '#5f4812'
},
{
  eventDate: todayDate,
  startTime: "11:30",
  endTime: "12:00",
  title: "Red",
  colorCode: '#8e4067',
  borderColorCode: '#482738'
},
{
  eventDate: todayDate,
  startTime: "14:30",
  endTime: "15:00",
  title: "Orange",
  colorCode: '#f3a669',
  borderColorCode: '#925830'
},
{
  eventDate: todayDate,
  startTime: "15:30",
  endTime: "16:00",
  title: "Yellow",
  colorCode: '#f7f36e',
  borderColorCode: '#96934e'
}];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todayDate: new Date(),
      dateSelected: new Date(),
      events: this.getEvents(todayDate)
    };
    this.timeList = [];

    eventsData.forEach(item => {
      this.timeList.push({
        startTime: item.startTime,
        endTime: item.endTime
      });
    });
  }

  formateDate(timestamp) {
    var today = new Date(timestamp);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var dateFormat = yyyy + '-' + mm + '-' + dd;
    return dateFormat;
  }

  getEvents = (date = new Date()) => {
    let event = [];
    let selectedDate = this.formateDate(date);
    eventsData.forEach(item => {
      if (item.eventDate === selectedDate) event.push(item);
    });
    return event;
  }

  prevDay = () => {
    var date = new Date(this.state.dateSelected);
    var dateSelected = date.setDate(date.getDate() - 1);
    this.setState({
      dateSelected: dateSelected,
      events: this.getEvents(dateSelected)
    });
  }

  nextDay = () => {
    var date = new Date(this.state.dateSelected)
    var dateSelected = date.setDate(date.getDate() + 1);
    this.setState({
      dateSelected: dateSelected,
      events: this.getEvents(dateSelected)
    })
  }

  chnageDate = (date) => {
    this.setState({ dateSelected: date, events: this.getEvents(date) });
  }

  getTimeObj(time) {
    var start = time.split(":");
    var startHour = (start[0] > 24 || start[0] < 0) ? 0 : start[0];
    var startMinute = (start[1] > 60 || start[1] < 0) ? 0 : start[1];
    var startDate = new Date(0, 0, 0, startHour, startMinute, 0);
    return startDate.getTime();
  }

  calcStartPosition(item) {
    var startTime = this.getTimeObj("00:00");
    var endTime = this.getTimeObj(item.startTime);

    var diff = endTime - startTime;
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    var totalHours = hours * 60;
    var totalDiff = totalHours + minutes;
    var calcPositon = (totalDiff * 100) / 1440;
    calcPositon = (calcPositon > 100) ? 100 : calcPositon;
    calcPositon = (calcPositon < 0) ? 0 : calcPositon;
    return calcPositon + "%";
  }

  calcTimeSloat = (item) => {
    var startTime = this.getTimeObj(item.startTime);
    var endTime = this.getTimeObj(item.endTime);

    var diff = endTime - startTime;
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    var totalHours = hours * 60;
    var totalDiff = totalHours + minutes;
    var sloatWidth = (totalDiff * 100) / 1440;
    sloatWidth = (sloatWidth > 100) ? 100 : sloatWidth;
    sloatWidth = (sloatWidth < 0) ? 0 : sloatWidth;
    return sloatWidth + "%";
  }

  calcLeftPosition = (item, index) => {
    var count = 0;
    var startTime = item.startTime;
    for(var i = index; i >= 0; i--){
      if(+this.getDateTimeObj(this.timeList[i].endTime) > +this.getDateTimeObj(startTime)){
        count++;
      }
    }
    if(count > 0) count--;
    return (((224 / 3) * count) + 50) + "px";
  }

  calWidth = (item, index) => {
    var count = 0;
    var startTime = item.startTime;
    for(var i = index; i >= 0; i--){
      if(+this.getDateTimeObj(this.timeList[i].endTime) > +this.getDateTimeObj(startTime)){
        count++;
      }
    }
    count = (index > 3) ? --count : 2;
    var objWidth = (224 / 3);
    return (224 - (objWidth * count)  - 1) + "px";
  }

  getDateTimeObj(time) {
    var today = new Date();
    var _t = time.split(":");
    today.setHours(_t[0], _t[1], 0, 0);
    return today;
  }

  render() {
    const { dateSelected } = this.state;
    return (
      <div className="event-schedule">
        <div className="calender-box">
          <ReactTooltip />
          <div className="header-box">
            <div className="prev-button">
              <button className="btn btn-primary" onClick={this.prevDay}>Prev</button>
            </div>
            <div className="date-button">
              <Flatpickr options={{ altFormat: 'd/m/Y', altInput: true }}
                value={dateSelected}
                onChange={date => { this.chnageDate(date) }} />
            </div>
            <div className="next-button">
              <button className="btn btn-primary" onClick={this.nextDay}>Next</button>
            </div>
          </div>

          <div className="schedule-box">
            <ScheduleGridComponent />
            {
              this.state.events.map((item, index) => (
                <div className={"event-box event-id-" + index} data-tip={item.title + " : " + item.startTime + " - " + item.endTime} style={{ backgroundColor: item.colorCode, border: "1px solid "+item.borderColorCode, width: this.calWidth(item, index), height: this.calcTimeSloat(item), top: this.calcStartPosition(item), left: this.calcLeftPosition(item, index) }} key={index}>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
