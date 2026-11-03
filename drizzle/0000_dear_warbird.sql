CREATE TABLE `assessments` (
	`key` text PRIMARY KEY NOT NULL,
	`student_id` text NOT NULL,
	`kind` text NOT NULL,
	`payload` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `preferences` (
	`key` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL
);
