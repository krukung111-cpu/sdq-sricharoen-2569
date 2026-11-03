import {students,defaults,labels,RecordData} from './sdq';
import {rowsFor} from './export';
export function memoData(records:RecordData[],view:string,s:typeof defaults){
 const rows=rowsFor(records,'all',view),done=rows.filter(r=>r.result),full=rows.filter(r=>r.count===3).length;
 const date=new Date().toLocaleDateString('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'long',year:'numeric'});
 return {date,subject:'รายงานการประเมินพฤติกรรมนักเรียน (SDQ) ชั้นมัธยมศึกษาปีที่ 1 ปีการศึกษา 2569',
 intro:`ตามที่ข้าพเจ้า ${s.reporter} ตำแหน่ง ${s.position} ปฏิบัติหน้าที่ครูที่ปรึกษานักเรียนชั้นมัธยมศึกษาปีที่ 1 ห้อง ${s.room} ภาคเรียนที่ ${s.term} ปีการศึกษา 2569 ได้ดำเนินการประเมินจุดแข็งและจุดอ่อน (Strengths and Difficulties Questionnaire: SDQ) เพื่อคัดกรองและวางแผนช่วยเหลือนักเรียนตามระบบดูแลช่วยเหลือนักเรียน โดยใช้แบบประเมิน 3 ชุด ได้แก่`,
 forms:['1. นักเรียนประเมินตนเอง','2. ครูประเมินนักเรียน','3. ผู้ปกครองประเมินนักเรียน'],
 progress:`ณ วันที่ ${date} นักเรียนทั้งหมด ${students.length} คน ประเมินครบทั้ง 3 ชุด ${full} คน อยู่ระหว่างดำเนินการ ${students.length-full} คน จึงขอรายงานผลตามข้อมูลที่บันทึกไว้ ดังนี้`,
 mode:view==='combined'?'ค่าเฉลี่ย 3 ฉบับตามต้นแบบโรงเรียน':labels[view as keyof typeof labels],
 stats:['ปกติ','เสี่ยง','มีปัญหา'].map(status=>{const count=done.filter(r=>r.result?.result===status).length;return {status,count,percent:done.length?(count/done.length*100).toFixed(2):'0.00'}}),
 note:`มีผลตามรูปแบบที่เลือก ${done.length} คน ยังไม่มีผล ${students.length-done.length} คน ร้อยละคำนวณจากผู้มีผล ${done.length} คนเท่านั้น`,
 closing:'จึงเรียนมาเพื่อโปรดทราบ และใช้ประกอบการวางแผนดูแลช่วยเหลือนักเรียนต่อไป',
 signatures:[[s.head,'หัวหน้างานระบบดูแลช่วยเหลือนักเรียน'],['','รองผู้อำนวยการโรงเรียนศรีเจริญศึกษา'],['','ผู้อำนวยการโรงเรียนศรีเจริญศึกษา']]};
}
