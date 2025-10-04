/**
 * Utility para formatear descripciones de proyectos inmobiliarios
 * Convierte descripciones planas en contenido estructurado y atractivo
 */

interface FormattedDescription {
  title: string;
  summary: string;
  location: string;
  features: string[];
  amenities: {
    category: string;
    items: string[];
  }[];
  keywordSections: {
    ubicacion?: string;
    precio?: string;
    amenidades?: string;
    separacion?: string;
    financiacion?: string;
  };
  cta: string;
  originalFormatted: string;
}

// Patrones para identificar elementos clave
const PATTERNS = {
  // Secciones principales que necesitan destacarse
  keywordSections: {
    ubicacion: /(?:Ubicación[:\s]*)(.*?)(?=\n(?:Precio|Amenidades|Separación|Financiación)|$)/is,
    precio: /(?:Precio[:\s]*)(.*?)(?=\n(?:Ubicación|Amenidades|Separación|Financiación)|$)/is,
    amenidades: /(?:Amenidades[:\s]*)(.*?)(?=\n(?:Ubicación|Precio|Separación|Financiación)|$)/is,
    separacion: /(?:Separación[:\s]*)(.*?)(?=\n(?:Ubicación|Precio|Amenidades|Financiación)|$)/is,
    financiacion: /(?:Financiación[:\s]*)(.*?)(?=\n(?:Ubicación|Precio|Amenidades|Separación)|$)/is
  },
  
  // Ubicaciones comunes
  location: /(?:ubicado|localizado|situado)\s+en\s+([^.,!]+)/i,
  locationSymbols: /📍\s*([^.,!\n]+)/g,
  
  // Características de tamaño/medidas
  features: /(?:(\d+)\s*(?:m²|metros|mt|mts|hectáreas?|lotes?))|(?:(\d+)\s*(?:habitaciones?|recámaras?|dormitorios?|alcobas?))|(?:(\d+)\s*(?:baños?|sanitarios?))/gi,
  
  // Amenidades comunes
  amenities: {
    recreation: /(?:piscina|alberca|gimnasio|spa|jacuzzi|sauna|club\s*house|salón\s*social|BBQ|parrilla|zona\s*de\s*juegos)/gi,
    security: /(?:seguridad\s*24\/7|vigilancia|portería|control\s*de\s*acceso|cerca\s*eléctrica|cámaras)/gi,
    nature: /(?:zonas?\s*verdes?|jardines?|parques?|senderos?|áreas?\s*naturales?|bosque)/gi,
    transport: /(?:parqueadero|garaje|estacionamiento|transporte|vías?\s*de\s*acceso)/gi,
    services: /(?:internet|wifi|gas|agua|luz|electricidad|servicios?\s*públicos?)/gi
  },
  
  // Precios y financiación
  pricing: /(?:\$[\d,.]+ ?M?)|(?:desde \$[\d,.]+)|(?:financiación|crédito|sin\s*intereses|cuotas)/gi,
  
  // Llamados a la acción existentes
  cta: /(?:contáctanos|llama|escríbenos|más\s*información|solicita|agenda)/gi
};

// Emojis por categoría
const EMOJIS = {
  recreation: ['🏊‍♂️', '🏋️‍♂️', '🧘‍♀️', '🎾', '🏓', '🎯'],
  security: ['🔒', '👮‍♂️', '📹', '🚨'],
  nature: ['🌿', '🌳', '🌺', '🦋', '🌲'],
  transport: ['🚗', '🅿️', '🚌', '🛣️'],
  services: ['💡', '🌐', '💧', '🔥'],
  location: ['📍', '🏘️', '🌎'],
  features: ['🏠', '📐', '🛏️', '🚿']
};

/**
 * Extrae la ubicación de la descripción
 */
function extractLocation(description: string): string {
  // Buscar patrones de ubicación con símbolos
  const symbolMatch = description.match(PATTERNS.locationSymbols);
  if (symbolMatch && symbolMatch[0]) {
    return symbolMatch[0].replace('📍', '').trim();
  }
  
  // Buscar patrones de ubicación en texto
  const textMatch = description.match(PATTERNS.location);
  if (textMatch && textMatch[1]) {
    return textMatch[1].trim();
  }
  
  return '';
}

