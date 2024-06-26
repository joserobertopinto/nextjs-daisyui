'use client'

import { Persona } from "@/types/Persona";
import { TOKEN_PERSONAS, BASE_URL_PERSONAS } from "@/app/config/contants";

async function getDataPersona(params: string) {
    const queryParams   = params ? params : '';
    const urlPersonas   = BASE_URL_PERSONAS + '/api/v1/personas?expand=documentos' + queryParams;
    const tokenPersonas = TOKEN_PERSONAS;
    
    const res = await fetch(urlPersonas,
    {
        method: "GET",
        headers: {
          Authorization: tokenPersonas,
        },
    });
    
    if (!res.ok) {
      throw new Error('No se pudieron obtener los datos.')
    }

    return res.json()
  }
  
  
  async function getData(): Promise<[Persona]> {
      const data = await getDataPersona();  
      const paginacion = {
        paginado: data.data.paginado, 
        links: {
          self: extractParams(data.data.links.self.href),
          next: extractParams(data.data.links.next.href),
          last: extractParams(data.data.links.last.href),
          prev: extractParams(data.data.links.prev?.href),
          first: extractParams(data.data.links.first?.href),
        }
      };
  
      const items = data.data.items;

      const listaPersonasJson = items.map(item => {
        // Verificar si la propiedad documentos está presente y no está vacía
        const numerosDocumento = item.documentos && item.documentos.length > 0
          ? item.documentos.map(doc => `${doc.tipo_documento.descripcion} ${doc.numero}`).join(' - ')
          : '';

        return {
          id_persona: item.id_persona,
          apellido: item.apellido,
          nombre: item.nombre,
          nro_documento: numerosDocumento,
          sexo: item.sexo?.descripcion,
          fecha_nacimiento: item.fecha_nacimiento
        };
      });
      
      return {personas: listaPersonasJson, paginacion:paginacion};
  }
  
  // Solo envio params para la paginacion
  function extractParams(url: string){
    let queryString = undefined;
    
    if(url)
      queryString = url.split("?")[1];
  
    return queryString;
  }

export default async function dataPersona(){
    return await getData();
}