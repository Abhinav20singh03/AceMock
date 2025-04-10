import {serial, text,integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockRes:text("jsonMockRes").notNull(),
  jobPosition:varchar("jobPosition").notNull(),
  jobDesc:varchar("jobDesc").notNull(),
  jobExperience:varchar("jobExperience").notNull(),
  createdBy:varchar("createdBy").notNull(),
  createdAt:varchar("createdAt").notNull(),
  mockId:varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer",{
  id: serial("id").primaryKey(),
  mockIdRef:varchar("mockId").notNull(),
  question:varchar("question").notNull(),
  correctAns:varchar("correctAns"),
  userAns:varchar("userAns"),
  feedback:varchar("feedback"),
  rating:varchar("rating"),
  userEmal:varchar("userEmail"),
  createdAt:varchar("createdAt"),
});