/**
 * Extrae características numéricas (tamaños, habitaciones, etc.)
 */
function extractFeatures(description: string): string[] {
  const features: string[] = [];
  const matches = Array.from(description.matchAll(PATTERNS.features));
  
  matches.forEach(match => {
    const fullMatch = match[0];
    if (fullMatch.includes('m²') || fullMatch.includes('metros')) {
      features.push(`📐 ${fullMatch}`);
    } else if (fullMatch.includes('habitacion') || fullMatch.includes('dormitor') || fullMatch.includes('alcoba')) {
      features.push(`🛏️ ${fullMatch}`);
    } else if (fullMatch.includes('baño') || fullMatch.includes('sanitario')) {
      features.push(`🚿 ${fullMatch}`);
    } else if (fullMatch.includes('lote') || fullMatch.includes('hectárea')) {
      features.push(`🏞️ ${fullMatch}`);
    }
  });
  
  return features;
}

/**
 * Extrae y categoriza amenidades
 */
function extractAmenities(description: string): { category: string; items: string[] }[] {
  const amenities: { category: string; items: string[] }[] = [];
  
  // Recreación y entretenimiento
  const recreation = Array.from(description.matchAll(PATTERNS.amenities.recreation))
    .map(match => `${EMOJIS.recreation[Math.floor(Math.random() * EMOJIS.recreation.length)]} ${match[0]}`);
  
  if (recreation.length > 0) {
    amenities.push({ category: '🎯 Recreación y Entretenimiento', items: recreation });
  }
  
  // Seguridad
  const security = Array.from(description.matchAll(PATTERNS.amenities.security))
    .map(match => `${EMOJIS.security[Math.floor(Math.random() * EMOJIS.security.length)]} ${match[0]}`);
  
  if (security.length > 0) {
    amenities.push({ category: '🔒 Seguridad y Tranquilidad', items: security });
  }
  
  // Naturaleza y espacios verdes
  const nature = Array.from(description.matchAll(PATTERNS.amenities.nature))
    .map(match => `${EMOJIS.nature[Math.floor(Math.random() * EMOJIS.nature.length)]} ${match[0]}`);
  
  if (nature.length > 0) {
    amenities.push({ category: '🌿 Espacios Naturales', items: nature });
  }
  
  // Transporte y parqueadero
  const transport = Array.from(description.matchAll(PATTERNS.amenities.transport))
    .map(match => `${EMOJIS.transport[Math.floor(Math.random() * EMOJIS.transport.length)]} ${match[0]}`);
  
  if (transport.length > 0) {
    amenities.push({ category: '🚗 Transporte y Accesibilidad', items: transport });
  }
  
  // Servicios
  const services = Array.from(description.matchAll(PATTERNS.amenities.services))
    .map(match => `${EMOJIS.services[Math.floor(Math.random() * EMOJIS.services.length)]} ${match[0]}`);
  
  if (services.length > 0) {
    amenities.push({ category: '⚡ Servicios y Comodidades', items: services });
  }
  
  return amenities;
}

/**
 * Extrae y formatea las secciones de keywords destacadas
 */
function extractKeywordSections(description: string): { [key: string]: string } {
  const sections: { [key: string]: string } = {};
  
  Object.entries(PATTERNS.keywordSections).forEach(([key, pattern]) => {
    const match = description.match(pattern);
    if (match && match[1]) {
      sections[key] = match[1].trim();
    }
  });
  
  return sections;
}

/**
 * Retorna la descripción completa del proyecto con formatting de keywords
 */
function generateSummary(description: string, projectName: string): string {
  // Extraer las secciones de keywords
  const keywordSections = extractKeywordSections(description);
  
  // Limpiar la descripción base
  let cleanDescription = description
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{2,}/g, ' ')
    .trim();
  
  // Formatear las keywords encontradas con énfasis
  const keywordMap = {
    ubicacion: 'Ubicación',
    precio: 'Precio', 
    amenidades: 'Amenidades',
    separacion: 'Separación',
    financiacion: 'Financiación'
  };
  
  Object.entries(keywordSections).forEach(([key, content]) => {
    const keyword = keywordMap[key as keyof typeof keywordMap];
    if (keyword && content) {
      // Reemplazar la sección original con la versión formateada
      const originalPattern = new RegExp(`(${keyword}[:\s]*)(.*?)(?=\n(?:Ubicación|Precio|Amenidades|Separación|Financiación)|$)`, 'is');
      cleanDescription = cleanDescription.replace(originalPattern, 
        `**${keyword}:** ${content.trim()}`
      );
    }
  });
  
  return cleanDescription;
}

