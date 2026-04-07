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
| Tailwind CSS     | ^4.x + плагин `@tailwindcss/vite` |
| react-router-dom | ^7.14.0 (`createBrowserRouter`, `RouterProvider`) |
| ESLint           | ^9.x + typescript-eslint |
| sass (dev)       | опционально для `.scss` / CSS Modules (шапка переведена на Tailwind) |

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
├── public/              статика → корень `dist/` (`/manifest.json`, `/robots.txt`, `/sitemap.xml`, `/assets/...`)
└── src/
    ├── main.tsx         точка входа: StrictMode + RouterProvider
    ├── index.css        глобальные стили
    ├── assets/          `logo-dark.png` (шапка + заставка), `logo.svg` и др.
    ├── components/      переиспользуемые части интерфейса
    │   ├── ui/          атомарные UI-элементы (кнопки, инпуты, бейджи)
    │   └── blocks/      составные блоки (карточки, секции, виджеты)
    │       ├── header/
    │       │       Header.tsx   три блока: лого (flex-1) | nav (shrink-0) | декор (flex-1)
    │       └── route-splash/
    │               RouteLogoSplash.tsx   заставка при первом заходе и смене `pathname`
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
| `/`    | `HomePage`      | главная: только шапка `Header` |
| `*`    | `NotFoundPage`  | 404, все неизвестные пути   |

Корневой элемент маршрута: `RootLayout` (`path: '/'`) — `Outlet` + **`RouteLogoSplash`** (белый оверлей: плавное появление лого ~1.15s `cubic-bezier(0.16, 1, 0.3, 1)`, пауза до ~1.25s, уход вправо ~0.7s; у `img` `key={pathname}`). Шапка **`Header`** в **`HomePage`**; на 404 шапки нет.

---

## Точки входа и конфигурация

- **HTML (только корень `front/index.html`):** SEO-мета, фавикон, `manifest`, шрифт Roboto, `noscript`; `div#root` + `<script type="module" src="/src/main.tsx">`. Дубликат `public/index.html` (CRA) не используется — удалён.
- **JSX-вход:** `src/main.tsx` — создание root, обёртка `StrictMode`, провайдер `RouterProvider` с импортом `router` из `src/routes/router.tsx`.
- **Сборка:** `vite.config.ts` — плагины `react()`, `tailwindcss()`; алиасы путей при появлении — фиксировать здесь.
- **Tailwind:** в `src/index.css` в начале файла — `@import 'tailwindcss';`, далее кастомные правила.

---

## Соглашения (кратко)

- **`src/components/ui/`** — мелкие презентационные компоненты без бизнес-логики домена.
- **`src/components/blocks/`** — блоки из нескольких UI-элементов; подпапка на блок (`header/`, …). Стили — преимущественно **Tailwind**; при необходимости — `*.module.scss` + `sass`.
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
- Добавлены `src/components/ui/` и `src/components/blocks/` (плейсхолдер `.gitkeep` до появления компонентов).
- Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`); в начале `index.css` — `@import 'tailwindcss'`.
- Шапка `src/components/blocks/header/Header.tsx`: логотип (ссылка на `/`), навигация (`NavLink`), декоративные однотонные блоки. Рендерится в **`HomePage`**, не в `RootLayout`. Пункты «Услуги», «Врачи», «Контакты» — заглушки (пока 404). `Header.module.scss` удалён.
- `HomePage`: только `Header`, без дополнительного контента под шапкой.
- `Header`: три явных блока в `h-16` строке — `flex-1` лого (`src/assets/logo-dark.png`, `h-10 w-auto object-contain`), `shrink-0` навигация, `flex-1` декоративные фигуры.

### 2026-04-07

- Перенесён контент из старого `public/index.html` (CRA) в корневой `index.html` для Vite: `lang="hy"`, описание и keywords, `theme-color`, `apple-touch-icon` → существующий `logo-dark.svg`, `/manifest.json`, Google Fonts Roboto, `noscript` на русском.
- Удалён неиспользуемый `public/index.html`. Обновлён `public/manifest.json` (название центра, иконка `favicon.ico` вместо отсутствовавшего `favicon-16x16.ico`, тип `image/svg+xml` для SVG).
- Заставка как в legacy `beglaryancenter-front` (`Loading.js` + animate.css): `RouteLogoSplash` в `RootLayout`, при каждом `pathname` — оверлей с `logo-dark.png` (scale-in), через ~1 с уход вправо; стили в `index.css`.
