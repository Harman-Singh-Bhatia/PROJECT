
import { z } from 'zod';
import { insertPilotSchema, insertMissionSchema, insertLogSchema, pilots, missions, logs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  pilots: {
    list: {
      method: 'GET' as const,
      path: '/api/pilots' as const,
      responses: {
        200: z.array(z.custom<typeof pilots.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/pilots/:id' as const,
      responses: {
        200: z.custom<typeof pilots.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/pilots/:id' as const,
      input: insertPilotSchema.partial(),
      responses: {
        200: z.custom<typeof pilots.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  missions: {
    list: {
      method: 'GET' as const,
      path: '/api/missions' as const,
      responses: {
        200: z.array(z.custom<typeof missions.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/missions/:id' as const,
      responses: {
        200: z.custom<typeof missions.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  logs: {
    list: {
      method: 'GET' as const,
      path: '/api/logs' as const,
      responses: {
        200: z.array(z.custom<typeof logs.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/logs' as const,
      input: insertLogSchema,
      responses: {
        201: z.custom<typeof logs.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
