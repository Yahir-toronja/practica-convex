import {
    query,
    mutation,
    action,
    internalMutation,
    ActionCtx,
  } from "./_generated/server";
  import { internal } from "./_generated/api";
  import { v } from "convex/values";
import { alumnos } from "./schema";

  export const getAlumnos = query({
    handler: async (ctx) => {
      return await ctx.db.query("alumnos").collect();
    },
  });

  export const getAlumnoById = query({
    args: { matricula: v.string() },
    handler: async (ctx, args) => {
      const alumno = await ctx.db
        .query("alumnos")
        .filter((q) => q.eq(q.field("matricula"), args.matricula))
        .first();
      
      if (!alumno) {
        // Si quieres manejar el caso cuando no se encuentra el alumno
        return null; // o puedes lanzar un error
      }
      
      return alumno;
    }
  });


  export const crearAlumno = mutation({
    args:{
      matricula: v.string(),
      nombre: v.string(),
      carrera: v.string(),
      grado: v.number(),
      correo: v.string(),
      promedio: v.number(),
    },
    handler: async (ctx, args)=>{
      await ctx.db.insert("alumnos",{
        matricula: args.matricula,
        nombre: args.nombre,
        carrera: args.carrera,
        grado: args.grado,
        correo: args.correo,
        promedio: args.promedio,
      })
    }
  });

  export const deleteAlumno = mutation({
    args: { matricula: v.string() },
    handler: async(ctx, args) => {
      try {
        // Buscar el alumno por matrícula
        const alumno = await ctx.db
          .query("alumnos")
          .filter((q) => q.eq(q.field("matricula"), args.matricula))
          .first();
  
        if (!alumno) {
          throw new Error(`No se encontró el alumno con matrícula: ${args.matricula}`);   
        }
  
        await ctx.db.delete(alumno._id);
        
        console.log(`Alumno con matrícula ${args.matricula} eliminado`);
        return { success: true, message: "Alumno eliminado" };
      } catch (error) {
        console.error(`Error eliminando alumno con matrícula ${args.matricula}:`, error);
        throw new Error("Error al eliminar el alumno");
      }
    },
  });

export const actualizarAlumnos = mutation({
    args:{
      id: v.id("alumnos"),
      matricula: v.string(),
      nombre: v.string(),
      carrera: v.string(),
      grado: v.number(),
      correo: v.string(),
    },
    handler: async (ctx, args)=>{
      try{
        const alumno = await ctx.db.get(args.id);
        
        if (!alumno){
          throw new Error (`No se encontró el alumno con id: ${args.id}`);
        }

        await ctx.db.patch(args.id, {
          matricula: args.matricula,
          nombre: args.nombre,
          carrera: args.carrera,
          grado: args.grado,
          correo: args.correo
        });
        console.log(`Alumno ${args.nombre} actualizado`);
        return {success: true, message: "Alumno actualizado mamaguevo"}
      }catch (error){
        console.error(`Error actualizando ${args.nombre}:`, error);
        throw new Error("Error al actualizar el alumno");
      }
    }
})  