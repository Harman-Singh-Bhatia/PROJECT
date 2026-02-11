
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pilots = pgTable("pilots", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  rank: text("rank").notNull(),
  experience: integer("experience").notNull(),
  morale: integer("morale").notNull(),
  status: text("status").notNull(), // Available, Assigned, Grounded
  image: text("image").notNull(),
});

export const missions = pgTable("missions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  difficulty: text("difficulty").notNull(),
  riskLevel: integer("risk_level").notNull(),
  duration: integer("duration").notNull(),
});

export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),
  missionName: text("mission_name").notNull(),
  pilotName: text("pilot_name").notNull(),
  outcome: text("outcome").notNull(), // "Success" | "Failed"
  details: text("details"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertPilotSchema = createInsertSchema(pilots).omit({ id: true });
export const insertMissionSchema = createInsertSchema(missions).omit({ id: true });
export const insertLogSchema = createInsertSchema(logs).omit({ id: true, timestamp: true });

export type Pilot = typeof pilots.$inferSelect;
export type InsertPilot = z.infer<typeof insertPilotSchema>;
export type Mission = typeof missions.$inferSelect;
export type InsertMission = z.infer<typeof insertMissionSchema>;
export type Log = typeof logs.$inferSelect;
export type InsertLog = z.infer<typeof insertLogSchema>;
