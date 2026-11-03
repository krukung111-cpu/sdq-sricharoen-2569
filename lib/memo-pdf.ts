import {PDFDocument,PDFFont,rgb} from 'pdf-lib';
import {memoData} from './memo';
import {RecordData,defaults} from './sdq';
export async function addMemo(doc:PDFDocument,font:PDFFont,records:RecordData[],view:string,s:typeof defaults){
 const m=memoData(records,view,s),p=doc.addPage([595.28,841.89]);let y=743;
 const draw=(t:string,x:number,at:number,size=11)=>p.drawText(t,{x,y:at,size,font,color:rgb(0,0,0)});
 const wrap=(t:string,size=11)=>{let line='';for(const {segment} of new Intl.Segmenter('th',{granularity:'word'}).segment(t)){if(font.widthOfTextAtSize(line+segment,size)>503){draw(line,46,y,size);y-=17;line=segment}else line+=segment}if(line){draw(line,46,y,size);y-=17}};
 const emblem=await doc.embedPng(await fetch('/garuda.png').then(r=>{if(!r.ok)throw Error('โหลดตราครุฑไม่สำเร็จ');return r.arrayBuffer()}));p.drawImage(emblem,{x:46,y:762,width:48,height:55});draw('บันทึกข้อความ',238,780,23);
 wrap('ส่วนราชการ  โรงเรียนศรีเจริญศึกษา สพม.อุบลราชธานี อำนาจเจริญ');wrap('ที่  '+(s.bookNo||'……………… / 2569')+'                    วันที่  '+m.date);wrap('เรื่อง  '+m.subject);p.drawLine({start:{x:46,y:y+6},end:{x:549,y:y+6},thickness:.6});y-=7;
 wrap('เรียน  ผู้อำนวยการโรงเรียนศรีเจริญศึกษา');y-=3;wrap('สิ่งที่ส่งมาด้วย  รายงานผลการประเมินพฤติกรรมนักเรียน (SDQ) จำนวน 1 ชุด');y-=4;wrap('       '+m.intro);m.forms.forEach(f=>wrap('       '+f));y-=3;wrap('       '+m.progress);wrap('รูปแบบการสรุป: '+m.mode,10);
 const top=y+5,cols=[46,315,430,549];const row=(a:string,b:string,c:string)=>{draw(a,54,y-11,10);draw(b,335,y-11,10);draw(c,452,y-11,10);y-=23;p.drawLine({start:{x:46,y:y+5},end:{x:549,y:y+5},thickness:.4})};row('ผลการประเมินภาพรวม','จำนวน (คน)','ร้อยละ');m.stats.forEach(r=>row(r.status,String(r.count),r.percent));cols.forEach(x=>p.drawLine({start:{x,y:top},end:{x,y:y+5},thickness:.4}));p.drawLine({start:{x:46,y:top},end:{x:549,y:top},thickness:.4});y-=10;wrap(m.note,9);wrap('       '+m.closing,10);
 y-=10;draw('ลงชื่อ ……………………………… ผู้รายงาน',320,y,10);y-=16;draw('('+s.reporter+')',335,y,10);y-=16;draw(s.position,335,y,10);y-=16;draw('ครูที่ปรึกษาชั้นมัธยมศึกษาปีที่ 1',320,y,10);y-=24;
 const base=y;for(let i=0;i<3;i++){const [name,title]=m.signatures[i],x=i===0?46:306,sy=i===2?base-94:base;draw('ความเห็น'+title,x,sy,9);draw('……………………………………………………',x,sy-18,10);draw('ลงชื่อ ……………………………………',x+18,sy-40,10);draw('('+(name||'……………………………………')+')',x+22,sy-56,10);draw(title,x,sy-72,9)}
 if(base-166<35)throw Error('ข้อความบันทึกยาวเกินหน้า กรุณาย่อข้อมูลประกอบรายงาน');
}
