import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Neon serverless HTTP 연결
// DATABASE_URL 환경변수 사용 (connection pooler 포함)
const sql = neon(process.env.DATABASE_URL!);

// Drizzle ORM 인스턴스 생성
// schema를 전달하면 타입 안전한 쿼리가 가능
export const db = drizzle(sql, { schema });

// 스키마도 함께 내보내기
export * from "./schema";
