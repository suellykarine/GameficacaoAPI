CREATE TABLE `readings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`resource_id` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`utm_channel` text,
	`opened_at` integer DEFAULT (cast((julianday('now') - 2440587.5) * 86400000 as integer)),
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`streak` integer DEFAULT 0 NOT NULL,
	`last_login` integer NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5) * 86400000 as integer))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);