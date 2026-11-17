/**
 * Convierte las imágenes de src/assets a WebP liviano para celulares de gama baja.
 * Uso: npm run optimize:images
 * Deja el original solo si el WebP no queda más pequeño. Seguro de repetir.
 */
import { readdir, stat, unlink } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = "src/assets"
// carpeta -> ancho máximo y calidad
const RULES = [
  { dir: "servicios", width: 900, quality: 70 },
  { dir: "clientes", width: 320, quality: 82 },
  { dir: "certificaciones", width: 480, quality: 85 },
  { dir: ".", width: 1600, quality: 68, only: /^hero-/ },
]

for (const rule of RULES) {
  const dir = path.join(ROOT, rule.dir)
  for (const name of await readdir(dir)) {
    if (!/\.(jpe?g|png)$/i.test(name)) continue
    if (rule.only && !rule.only.test(name)) continue
    const src = path.join(dir, name)
    const out = path.join(dir, name.replace(/\.\w+$/, ".webp"))
    const before = (await stat(src)).size
    await sharp(src)
      .resize({ width: rule.width, withoutEnlargement: true })
      .webp({ quality: rule.quality, effort: 5 })
      .toFile(out)
    const after = (await stat(out)).size
    if (after < before) {
      await unlink(src)
      console.log(`${name}: ${(before / 1024) | 0}KB -> ${(after / 1024) | 0}KB`)
    } else {
      await unlink(out)
      console.log(`${name}: se queda igual (${(before / 1024) | 0}KB)`)
    }
  }
}
