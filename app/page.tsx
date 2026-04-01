"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import {
  ChevronDown, Menu, X, Zap, DollarSign, Settings, TrendingUp, Brain, Shield, Check,
  CheckCircle, Star, MessageCircle, Mail, Clock, Users, ArrowRight, Loader2,
  ShieldCheck, Instagram, Linkedin, Youtube, Twitter, Globe, Phone
} from "lucide-react"
import { PHONE_NUMBER } from "@/lib/copy"

// ─────────────────────────────────────────────────────────
// COPY — ALL TEXT STRINGS
// ─────────────────────────────────────────────────────────
const copy = {
  es: {
    // Announcement bar
    announcementBar: "⚡ FORMACIÓN EN VIVO · Sáb 19 de Abril, 2026 · 10 AM – 4 PM ET · n8n + WhatsApp API + IA · 6 Horas · 3 Workflows activos · Solo 50 estudiantes · $397 Early Bird →",
    // Navbar
    navLinks: ["¿Qué construirás?", "Los 3 Workflows", "Inversión", "FAQ"],
    navLinkIds: ["shift", "workflows", "value", "faq"],
    ctaNav: "Asegurar cupo — $397",
    ebLabel: "EB:",
    // Hero
    eyebrow: "⚡ Formación Intensiva · 6 horas · Solo 50 cupos · NJ · NY · USA · Nivel Principiante–Intermedio",
    heroH1: "Automatiza tu negocio. Construye 3 workflows activos en un sábado.",
    typewriterPrefix: "Al terminar el taller, tendrás",
    typewriterPhrases: [
      "3 workflows corriendo en producción. Hoy.",
      "un sistema que captura leads mientras duermes.",
      "emails personalizados enviándose solos, 24/7.",
      "un agente de IA respondiendo por ti con contexto.",
      "la habilidad que las agencias cobran $5,000 por implementar.",
    ],
    heroSub: "En este taller en vivo de 6 horas construyes — no teóricamente, en tiempo real, en tu propia cuenta — los 3 workflows de automatización que transforman cómo operas tu negocio desde el lunes siguiente.",
    trust: ["Sáb 10 AM – 4 PM ET", "3 Workflows activos", "Cobra $1,500–$5,000", "Garantía total"],
    trustIcons: ["clock", "zap", "dollar", "shield"],
    heroCta: "Asegurar mi cupo ($397) →",
    heroMicro: "6 horas · 3 workflows activos · nivel principiante-intermedio · garantía total si no automatizas nada",
    heroSecondary: "Ver los 3 workflows que construirás ↓",
    // Ticker
    tickerPrefix: "Construirás con →",
    tickerEnd: "🇺🇸 100% en español · For the Latino community in USA",
    // Workflows
    workflowsTitle: "No sales con teoría. Sales con 3 automatizaciones funcionando.",
    workflowsIntro: "Cada workflow que construyes en este taller tiene un nombre, una función real, y un impacto medible en tu negocio desde el día siguiente. No son ejercicios. Son tu infraestructura de automatización — deployada y activa.",
    wf1Badge: "Workflow 01",
    wf1Active: "⚡ Activo desde el día 1",
    wf1Title: "Lead Capture → CRM con notificación automática",
    wf1What: "Cada vez que alguien llena tu formulario, n8n lo captura, lo guarda en tu Google Sheets/Airtable como un CRM real, y te envía una notificación instantánea por WhatsApp. Nunca más un lead perdido.",
    wf1Impact: ["⏱️ Respuesta: < 2 min", "💰 Valor: $800–$1,500 como servicio", "🔄 24/7 automático"],
    wf1Stack: ["n8n", "Webhooks", "Google Sheets", "WhatsApp Business API"],
    wf2Badge: "Workflow 02",
    wf2Active: "⚡ Activo desde el día 1",
    wf2Title: "Email Marketing automático con secuencias personalizadas",
    wf2What: "Un nuevo suscriptor o cliente dispara automáticamente una secuencia de emails personalizados con su nombre, comportamiento y contexto — enviados por Resend en los momentos exactos. Tu email marketing corriendo solo mientras tú duermes.",
    wf2Impact: ["📈 Open rate: 45%+ (vs 22% promedio)", "💰 Valor: $1,200–$2,500 como servicio", "🔄 Escala infinita"],
    wf2Stack: ["n8n", "Resend", "Webhooks", "Google Sheets"],
    wf3Badge: "Workflow 03",
    wf3Active: "⚡ El más avanzado · Nivel Intermedio",
    wf3Title: "Agente de IA que responde con contexto real",
    wf3What: "Un mensaje llega (por WhatsApp, email, formulario). n8n extrae el contexto, lo envía a Claude o GPT con tu prompt personalizado, recibe la respuesta inteligente y la entrega automáticamente. Sin sonar a robot. Con el tono de tu marca.",
    wf3Impact: ["⚡ Respuesta: < 30 segundos", "💰 Valor: $2,000–$5,000 como servicio", "🤖 IA con contexto"],
    wf3Stack: ["n8n", "Claude API", "GPT-4", "Webhooks", "WhatsApp API"],
    workflowsSummary: 'Valor de mercado de estos 3 workflows implementados por una agencia: $4,500–$12,000. Tu inversión para aprender a construirlos tú: $397. Una sola vez.',
    // N8n Advantage
    n8nTitle: "¿Por qué n8n y no Zapier, Make o cualquier otro?",
    n8nIntro: "n8n no es solo otra herramienta de automatización. Es la plataforma open-source que usan equipos de ingeniería en startups Serie B, agencias enterprise y freelancers que quieren control total sin pagar por ejecución. Hay razones técnicas y económicas por las que aprenderás n8n específicamente.",
    n8nCards: [
      { icon: "dollar", color: "green", title: "Self-hosted = costo casi cero", body: "Zapier cobra por 'zap'. Make cobra por operación. n8n self-hosted: infraestructura propia, ejecuciones ilimitadas, ~$5/mes en Render o Railway.", stat: "vs $49–$299/mes en Zapier" },
      { icon: "settings", color: "violet", title: "Código cuando lo necesitas, visual cuando no", body: "n8n te da un editor visual Y la opción de escribir JavaScript/Python directamente en cualquier nodo. No hay límite artificial de lo que puedes construir.", stat: "200+ integraciones nativas" },
      { icon: "trending", color: "orange", title: "El skill más pagado en automatización", body: "Las agencias que implementan n8n cobran $150–$300/hr. Los freelancers especializados en n8n son escasos — demanda > oferta en USA.", stat: "$150–$300/hr como consultor n8n" },
      { icon: "brain", color: "cyan", title: "Conecta con cualquier LLM nativamente", body: "n8n tiene nodos nativos para Claude, GPT, Gemini, Ollama (local). Construyes agentes de IA reales sin escribir una sola línea de API client.", stat: "Claude · GPT · Gemini · Ollama — nativos" },
    ],
    n8nQuote: "n8n no es la herramienta más fácil del mercado. Es la más poderosa para quien la domina. Este taller existe para que la domines en 6 horas.",
    // Pain Points
    painTitle: "¿Cuántas de estas situaciones estás viviendo ahora mismo?",
    pains: [
      { icon: "⏰", title: "Pasas horas haciendo tareas repetitivas que deberían hacerse solas", sub: "(Copiar datos entre apps, enviar emails de seguimiento, actualizar spreadsheets...)" },
      { icon: "🔔", title: "Te enteras de un lead nuevo horas después — cuando ya está frío", sub: "" },
      { icon: "📧", title: "Tu email marketing es manual o no existe porque 'no tienes tiempo'", sub: "" },
      { icon: "🤖", title: "Sabes que la IA podría ayudarte pero no sabes cómo integrarla en tu negocio real", sub: "" },
      { icon: "💸", title: "Pagas $200–$500/mes en herramientas que no están conectadas entre sí", sub: "" },
    ],
    painFeaturedIcon: "🔥",
    painFeaturedTitle: "Intentaste automatizar con Zapier pero se volvió caro, limitado y frustrante",
    painFeaturedBody: "(El problema no era la automatización. El problema era la herramienta. n8n existe exactamente para resolver esto.)",
    // Shift
    shiftTitle: "La automatización no es sobre código. Es sobre pensar en sistemas.",
    shiftIntro: "Cuando entiendes cómo fluye la información entre herramientas — cómo un evento dispara una acción, que dispara otra, que entrega un resultado — puedes automatizar cualquier proceso de negocio. Eso es lo que aprenderás: no a memorizar nodos de n8n. A pensar en workflows.",
    shiftBlocks: [
      { num: "01", title: "Identificas el trigger", body: "Todo workflow empieza con un evento. Un formulario enviado. Un email recibido. Una hora del día. Un pago confirmado." },
      { num: "02", title: "Defines las acciones", body: "¿Qué debe pasar? ¿Guardar datos? ¿Enviar notificación? ¿Llamar una IA? ¿Esperar 24 horas y continuar? n8n lo hace." },
      { num: "03", title: 'Deploya y olvidas (en el buen sentido)', body: "El workflow corre. Solo. Siempre. Sin que abras la laptop. Sin que recuerdes hacerlo. Con logs de cada ejecución." },
    ],
    alertTitle: "¿Por qué aprender automatización en un taller en vivo de 6 horas?",
    alertItems: [
      "La automatización se aprende haciendo, no viendo. Un taller en vivo fuerza ejecución.",
      "Cada workflow que construyes en vivo queda deployado en tu cuenta — no es un ejercicio.",
      "Los errores que cometes EN VIVO y resuelves con el instructor no los cometes después.",
      "50 profesionales compartiendo el mismo problema en tiempo real = aprendizaje colectivo acelerado.",
      "Al terminar las 6 horas tienes infraestructura funcionando — no videos para 'ver después'.",
    ],
    // Curriculum
    curriculumTitle: "Tu sábado, hora a hora — la arquitectura de tus 6 horas:",
    modules: [
      { time: "10:00 AM", title: "Setup + Primer Workflow en Marcha", duration: "60 min", desc: "n8n instalado, primer webhook activo, arquitectura del taller explicada.", learn: "Cómo instalar y configurar n8n (cloud y self-hosted). La anatomía de un workflow: trigger, nodo, acción, output.", get: "n8n corriendo, conectado a tu cuenta de Google, y tu primer webhook respondiendo peticiones reales.", badge: null, isBreak: false },
      { time: "11:00 AM", title: "Workflow 1: Lead Capture → CRM → WhatsApp", duration: "60 min", desc: "Formulario → n8n → Google Sheets → notificación WhatsApp en tiempo real.", learn: "Integrar formularios web con n8n. Operaciones en Google Sheets. WhatsApp Business API: configuración y envío de mensajes.", get: "✅ Workflow 1 activo — tu formulario enviando leads a Sheets y notificándote por WhatsApp en < 2 minutos.", badge: "✅ WORKFLOW 1 DEPLOYADO", isBreak: false },
      { time: "12:00 PM", title: "BREAK + Q&A", duration: "30 min", desc: "Pausa. Revisión de los workflows hasta el momento. Preguntas en vivo.", learn: "", get: "", badge: null, isBreak: true },
      { time: "12:30 PM", title: "Workflow 2: Email Marketing Automático con Resend", duration: "60 min", desc: "Trigger por evento → segmentación → secuencia de emails personalizados.", learn: "Resend API: configuración, templates, envío programado. Lógica de ramificación en n8n (IF/Switch nodes). Personalización dinámica de contenido con variables.", get: "✅ Workflow 2 activo — secuencia de 3 emails que se dispara automáticamente con cada nuevo lead o evento en tu sistema.", badge: "✅ WORKFLOW 2 DEPLOYADO", isBreak: false },
      { time: "1:30 PM", title: "Workflow 3: Agente de IA con Claude/GPT", duration: "60 min", desc: "Webhook → extracción de contexto → LLM → respuesta automática inteligente.", learn: "Llamadas a Claude API y GPT-4 desde n8n. Diseño de prompts para respuestas con contexto real. Cómo evitar respuestas robóticas: el framework de voz de marca en IA.", get: "✅ Workflow 3 activo — un agente que recibe mensajes, los procesa con IA y responde automáticamente en < 30 segundos.", badge: "✅ WORKFLOW 3 DEPLOYADO", isBreak: false },
      /* { time: "2:30 PM", title: "BONUS: Cobra $1,500–$5,000 por estos Workflows", duration: "30 min", desc: "Cómo empaquetar, presentar y vender estos 3 workflows a clientes en USA.", learn: "El script exacto para vender automatización a negocios latinos. Cómo fijar precios: implementación + mantenimiento mensual. Dónde encontrar los primeros 3 clientes esta semana.", get: "Un portafolio de 3 workflows + propuesta de servicio lista + estrategia de pricing validada para el mercado NJ/NY/USA.", badge: null, isBreak: false }, */
      { time: "3:00 PM", title: "Cierre, comunidad y próximos pasos", duration: "30 min", desc: "Acceso a recursos, comunidad WhatsApp, próximas sesiones avanzadas.", learn: "", get: "", badge: null, isBreak: true },
    ],
    // Value Stack
    valueTitle: "Todo lo que recibes al inscribirte hoy:",
    valueItems: [
      { label: "Acceso al taller en vivo (6 horas)", price: "$597" },
      { label: "Grabación privada 7 días", price: "$197" },
      { label: "Los 3 workflows en código — tuyos para siempre (licencia comercial)", price: "$297" },
      { label: "Guía 'Cobra $1,500–$5,000 vendiendo automatizaciones en USA'", price: "$147" },
      { label: "Comunidad privada de WhatsApp (30 días de soporte)", price: "$97" },
      { label: "Script de ventas bilingüe para cerrar clientes de automatización", price: "$97" },
      { label: "Plantilla de propuesta de servicio de automatización", price: "$67" },
      { label: "Q&A en vivo + soporte técnico durante el taller", price: "$197" },
      { label: "Checklist de deploy y seguridad para n8n en producción", price: "$47" },
    ],
    valueTotalLabel: "Valor total de la formación:",
    valueTotalPrice: "$1,743",
    valueInvestLabel: "Tu inversión hoy:",
    valueInvestPrice: "$397",
    valueEbSub: "(Regular después del Early Bird: $497)",
    valueAnchor: "Una agencia cobra $2,500 solo por implementar el Workflow 1. Tú pagas $397 y aprendes a construir los 3. Una sola vez. Para siempre.",
    valueCta: "Asegurar mi cupo por $397 →",
    // Testimonials
    testimonialsTitle: "Lo que dicen quienes ya tienen sus workflows activos:",
    testimonials: [
      {
        before: "Tenía un SaaS de nutrición y respondía cada lead manualmente por WhatsApp. A veces tardaba horas. Perdía clientes sin saberlo...",
        during: "...cuando el Workflow 1 se activó y me llegó la notificación de WhatsApp en 8 segundos, casi me caigo de la silla.",
        after: "Ahora respondo leads en < 2 minutos automáticamente. Vendí el mismo sistema a 2 clientes en NJ por $1,800 cada uno.",
        author: "Roberto A.",
        role: "Emprendedor · Newark, NJ",
      },
      {
        before: "Era VA y quería expandir mis servicios pero no sabía programar. Sentía que la automatización no era para mí...",
        during: "...el módulo del agente de IA fue el momento donde todo cambió. Conecté Claude a n8n sin escribir una línea de código real.",
        after: "Ahora ofrezco 'automation setup' a mis clientes de VA a $500 adicionales por proyecto. Triply mis ingresos mensuales en 6 semanas.",
        author: "Patricia M.",
        role: "VA → Automation Specialist · Queens, NY",
      },
      {
        before: "Tenía Zapier con 3 zaps básicos y pagaba $79/mes. Quería más pero cada automatización nueva costaba más dinero...",
        during: "...cuando el instructor mostró n8n self-hosted en Railway por $5/mes con ejecuciones ilimitadas, cancelé Zapier en el descanso del mediodía.",
        after: "Migré todo a n8n, ahorré $900 al año, y ahora tengo 12 workflows activos que antes eran imposibles por el costo. Le vendí el setup a mi cliente por $2,200.",
        author: "Marcos L.",
        role: "Agencia Digital · Miami, FL",
      },
    ],
    statsBar: "⚡ 340+ alumnos formados · 🌎 NJ · NY · FL · TX · CA · IL · y más · ⭐ 4.9/5 valoración · 💼 $800 ingreso promedio primer mes como servicio",
    // Guarantee
    guaranteeTitle: "Garantía de automatización real",
    guaranteeBody: "Si completas el taller en vivo de 6 horas y al terminar no tienes al menos 1 de los 3 workflows activo y corriendo en tu cuenta, te devuelvo el 100% de tu inversión. Sin preguntas. Sin formularios. Sin esperas de 30 días.\n\nNo vendemos acceso a un webinar de automatización. Vendemos la certeza de que al terminar el sábado, tu negocio opera diferente que cuando empezaste la mañana.",
    // Instructor
    instructorTitle: "Tu instructor",
    instructorName: "Carlos Riquelme",
    instructorInitials: "CR",
    instructorBio: "Arquitecto de ecosistemas con 12 años innovando en tech. 10 productos construidos. 9 incubaciones impulsadas en Latam. Especializado en el mercado latino: emprendedores, equipos y builders que quieren construir negocios reales con herramientas de frontera.",
    instructorBadge: "🌎 Instructor bilingüe (Español/English) · n8n Certified",
    instructorStats: [
      { value: "10+", label: "Proyectos en tech e innovación" },
      { value: "340+", label: "Alumnos formados" },
      { value: "13+", label: "Años de experiencia" },
    ],
    // professor
    professorTitle: "Tu instructor",
    professorName: "Daniel Castiblanco",
    professorInitials: "DC",
    professorBio: "Ingeniero de software con 7+ años construyendo productos full‑stack a escala. Especialista en arquitectura TypeScript/Angular, DevOps con Docker y productos basados en IA. Creador de Sendell, plataforma de agentes IA en producción con clientes activos.",
    professorBadge: "🚀 Full‑stack & IA · DevOps",
    professorStats: [
      { value: "30+", label: "Proyectos deployados" },
      { value: "340+", label: "Alumnos formados" },
      { value: "7+", label: "Años de experiencia" },
    ],

    // FAQ
    faqTitle: "Preguntas frecuentes",
    faqs: [
      { q: "¿Necesito saber programar para asistir?", a: "No. n8n es una plataforma visual — la mayoría de los workflows se construyen conectando nodos con clicks. En el Workflow 3 (agente IA) usamos JavaScript básico en un nodo, que el instructor explica línea por línea. Si puedes usar Excel, puedes aprender n8n en este taller." },
      { q: "¿Qué herramientas necesito tener antes del taller?", a: "Una cuenta de Google (Google Sheets), una cuenta de n8n.cloud (plan gratuito sirve para el taller), y acceso a Resend (plan gratuito). WhatsApp Business API se configura durante el taller. Una semana antes recibirás una guía de setup de 15 minutos." },
      { q: "¿Los workflows que construya son míos? ¿Puedo usarlos con clientes?", a: "100% tuyos, con licencia comercial completa. Los recibirás como archivos JSON exportables de n8n — puedes importarlos en cualquier instancia y usarlos con todos los clientes que quieras. Sin regalías, sin restricciones." },
      { q: "¿Cuál es la diferencia entre n8n cloud y self-hosted?", a: "n8n cloud es el SaaS oficial — más fácil de empezar, tiene costo mensual basado en ejecuciones. Self-hosted significa instalar n8n en tu propio servidor (Railway, Render, VPS) — más control, ~$5/mes, ejecuciones ilimitadas. El taller cubre ambas opciones." },
      { q: "¿Por qué me registra por WhatsApp?", a: "Porque es el canal más directo para confirmar tu cupo, enviarte los materiales de preparación y el link del taller. Nada de spam — solo comunicación del evento." },
      { q: "¿Qué pasa si me quedo atrás durante el taller?", a: "Hay una pausa de sincronización a las 12:00 PM ET. Además, todos los participantes reciben los workflows base (archivos JSON) al inicio — si te quedas atrás, importas el archivo y continúas desde donde todos están." },
      { q: "¿Puedo ofrecer automatización como servicio después?", a: "Ese es el punto del módulo bonus. Los 3 workflows que construyes son exactamente lo que las agencias de automatización venden. El taller incluye pricing, propuesta de servicio y script de ventas para el mercado USA." },
      { q: "¿Está disponible el taller para latinos fuera de NJ/NY?", a: "Sí, absolutamente. El horario (10 AM – 4 PM ET) es sábado — 9 AM CT (TX) · 8 AM MT · 7 AM PT (CA) · funciona perfectamente para toda USA y para Latinoamérica (12 PM – 6 PM Ciudad de México)." },
    ],
    // Form
    formSectionTitle: "Asegura tu cupo — Solo quedan",
    formSectionSpots: "22 lugares",
    formSectionSub: "2 minutos · Registro por WhatsApp · Sin tarjeta de crédito aún",
    step0Title: "¡Reserva tu lugar en 2 minutos!",
    step0Body: "Solo 50 cupos · 3 workflows activos · $397 Early Bird",
    step0Btn: "Empezar →",
    step1Label: "¿Cuál es tu nombre? 👋",
    step1Hint: "Presiona Enter ↵",
    step2Label: "¿Cuál es tu WhatsApp? 📱",
    step2Sub: "Te enviamos el link del taller y los materiales aquí",
    step3Label: "¿Cómo describes tu negocio ahora mismo? 🏢",
    step3Options: [
      { emoji: "🚀", label: "Emprendedor / Solopreneur", sub: "Opero mi propio negocio" },
      { emoji: "💼", label: "Freelancer / VA / Consultor", sub: "Ofrezco servicios a clientes" },
      { emoji: "🏢", label: "Empleado que quiere ingresos extra", sub: "Trabajo para alguien pero quiero más" },
      { emoji: "🌐", label: "Agencia / Equipo", sub: "Somos un equipo pequeño" },
    ],
    step4Label: "¿Cuál es tu nivel con automatización y herramientas no-code? 🔧",
    step4Options: [
      { emoji: "🙈", label: "Nunca he automatizado nada", sub: "Zapier, Make, n8n — todo me es nuevo" },
      { emoji: "🤖", label: "He jugado con Zapier o Make", sub: "Algo de experiencia con automatización" },
      { emoji: "⚡", label: "Ya uso n8n o automatizo con código", sub: "Tengo experiencia técnica" },
    ],
    loadingTexts: ["Verificando disponibilidad...", "Preparando tus materiales...", "¡Listo! Redirigiendo a WhatsApp..."],
    successTitle: "¡Perfecto, {name}! Revisa tu WhatsApp 💬",
    successSub: "Te confirmamos tu cupo en menos de 2 horas.",
    successBtn: "Abrir WhatsApp de nuevo →",
    // Final CTA
    finalTitle: "3 workflows activos. Este sábado. Desde tu casa.",
    finalPhrases: ["6 horas. 3 workflows. Infraestructura real.", "Tu negocio automatizado desde el lunes.", "50 cupos. Sábado 10 AM ET. ¿Entras?"],
    finalCountdownLabel: "Early Bird $397 termina en:",
    finalCta: "SÍ, QUIERO MIS 3 WORKFLOWS POR $397 →",
    finalMicro: "→ Registro por WhatsApp · 3 cuotas de $165 · Garantía total · Nivel principiante-intermedio",
    finalSocial: "🔥 87 profesionales ya reservaron su cupo esta semana",
    // Sticky bar
    stickyText: "⚡ 22 cupos · Early Bird $397 (sube a $497) · n8n · WhatsApp API · IA ·",
    stickyBtn: "Reservar →",
    // Footer
    footerTagline: "Formación en automatización para la comunidad latina en USA.",
    footerEventTitle: "Automatización en Producción con n8n",
    footerDate: "Sábado 19 de Abril, 2026",
    footerTime: "10 AM – 4 PM ET · 100% online",
    footerLinks: ["Política de privacidad", "Términos", "Contacto"],
    footerWaQ: "¿Preguntas antes de inscribirte?",
    footerWaBtn: "Escribir por WhatsApp →",
    footerCopyright: "© 2026 AutoFlow Latino. Formación 100% online. Eastern Time (ET). NJ / NY / USA. Hecho con ❤️ para la comunidad latina.",
  },
  en: {
    announcementBar: "⚡ LIVE TRAINING · Sat April 19, 2026 · 10 AM – 4 PM ET · n8n + WhatsApp API + AI · 6 Hours · 3 Active Workflows · Only 50 students · $397 Early Bird →",
    navLinks: ["What you'll build?", "The 3 Workflows", "Investment", "FAQ"],
    navLinkIds: ["shift", "workflows", "value", "faq"],
    ctaNav: "Secure spot — $397",
    ebLabel: "EB:",
    eyebrow: "⚡ Intensive Training · 6 hours · Only 50 spots · NJ · NY · USA · Beginner–Intermediate",
    heroH1: "Automate your business. Build 3 active workflows in one Saturday.",
    typewriterPrefix: "When the workshop ends, you'll have",
    typewriterPhrases: [
      "3 workflows running in production. Today.",
      "a system that captures leads while you sleep.",
      "personalized emails sending themselves, 24/7.",
      "an AI agent responding for you with context.",
      "the skill agencies charge $5,000 to implement.",
    ],
    heroSub: "In this 6-hour live workshop you build — not theoretically, in real time, on your own account — the 3 automation workflows that transform how you operate your business starting the following Monday.",
    trust: ["Sat 10 AM – 4 PM ET", "3 Active Workflows", "Charge $1,500–$5,000", "Full guarantee"],
    trustIcons: ["clock", "zap", "dollar", "shield"],
    heroCta: "Secure my spot ($397) →",
    heroMicro: "6 hours · 3 active workflows · beginner-intermediate level · full guarantee if you don't automate anything",
    heroSecondary: "See the 3 workflows you'll build ↓",
    tickerPrefix: "You'll build with →",
    tickerEnd: "🇺🇸 100% en español · For the Latino community in USA",
    workflowsTitle: "You don't leave with theory. You leave with 3 working automations.",
    workflowsIntro: "Every workflow you build in this workshop has a name, a real function, and a measurable impact on your business from the next day. These aren't exercises. This is your automation infrastructure — deployed and active.",
    wf1Badge: "Workflow 01",
    wf1Active: "⚡ Active from day 1",
    wf1Title: "Lead Capture → CRM with automatic notification",
    wf1What: "Every time someone fills your form, n8n captures it, saves it to your Google Sheets/Airtable as a real CRM, and sends you an instant WhatsApp notification. Never lose a lead again.",
    wf1Impact: ["⏱️ Response: < 2 min", "💰 Value: $800–$1,500 as a service", "🔄 24/7 automatic"],
    wf1Stack: ["n8n", "Webhooks", "Google Sheets", "WhatsApp Business API"],
    wf2Badge: "Workflow 02",
    wf2Active: "⚡ Active from day 1",
    wf2Title: "Automatic Email Marketing with personalized sequences",
    wf2What: "A new subscriber or client automatically triggers a personalized email sequence with their name, behavior and context — sent by Resend at exactly the right moments. Your email marketing running solo while you sleep.",
    wf2Impact: ["📈 Open rate: 45%+ (vs 22% avg)", "💰 Value: $1,200–$2,500 as a service", "🔄 Infinite scale"],
    wf2Stack: ["n8n", "Resend", "Webhooks", "Google Sheets"],
    wf3Badge: "Workflow 03",
    wf3Active: "⚡ Most advanced · Intermediate Level",
    wf3Title: "AI Agent that responds with real context",
    wf3What: "A message arrives (via WhatsApp, email, form). n8n extracts the context, sends it to Claude or GPT with your custom prompt, receives the intelligent response and delivers it automatically. Without sounding robotic. In your brand's voice.",
    wf3Impact: ["⚡ Response: < 30 seconds", "💰 Value: $2,000–$5,000 as a service", "🤖 AI with context"],
    wf3Stack: ["n8n", "Claude API", "GPT-4", "Webhooks", "WhatsApp API"],
    workflowsSummary: 'Market value of these 3 workflows implemented by an agency: $4,500–$12,000. Your investment to learn to build them yourself: $397. One time.',
    n8nTitle: "Why n8n and not Zapier, Make, or anything else?",
    n8nIntro: "n8n isn't just another automation tool. It's the open-source platform used by engineering teams at Series B startups, enterprise agencies, and freelancers who want total control without paying per execution. There are technical and economic reasons you'll learn n8n specifically.",
    n8nCards: [
      { icon: "dollar", color: "green", title: "Self-hosted = near-zero cost", body: "Zapier charges per 'zap'. Make charges per operation. n8n self-hosted: your own infrastructure, unlimited executions, ~$5/month on Render or Railway.", stat: "vs $49–$299/month on Zapier" },
      { icon: "settings", color: "violet", title: "Code when you need it, visual when you don't", body: "n8n gives you a visual editor AND the option to write JavaScript/Python directly in any node. No artificial limit on what you can build.", stat: "200+ native integrations" },
      { icon: "trending", color: "orange", title: "The highest-paid skill in automation", body: "Agencies implementing n8n charge $150–$300/hr. n8n-specialized freelancers are scarce — demand > supply in the USA.", stat: "$150–$300/hr as n8n consultant" },
      { icon: "brain", color: "cyan", title: "Connect to any LLM natively", body: "n8n has native nodes for Claude, GPT, Gemini, Ollama (local). Build real AI agents without writing a single line of API client code.", stat: "Claude · GPT · Gemini · Ollama — native" },
    ],
    n8nQuote: "n8n isn't the easiest tool on the market. It's the most powerful for those who master it. This workshop exists so you master it in 6 hours.",
    painTitle: "How many of these situations are you living right now?",
    pains: [
      { icon: "⏰", title: "You spend hours on repetitive tasks that should run themselves", sub: "(Copying data between apps, sending follow-up emails, updating spreadsheets...)" },
      { icon: "🔔", title: "You find out about a new lead hours later — when they've already gone cold", sub: "" },
      { icon: "📧", title: "Your email marketing is manual or doesn't exist because 'you don't have time'", sub: "" },
      { icon: "🤖", title: "You know AI could help you but don't know how to integrate it in your real business", sub: "" },
      { icon: "💸", title: "You pay $200–$500/month in tools that aren't connected to each other", sub: "" },
    ],
    painFeaturedIcon: "🔥",
    painFeaturedTitle: "You tried automating with Zapier but it got expensive, limited, and frustrating",
    painFeaturedBody: "(The problem wasn't automation. The problem was the tool. n8n exists exactly to solve this.)",
    shiftTitle: "Automation isn't about code. It's about thinking in systems.",
    shiftIntro: "When you understand how information flows between tools — how an event triggers an action, that triggers another, that delivers a result — you can automate any business process. That's what you'll learn: not to memorize n8n nodes. To think in workflows.",
    shiftBlocks: [
      { num: "01", title: "You identify the trigger", body: "Every workflow starts with an event. A form submitted. An email received. A time of day. A payment confirmed." },
      { num: "02", title: "You define the actions", body: "What should happen? Save data? Send notification? Call an AI? Wait 24 hours and continue? n8n does it." },
      { num: "03", title: "Deploy and forget (in the good way)", body: "The workflow runs. Alone. Always. Without you opening your laptop. Without remembering to do it. With logs of every execution." },
    ],
    alertTitle: "Why learn automation in a 6-hour live workshop?",
    alertItems: [
      "Automation is learned by doing, not watching. A live workshop forces execution.",
      "Every workflow you build live stays deployed in your account — it's not an exercise.",
      "The mistakes you make LIVE and solve with the instructor, you don't make again.",
      "50 professionals sharing the same problem in real time = accelerated collective learning.",
      "When the 6 hours end you have working infrastructure — not videos to 'watch later'.",
    ],
    curriculumTitle: "Your Saturday, hour by hour — the architecture of your 6 hours:",
    modules: [
      { time: "10:00 AM", title: "Setup + First Workflow Running", duration: "60 min", desc: "n8n installed, first webhook active, workshop architecture explained.", learn: "How to install and configure n8n (cloud and self-hosted). The anatomy of a workflow: trigger, node, action, output.", get: "n8n running, connected to your Google account, and your first webhook responding to real requests.", badge: null, isBreak: false },
      { time: "11:00 AM", title: "Workflow 1: Lead Capture → CRM → WhatsApp", duration: "60 min", desc: "Form → n8n → Google Sheets → WhatsApp notification in real time.", learn: "Integrate web forms with n8n. Google Sheets operations. WhatsApp Business API: setup and message sending.", get: "✅ Workflow 1 active — your form sending leads to Sheets and notifying you via WhatsApp in < 2 minutes.", badge: "✅ WORKFLOW 1 DEPLOYED", isBreak: false },
      { time: "12:00 PM", title: "BREAK + Q&A", duration: "30 min", desc: "Break. Review of workflows so far. Live Q&A.", learn: "", get: "", badge: null, isBreak: true },
      { time: "12:30 PM", title: "Workflow 2: Automatic Email Marketing with Resend", duration: "60 min", desc: "Event trigger → segmentation → personalized email sequence.", learn: "Resend API: setup, templates, scheduled sending. Branching logic in n8n (IF/Switch nodes). Dynamic content personalization with variables.", get: "✅ Workflow 2 active — 3-email sequence that fires automatically with each new lead or event in your system.", badge: "✅ WORKFLOW 2 DEPLOYED", isBreak: false },
      { time: "1:30 PM", title: "Workflow 3: AI Agent with Claude/GPT", duration: "60 min", desc: "Webhook → context extraction → LLM → intelligent automatic response.", learn: "Claude API and GPT-4 calls from n8n. Prompt design for responses with real context. How to avoid robotic responses: the brand voice framework in AI.", get: "✅ Workflow 3 active — an agent that receives messages, processes them with AI and responds automatically in < 30 seconds.", badge: "✅ WORKFLOW 3 DEPLOYED", isBreak: false },
      { time: "2:30 PM", title: "BONUS: Charge $1,500–$5,000 for these Workflows", duration: "30 min", desc: "How to package, present and sell these 3 workflows to clients in the USA.", learn: "The exact script to sell automation to Latino businesses. How to price: implementation + monthly maintenance. Where to find the first 3 clients this week.", get: "A portfolio of 3 workflows + ready service proposal + validated pricing strategy for the NJ/NY/USA market.", badge: null, isBreak: false },
      { time: "3:00 PM", title: "Closing, community and next steps", duration: "30 min", desc: "Resource access, WhatsApp community, upcoming advanced sessions.", learn: "", get: "", badge: null, isBreak: true },
    ],
    valueTitle: "Everything you get when you enroll today:",
    valueItems: [
      { label: "Live workshop access (6 hours)", price: "$597" },
      { label: "Private 7-day recording", price: "$197" },
      { label: "All 3 workflows in code — yours forever (commercial license)", price: "$297" },
      { label: "Guide 'Charge $1,500–$5,000 selling automations in the USA'", price: "$147" },
      { label: "Private WhatsApp community (30 days of support)", price: "$97" },
      { label: "Bilingual sales script to close automation clients", price: "$97" },
      { label: "Automation service proposal template", price: "$67" },
      { label: "Live Q&A + technical support during the workshop", price: "$197" },
      { label: "Deploy and security checklist for n8n in production", price: "$47" },
    ],
    valueTotalLabel: "Total training value:",
    valueTotalPrice: "$1,743",
    valueInvestLabel: "Your investment today:",
    valueInvestPrice: "$397",
    valueEbSub: "(Regular after Early Bird: $497)",
    valueAnchor: "An agency charges $2,500 just to implement Workflow 1. You pay $397 and learn to build all 3. One time. Forever.",
    valueCta: "Secure my spot for $397 →",
    testimonialsTitle: "What those who already have their workflows active say:",
    testimonials: [
      {
        before: "I had a nutrition SaaS and answered each lead manually on WhatsApp. Sometimes it took hours. I was losing clients without knowing it...",
        during: "...when Workflow 1 activated and I got the WhatsApp notification in 8 seconds, I almost fell off my chair.",
        after: "Now I respond to leads in < 2 minutes automatically. Sold the same system to 2 clients in NJ for $1,800 each.",
        author: "Roberto A.",
        role: "Entrepreneur · Newark, NJ",
      },
      {
        before: "I was a VA and wanted to expand my services but didn't know how to code. I felt automation wasn't for me...",
        during: "...the AI agent module was the moment everything changed. I connected Claude to n8n without writing a single line of real code.",
        after: "Now I offer 'automation setup' to my VA clients at an extra $500 per project. Tripled my monthly income in 6 weeks.",
        author: "Patricia M.",
        role: "VA → Automation Specialist · Queens, NY",
      },
      {
        before: "I had Zapier with 3 basic zaps and paid $79/month. I wanted more but every new automation cost more money...",
        during: "...when the instructor showed n8n self-hosted on Railway for $5/month with unlimited executions, I cancelled Zapier at the lunch break.",
        after: "Migrated everything to n8n, saved $900/year, and now have 12 active workflows that were previously impossible because of cost. Sold the setup to my client for $2,200.",
        author: "Marcos L.",
        role: "Digital Agency · Miami, FL",
      },
    ],
    statsBar: "⚡ 340+ students trained · 🌎 NJ · NY · FL · TX · CA · IL · and more · ⭐ 4.9/5 rating · 💼 $800 average income first month as a service",
    guaranteeTitle: "Real automation guarantee",
    guaranteeBody: "If you complete the 6-hour live workshop and at the end don't have at least 1 of the 3 workflows active and running in your account, I'll refund 100% of your investment. No questions. No forms. No 30-day waits.\n\nWe don't sell automation webinar access. We sell the certainty that when Saturday ends, your business operates differently than when you started the morning.",
    
    instructorTitle: "Your instructor",
    instructorName: "Carlos Riquelme",
    instructorInitials: "CR",
    instructorBio: "Ecosystem architect with 12 years of experience in tech innovation. 10 products built. 9 incubations launched in Latin America. Specialized in the Latin American market: entrepreneurs, teams, and builders who want to build real businesses with cutting-edge tools.",
    instructorBadge: "🌎 Bilingual instructor (Español/English) · n8n Certified",
    instructorStats: [
      { value: "10+", label: "Workflows deployed" },
      { value: "340+", label: "Students trained" },
      { value: "13+", label: "Years of experience" },
    ],

    professorName: "Daniel Castiblanco",
    professorInitials: "DC",
    professorBio: "Software engineer with 7+ years of experience building full-stack products at scale. Specialist in TypeScript/Angular architecture, DevOps with Docker, and AI-based products. Creator of Sendell, a production AI agent platform with active clients.",
    professorBadge: "🚀 Full‑stack & IA · DevOps",
    professorStats: [
      { value: "30+", label: "Workflows deployed" },
      { value: "340+", label: "Students trained" },
      { value: "7+", label: "Years of experience" },
    ],

    faqTitle: "Frequently asked questions",
    faqs: [
      { q: "Do I need to know how to code to attend?", a: "No. n8n is a visual platform — most workflows are built by connecting nodes with clicks. In Workflow 3 (AI agent) we use basic JavaScript in one node, which the instructor explains line by line. If you can use Excel, you can learn n8n in this workshop." },
      { q: "What tools do I need before the workshop?", a: "A Google account (Google Sheets), an n8n.cloud account (free plan works for the workshop), and access to Resend (free plan). WhatsApp Business API is configured during the workshop. One week before you'll receive a 15-minute setup guide." },
      { q: "Are the workflows I build mine? Can I use them with clients?", a: "100% yours, with full commercial license. You'll receive them as n8n exportable JSON files — you can import them on any instance and use them with as many clients as you want. No royalties, no restrictions." },
      { q: "What's the difference between n8n cloud and self-hosted?", a: "n8n cloud is the official SaaS — easier to start, has a monthly cost based on executions. Self-hosted means installing n8n on your own server (Railway, Render, VPS) — more control, ~$5/month, unlimited executions. The workshop covers both options." },
      { q: "Why does it register me by WhatsApp?", a: "Because it's the most direct channel to confirm your spot, send you preparation materials and the workshop link. No spam — only event communication." },
      { q: "What if I fall behind during the workshop?", a: "There's a sync break at 12:00 PM ET. Also, all participants receive the base workflows (JSON files) at the start — if you fall behind, you import the file and continue from where everyone is." },
      { q: "Can I offer automation as a service afterwards?", a: "That's the point of the bonus module. The 3 workflows you build are exactly what automation agencies sell. The workshop includes pricing, service proposal and sales script for the USA market." },
      { q: "Is the workshop available for Latinos outside NJ/NY?", a: "Yes, absolutely. The schedule (10 AM – 4 PM ET) is Saturday — 9 AM CT (TX) · 8 AM MT · 7 AM PT (CA) · works perfectly for all of the USA and Latin America (12 PM – 6 PM Mexico City)." },
    ],
    formSectionTitle: "Secure your spot — Only",
    formSectionSpots: "22 spots left",
    formSectionSub: "2 minutes · WhatsApp registration · No credit card yet",
    step0Title: "Reserve your spot in 2 minutes!",
    step0Body: "Only 50 spots · 3 active workflows · $397 Early Bird",
    step0Btn: "Start →",
    step1Label: "What's your name? 👋",
    step1Hint: "Press Enter ↵",
    step2Label: "What's your WhatsApp? 📱",
    step2Sub: "We send you the workshop link and materials here",
    step3Label: "How do you describe your business right now? 🏢",
    step3Options: [
      { emoji: "🚀", label: "Entrepreneur / Solopreneur", sub: "I run my own business" },
      { emoji: "💼", label: "Freelancer / VA / Consultant", sub: "I offer services to clients" },
      { emoji: "🏢", label: "Employee wanting extra income", sub: "I work for someone but want more" },
      { emoji: "🌐", label: "Agency / Team", sub: "We're a small team" },
    ],
    step4Label: "What's your level with automation and no-code tools? 🔧",
    step4Options: [
      { emoji: "🙈", label: "Never automated anything", sub: "Zapier, Make, n8n — all new to me" },
      { emoji: "🤖", label: "I've played with Zapier or Make", sub: "Some automation experience" },
      { emoji: "⚡", label: "I already use n8n or automate with code", sub: "I have technical experience" },
    ],
    loadingTexts: ["Checking availability...", "Preparing your materials...", "Ready! Redirecting to WhatsApp..."],
    successTitle: "Perfect, {name}! Check your WhatsApp 💬",
    successSub: "We'll confirm your spot in less than 2 hours.",
    successBtn: "Open WhatsApp again →",
    finalTitle: "3 active workflows. This Saturday. From your home.",
    finalPhrases: ["6 hours. 3 workflows. Real infrastructure.", "Your business automated starting Monday.", "50 spots. Saturday 10 AM ET. Are you in?"],
    finalCountdownLabel: "Early Bird $397 ends in:",
    finalCta: "YES, I WANT MY 3 WORKFLOWS FOR $397 →",
    finalMicro: "→ WhatsApp registration · 3 x $165 installments · Full guarantee · Beginner-intermediate level",
    finalSocial: "🔥 87 professionals already reserved their spot this week",
    stickyText: "⚡ 22 spots · Early Bird $397 (goes to $497) · n8n · WhatsApp API · AI ·",
    stickyBtn: "Reserve →",
    footerTagline: "Automation training for the Latino community in the USA.",
    footerEventTitle: "Automation in Production with n8n",
    footerDate: "Saturday April 19, 2026",
    footerTime: "10 AM – 4 PM ET · 100% online",
    footerLinks: ["Privacy Policy", "Terms", "Contact"],
    footerWaQ: "Questions before enrolling?",
    footerWaBtn: "Message on WhatsApp →",
    footerCopyright: "© 2026 AutoFlow Latino. 100% online training. Eastern Time (ET). NJ / NY / USA. Made with ❤️ for the Latino community.",
  },
}

