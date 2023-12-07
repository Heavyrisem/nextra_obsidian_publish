import fs from "fs";
import { resolve } from "path";

const NEXTRA_DISPLAYNAME_KEY = "nextra-displayname";

// [[ DO NOT EDIT DOWN HERE ]]

const getFontmatter = (content: string) => {
  const lines = content.replaceAll("\r", "").split("\n");
  const start = lines.findIndex((line) => line === "---");
  const end = lines.findIndex((line, index) => index > start && line === "---");
  if (start === -1 || end === -1) return {};

  const fontmatter = lines.slice(start + 1, end).reduce((acc, raw) => {
    const [key, value] = raw.split(":");
    return { ...acc, [key]: value.trim() };
  }, {} as Record<string, string>);

  return fontmatter;
};

const runRecursive = (path: string, callback: (path: string) => void) => {
  const stats = fs.statSync(path);
  if (!stats.isDirectory()) return;
  callback(path);

  fs.readdirSync(path).forEach((file) => {
    const filePath = resolve(`${path}/${file}`);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      callback(filePath);
      runRecursive(filePath, callback);
    }
  });
};

runRecursive(process.cwd() + "/pages", (path) => {
  const markdownFiles = fs
    .readdirSync(path)
    .filter((file) => file.endsWith(".md"));

  const generatedMeta = markdownFiles.reduce((acc, file) => {
    const filename = file.replace(".md", "");
    const filePath = resolve(`${path}/${file}`);
    const content = fs.readFileSync(filePath, "utf-8");
    const fontmatter = getFontmatter(content);

    const displayName = fontmatter[NEXTRA_DISPLAYNAME_KEY] ?? filename;

    return { ...acc, [filename]: displayName };
  }, {} as Record<string, string>);

  fs.writeFileSync(resolve(path, "_meta.json"), JSON.stringify(generatedMeta));
});
