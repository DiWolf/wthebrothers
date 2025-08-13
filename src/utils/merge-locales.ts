import fs from "fs";
import path from "path";

export function mergeLocales(baseDir: string): Record<string, any> {
  const locales: Record<string, any> = {};

  const langDirs = fs.readdirSync(baseDir).filter(f =>
    fs.statSync(path.join(baseDir, f)).isDirectory()
  );

  for (const lang of langDirs) {
    const langPath = path.join(baseDir, lang);
    const files = fs.readdirSync(langPath).filter(f => f.endsWith(".json"));

    locales[lang] = {};

    for (const file of files) {
      const namespace = path.basename(file, ".json");
      const fullPath = path.join(langPath, file);
      const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      locales[lang][namespace] = data;
    }
  }

  return locales;
}
