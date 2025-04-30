import {
    query,
    mutation,
    action,
    internalMutation,
    ActionCtx,
  } from "./_generated/server";
  import { internal } from "./_generated/api";
  import { v } from "convex/values";
  import { maestros } from "./schema";
  
  // Obtener todos los maestros
  export const getMaestros = query({
    handler: async (ctx) => {
      return await ctx.db.query("maestros").collect();
    },
  });
  
  // Obtener un maestro por su matrícula
  export const getMaestroByMatricula = query({
    args: { matricula: v.string() },
    handler: async (ctx, args) => {
      const maestro = await ctx.db
        .query("maestros")
        .filter((q) => q.eq(q.field("matricula"), args.matricula))
        .first();
      
      if (!maestro) {
        // Si no se encuentra el maestro
        return null;
      }
      
      return maestro;
    }
  });
  
  // Crear un nuevo maestro
  export const crearMaestro = mutation({
    args: {
      matricula: v.string(),
      nombre: v.string(),
      correo: v.string(),
      clases: v.string(),
    },
    handler: async (ctx, args) => {
      const maestroExistente = await ctx.db
        .query("maestros")
        .filter((q) => q.eq(q.field("matricula"), args.matricula))
        .first();
  
      if (maestroExistente) {
        throw new Error(`Ya existe un maestro con la matrícula: ${args.matricula}`);
      }
      
      const id = await ctx.db.insert("maestros", {
        matricula: args.matricula,
        nombre: args.nombre,
        correo: args.correo,
        clases: args.clases,
      });
      
      return { success: true, id, message: "Maestro creado con éxito" };
    }
  });
  
  // Eliminar un maestro por matrícula
  export const deleteMaestro = mutation({
    args: { matricula: v.string() },
    handler: async (ctx, args) => {
      try {
        // Buscar el maestro por matrícula
        const maestro = await ctx.db
          .query("maestros")
          .filter((q) => q.eq(q.field("matricula"), args.matricula))
          .first();
  
        if (!maestro) {
          throw new Error(`No se encontró el maestro con matrícula: ${args.matricula}`);   
        }
  
        await ctx.db.delete(maestro._id);
        
        console.log(`Maestro con matrícula ${args.matricula} eliminado`);
        return { success: true, message: "Maestro eliminado" };
      } catch (error) {
        console.error(`Error eliminando maestro con matrícula ${args.matricula}:`, error);
        throw new Error("Error al eliminar el maestro");
      }
    },
  });
  
  // Actualizar un maestro
  export const actualizarMaestro = mutation({
    args: {
      id: v.id("maestros"),
      matricula: v.string(),
      nombre: v.string(),
      correo: v.string(),
      clases: v.string(),
    },
    handler: async (ctx, args) => {
      try {
        const maestro = await ctx.db.get(args.id);
        
        if (!maestro) {
          throw new Error(`No se encontró el maestro con id: ${args.id}`);
        }
  
        // Verificar si la nueva matrícula ya existe y pertenece a otro maestro
        if (maestro.matricula !== args.matricula) {
          const existente = await ctx.db
            .query("maestros")
            .filter((q) => q.eq(q.field("matricula"), args.matricula))
            .first();
          
          if (existente && existente._id !== args.id) {
            throw new Error(`Ya existe otro maestro con la matrícula: ${args.matricula}`);
          }
        }
  
        await ctx.db.patch(args.id, {
          matricula: args.matricula,
          nombre: args.nombre,
          correo: args.correo,
          clases: args.clases
        });
        
        console.log(`Maestro ${args.nombre} actualizado`);
        return { success: true, message: "Maestro actualizado con éxito" };
      } catch (error) {
        console.error(`Error actualizando maestro ${args.nombre}:`, error);
        throw new Error("Error al actualizar el maestro");
      }
    }
  });
  
  
  // Obtener lista de maestros por clase
  export const getMaestrosPorClase = query({
    args: { clase: v.string() },
    handler: async (ctx, args) => {
      // Nota: Esta es una implementación básica que busca la clase como substring
      // Para una implementación más avanzada, deberías considerar cambiar el esquema
      // para que clases sea un array de strings
      
      const maestros = await ctx.db
        .query("maestros")
        .collect();
        
      return maestros.filter(maestro => 
        maestro.clases.toLowerCase().includes(args.clase.toLowerCase())
      );
    }
  });