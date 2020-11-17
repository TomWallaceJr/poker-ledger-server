CREATE TABLE cash_sessions (
    cash_session_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    cash_session_buyin MONEY NOT NULL,
    cash_session_cashout MONEY NOT NULL,
    cash_session_hours_played FLOAT(2) NOT NULL,
    cash_session_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id INTEGER,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

