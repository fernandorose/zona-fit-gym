CREATE TABLE clients (
  id VARCHAR(30) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE memberships(
  id VARCHAR(30) PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  price DECIMAL(8, 2) NOT NULL
);

CREATE TABLE client_membership(
  client_id VARCHAR REFERENCES clients(id),
  membership_id VARCHAR REFERENCES memberships(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  PRIMARY KEY (client_id, membership_id)
);

CREATE TABLE products(
  id VARCHAR(30) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  purchase_price DECIMAL(8, 2) NOT NULL,
  public_price DECIMAL(8, 2) NOT NULL,
  quantity INT NOT NULL
);