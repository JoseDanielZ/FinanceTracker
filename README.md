# FinanceTracker

App de finanzas personales para iOS (ingresos, gastos y presupuestos),
pensada para reemplazar el Atajo de iOS "Finanzas". Este repo trae el
esqueleto de **front y back en arquitectura limpia + MVC**, con lo
fundamental ya funcionando end-to-end (crear/listar movimientos, ver
resumen, presupuestos con progreso real) para que Claude Code lo termine
de construir.

## Estructura

```
financetracker/
├── backend/    → API en NestJS (arquitectura limpia: domain/application/infrastructure)
├── frontend/   → App en React Native/Expo (arquitectura limpia + MVC en presentation/)
└── design/     → Spec del mockup + los .dc.html originales del Design canvas
```

## Cómo está organizada la arquitectura limpia

Cada módulo (`transactions`, `budgets`) tiene 3 capas, de adentro hacia
afuera:

- **domain/** — entidades y "puertos" (interfaces de repositorio). Cero
  dependencias externas. Es la única capa que las otras dos DEBEN
  respetar.
- **application/** — casos de uso (la lógica de negocio real: crear un
  movimiento, calcular el resumen del mes, cruzar presupuesto vs. gasto).
  Depende solo de `domain`, nunca de Nest/TypeORM/React directamente.
- **infrastructure/** (backend) o **data/** (frontend) — el detalle
  técnico: controladores HTTP, entidades de TypeORM, el cliente fetch.
  Es lo único que sabe que existe una base de datos o una API REST.

El patrón **MVC** vive dentro de cada lado:

- Backend: Modelo = entidades/DTOs, Vista = el JSON que responde el
  controlador, Controlador = las clases `*.controller.ts`.
- Frontend (carpeta `presentation/`): Modelo = `domain/entities`, Vista =
  `views/*Screen.tsx`, Controlador = los hooks en `controllers/` (p. ej.
  `useTransactionsController`) — las pantallas no tienen lógica, solo
  llaman al controller y pintan lo que reciben.

## Cómo correrlo en tu compu

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```
Queda escuchando en `http://localhost:3000`. Usa SQLite (un archivo
`financetracker.sqlite`), no necesitas instalar ninguna base de datos.

### Frontend
```bash
cd frontend
npm install
npx expo start
```
Abre con Expo Go en tu iPhone, o con el simulador de iOS desde Xcode.
**Importante**: en `src/config/env.ts`, cambia `API_URL` por la IP local
de tu Mac (ej. `http://192.168.1.20:3000`) — desde un iPhone físico,
`localhost` apunta al propio teléfono, no a tu computadora.

## Qué está completo vs. qué falta (para que Claude Code lo priorice)

**Completo y funcionando:**
- CRUD de movimientos (ingresos/gastos) de punta a punta: pantalla →
  controller → repositorio → API → SQLite.
- Presupuestos con cálculo real de "gastado vs. límite" (cruza
  transacciones y presupuestos en el backend).
- Resumen (saldo, totales del mes, últimos movimientos).
- Navegación completa (Bienvenida → 5 pestañas) y tema claro/oscuro.
- Face ID vía `expo-local-authentication` (falta el flujo de contraseña
  real; hoy el botón secundario solo te deja pasar).

**Pendiente (a propósito, para no inflar el scaffold):**
- Widget real de iOS (WidgetKit + App Intents) — el prototipo interactivo
  vive en el mockup (`design/mockup-source/7-Widget.html`), pero es un
  proyecto nativo aparte (target de Xcode en Swift/SwiftUI).
- Gráfico de 6 meses en Historial (hoy solo muestra el log).
- Login con contraseña real (hoy es un placeholder).
- Migrar SQLite → Postgres y desplegar el backend en algún hosting
  (Railway/Render) para que el iPhone no dependa de tu computadora
  prendida.
- Módulo de categorías editable (hoy son constantes en
  `shared/constants/categories.ts` y `src/config/categories.ts`, iguales
  a las del Atajo).

## Diseño

`design/DESIGN_SPEC.md` documenta paleta, tipografía, las 7 pantallas y
las reglas de navegación del mockup. `design/mockup-source/` tiene el
HTML/CSS original de cada pantalla (no corre solo en un navegador, pero
es la referencia exacta de estilos y copys) y `canvas-layout.json` con la
posición de cada artboard en el canvas.
