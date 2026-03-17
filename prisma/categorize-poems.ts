import { PrismaClient, PoemType } from '../lib/prisma-client';

const prisma = new PrismaClient();

// Common ci tune names (词牌名)
const CI_TUNE_NAMES = [
  '水调歌头',
  '沁园春',
  '满江红',
  '念奴娇',
  '虞美人',
  '浣溪沙',
  '菩萨蛮',
  '西江月',
  '渔家傲',
  '临江仙',
  '蝶恋花',
  '鹊桥仙',
  '青玉案',
  '清平乐',
  '如梦令',
  '一剪梅',
  '声声慢',
  '雨霖铃',
  '钗头凤',
  '破阵子',
  '卜算子',
  '采桑子',
  '定风波',
  '贺新郎',
  '江城子',
  '浪淘沙',
  '木兰花',
  '南乡子',
  '鹧鸪天',
  '苏幕遮',
  '踏莎行',
  '唐多令',
  '望江南',
  '行香子',
  '扬州慢',
  '永遇乐',
  '御街行',
  '点绛唇',
  '鹊踏枝',
  '醉花阴',
  '醉太平',
  '凤凰台上忆吹箫',
  '八声甘州',
  '摸鱼儿',
  '减字木兰花',
  '水龙吟',
  '贺新凉',
  '喝火令',
  '满庭芳',
  '齐天乐',
  '长亭怨慢',
  '洞仙歌',
  '风入松',
  '桂枝香',
  '好事近',
  '诉衷情',
  '忆江南',
  '忆秦娥',
  '渔歌子',
  '长相思',
  '生查子',
  '诉衷情',
  '谒金门',
  '忆王孙',
  '天仙子',
  '河传',
  '南歌子',
  '眼儿媚',
  '更漏子',
  '阮郎归',
  '柳梢青',
  '昭君怨',
  '小重山',
  '归自谣',
  '相见欢',
  '乌夜啼',
  '玉楼春',
  '少年游',
  '醉落魄',
  '朝中措',
  '夜行船',
  '宴山亭',
  '应天长',
  '画堂春',
  '武陵春',
  '天净沙',
];

/**
 * Analyzes content structure to determine if it's prose (wen) or verse (shi/ci)
 * Prose characteristics:
 * - Longer continuous text with fewer line breaks
 * - Irregular line lengths
 * - Higher character count per line
 */
function analyzePoemStructure(content: string): 'prose' | 'verse' {
  const lines = content.split('\n').filter((line) => line.trim().length > 0);

  // Calculate average line length
  const totalChars = lines.reduce((sum, line) => sum + line.trim().length, 0);
  const avgLineLength = totalChars / lines.length;

  // Calculate line length variance
  const lineLengths = lines.map((line) => line.trim().length);
  const variance =
    lineLengths.reduce((sum, len) => {
      return sum + Math.pow(len - avgLineLength, 2);
    }, 0) / lines.length;
  const stdDev = Math.sqrt(variance);

  // Prose tends to have:
  // 1. Long average line length (>30 characters)
  // 2. High variance in line lengths
  // 3. Or very few lines with long content

  if (avgLineLength > 30) {
    return 'prose';
  }

  if (avgLineLength > 20 && stdDev > 15) {
    return 'prose';
  }

  return 'verse';
}

/**
 * Categorizes a single poem based on title and content analysis
 */
function categorizePoemType(title: string, content: string): PoemType {
  // Check if title matches ci tune name
  for (const tuneName of CI_TUNE_NAMES) {
    if (title.includes(tuneName)) {
      return 'ci';
    }
  }

  // Analyze content structure
  const structure = analyzePoemStructure(content);

  if (structure === 'prose') {
    return 'wen';
  }

  // Default to shi (classical poetry)
  return 'shi';
}

async function main() {
  console.log('Starting poem categorization...\n');

  // Fetch all poems
  const poems = await prisma.poem.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      type: true,
    },
  });

  console.log(`Found ${poems.length} poems to categorize\n`);

  const updates: { ci: number; shi: number; wen: number } = {
    ci: 0,
    shi: 0,
    wen: 0,
  };
  let processed = 0;

  // Categorize in batches
  const batchSize = 100;
  for (let i = 0; i < poems.length; i += batchSize) {
    const batch = poems.slice(i, i + batchSize);

    await Promise.all(
      batch.map(async (poem) => {
        const newType = categorizePoemType(poem.title, poem.content);

        if (newType !== poem.type) {
          await prisma.poem.update({
            where: { id: poem.id },
            data: { type: newType },
          });
        }

        updates[newType]++;
        processed++;
      })
    );

    console.log(`Processed ${processed}/${poems.length} poems...`);
  }

  console.log('\n=== Categorization Complete ===');
  console.log(`诗 (Shi): ${updates.shi} poems`);
  console.log(`词 (Ci): ${updates.ci} poems`);
  console.log(`文 (Wen): ${updates.wen} poems`);
  console.log(`Total: ${updates.shi + updates.ci + updates.wen} poems`);
}

main()
  .catch((e) => {
    console.error('Error during categorization:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
