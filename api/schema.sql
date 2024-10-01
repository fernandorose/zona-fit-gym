CREATE TABLE clients (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE memberships(
  id UUID PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(8, 2) NOT NULL
);

CREATE TABLE client_membership(
  client_id UUID REFERENCES clients(id),
  membership_id UUID REFERENCES memberships(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  PRIMARY KEY (client_id, membership_id)
);