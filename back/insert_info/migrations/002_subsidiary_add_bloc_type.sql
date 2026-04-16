-- Тип блока с фронта (например photo, text, header). Колонка: bloc_type
-- Выполните один раз, если колонки ещё нет.

ALTER TABLE subsidiary
  ADD COLUMN bloc_type VARCHAR(100) DEFAULT '';

COMMENT ON COLUMN subsidiary.bloc_type IS 'Тип блока с конструктора (photo, text, …)';

-- Если раньше уже добавили block_type, переименуйте:
-- ALTER TABLE subsidiary RENAME COLUMN block_type TO bloc_type;
