const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'PalettePilot API',
    version: '1.0.0',
    description: 'מחולל פלטות צבע למותגים באמצעות Claude AI',
  },
  paths: {
    '/api/palette': {
      post: {
        summary: 'חילול פלטת צבעים',
        description:
          'מקבל תיאור מותג בטקסט חופשי, שולח ל-Claude ומחזיר פלטה של 5 צבעים עם תובנות עיצוביות.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['prompt'],
                properties: {
                  prompt: {
                    type: 'string',
                    description: 'תיאור המותג שעבורו תחולל הפלטה',
                    example: 'מותג קפה יוקרתי המיועד לאנשי מקצוע צעירים בתל אביב',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'הפלטה חוללה בהצלחה',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    palette: {
                      type: 'array',
                      description: 'מערך של 5 צבעים',
                      items: {
                        type: 'object',
                        properties: {
                          hex: { type: 'string', example: '#2C1810' },
                          name: { type: 'string', example: 'אספרסו עמוק' },
                          role: { type: 'string', example: 'Primary' },
                          insight: {
                            type: 'string',
                            example: 'חום עמוק שמעגן את המותג בחמימות ואלגנטיות.',
                          },
                        },
                      },
                    },
                    summary: {
                      type: 'string',
                      description: 'משפט אחד המתאר את מצב הרוח הכללי של הפלטה',
                      example: 'פלטה חמה ומעודנת המעוררת תרבות קפה אומנותית.',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'תיאור מותג חסר או ריק',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string', example: 'Brand description is required.' },
                  },
                },
              },
            },
          },
          500: {
            description: 'שגיאת שרת או תשובה לא צפויה מ-Claude',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export function GET() {
  return Response.json(swaggerSpec);
}
