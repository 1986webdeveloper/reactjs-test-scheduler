import React from 'react';
import './style.css';
export const ScheduleGridComponent = () => {
  const times = ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"];
  return(
    <div className="gridbox">
      <table className="table">
        <tbody>
            <tr className="header">
              {
                times.map((value, index) => {
                  return <td width="8.33%"  key={index}>{value}</td>
                })
              }
            </tr>
            <tr className="block">
              {
                times.map((value, index) => {
                  return <td width="8.33%" key={index}><div className="vertical-line" ></div></td>
                })
              }
            </tr>
          </tbody>
      </table>
    </div>
  )
};