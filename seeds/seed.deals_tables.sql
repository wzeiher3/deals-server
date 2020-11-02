BEGIN;
TRUNCATE 
    deals_table, 
    deals_users
    RESTART IDENTITY CASCADE;

INSERT INTO deals_users (user_name, password)
VALUES 
    ('dunder', 'password'),
    ('c.smith', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJpYXQiOjE2MDQxODA3MTAsInN1YiI6ImMuc21pdGgifQ.ejULHgg0xnTWVAB8UvDAkDhL2JjffPWRBdoSOrsV5go'),
    ('lexlor', 'lexlorpassword');

INSERT INTO deals_table (name, price, distance, day, content, user_id)
VALUES
    ('Wingnut Wednesday', 10.00, 1.5, 'Wednesday', 'free half pound of wings if you spend $10', 1),
    ('Taco Bowl', 6.00, 1.2, 'Tuesday', 'Taco bowl on discount', 2),
    ('TGIF Special', 8.54, 3.5, 'Friday', 'drinks are 20% off', 3);


COMMIT;