/**
 * Genera un llamado a la acción genérico sin promesas específicas
 */
function generateCTA(): string {
  return '📞 **¿Te interesa este proyecto?** Contáctanos para más información.';
}

/**
 * Función principal para formatear descripciones
 */
export function formatProjectDescription(description: string, projectName: string = ''): FormattedDescription {
  if (!description || description.trim().length === 0) {
    return {
      title: projectName || 'Proyecto Inmobiliario',
      summary: '',
      location: '',
      features: [],
      amenities: [],
      keywordSections: {},
      cta: '',
      originalFormatted: description
    };
  }
  
  // Limpiar descripción
  const cleanDescription = description
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\s{2,}/g, ' ')
    .trim();
  
  const location = extractLocation(cleanDescription);
  const features = extractFeatures(cleanDescription);
  const amenities = extractAmenities(cleanDescription);
  const keywordSections = extractKeywordSections(cleanDescription);
  const summary = generateSummary(cleanDescription, projectName);
  
  return {
    title: projectName || 'Proyecto Inmobiliario Premium',
    summary,
    location,
    features,
    amenities,
    keywordSections,
    cta: generateCTA(),
    originalFormatted: cleanDescription
  };
}

/**
 * Convierte la descripción formateada a markdown
 */
export function descriptionToMarkdown(formatted: FormattedDescription): string {
  let markdown = `# ${formatted.title}\n\n`;
  
  // Resumen
  if (formatted.summary) {
    markdown += `## 🌟 Descripción\n${formatted.summary}\n\n`;
  }
  
  // Ubicación
  if (formatted.location) {
    markdown += `## 📍 Ubicación\n**${formatted.location}**\n\n`;
  }
  
  // Características principales
  if (formatted.features.length > 0) {
    markdown += `## 🏠 Características Principales\n`;
    formatted.features.forEach(feature => {
      markdown += `- ${feature}\n`;
    });
    markdown += '\n';
  }
  
  // Amenidades por categoría
  if (formatted.amenities.length > 0) {
    markdown += `## ✨ Amenidades y Espacios\n\n`;
    formatted.amenities.forEach(category => {
      markdown += `### ${category.category}\n`;
      category.items.forEach(item => {
        markdown += `- ${item}\n`;
      });
      markdown += '\n';
    });
  }
  
  // Llamado a la acción
  if (formatted.cta) {
    markdown += `## 💼 ¡Contáctanos!\n${formatted.cta}\n\n`;
  }
  
  return markdown;
}

/**
 * Renderiza markdown simple a HTML con énfasis especial en keywords
 */
export function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 mb-3 flex items-center">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-gray-900 mb-4">$1</h1>')
    
    // Special formatting for keyword sections (more prominent)
    .replace(/\*\*(Ubicación|Precio|Amenidades|Separación|Financiación):\*\*/g, '<span class="inline-block bg-caribbean-100 text-caribbean-800 px-3 py-1 rounded-lg font-bold text-sm mb-2 mr-2">$1:</span>')
    
    // Regular bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    
    // Lists
    .replace(/^- (.*$)/gm, '<li class="flex items-center space-x-2 text-gray-700"><span>$1</span></li>')
    
    // Paragraphs
    .replace(/^(?!<[hl]|<li|<span)(.*$)/gm, '<p class="text-gray-700 mb-3 leading-relaxed">$1</p>')
    
    // Wrap lists
    .replace(/(<li.*<\/li>)/gs, '<ul class="space-y-2 mb-4">$1</ul>')
    
    // Clean up empty paragraphs
    .replace(/<p[^>]*><\/p>/g, '')
    .replace(/\n+/g, '\n')
    .trim();
}