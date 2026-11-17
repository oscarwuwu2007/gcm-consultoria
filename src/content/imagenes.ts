/**
 * Imágenes de los servicios, cargadas por nombre de archivo (sin registrar nada a mano):
 *  - src/assets/servicios/<id>.jpg        foto de cada categoría (id del servicio)
 *  - src/assets/certificaciones/<id>.png  logo de cada certificación
 */
const fotos = import.meta.glob<string>("../assets/servicios/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
})
const logos = import.meta.glob<string>("../assets/certificaciones/*.{jpg,jpeg,png,webp,svg}", {
  eager: true,
  query: "?url",
  import: "default",
})

const byName = (files: Record<string, string>, id: string) =>
  Object.entries(files).find(([path]) => path.split("/").pop()!.replace(/\.\w+$/, "") === id)?.[1]

export const serviceImage = (id: string) => byName(fotos, id)
export const certLogo = (id: string) => byName(logos, id)
