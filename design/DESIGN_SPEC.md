# FinanceTracker — Especificación de diseño

Referencia escrita del mockup hecho en Claude (Design canvas), para que
Claude Code pueda entender la intención visual sin depender del link de
claude.ai. Los archivos fuente reales (`.dc.html`) están en
`design/mockup-source/` — no se abren solos en un navegador (dependen del
runtime del canvas), pero documentan el markup/colores/copys exactos.

## Paleta (tokens)

| Token | Claro | Oscuro |
|---|---|---|
| bg | `#F7F5F1` | `#121316` |
| surface | `#FFFFFF` | `#1C1E22` |
| surfaceAlt | `#EFEBE4` | `#24262B` |
| border | `#E7E3DC` | `#2A2D31` |
| textPrimary | `#1B1D1F` | `#F2F1EE` |
| textSecondary | `#6B6862` | `#9B978F` |
| income (verde-azulado) | `#1F6F78` | `#3FA6AE` |
| incomeTint | `#E4EFEE` | `#1B3236` |
| expense (ámbar) | `#C1662E` | `#E08A52` |
| expenseTint | `#F6E9DE` | `#332419` |
| over (excedido) | `#9B3A26` | `#E2694F` |

Ingresos = verde-azulado, Gastos = ámbar (a propósito, no rojo/verde, para
que se distinga incluso con daltonismo).

## Tipografía

- Títulos y cifras: **Space Grotesk** (600/700).
- Texto general: **IBM Plex Sans** (400/500/600).

## Pantallas (en orden de navegación)

1. **Bienvenida** — logo + "Continuar con Face ID" (acción principal),
   "Iniciar sesión con contraseña" y "¿Olvidaste tu contraseña?" como
   alternativas secundarias.
2. **Resumen** — saldo del mes, mini-stats de ingresos/gastos, vista
   rápida de presupuestos (linkea a Presupuestos) y últimos movimientos
   (linkea a Historial).
3. **Ingresos** — chips de categoría (Todos/Sueldo/Semanal/Extra), lista
   de movimientos, botón flotante "+" para agregar.
4. **Gastos** — igual que Ingresos, con categorías Comida/Ropa/Pareja/
   Entretenimiento.
5. **Presupuestos** — una tarjeta por categoría con barra de progreso y
   estado: Dentro del presupuesto (<70%) / Cerca del límite (70–100%) /
   Excedido (>100%).
6. **Historial** — selector de mes, totales (ingresos/gastos/neto),
   mini gráfico de 6 meses (pendiente de implementar en el front) y log
   agrupado por día.
7. **Widget de pantalla de inicio** — prototipo interactivo:
   - Tamaño pequeño: un botón "+" que abre la app (los widgets de iOS
     no pueden mostrar teclado).
   - Tamaño mediano: toca una categoría → aparece el campo de monto →
     Guardar. Un prop "tipo" (Gasto/Ingreso) simula tener dos widgets
     configurados por separado, como "Editar widget" en iOS real.

## Categorías (idénticas al Atajo de iOS "Finanzas")

- Ingreso: `Sueldo`, `Semanal`, `Extra`
- Gasto: `Comida`, `Ropa`, `Pareja`, `Entretenimiento`

## Formato de registro (compatibilidad con el Atajo)

El Atajo actual arma una línea `fecha;tipo;categoría;monto` y la agrega a
`finanzas.csv`. El backend guarda el mismo dato mejor estructurado (una
fila por transacción, en SQLite), pero conserva los mismos 4 campos para
que sea trivial importar el CSV histórico si se quiere en el futuro.

## Regla de navegación

Cualquier acción (agregar ingreso/gasto, ver un presupuesto, revisar el
historial) debe alcanzarse en 2–3 toques desde cualquier pantalla — por
eso la barra inferior de 5 pestañas + botón flotante en vez de menús
anidados.
