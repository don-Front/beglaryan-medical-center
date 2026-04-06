# Документация фронтенда

Живой справочник по проекту в `front/`. **При существенных изменениях** (новые папки, маршруты, зависимости, скрипты) обновляйте соответствующие разделы и добавляйте запись в [журнал изменений](#журнал-изменений).

---

## Стек

| Компонент        | Версия / примечание   |
|------------------|------------------------|
| React            | ^19.2.4                |
| React DOM        | ^19.2.4                |
| TypeScript       | ~6.0.2                 |
| Vite             | ^8.0.4                 |
| react-router-dom | ^7.14.0 (`createBrowserRouter`, `RouterProvider`) |
| ESLint           | ^9.x + typescript-eslint |

---

## Скрипты (`package.json`)

| Команда        | Назначение                          |
|----------------|-------------------------------------|
| `npm run dev`  | Dev-сервер Vite (HMR)               |
| `npm run build`| Проверка TypeScript + production-сборка |
| `npm run preview` | Локальный просмотр `dist`      |
| `npm run lint` | ESLint по проекту                   |

---

## Структура каталогов

```
front/
├── FRONTEND.md          ← этот файл
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
├── public/              статика без обработки Vite (favicon, svg и т.д.)
└── src/
    ├── main.tsx         точка входа: StrictMode + RouterProvider
    ├── index.css        глобальные стили
    ├── assets/          изображения и прочие ассеты для импорта из кода
    ├── layouts/         обёртки страниц (Outlet)
    │   └── RootLayout.tsx
    ├── pages/           экраны по маршрутам
    │   ├── HomePage.tsx
    │   └── NotFoundPage.tsx
    └── routes/
        └── router.tsx   конфигурация `createBrowserRouter`
```

---

## Маршрутизация

Файл: `src/routes/router.tsx`.

| Путь   | Компонент       | Описание                    |
|--------|-----------------|-----------------------------|
| `/`    | `HomePage`      | индексный маршрут (главная) |
| `*`    | `NotFoundPage`  | 404, все неизвестные пути   |

Корневой элемент маршрута: `RootLayout` (`path: '/'`) — общая оболочка, внутри неё рендерится `Outlet` для дочерних маршрутов.

---

## Точки входа и конфигурация

- **HTML:** `index.html` → `div#root`, подключение `/src/main.tsx`.
- **JSX-вход:** `src/main.tsx` — создание root, обёртка `StrictMode`, провайдер `RouterProvider` с импортом `router` из `src/routes/router.tsx`.
- **Сборка:** `vite.config.ts`; алиасы путей при появлении — фиксировать здесь.

---

## Соглашения (кратко)

- Страницы — в `src/pages/`, именование `*Page.tsx`.
- Общие оболочки с навигацией — в `src/layouts/`.
- Новые маршруты — правка `src/routes/router.tsx` + запись в таблицу маршрутов выше.
- API-клиент и типы ответов — по мере появления выносить в `src/services/`, `src/types/` (разделы добавить в этот файл).

---

## Журнал изменений

Формат записи: **дата (YYYY-MM-DD)** — что изменилось (файлы, маршруты, зависимости).

### 2026-04-06

- Создан `FRONTEND.md`, зафиксирована текущая структура.
- Стек: Vite 8, React 19, React Router 7 (`createBrowserRouter`).
- Роутинг: `RootLayout`, `HomePage` (пустая главная), `NotFoundPage` для `*`.
- Удалены стартовые `App.tsx` / `App.css`; глобальные стили в `index.css`.
