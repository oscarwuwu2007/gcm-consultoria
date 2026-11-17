/**
 * Contenido de las páginas de servicios. Para agregar un servicio o un ítem,
 * edite este archivo: las páginas y el menú se arman solos.
 */
export type ServiceGroup = { title?: string; items: string[] }
/** logos: ids de src/assets/certificaciones/<id>.png que se muestran en la página del servicio. */
/** short: una línea para el menú (qué incluye). */
export type Service = { id: string; title: string; short?: string; intro?: string; logos?: { id: string; name: string }[]; groups: ServiceGroup[] }
export type ServicePageData = { path: string; title: string; lead: string; services: Service[] }

export const CONSULTORIA: ServicePageData = {
  path: "/consultoria",
  title: "Consultoría",
  lead: "Apoyo especializado en las diferentes áreas de la Gestión de Talento Humano para su empresa.",
  services: [
    {
      id: "reclutamiento",
      short: "Entrevistas, pruebas y candidatos",
      title: "Reclutamiento y selección",
      intro:
        "Nuestro servicio de reclutamiento y selección está diseñado para ayudarle a encontrar a los mejores talentos que se ajusten perfectamente a las necesidades de su empresa.",
      groups: [
        {
          items: [
            "Entrevistas por competencias",
            "Pruebas psicométricas y por competencias",
            "Identificar, evaluar y presentar candidatos calificados",
          ],
        },
      ],
    },
    {
      id: "coaching",
      short: "Acompañamiento individual al personal",
      title: "Coaching personal empresarial",
      intro: "Sesiones individuales de acompañamiento a los colaboradores en situaciones como:",
      groups: [
        {
          items: [
            "Aspectos emocionales que interfieran con el buen desempeño organizacional",
            "Manejo de pensamiento y acciones estratégicas",
            "Alineación de objetivos individuales con objetivos organizacionales",
            "Resolución de conflictos",
            "Acompañamiento en la adaptación al cambio organizacional",
            "Construcción de competencias laborales (habilidades blandas) propias de la empresa",
          ],
        },
      ],
    },
    {
      id: "relaciones-laborales",
      short: "Manuales, conflictos y compensación",
      title: "Relaciones laborales y compensación",
      groups: [
        {
          title: "Relaciones laborales",
          items: [
            "Manual de políticas, normas y procedimientos disciplinarios",
            "Manuales y procedimientos de Recursos Humanos",
            "Diagnóstico operacional de la gestión de Recursos Humanos",
            "Asesoría para la atención de conflictos y procedimientos laborales",
            "Proceso de vinculación y desvinculación",
          ],
        },
        {
          title: "Compensación laboral",
          items: [
            "Estudio y análisis del sistema de compensación laboral",
            "Diseño de las estructuras salariales",
          ],
        },
      ],
    },
    {
      id: "clima-cultura",
      short: "Evaluaciones y estrategias de cultura",
      title: "Clima y cultura organizacional",
      intro:
        "Diagnosticar, mejorar y mantener un ambiente laboral saludable y alineado a los valores corporativos.",
      groups: [
        {
          items: [
            "Evaluaciones de clima organizacional",
            "Análisis del compromiso y satisfacción",
            "Diseño de estrategias para fortalecer la cultura",
            "Actividades de integración y bienestar",
          ],
        },
      ],
    },
    {
      id: "manuales-puestos",
      short: "Funciones, requisitos y competencias",
      title: "Manuales descriptivos de puestos",
      intro:
        "Definir de manera clara y estructurada las funciones, responsabilidades, requisitos y competencias asociadas a cada puesto dentro de la organización, permitiendo una gestión más eficiente del talento humano.",
      groups: [
        {
          items: [
            "Análisis y clasificación de los puestos existentes",
            "Definición de funciones y responsabilidades",
            "Requisitos académicos y experiencia laboral",
            "Competencias técnicas y competencias requeridas",
            "Relación jerárquica y funcional entre puestos",
            "Revisión y validación con jefaturas",
          ],
        },
      ],
    },
    {
      id: "seguridad-laboral",
      short: "Prevención, riesgos y brigadas",
      title: "Seguridad laboral",
      intro:
        "Programas y acciones diseñadas para promover, proteger y mantener la salud de los trabajadores en su entorno laboral; para prevenir accidentes y enfermedades relacionadas con el trabajo, asegurando un ambiente laboral seguro y saludable.",
      groups: [
        {
          items: [
            "Programas de prevención de accidentes y enfermedades",
            "Evaluación de riesgos laborales",
            "Identificación de impactos y análisis de riesgos ambientales",
            "Asesoría en el cumplimiento de normativas y la gestión de seguridad",
            "Gestión de brigadas de emergencia",
            "Plan de gestión integral de residuos",
            "Simulacros",
            "Planeación y ejecución de campañas de responsabilidad social ambiental",
            "Asesoría en implementación de certificaciones",
          ],
        },
      ],
    },
  ],
}

