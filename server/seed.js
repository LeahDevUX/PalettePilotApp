import mongoose from 'mongoose';
import 'dotenv/config';

const paletteSchema = new mongoose.Schema({
  title: String,
  prompt: String,
  summary: String,
  palette: [
    {
      hex: String,
      name: String,
      role: String,
      insight: String,
    },
  ],
  status: { type: String, enum: ['saved', 'draft', 'archived'], default: 'saved' },
  createdAt: { type: Date, default: Date.now },
});

const Palette = mongoose.model('Palette', paletteSchema);

const seedData = [
  {
    title: 'קפה בוטיק תל אביבי',
    prompt: 'בית קפה בוטיק בנווה צדק עם אווירה חמה ואומנותית',
    summary: 'פלטה חמה ומעודנת שמשלבת עצמת האספרסו עם הכמיהה של בוקר מדיטרני',
    status: 'saved',
    palette: [
      { hex: '#3B1F0E', name: 'אספרסו עמוק', role: 'Primary', insight: 'מעגן את המותג בחמימות ועומק של פולי קפה איכותיים' },
      { hex: '#C8956C', name: 'קרמל בוטיק', role: 'Secondary', insight: 'מזכיר את הקצף הזהוב על הקפה ומוסיף תחכום עדין' },
      { hex: '#E8D5B7', name: 'לאטה בהיר', role: 'Background', insight: 'רקע שמנתי שיוצר תחושת חמימות ונינוחות' },
      { hex: '#6B4226', name: 'עץ אגוז', role: 'Accent', insight: 'מחזה את הריהוט העץ האיכותי של הקפה' },
      { hex: '#1A0A00', name: 'פחם לילה', role: 'Text', insight: 'קריאות מושלמת על רקעים בהירים' },
    ],
  },
  {
    title: 'פינטק לדור Z',
    prompt: 'אפליקציית השקעות לצעירים בגיל 20-30 שרוצים להתחיל להשקיע בקלות',
    summary: 'פלטה אמיצה ודיגיטלית שמנגישה את עולם הפיננסים לדור שגדל על סמארטפון',
    status: 'saved',
    palette: [
      { hex: '#6C63FF', name: 'סגול דיגיטל', role: 'Primary', insight: 'מעביר חדשנות וביטחון ללא הקשחה הבנקאית הישנה' },
      { hex: '#00D9A3', name: 'ירוק רווח', role: 'Secondary', insight: 'קשור פסיכולוגית לכסף ולצמיחה חיובית' },
      { hex: '#0A0A1A', name: 'לילה כהה', role: 'Background', insight: 'מצב לילה שמדגיש נתונים ומספרים' },
      { hex: '#FF6B6B', name: 'אדום אזהרה', role: 'Accent', insight: 'להתרעות ולירידות בתיק — ברור ומיידי' },
      { hex: '#F0EFFF', name: 'לבן כמעט', role: 'Text', insight: 'טקסט נקי וקריא על רקע כהה' },
    ],
  },
  {
    title: 'ריאליטי ישראלי',
    prompt: 'תוכנית ריאליטי ישראלית רועשת, צבעונית, עם הרבה דרמה ורגש',
    summary: 'פלטה נועזת ורועשת שצועקת "תראו אותי" מכל מסך',
    status: 'saved',
    palette: [
      { hex: '#FF2D55', name: 'ורוד דרמה', role: 'Primary', insight: 'צבע שלא מתנצל — מושך עיניים ויוצר עניין מיידי' },
      { hex: '#FFD700', name: 'זהב פריים טיים', role: 'Secondary', insight: 'מרגיש כמו כוכב ורצון להיות על הבמה' },
      { hex: '#1C1C1E', name: 'שחור טלוויזיה', role: 'Background', insight: 'מחזק את התחושה של מסך ואולפן' },
      { hex: '#FF9F0A', name: 'כתום ריגוש', role: 'Accent', insight: 'אנרגיה, עוררות ורגעי השיא של התוכנית' },
      { hex: '#FFFFFF', name: 'לבן נקי', role: 'Text', insight: 'כותרות ברורות ומובנות על רקע כהה' },
    ],
  },
  {
    title: 'תכשיטים יוקרתיים',
    prompt: 'מותג תכשיטים ישראלי יוקרתי המכוון לנשים בשנות ה-40 עם טעם מעודן',
    summary: 'פלטה מינימליסטית ואלגנטית שמדברת בשקט על יוקרה אמיתית',
    status: 'saved',
    palette: [
      { hex: '#C5A028', name: 'זהב ישן', role: 'Primary', insight: 'זהב מתון שמרגיש אמיתי ולא זול — כמו תכשיט עתיק' },
      { hex: '#1A1A1A', name: 'שחור עדין', role: 'Secondary', insight: 'רקע שמכבד את הזהב ומוסיף יוקרה ללא מילים' },
      { hex: '#F5F0E8', name: 'שמנת יוקרה', role: 'Background', insight: 'נייר משובח שמחמיא לכל תכשיט' },
      { hex: '#8B7355', name: 'ברונזה עמומה', role: 'Accent', insight: 'גוון שני שמשלים את הזהב ומוסיף עומק' },
      { hex: '#2C2C2C', name: 'פחם רך', role: 'Text', insight: 'טקסט רך שלא מתחרה עם היופי של המוצר' },
    ],
  },
  {
    title: 'אפליקציית ילדים',
    prompt: 'אפליקציית למידה לילדים בגיל 4-8 שמלמדת אותיות ומספרים בכיף',
    summary: 'פלטה שמחה ומזמינה שגורמת לילדים לרצות ללחוץ על כל כפתור',
    status: 'saved',
    palette: [
      { hex: '#FF6B35', name: 'כתום קפיצי', role: 'Primary', insight: 'אנרגיה ושמחה שמיד מושכת ילדים' },
      { hex: '#4ECDC4', name: 'טורקיז משחק', role: 'Secondary', insight: 'מרגיש כמו בריכה ביום חם — כיפי ומזמין' },
      { hex: '#FFE66D', name: 'צהוב שמש', role: 'Accent', insight: 'הדגשות על הצלחות ופרסים' },
      { hex: '#F7F7F7', name: 'לבן בד', role: 'Background', insight: 'נקי ולא עמוס כדי לא להסיח דעת' },
      { hex: '#2D3436', name: 'אפור כהה', role: 'Text', insight: 'קריאה קלה לעיניים קטנות' },
    ],
  },
  {
    title: 'מסעדה יפנית',
    prompt: 'מסעדת סושי יוקרתית בהרצליה פיתוח עם שף יפני ואווירה אומנותית',
    summary: 'פלטה שקטה ומאוזנת שמשדרת כבוד לאוכל ולמסורת היפנית',
    status: 'saved',
    palette: [
      { hex: '#C0392B', name: 'אדום וסאבי', role: 'Primary', insight: 'צבע הסושי והחיות — נוכח אך לא אגרסיבי' },
      { hex: '#ECE0CC', name: 'בז׳ במבוק', role: 'Background', insight: 'חום וואבי-סאבי שמרגיש כמו נייר אורז' },
      { hex: '#2C3E50', name: 'כחול לילה', role: 'Secondary', insight: 'עומק ורוגע של אוקיינוס בשקיעה' },
      { hex: '#27AE60', name: 'ירוק וסאבי', role: 'Accent', insight: 'מחזיר לטבע ולרעננות הרכיבים הטריים' },
      { hex: '#1A1A1A', name: 'דיו יפני', role: 'Text', insight: 'כמו כתב יד יפני על נייר — מינימלי ומדויק' },
    ],
  },
  {
    title: 'גלריית אמנות עכשווית',
    prompt: 'גלריית אמנות עכשווית בתל אביב המציגה אמנים ישראלים צעירים',
    summary: 'פלטה ניטרלית שמתפנה לאמנות — הגלריה היא הרקע, לא הכוכבת',
    status: 'draft',
    palette: [
      { hex: '#FAFAFA', name: 'לבן גלריה', role: 'Background', insight: 'הקיר הנקי שעליו תולים כל יצירה' },
      { hex: '#1A1A1A', name: 'שחור עיצובי', role: 'Primary', insight: 'מסגרות, טקסט ופרטים — חד ומדויק' },
      { hex: '#C0392B', name: 'אדום מניפסט', role: 'Accent', insight: 'נגיעת דם שמסמנת אמנות אמיצה ופוליטית' },
      { hex: '#7F8C8D', name: 'אפור בטון', role: 'Secondary', insight: 'מרגיש כמו רצפת בטון של מחסן שהפך לגלריה' },
      { hex: '#2C2C2C', name: 'פחם עמוק', role: 'Text', insight: 'לייבלים ותיאורים של יצירות — נקי ומקצועי' },
    ],
  },
  {
    title: 'אפליקציית כושר',
    prompt: 'אפליקציית אימונים לנשים שרוצות להתחזק ולהרגיש טוב בגוף שלהן',
    summary: 'פלטה אנרגטית ומעצימה שמרגישה כמו "את יכולה" בכל לחיצה',
    status: 'draft',
    palette: [
      { hex: '#FF4757', name: 'אדום כוח', role: 'Primary', insight: 'אנרגיה, דם שרץ בוורידים ורצון לזוז' },
      { hex: '#2F3542', name: 'כחול ברזל', role: 'Secondary', insight: 'יציבות, כוח ורצינות של אישה שמגיעה לאימון' },
      { hex: '#FF6B81', name: 'ורוד אנרגיה', role: 'Accent', insight: 'מוסיף נשיות מבלי להיות סטריאוטיפי' },
      { hex: '#F1F2F6', name: 'לבן ספורטיבי', role: 'Background', insight: 'נקי ומאוורר כמו חדר כושר מואר' },
      { hex: '#1E1E2E', name: 'שחור כושר', role: 'Text', insight: 'ניגודיות גבוהה — ברור גם בזיעה' },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Palette.deleteMany({});
    console.log('Cleared existing palettes');

    await Palette.insertMany(seedData);
    console.log(`Inserted ${seedData.length} palettes`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
