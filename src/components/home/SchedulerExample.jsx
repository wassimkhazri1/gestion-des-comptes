// import * as React from 'react';
// import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
// // import '@syncfusion/ej2-base/styles/material.css';
// import "@syncfusion/ej2-base/styles/material.css";
// import "@syncfusion/ej2-buttons/styles/material.css";
// import "@syncfusion/ej2-calendars/styles/material.css";
// import "@syncfusion/ej2-dropdowns/styles/material.css";
// import "@syncfusion/ej2-inputs/styles/material.css";
// import "@syncfusion/ej2-lists/styles/material.css";
// import "@syncfusion/ej2-navigations/styles/material.css";
// import "@syncfusion/ej2-popups/styles/material.css";
// import "@syncfusion/ej2-splitbuttons/styles/material.css";
// import "@syncfusion/ej2-react-schedule/styles/material.css";
// //import "./SchedulerExample.css";
// const SchedulerExample = () => {
//     const data = [
//         {
//             Id: 2,
//             Subject: 'Meeting',
//             StartTime: new Date(2018, 1, 15, 10, 0),
//             EndTime: new Date(2018, 1, 15, 12, 30),
//             IsAllDay: false,
//             Status: 'Completed',
//             Priority: 'High'
//         },
//     ];
//     const fieldsData = {
//         id: 'Id',
//         subject: { name: 'Subject' },
//         isAllDay: { name: 'IsAllDay' },
//         startTime: { name: 'StartTime' },
//         endTime: { name: 'EndTime' }
//     }
//     const eventSettings = { dataSource: data, fields: fieldsData }

//     return (<ScheduleComponent height='550px' selectedDate={new Date(2018, 1, 15)} eventSettings={eventSettings}>
//         <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
//         {/* <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth ]} /> */}
//     </ScheduleComponent>);
// }
// export default SchedulerExample;