export const CAPACITACION: ServicePageData = {
  path: "/capacitacion",
  title: "Capacitación",
  lead: "Cursos, talleres y certificaciones para que su equipo siga creciendo.",
  services: [
    {
      id: "mejores-practicas",
      short: "ITIL, PMI, Scrum, ISO y más",
      title: "Mejores prácticas",
      groups: [
        {
          items: [
            "ITIL 4 Foundation",
            "ITIL 4 DPI (Dirección, planificación y mejora)",
            "Cobit 2019 Fundamentos",
            "PMI: PMP, CAPM, 17 competencias del PMBOK",
            "SCRUM (Developer, Product Owner, Master, User Stories Foundation)",
            "Six Sigma (yellow, green y black)",
            "Agile Coach",
            "Kanban",
            "Modelo Canvas",
            "DevOps",
            "ISO/IEC 20000 Gestión de Servicios de TI",
            "ISO/IEC 21500 Gestión de las Organizaciones",
            "ISO/IEC 22301 Gestión de Continuidad del Negocio",
            "ISO/IEC 27001 Seguridad de la Información",
            "ISO/IEC 27005 Administración del Riesgo de la Seguridad de la Información",
            "ISO/IEC 27032 Ciberseguridad",
            "ISO/IEC 31000 Gestión de Riesgo",
            "ISO/IEC 38500 Gobierno de TI",
            "Lead Cybersecurity Professional Certificate (LCSPC)",
            "MS Office 365",
            "MS Project",
          ],
        },
      ],
    },
    {
      id: "cursos-talleres",
      short: "Habilidades blandas y realidad virtual",
      title: "Cursos y talleres",
      groups: [
        {
          title: "Habilidades blandas",
          items: [
            "Liderazgo y autoliderazgo",
            "Liderazgo ágil (Lean Leadership)",
            "Liderazgo ágil y adaptabilidad",
            "Pensamiento crítico y toma de decisiones",
            "Colaboración y trabajo en equipo",
            "Técnicas de negociación",
            "Habilidades gerenciales y técnicas de Programación Neurolingüística (PNL)",
            "Inteligencia emocional",
            "Gestión efectiva del tiempo",
            "Comunicación efectiva",
            "Comunicación asertiva",
            "Desarrollo del talento humano",
            "Servicio al cliente",
            "Y más…",
          ],
        },
        {
          title: "Entrenamientos en seguridad laboral con realidad virtual",
          items: [
            "Control de conatos de incendio",
            "Riesgo eléctrico",
            "Bloqueo y etiquetado (LOTO)",
            "Trabajos en alturas",
            "Espacios confinados",
            "Riesgos en plantas industriales",
            "Otros",
          ],
        },
        {
          title: "Otros cursos o talleres",
          items: ["Manejo del estrés", "Igualdad de género", "Primeros auxilios psicológicos", "Otros"],
        },
      ],
    },
    {
      id: "certificaciones",
      short: "ISTQB, IREB y TMMi",
      title: "Certificaciones",
      logos: [
        { id: "istqb", name: "ISTQB" },
        { id: "ireb", name: "IREB" },
        { id: "tmmi", name: "TMMi" },
      ],
      intro:
        "GCM Consultoría Organizacional, en alianza con Business Innovations, posee los “roadmaps” o “paths” de las diferentes certificaciones de estándares internacionales: ISTQB (International Software Testing Qualifications Board) para el testeo de software; IREB (International Requirements Engineering Board) para los requerimientos necesarios a la hora de solicitar software; y TMMi (Test Maturity Model Integration) para la mejora del proceso de pruebas.",
      groups: [
        {
          title: "Certificaciones en ISTQB, IREB y TMMi",
          items: [
            "ISTQB Foundation Level",
            "ISTQB Cómo diseñar la automatización de pruebas, nivel avanzado",
            "ISTQB Fundamento del probador ágil",
            "ISTQB Probador certificado, nivel avanzado: jefe de pruebas",
            "ISTQB Certified Tester Acceptance Tester",
            "IREB Certified Professional for Requirements Engineering – Foundation Level",
            "IREB Certified Professional for Requirements Engineering – RE@Agile Primer",
            "TMMi Certificado profesional: cómo mejorar el proceso de pruebas",
            "Y más…",
          ],
        },
      ],
    },
    {
      id: "microcertificaciones",
      short: "Videojuegos e IA, modalidad virtual",
      title: "Microcertificaciones",
      groups: [
        {
          items: [
            "Desarrollo de videojuegos. 30 horas, modalidad virtual. Posibilidad de doble titulación (GCM + Unity)",
            "Agentes de IA y automatización inteligente: Agentic AI con n8n, CrewAI y LangGraph. 25 horas, modalidad virtual",
          ],
        },
      ],
    },
  ],
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  [CONSULTORIA.path]: CONSULTORIA,
  [CAPACITACION.path]: CAPACITACION,
}

/** /consultoria/coaching → { page, id } (o null si no existe). */
export function findServiceDetail(path: string) {
  const m = path.replace(/\/$/, "").match(/^(\/[^/]+)\/([^/]+)$/)
  if (!m) return null
  const page = SERVICE_PAGES[m[1]]
  if (!page || !page.services.some((x) => x.id === m[2])) return null
  return { page, id: m[2] }
}
