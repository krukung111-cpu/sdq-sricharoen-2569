import {getDb} from '../../../db';
import {preferences} from '../../../db/schema';
import {defaults} from '../../../lib/sdq';
import {eq} from 'drizzle-orm';
export const dynamic='force-dynamic';
export async function GET(){try{const r=await getDb().select().from(preferences).where(eq(preferences.key,'school'));return Response.json(r[0]?JSON.parse(r[0].payload):defaults,{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'โหลดการตั้งค่าไม่สำเร็จ'},{status:503});}}
export async function POST(req:Request){try{let data=await req.json() as Record<string,unknown>;let clean={...defaults};for(const k of Object.keys(defaults) as (keyof typeof defaults)[]){if(typeof data[k]!=='string'||(data[k] as string).length>200)return Response.json({error:'ข้อมูลไม่ถูกต้อง'},{status:400});clean[k]=data[k] as string;}await getDb().insert(preferences).values({key:'school',payload:JSON.stringify(clean)}).onConflictDoUpdate({target:preferences.key,set:{payload:JSON.stringify(clean)}});return Response.json({ok:true});}catch{return Response.json({error:'บันทึกการตั้งค่าไม่สำเร็จ'},{status:503});}}
