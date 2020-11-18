TRUNCATE users RESTART IDENTITY cascade;
INSERT INTO users (user_id, username, password, email)
VALUES
    (1, 'pokerbuddy', 'supersecurepassword', 'pokerkid1@gmail.com'),
    (2, 'thePokerGOAT', 'passwordf', 'mynameboo@gmail.com'),
    (3, 'SleepyCactus4', 'f2f7g6s6!', 'freddyfox@gmail.com'),
    (4, 'GhostPeppers', 'pepperpalace', 'peppersRgreat@gmail.com'),
    (5, 'BobTheBonehead', 'igiveallmymoneyaway', 'loser4lyfe@gmail.com'),
    (6, 'LarryTheLawyer', 'Imagoodlawyer', 'lawschoolguy@gmail.com');

SELECT setval('users_user_id_seq', 6, true);


    