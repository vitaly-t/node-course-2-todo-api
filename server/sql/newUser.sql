INSERT INTO "Users" (password, email)
VALUES (${password}, REGEXP_REPLACE(${email}, '\s+', ''))
RETURNING *