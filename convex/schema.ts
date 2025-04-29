import { defineTable,defineSchema } from "convex/server";
import { v } from "convex/values";

//define la tabla de alumnos
export const alumnos = defineTable(
    v.object({
        matricula: v.string(),
        nombre: v.string(),
        carrera: v.string(),
        grado: v.number(),
        correo: v.string(),
        promedio: v.optional(v.number()),
    })
);

export const maestros = defineTable(
    v.object({
        matricula: v.string(),
        nombre: v.string(),
        
    })
)

export default defineSchema({
    alumnos,
    maestros,
});