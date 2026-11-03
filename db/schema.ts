import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const assessments=sqliteTable('assessments',{key:text('key').primaryKey(),studentId:text('student_id').notNull(),kind:text('kind').notNull(),payload:text('payload').notNull(),updatedAt:text('updated_at').notNull()});
export const preferences=sqliteTable('preferences',{key:text('key').primaryKey(),payload:text('payload').notNull()});
