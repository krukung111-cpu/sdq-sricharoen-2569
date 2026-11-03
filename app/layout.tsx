import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'SDQ ม.1 • โรงเรียนศรีเจริญศึกษา',description:'ระบบประเมินจุดแข็งและจุดอ่อนนักเรียน ชั้นมัธยมศึกษาปีที่ 1 ปีการศึกษา 2569'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="th"><body>{children}</body></html>}
