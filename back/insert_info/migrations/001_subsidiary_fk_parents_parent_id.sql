-- subsidiary.parent_id → parents(parent_id)
--
-- Ошибка «Ключ (parent_id)=(42) отсутствует в таблице parents» при наличии строки
-- с parents.parent_id = 42 почти всегда значит: FK всё ещё ссылается на parents(id),
-- а не на parents(parent_id). Тогда проверяется наличие id=42, а у вас id=2.
--
-- Проверка (должно быть REFERENCES parents(parent_id)):
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint
--   WHERE conrelid = 'subsidiary'::regclass AND contype = 'f';

-- Снять любой старый FK с subsidiary на таблицу parents (имя ограничения могло быть не subsidiary_parent_id_fkey).
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT c.conname
    FROM pg_constraint c
    WHERE c.conrelid = 'subsidiary'::regclass
      AND c.contype = 'f'
      AND c.confrelid = 'parents'::regclass
  ) LOOP
    EXECUTE format('ALTER TABLE subsidiary DROP CONSTRAINT %I', r.conname);
  END LOOP;
END $$;

ALTER TABLE subsidiary
  ADD CONSTRAINT subsidiary_parent_id_fkey
  FOREIGN KEY (parent_id)
  REFERENCES parents (parent_id)
  ON DELETE CASCADE;
