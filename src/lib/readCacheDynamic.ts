import fs from 'fs';
import path from 'path';

export const readCacheDynamic = (fileName, pathName) => {
  if (!process.env.NEXT_PUBLIC_CACHE) return null;
  const filesDir = path.join(process.cwd(), `cache/${pathName}`);
  // if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });
  const pathFile = path.join(filesDir, `${fileName}.json`);

  try {
    const isExist = fs.existsSync(pathFile);
    if (!isExist) return null;
    return JSON.parse(fs.readFileSync(pathFile, 'utf8') as string);
  } catch (error) {
    return null;
  }
};
