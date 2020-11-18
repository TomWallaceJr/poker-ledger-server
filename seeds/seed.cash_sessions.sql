TRUNCATE cash_sessions RESTART IDENTITY cascade;

INSERT INTO cash_sessions (cash_session_id, buyin, cashout,
 hours_played, date, user_id)
VALUES
    (1, 300, 400, 5, now(), 1),
    (2, 500, 0, 6.25, now(), 3),
    (3, 100, 400, 2.5, now(), 5),
    (4, 300, 1400, 2.25, now(), 2),
    (5, 600, 800, 4.6, now(), 1),
    (6, 700, 400, 3.1, now(), 2),
    (7, 100, 400, 7.7, now(), 6),
    (8, 200, 400, 6.5, now(), 1),
    (9, 300, 400, 3.33, now(), 4),
    (10, 500, 400, 0.5, now(), 1),
    (11, 400, 400, 1, now(), 2),
    (12, 300, 400, 5, now(), 4),
    (13, 100, 400, 10.5, now(), 5),
    (14, 60, 4000, 12, now(), 6);

SELECT setval('cash_sessions_cash_session_id_seq', 14, true);