// ─────────────────────────────────────────────────────────
// TECH BADGES
// ─────────────────────────────────────────────────────────
const techBadges = [
  { label: "n8n ⚡", color: "#8B5CF6" },
  { label: "WhatsApp API 💬", color: "#22C55E" },
  { label: "Resend 📧", color: "#3B82F6" },
  { label: "Google Sheets 📊", color: "#10B981" },
  { label: "Airtable 🟡", color: "#EAB308" },
  { label: "Claude AI 🧠", color: "#F97316" },
  { label: "GPT-4 🤖", color: "#22D3EE" },
  { label: "Webhooks 🔗", color: "#22D3EE" },
  { label: "Vercel ▲", color: "#FAFAFA" },
]

// ─────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// ─────────────────────────────────────────────────────────
// HELPER: format time
// ─────────────────────────────────────────────────────────
function formatTime(s: number) {
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
}

// ─────────────────────────────────────────────────────────
// WORKFLOW NODE DIAGRAM
// ─────────────────────────────────────────────────────────
function WorkflowDiagram({ nodes, isHovered }: { nodes: { label: string; color: string }[]; isHovered: boolean }) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {nodes.map((node, i) => (
        <div key={i} className="flex items-center gap-1">
          <motion.div
            className="px-2 py-1 rounded text-xs font-mono border whitespace-nowrap"
            style={{ borderColor: node.color + "66", backgroundColor: node.color + "22", color: node.color }}
            animate={{ boxShadow: isHovered ? `0 0 8px ${node.color}55` : "none" }}
            transition={{ duration: 0.3 }}
          >
            {node.label}
          </motion.div>
          {i < nodes.length - 1 && (
            <div className="relative flex items-center" style={{ width: 28 }}>
              <div className="w-full border-t border-dashed border-zinc-600" />
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-violet-500"
                style={{ left: 0 }}
                animate={{ x: [0, 24] }}
                transition={{ duration: isHovered ? 0.5 : 1.5, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// TYPEWRITER HOOK
// ─────────────────────────────────────────────────────────
function useTypewriter(phrases: string[], reducedMotion: boolean) {
  const [display, setDisplay] = useState("")
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(phrases[0])
      return
    }
    const phrase = phrases[phraseIdx]
    if (!isDeleting) {
      if (display.length < phrase.length) {
        timeout.current = setTimeout(() => setDisplay(phrase.slice(0, display.length + 1)), 55)
      } else {
        timeout.current = setTimeout(() => setIsDeleting(true), 2200)
      }
    } else {
      if (display.length > 0) {
        timeout.current = setTimeout(() => setDisplay(display.slice(0, -1)), 28)
      } else {
        setIsDeleting(false)
        setPhraseIdx((phraseIdx + 1) % phrases.length)
        timeout.current = setTimeout(() => { }, 400)
      }
    }
    return () => { if (timeout.current) clearTimeout(timeout.current) }
  }, [display, isDeleting, phraseIdx, phrases, reducedMotion])

  return display
}

// ─────────────────────────────────────────────────────────
// COUNTDOWN HOOK
// ─────────────────────────────────────────────────────────
function useCountdown(seconds: number) {
  const [remaining, setRemaining] = useState(seconds)
  useEffect(() => {
    const interval = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000)
    return () => clearInterval(interval)
  }, [])
  return remaining
}

// ─────────────────────────────────────────────────────────
// TILT CARD
// ─────────────────────────────────────────────────────────
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [6, -6]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-100, 100], [-6, 6]), { stiffness: 300, damping: 30 })

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  function handleLeave() { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function AutomationLanding() {
  const [lang, setLang] = useState<"es" | "en">("es")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formStep, setFormStep] = useState(-1) // -1 = not started
  const [formName, setFormName] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formBusiness, setFormBusiness] = useState("")
  const [formLevel, setFormLevel] = useState("")
  const [formShake, setFormShake] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [loadingTextIdx, setLoadingTextIdx] = useState(0)
  const [wfHovered, setWfHovered] = useState<number | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const reducedMotion = useRef(false)

  const t = copy[lang]
  const countdown = useCountdown(72 * 3600)
  const typewritten = useTypewriter(t.typewriterPhrases, reducedMotion.current)
  const finalTypewritten = useTypewriter(t.finalPhrases, reducedMotion.current)

  // PLACEHOLDER — replace with your WhatsApp number

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      setStickyVisible(window.scrollY > 2000)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // IntersectionObserver for form visibility (hide sticky bar)
  useEffect(() => {
    if (!formRef.current) return
    const obs = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.1 })
    obs.observe(formRef.current)
    return () => obs.disconnect()
  }, [])

  // Sticky bar delay
  useEffect(() => {
    const t = setTimeout(() => setStickyVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  // Loading cycle
  useEffect(() => {
    if (formStep !== 4) return
    let i = 0
    const iv = setInterval(() => {
      i++
      if (i < t.loadingTexts.length) {
        setLoadingTextIdx(i)
      } else {
        clearInterval(iv)
        // Build WA message
        const msgES = `Hola! Quiero inscribirme al taller "Automatización en 6 Horas con n8n" ⚡\n\n📝 Nombre: ${formName}\n📱 WhatsApp: ${formPhone}\n🏢 Negocio: ${formBusiness}\n🔧 Nivel: ${formLevel}\n\nPor favor confírmenme mi cupo Early Bird de $397. ¡Gracias!`
        const msgEN = `Hi! I want to enroll in the "Automation in 6 Hours with n8n" workshop ⚡\n\n📝 Name: ${formName}\n📱 WhatsApp: ${formPhone}\n🏢 Business: ${formBusiness}\n🔧 Level: ${formLevel}\n\nPlease confirm my Early Bird spot at $397. Thank you!`
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(lang === "es" ? msgES : msgEN)}`
        window.open(url, "_blank")
        setFormSuccess(true)
      }
    }, 600)
    return () => clearInterval(iv)
  }, [formStep]) // eslint-disable-line

  // Focus inputs on step change
  useEffect(() => {
    if (formStep === 0) setTimeout(() => nameInputRef.current?.focus(), 100)
    if (formStep === 1) setTimeout(() => phoneInputRef.current?.focus(), 100)
  }, [formStep])

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    if (formStep < 0) setFormStep(0)
  }, [formStep])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }, [])

  function validateStep0() {
    if (formName.trim().length < 2) { shake(); return }
    setFormStep(1)
  }
  function validateStep1() {
    const digits = formPhone.replace(/\D/g, "")
    if (digits.length < 10) { shake(); return }
    setFormStep(2)
  }
  function shake() {
    setFormShake(true)
    setTimeout(() => setFormShake(false), 500)
  }

  const wf1Nodes = [
    { label: "Form 📋", color: "#8B5CF6" },
    { label: "n8n ⚡", color: "#8B5CF6" },
    { label: "Sheets 📊", color: "#10B981" },
    { label: "WhatsApp 💬", color: "#22C55E" },
  ]
  const wf2Nodes = [
    { label: "Event 🎯", color: "#22D3EE" },
    { label: "n8n ⚡", color: "#8B5CF6" },
    { label: "Resend 📧", color: "#3B82F6" },
    { label: "Email ✉️", color: "#3B82F6" },
  ]
  const wf3Nodes = [
    { label: "Webhook 🔗", color: "#22D3EE" },
    { label: "n8n ⚡", color: "#8B5CF6" },
    { label: "Claude/GPT 🧠", color: "#F97316" },
    { label: "Reply 💬", color: "#22C55E" },
  ]

  const iconMap: Record<string, JSX.Element> = {
    dollar: <DollarSign className="w-5 h-5 text-green-400" />,
    settings: <Settings className="w-5 h-5 text-violet-400" />,
    trending: <TrendingUp className="w-5 h-5 text-orange-400" />,
    brain: <Brain className="w-5 h-5 text-cyan-400" />,
    clock: <Clock className="w-4 h-4" />,
    zap: <Zap className="w-4 h-4" />,
    shield: <Shield className="w-4 h-4" />,
  }

  const successTitle = t.successTitle.replace("{name}", formName)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans overflow-x-hidden">
      <style>{`
        @keyframes flowDash { to { background-position: 100% 0; } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(139,92,246,0.4); } 50% { box-shadow: 0 0 0 8px rgba(139,92,246,0); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }
        .shake { animation: shake 0.4s ease; }
        .ticker-track { display: flex; gap: 2rem; animation: ticker 40s linear infinite; white-space: nowrap; }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .bar-ticker { display: flex; gap: 2rem; animation: ticker 30s linear infinite; white-space: nowrap; }
        .bar-ticker:hover { animation-play-state: paused; }
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      <div
        className="bg-violet-600 text-white text-sm font-medium overflow-hidden cursor-pointer py-2"
        onClick={scrollToForm}
        role="banner"
        aria-label="Announcement"
      >
        <div className="bar-ticker">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="shrink-0">{t.announcementBar}</span>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800" : "bg-transparent"}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-violet-500 border-2 border-violet-400" />
              <div className="w-6 border-t border-dashed border-violet-400" />
              <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-cyan-300" />
            </div>
            <span className="font-black text-lg tracking-tight text-zinc-50">AutoFlow<span className="text-violet-400">Latino</span></span>
          </div>

          {/* Center links (desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {t.navLinks.map((link, i) => (
              <button key={i} onClick={() => scrollTo(t.navLinkIds[i])} className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
                {link}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Countdown */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-orange-400">
              <span className="text-zinc-500">{t.ebLabel}</span>
              <span>{formatTime(countdown)}</span>
            </div>
            {/* Lang toggle */}
            <div className="flex items-center bg-zinc-800 rounded-full p-0.5 border border-zinc-700">
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === l ? "bg-violet-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            {/* CTA */}
            <button
              onClick={scrollToForm}
              className="hidden md:flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              {t.ctaNav}
            </button>
            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-zinc-400" aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden bg-zinc-900 border-b border-zinc-800 px-4 py-4 flex flex-col gap-3"
            >
              {t.navLinks.map((link, i) => (
                <button key={i} onClick={() => scrollTo(t.navLinkIds[i])} className="text-left text-zinc-300 hover:text-zinc-50 py-2 border-b border-zinc-800 last:border-0">
                  {link}
                </button>
              ))}
              <button onClick={scrollToForm} className="bg-orange-500 text-white font-bold py-3 rounded-lg mt-2">
                {t.ctaNav}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden pt-8">
        {/* Background node decoration */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {[
            { top: "15%", left: "5%", label: "Webhook" },
            { top: "30%", left: "20%", label: "n8n" },
            { top: "60%", left: "8%", label: "Sheets" },
            { top: "75%", left: "25%", label: "WhatsApp" },
            { top: "20%", right: "5%", label: "Claude" },
            { top: "50%", right: "8%", label: "Resend" },
            { top: "70%", right: "15%", label: "GPT-4" },
          ].map((node, i) => (
            <motion.div
              key={i}
              className="absolute px-2 py-1 rounded border border-zinc-700 bg-zinc-900 text-zinc-500 text-xs font-mono opacity-[0.07]"
              style={{ top: node.top, left: (node as any).left, right: (node as any).right }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              {node.label}
            </motion.div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-16 grid lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left: Text */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {/* Eyebrow */}
            <motion.div variants={fadeUp}>
              <span className="inline-block text-xs sm:text-sm border border-violet-500/40 bg-violet-500/10 text-violet-300 px-4 py-2 rounded-full font-medium">
                {t.eyebrow}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-50 text-balance leading-tight">
              {t.heroH1}
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeUp} className="text-base sm:text-lg text-zinc-400 leading-relaxed">
              <span>{t.typewriterPrefix} </span>
              <span className="text-zinc-50 font-semibold">{typewritten}</span>
              <motion.span
                className="text-violet-400 font-bold"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >|</motion.span>
            </motion.div>

            {/* Sub */}
            <motion.p variants={fadeUp} className="text-base text-zinc-400 leading-relaxed max-w-lg">
              {t.heroSub}
            </motion.p>

            {/* Trust chips */}
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-2">
              {t.trust.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-full text-sm text-zinc-300">
                  {i === 0 && <Clock className="w-3.5 h-3.5 text-violet-400" />}
                  {i === 1 && <Zap className="w-3.5 h-3.5 text-violet-400" />}
                  {i === 2 && <DollarSign className="w-3.5 h-3.5 text-green-400" />}
                  {i === 3 && <Shield className="w-3.5 h-3.5 text-cyan-400" />}
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={scrollToForm}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-100"
              >
                {t.heroCta}
              </button>
              <button
                onClick={() => scrollTo("workflows")}
                className="flex items-center justify-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-50 font-semibold px-6 py-4 rounded-xl transition-all text-sm"
              >
                {t.heroSecondary}
              </button>
            </motion.div>

            <motion.p variants={fadeUp} className="text-xs text-zinc-500">
              {t.heroMicro}
            </motion.p>
          </motion.div>

          {/* Right: n8n Workflow Monitor */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden"
              style={{ transform: "rotate(-2deg)" }}
            >
              {/* Editor top bar */}
              <div className="bg-zinc-800 px-4 py-2.5 flex items-center gap-2 border-b border-zinc-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-zinc-400 font-mono ml-2">n8n · Workflow Editor</span>
              </div>
              {/* Workflows */}
              <div className="p-4 flex flex-col gap-5">
                {[
                  { label: "Lead Capture CRM", nodes: wf1Nodes },
                  { label: "Email Marketing", nodes: wf2Nodes },
                  { label: "AI Agent", nodes: wf3Nodes },
                ].map((wf, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-zinc-400 font-mono">{wf.label}</span>
                    </div>
                    <WorkflowDiagram nodes={wf.nodes} isHovered={false} />
                  </div>
                ))}
              </div>
              {/* Status bar */}
              <div className="bg-zinc-800 border-t border-zinc-700 px-4 py-2 flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs text-zinc-400 font-mono">3 workflows active · Last run: 2s ago · 847 executions</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TECH TICKER ── */}
      <div className="bg-zinc-800 border-y border-zinc-700 py-3 overflow-hidden">
        <div className="flex items-center gap-4">
          <span className="shrink-0 pl-4 text-xs text-zinc-400 font-semibold">{t.tickerPrefix}</span>
          <div className="overflow-hidden flex-1">
            <div className="ticker-track">
              {[...techBadges, ...techBadges].map((b, i) => (
                <span
                  key={i}
                  className="shrink-0 text-xs font-mono font-semibold px-3 py-1 rounded-full border"
                  style={{ color: b.color, borderColor: b.color + "44", backgroundColor: b.color + "18" }}
                >
                  {b.label}
                </span>
              ))}
              <span className="shrink-0 text-xs text-zinc-400 px-4">{t.tickerEnd}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── WORKFLOWS ── */}
      <section id="workflows" className="py-24 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4 text-balance">
              {t.workflowsTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t.workflowsIntro}
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {/* Workflow Card 1 */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 sm:p-8 hover:border-violet-500/40 transition-colors"
              onMouseEnter={() => setWfHovered(1)} onMouseLeave={() => setWfHovered(null)}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-violet-600/20 border border-violet-500/40 text-violet-300 text-xs font-mono px-3 py-1 rounded-full">{t.wf1Badge}</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-xs text-green-400 font-mono">LIVE</span></span>
                <span className="text-xs text-zinc-400">{t.wf1Active}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-4">{t.wf1Title}</h3>
              <div className="mb-5 overflow-x-auto">
                <WorkflowDiagram nodes={wf1Nodes} isHovered={wfHovered === 1} />
              </div>
              <p className="text-zinc-400 leading-relaxed mb-5">{t.wf1What}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {t.wf1Impact.map((item, i) => <span key={i} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full">{item}</span>)}
              </div>
              <div className="flex flex-wrap gap-2">
                {t.wf1Stack.map((s, i) => <span key={i} className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-1 rounded">{s}</span>)}
              </div>
            </motion.div>

            {/* Workflow Card 2 */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/40 transition-colors"
              onMouseEnter={() => setWfHovered(2)} onMouseLeave={() => setWfHovered(null)}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-cyan-600/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono px-3 py-1 rounded-full">{t.wf2Badge}</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-xs text-green-400 font-mono">LIVE</span></span>
                <span className="text-xs text-zinc-400">{t.wf2Active}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-4">{t.wf2Title}</h3>
              <div className="mb-5 overflow-x-auto">
                <WorkflowDiagram nodes={wf2Nodes} isHovered={wfHovered === 2} />
              </div>
              <p className="text-zinc-400 leading-relaxed mb-5">{t.wf2What}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {t.wf2Impact.map((item, i) => <span key={i} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full">{item}</span>)}
              </div>
              <div className="flex flex-wrap gap-2">
                {t.wf2Stack.map((s, i) => <span key={i} className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{s}</span>)}
              </div>
            </motion.div>

            {/* Workflow Card 3 */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 sm:p-8 hover:border-orange-500/40 transition-colors"
              onMouseEnter={() => setWfHovered(3)} onMouseLeave={() => setWfHovered(null)}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-orange-600/20 border border-orange-500/40 text-orange-300 text-xs font-mono px-3 py-1 rounded-full">{t.wf3Badge}</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /><span className="text-xs text-orange-400 font-mono">ADVANCED</span></span>
                <span className="text-xs text-zinc-400">{t.wf3Active}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-50 mb-4">{t.wf3Title}</h3>
              <div className="mb-5 overflow-x-auto">
                <WorkflowDiagram nodes={wf3Nodes} isHovered={wfHovered === 3} />
              </div>
              <p className="text-zinc-400 leading-relaxed mb-5">{t.wf3What}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {t.wf3Impact.map((item, i) => <span key={i} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full">{item}</span>)}
              </div>
              <div className="flex flex-wrap gap-2">
                {t.wf3Stack.map((s, i) => <span key={i} className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-1 rounded">{s}</span>)}
              </div>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 bg-violet-600/10 border border-violet-500/30 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-zinc-200 text-lg leading-relaxed">{t.workflowsSummary}</p>
          </motion.div>
        </div>
      </section>

      {/* ── N8N ADVANTAGE ── */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4 text-balance">{t.n8nTitle}</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">{t.n8nIntro}</motion.p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-6">
            {t.n8nCards.map((card, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-zinc-500 transition-colors">
                <div className="mb-3">{iconMap[card.icon]}</div>
                <h3 className="font-bold text-zinc-50 mb-2">{card.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-3">{card.body}</p>
                <span className="text-xs font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full">{card.stat}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.blockquote variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 text-center text-zinc-300 text-lg italic max-w-2xl mx-auto leading-relaxed">
            &ldquo;{t.n8nQuote}&rdquo;
          </motion.blockquote>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-12 text-center text-balance">
            {t.painTitle}
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4 mb-6">
            {t.pains.map((pain, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-zinc-800 border border-zinc-700 hover:border-violet-500/50 rounded-xl p-5 transition-colors">
                <div className="text-2xl mb-2">{pain.icon}</div>
                <p className="text-zinc-200 font-medium leading-snug">{pain.title}</p>
                {pain.sub && <p className="text-zinc-500 text-sm mt-1">{pain.sub}</p>}
              </motion.div>
            ))}
          </motion.div>
          {/* Featured pain */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-zinc-800 border-2 border-violet-500/60 rounded-xl p-6 sm:p-8"
            style={{ boxShadow: "0 0 32px rgba(139,92,246,0.15)" }}
          >
            <div className="text-3xl mb-3">{t.painFeaturedIcon}</div>
            <h3 className="text-xl font-bold text-zinc-50 mb-2">{t.painFeaturedTitle}</h3>
            <p className="text-zinc-400 leading-relaxed">{t.painFeaturedBody}</p>
          </motion.div>
        </div>
      </section>

      {/* ── SHIFT ── */}
      <section id="shift" className="py-24 bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-12">
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-4 text-balance">{t.shiftTitle}</motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 max-w-2xl leading-relaxed">{t.shiftIntro}</motion.p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-6 mb-12">
            {t.shiftBlocks.map((block, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-zinc-800 border border-zinc-700 rounded-xl p-6">
                <div className="text-5xl font-black text-violet-500/40 mb-3 font-mono">{block.num}</div>
                <h3 className="font-bold text-zinc-50 mb-2">{block.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{block.body}</p>
              </motion.div>
            ))}
          </motion.div>
          {/* Alert */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-cyan-500/30 bg-cyan-500/5 rounded-xl p-6">
            <h3 className="font-bold text-cyan-300 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> {t.alertTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {t.alertItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── CURRICULUM ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-12 text-balance">
            {t.curriculumTitle}
          </motion.h2>
          <div className="relative">
            
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-violet-500 to-zinc-700 origin-top"
            />
            <div className="flex flex-col gap-6 pl-14 sm:pl-20">
              {t.modules.map((mod, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
                  className={`relative ${mod.isBreak ? "opacity-70" : ""}`}
                >

                  <div className={`absolute -left-14 sm:-left-20 w-4 h-4 rounded-full border-2 top-1 ${mod.isBreak ? "border-zinc-500 bg-zinc-700" : "border-violet-500 bg-violet-500/20"}`} />
                  <div className={`rounded-xl p-5 border ${mod.isBreak ? "bg-zinc-900/50 border-zinc-800 italic" : "bg-zinc-900 border-zinc-700"}`}>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">{mod.time}</span>
                      <span className="text-xs text-zinc-500">{mod.duration}</span>
                      {mod.badge && <span className="text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">{mod.badge}</span>}
                    </div>
                    <h3 className="font-bold text-zinc-50 mb-1">{mod.title}</h3>
                    <p className="text-zinc-400 text-sm">{mod.desc}</p>
                    {mod.learn && (
                      <div className="mt-3 flex flex-col gap-1">
                        <span className="text-xs font-semibold text-cyan-400">Aprenderás:</span>
                        <p className="text-zinc-400 text-sm">{mod.learn}</p>
                      </div>
                    )}
                    {mod.get && (
                      <div className="mt-2 flex flex-col gap-1">
                        <span className="text-xs font-semibold text-green-400">Saldrás con:</span>
                        <p className="text-zinc-400 text-sm">{mod.get}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE STACK ── */}
      <section id="value" className="py-24 bg-zinc-950 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 120px rgba(139,92,246,0.04)" }} />
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-8 text-center text-balance">
            {t.valueTitle}
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
            <div className="p-6 flex flex-col gap-0">
              {t.valueItems.map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex items-center justify-between gap-4 py-3 border-b border-zinc-800 last:border-0">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm">{item.label}</span>
                  </div>
                  <span className="text-zinc-500 text-sm font-mono shrink-0 line-through">{item.price}</span>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-zinc-700 bg-zinc-800 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400">{t.valueTotalLabel}</span>
                <span className="text-zinc-400 line-through font-mono">{t.valueTotalPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-zinc-50">{t.valueInvestLabel}</span>
                <motion.span
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.08, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-3xl font-black text-orange-400"
                >
                  {t.valueInvestPrice}
                </motion.span>
              </div>
              <p className="text-zinc-500 text-sm mt-1">{t.valueEbSub}</p>
            </div>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6 text-center text-zinc-400 text-sm leading-relaxed">
            {t.valueAnchor}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6 text-center">
            <button onClick={scrollToForm} className="bg-orange-500 hover:bg-orange-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-100">
              {t.valueCta}
            </button>
          </motion.div>
        </div>
      </section>



      {/* ── TESTIMONIALS ── */}
{/*       <section className="py-24 bg-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-3xl sm:text-4xl font-bold text-zinc-50 mb-12 text-center text-balance">
            {t.testimonialsTitle}
          </motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-3 gap-6">
            {t.testimonials.map((t2, i) => (
              <TiltCard key={i} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 flex flex-col gap-4 cursor-default">
                <div>
                  <span className="text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">ANTES</span>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed italic">&ldquo;{t2.before}&rdquo;</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-full">DURANTE</span>
                  <p className="text-zinc-300 text-sm mt-2 leading-relaxed italic">&ldquo;{t2.during}&rdquo;</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">DESPUÉS</span>
                  <p className="text-zinc-100 text-sm mt-2 leading-relaxed font-medium">&ldquo;{t2.after}&rdquo;</p>
                </div>
                <div className="border-t border-zinc-700 pt-3 mt-auto">
                  <p className="font-bold text-zinc-50 text-sm">{t2.author}</p>
                  <p className="text-zinc-500 text-xs">{t2.role}</p>
                </div>
              </TiltCard>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-center">
            <p className="text-zinc-300 text-sm">{t.statsBar}</p>
          </motion.div>
        </div>
      </section> */}

      {/* ── GUARANTEE ── */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            className="bg-zinc-900 border-2 border-green-500/30 rounded-2xl p-8 text-center"
            style={{ boxShadow: "0 0 40px rgba(74,222,128,0.07)" }}
          >
            <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-50 mb-4">{t.guaranteeTitle}</h2>
            {t.guaranteeBody.split("\n\n").map((p, i) => (
              <p key={i} className="text-zinc-400 leading-relaxed mb-3 last:mb-0">{p}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INSTRUCTOR ── */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white" style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}>
                {t.instructorInitials}
              </div>
            </div>
            {/* Bio */}
            <div>
              <p className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-widest">{t.instructorTitle}</p>
              <h3 className="text-2xl font-bold text-zinc-50 mb-3">{t.instructorName}</h3>
              <p className="text-zinc-400 leading-relaxed mb-3">{t.instructorBio}</p>
              <span className="text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">{t.instructorBadge}</span>
              <div className="flex flex-wrap gap-6 mt-6">
                {t.instructorStats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-violet-400">{stat.value}</div>
                    <div className="text-xs text-zinc-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PROFFESSOR ── */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black text-white" style={{ background: "linear-gradient(135deg, #8B5CF6, #06B6D4)" }}>
                {t.professorInitials}
              </div>
            </div>
            {/* Bio */}
            <div>
              <p className="text-xs text-zinc-400 mb-1 font-semibold uppercase tracking-widest">{t.professorTitle}</p>
              <h3 className="text-2xl font-bold text-zinc-50 mb-3">{t.professorName}</h3>
              <p className="text-zinc-400 leading-relaxed mb-3">{t.professorBio}</p>
              <span className="text-xs text-violet-300 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">{t.professorBadge}</span>
              <div className="flex flex-wrap gap-6 mt-6">
                {t.professorStats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-violet-400">{stat.value}</div>
                    <div className="text-xs text-zinc-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-3xl font-bold text-zinc-50 mb-8 text-center">
            {t.faqTitle}
          </motion.h2>
          <div className="flex flex-col gap-3">
            {t.faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left text-zinc-200 font-semibold hover:text-zinc-50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 text-zinc-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-zinc-400 leading-relaxed text-sm">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE FORM ── */}
      <section id="form" className="py-24 bg-zinc-900" ref={formRef}>
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-zinc-50 mb-2">
              {t.formSectionTitle} <span className="text-orange-400">{t.formSectionSpots}</span>
            </h2>
            <p className="text-zinc-400 text-sm">{t.formSectionSub}</p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden" style={{ minHeight: 420 }}>
            {/* Progress bar */}
            {formStep >= 0 && !formSuccess && (
              <div className="h-1 bg-zinc-800">
                <motion.div
                  className="h-full bg-violet-500"
                  animate={{ scaleX: (formStep + 1) / 5 }}
                  style={{ transformOrigin: "left" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
            )}

            <div className="p-6 sm:p-8" style={{ minHeight: 380 }}>
              <AnimatePresence mode="wait">
                {/* Step -1: Welcome */}
                {formStep === -1 && (
                  <motion.div key="welcome" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3 }} className="flex flex-col items-center justify-center h-full gap-6 text-center py-8">
                    <div className="text-5xl">⚡</div>
                    <h3 className="text-2xl font-black text-zinc-50">{t.step0Title}</h3>
                    <p className="text-zinc-400">{t.step0Body}</p>
                    <button onClick={() => setFormStep(0)} className="bg-orange-500 hover:bg-orange-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all hover:scale-105 w-full max-w-xs">
                      {t.step0Btn}
                    </button>
                  </motion.div>
                )}

                {/* Step 0: Name */}
                {formStep === 0 && (
                  <motion.div key="name" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6 py-4">
                    <label className="text-xl font-bold text-zinc-50">{t.step1Label}</label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") validateStep0() }}
                      placeholder="Tu nombre..."
                      className={`bg-transparent border-0 border-b-2 border-zinc-600 focus:border-violet-500 outline-none text-2xl text-zinc-50 py-3 w-full placeholder-zinc-600 transition-colors ${formShake ? "shake" : ""}`}
                    />
                    <p className="text-zinc-500 text-sm">{t.step1Hint}</p>
                    <button onClick={validateStep0} className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl mt-2 self-start transition-colors">
                      {lang === "es" ? "Continuar →" : "Continue →"}
                    </button>
                  </motion.div>
                )}

                {/* Step 1: Phone */}
                {formStep === 1 && (
                  <motion.div key="phone" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4 py-4">
                    <label className="text-xl font-bold text-zinc-50">{t.step2Label}</label>
                    <p className="text-zinc-400 text-sm">{t.step2Sub}</p>
                    <input
                      ref={phoneInputRef}
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") validateStep1() }}
                      placeholder="+1 (201) 555-0000"
                      className={`bg-transparent border-0 border-b-2 border-zinc-600 focus:border-violet-500 outline-none text-2xl text-zinc-50 py-3 w-full placeholder-zinc-600 transition-colors font-mono ${formShake ? "shake" : ""}`}
                    />
                    <button onClick={validateStep1} className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-6 py-3 rounded-xl mt-2 self-start transition-colors">
                      {lang === "es" ? "Continuar →" : "Continue →"}
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Business */}
                {formStep === 2 && (
                  <motion.div key="business" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4 py-4">
                    <label className="text-lg font-bold text-zinc-50">{t.step3Label}</label>
                    <div className="grid grid-cols-2 gap-3">
                      {t.step3Options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => { setFormBusiness(opt.label); setFormStep(3) }}
                          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-violet-500 rounded-xl p-4 text-left transition-all group"
                        >
                          <div className="text-2xl mb-1">{opt.emoji}</div>
                          <div className="font-semibold text-zinc-100 text-sm">{opt.label}</div>
                          <div className="text-zinc-500 text-xs mt-0.5">{opt.sub}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Level */}
                {formStep === 3 && (
                  <motion.div key="level" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4 py-4">
                    <label className="text-lg font-bold text-zinc-50">{t.step4Label}</label>
                    <div className="flex flex-col gap-3">
                      {t.step4Options.map((opt) => (
                        <button
                          key={opt.label}
                          onClick={() => { setFormLevel(opt.label); setFormStep(4); setLoadingTextIdx(0) }}
                          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-violet-500 rounded-xl p-4 text-left flex items-center gap-4 transition-all"
                        >
                          <div className="text-2xl">{opt.emoji}</div>
                          <div>
                            <div className="font-semibold text-zinc-100 text-sm">{opt.label}</div>
                            <div className="text-zinc-500 text-xs mt-0.5">{opt.sub}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Loading */}
                {formStep === 4 && !formSuccess && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-6 h-full py-12 text-center">
                    <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
                    <AnimatePresence mode="wait">
                      <motion.p key={loadingTextIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-zinc-300 font-medium">
                        {t.loadingTexts[loadingTextIdx]}
                      </motion.p>
                    </AnimatePresence>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <motion.div className="h-full bg-violet-500" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.8 }} />
                    </div>
                  </motion.div>
                )}

                {/* Success */}
                {formSuccess && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-6 h-full py-12 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}>
                      <CheckCircle className="w-16 h-16 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-zinc-50">{successTitle}</h3>
                    <p className="text-zinc-400">{t.successSub}</p>
                    <button
                      onClick={() => {
                        const msgES = `Hola! Quiero inscribirme al taller "Automatización en 6 Horas con n8n" ⚡\n\n📝 Nombre: ${formName}\n📱 WhatsApp: ${formPhone}\n🏢 Negocio: ${formBusiness}\n🔧 Nivel: ${formLevel}\n\nPor favor confírmenme mi cupo Early Bird de $397. ¡Gracias!`
                        const msgEN = `Hi! I want to enroll in the "Automation in 6 Hours with n8n" workshop ⚡\n\n📝 Name: ${formName}\n📱 WhatsApp: ${formPhone}\n🏢 Business: ${formBusiness}\n🔧 Level: ${formLevel}\n\nPlease confirm my Early Bird spot at $397. Thank you!`
                        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(lang === "es" ? msgES : msgEN)}`
                        window.open(url, "_blank")
                      }}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t.successBtn}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 bg-zinc-950 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="text-4xl sm:text-5xl font-black text-zinc-50 text-balance">
            {t.finalTitle}
          </motion.h2>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-zinc-400 h-8">
            <span>{finalTypewritten}</span>
            <motion.span className="text-orange-400 font-bold" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>|</motion.span>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center gap-2">
            <p className="text-zinc-400 text-sm">{t.finalCountdownLabel}</p>
            <div className="flex items-center gap-2">
              {formatTime(countdown).split(":").map((seg, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-2xl sm:text-3xl font-black font-mono text-orange-400 min-w-14 text-center">{seg}</span>
                  {i < 2 && <span className="text-zinc-500 text-2xl font-bold">:</span>}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="w-full max-w-md">
            <button
              onClick={scrollToForm}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-lg sm:text-xl px-8 py-5 rounded-xl transition-all hover:scale-105 active:scale-100"
            >
              {t.finalCta}
            </button>
            <p className="text-zinc-500 text-sm mt-3">{t.finalMicro}</p>
          </motion.div>

          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-zinc-400 text-sm">
            {t.finalSocial}
          </motion.p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-zinc-900 border-t border-zinc-800 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            {/* Col 1: Logo */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  <div className="w-6 border-t border-dashed border-violet-400" />
                  <div className="w-3 h-3 rounded-full bg-cyan-400" />
                </div>
                <span className="font-black text-zinc-50">AutoFlow<span className="text-violet-400">Latino</span></span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{t.footerTagline}</p>
              <div className="flex gap-3">
                {[Instagram, Linkedin, Youtube, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 transition-colors" aria-label="Social">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Event */}
            <div>
              <h4 className="font-bold text-zinc-200 mb-3">{t.footerEventTitle}</h4>
              <div className="flex flex-col gap-1 text-sm text-zinc-400 mb-4">
                <span>{t.footerDate}</span>
                <span>{t.footerTime}</span>
              </div>
              <div className="flex flex-col gap-1">
                {t.footerLinks.map((link, i) => (
                  <a key={i} href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">{link}</a>
                ))}
              </div>
            </div>

            {/* Col 3: WhatsApp */}
            <div>
              <h4 className="font-bold text-zinc-200 mb-3">{t.footerWaQ}</h4>
              <a
                href={`https://wa.me/${PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {t.footerWaBtn}
              </a>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 text-center">
            <p className="text-zinc-500 text-xs leading-relaxed">{t.footerCopyright}</p>
          </div>
        </div>
      </footer>

      {/* ── STICKY BOTTOM BAR ── */}
      <AnimatePresence>
        {stickyVisible && !formVisible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 border-t border-zinc-700 px-4 py-3 flex items-center justify-between gap-4"
          >
            <p className="text-sm text-zinc-300 truncate">
              {t.stickyText} <span className="text-orange-400 font-mono font-bold">{formatTime(countdown)}</span>
            </p>
            <button
              onClick={scrollToForm}
              className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors"
            >
              {t.stickyBtn}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Event",
                "name": "Automatización en Producción: 3 Workflows Activos en 6 Horas con n8n",
                "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                "startDate": "2026-04-19T10:00:00-04:00",
                "endDate": "2026-04-19T16:00:00-04:00",
                "offers": { "@type": "Offer", "price": "397", "priceCurrency": "USD" },
                "inLanguage": ["es", "en"],
                "description": "Taller intensivo en vivo. Construye 3 workflows activos con n8n, WhatsApp API, Resend y Claude/GPT en 6 horas.",
              },
              {
                "@type": "FAQPage",
                "mainEntity": copy.es.faqs.map((f) => ({
                  "@type": "Question",
                  "name": f.q,
                  "acceptedAnswer": { "@type": "Answer", "text": f.a },
                })),
              },
            ],
          }),
        }}
      />
    </div>
  )
}
