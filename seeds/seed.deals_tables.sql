BEGIN;

INSERT INTO deals_table (name, price, distance, day, content)
VALUES
    ('Wingnut Wednesday', 10.00, 1.5, 'Wednesday', 'free half pound of wings if you spend $10'),
    ('Taco Bowl', 6.00, 1.2, 'Tuesday', 'Taco bowl on discount');

COMMIT;