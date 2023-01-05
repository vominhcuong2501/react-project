import fs from 'fs';
import path from 'path';

export const writeCacheDynamic = (fileName: string, data: any, pathName: string) => {
  if (!process.env.NEXT_PUBLIC_CACHE) return null;
  try {
    const filesDir = path.join(process.cwd(), `cache/${pathName}`);

    if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir, { recursive: true });
    const pathFile = path.join(filesDir, `${fileName}.json`);
    const dataCache = JSON.stringify(data);

    fs.writeFileSync(pathFile, dataCache as string);
  } catch (error) {
    return null;
  }
};
