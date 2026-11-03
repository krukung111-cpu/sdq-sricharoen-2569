import data from './data.json';
export const students=data.students;
export const questions=data.questions;
export const kinds=['student','teacher','parent'] as const;
export type Kind=typeof kinds[number];
export const labels={student:'นักเรียนประเมินตนเอง',teacher:'ครูประเมินนักเรียน',parent:'ผู้ปกครองประเมินนักเรียน'};
export const domains=['ด้านอารมณ์','ด้านความประพฤติ','ด้านสมาธิ / อยู่ไม่นิ่ง','ด้านความสัมพันธ์กับเพื่อน','ด้านสัมพันธภาพทางสังคม'];
export const groups=[[3,8,13,16,24],[5,7,12,18,22],[2,10,15,21,25],[6,11,14,19,23],[1,4,9,17,20]];
export const thresholds={student:[[6,7],[5,6],[6,7],[4,5],[17,19]],teacher:[[4,5],[4,5],[6,7],[6,7],[16,18]],parent:[[4,5],[4,5],[6,7],[6,7],[16,18]],combined:[[5,6],[4,5],[6,7],[5,6],[16,19]]};
export const status=(n:number,t:number[])=>n<t[0]?'ปกติ':n<t[1]?'เสี่ยง':'มีปัญหา';
export type RecordData={studentId:string;kind:Kind;answers:number[];rater:string;date:string;note:string;difficulty:number;duration:string;impact:number[];burden:number;updatedAt?:string};
export const defaults={reporter:'นายธวัฒน์ สารรัตน์',position:'ครูชำนาญการพิเศษ',head:'',deputy:'',director:'',term:'2',room:'1',bookNo:''};
export function score(r:RecordData){let a=r.answers.map((v,i)=>[7,11,14,21,25].includes(i+1)?2-v:v);let values=groups.map(g=>g.reduce((s,n)=>s+a[n-1],0));let total=values.slice(0,4).reduce((s,n)=>s+n,0);let impact=r.difficulty===0?0:r.impact.reduce((s,n)=>s+(n>1?n-1:0),0);return {values,total,results:values.map((v,i)=>i===4?(v>3?'มีจุดแข็ง':'ไม่มีจุดแข็ง'):status(v,thresholds[r.kind][i])),result:status(total,thresholds[r.kind][4]),impact,impactResult:impact===0?'ปกติ':impact===1?'เสี่ยง':'มีปัญหา'};}
export function combined(rs:RecordData[]){if(rs.length!==3||new Set(rs.map(r=>r.kind)).size!==3)return null;let values=domains.map((_,i)=>rs.reduce((s,r)=>s+score(r).values[i],0)/3);let total=values.slice(0,4).reduce((s,v)=>s+v,0);return {values,total,results:values.map((v,i)=>i===4?(v>4?'มีจุดแข็ง':'ไม่มีจุดแข็ง'):status(v,thresholds.combined[i])),result:status(total,thresholds.combined[4])};}
