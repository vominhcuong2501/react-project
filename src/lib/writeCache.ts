import fs from 'fs';
import path from 'path';

export const writeCache = (fileName: string, data: any) => {
  if (!process.env.NEXT_PUBLIC_CACHE) return null;
  try {
    const filesDir = path.join(process.cwd(), 'cache');
    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);
    const pathFile = path.join(filesDir, `${fileName}.json`);
    const dataCache = JSON.stringify(data);

    fs.writeFileSync(pathFile, dataCache as string);
  } catch (error) {
    return null;
  }
};
