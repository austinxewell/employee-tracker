INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 2, 2),
  ('Piers', 'Gaveston', 3, 3),
  ('Charles', 'LeRoi', 1, 3),
  ('Katherine', 'Mansfield', 1, 2),
  ('Dora', 'Carrington', 2, 1),
  ('Edward', 'Bellamy', 3, 2),
  ('Montague', 'Summers', 2, 3),
  ('Octavia', 'Butler', 1, 1),
  ('Unica', 'Zurn', 3, 2);

INSERT INTO role (title, salary, department_id)
VALUES
    ('Customer Support', 15.35, 1),
    ('Manager', 20.55, 2),
    ('Supervisor', 25.15, 3);

INSERT INTO department (department_name)
VALUES
    ('Sellers'),
    ('Buyers'),
    ('Member to Member');