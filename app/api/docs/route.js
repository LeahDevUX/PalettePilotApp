// Reusable schema for a single color inside a palette.
const colorSchema = {
  type: 'object',
  properties: {
    hex: { type: 'string', example: '#3B1F0E' },
    name: { type: 'string', example: 'אספרסו עמוק' },
    role: {
      type: 'string',
      enum: ['Primary', 'Secondary', 'Accent', 'Background', 'Text'],
      example: 'Primary',
    },
    usage: { type: 'string', example: 'לוגו, כותרות ראשיות, אלמנטים מרכזיים' },
    reason: { type: 'string', example: 'מעגן את המותג בחמימות ועומק' },
  },
};

// Reusable schema for a full palette document.
const paletteSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', example: 'קפה בוטיק תל אביבי' },
    prompt: { type: 'string', example: 'בית קפה בוטיק עם אווירה חמה' },
    brandSummary: { type: 'string', example: 'בית קפה אומנותי וחם' },
    emotion: { type: 'string', example: 'חמימות ואינטימיות' },
    palette: { type: 'array', items: colorSchema },
    designNotes: {
      type: 'array',
      items: { type: 'string' },
      example: ['ניגודיות גבוהה עומדת ב-WCAG AA', 'הרמוניה אנלוגית'],
    },
    status: {
      type: 'string',
      enum: ['saved', 'draft', 'archived'],
      example: 'saved',
    },
  },
};

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'PalettePilot API',
    version: '1.0.0',
    description: 'מחולל פלטות צבע למותגים באמצעות Groq AI, עם שמירה ב-MongoDB',
  },
  paths: {
    '/api/palette': {
      post: {
        summary: 'חילול פלטת צבעים (AI)',
        description:
          'מקבל תיאור מותג בטקסט חופשי, שולח ל-Groq ומחזיר פלטה של 5 צבעים עם תובנות עיצוביות. אינו שומר ל-DB.',
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
                    description: 'תיאור המותג (עד 2000 תווים)',
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
                    brandSummary: { type: 'string' },
                    emotion: { type: 'string' },
                    palette: { type: 'array', items: colorSchema },
                    designNotes: { type: 'array', items: { type: 'string' } },
                  },
                },
              },
            },
          },
          400: { description: 'תיאור מותג חסר, לא תקין או ארוך מדי' },
          500: { description: 'שגיאת שרת או תשובה לא צפויה מ-Groq' },
        },
      },
    },
    '/api/palettes': {
      get: {
        summary: 'שליפת כל הפלטות השמורות',
        description: 'מחזיר את כל הפלטות מ-MongoDB, מהחדשה לישנה.',
        responses: {
          200: {
            description: 'רשימת הפלטות',
            content: {
              'application/json': {
                schema: { type: 'array', items: paletteSchema },
              },
            },
          },
          500: { description: 'שגיאת שרת' },
        },
      },
      post: {
        summary: 'שמירת פלטה חדשה',
        description: 'שומר פלטה חדשה ל-MongoDB. הקלט מאומת מול ה-schema.',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: paletteSchema } },
        },
        responses: {
          201: {
            description: 'הפלטה נשמרה',
            content: { 'application/json': { schema: paletteSchema } },
          },
          400: { description: 'נתונים לא תקינים (ValidationError)' },
          500: { description: 'שגיאת שרת' },
        },
      },
    },
    '/api/palettes/{id}': {
      get: {
        summary: 'שליפת פלטה בודדת',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'מזהה הפלטה (MongoDB ObjectId)',
          },
        ],
        responses: {
          200: {
            description: 'הפלטה נמצאה',
            content: { 'application/json': { schema: paletteSchema } },
          },
          400: { description: 'מזהה לא תקין' },
          404: { description: 'הפלטה לא נמצאה' },
          500: { description: 'שגיאת שרת' },
        },
      },
      delete: {
        summary: 'מחיקת פלטה',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'מזהה הפלטה (MongoDB ObjectId)',
          },
        ],
        responses: {
          200: { description: 'הפלטה נמחקה' },
          400: { description: 'מזהה לא תקין' },
          404: { description: 'הפלטה לא נמצאה' },
          500: { description: 'שגיאת שרת' },
        },
      },
    },
  },
};

export function GET() {
  return Response.json(swaggerSpec);
}
