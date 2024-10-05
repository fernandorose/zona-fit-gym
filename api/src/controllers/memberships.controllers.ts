import { Request, Response } from "express";
import pool from "../postgres/connection";
import { generateRandomId } from "../utils/idGen";

export const getClientMemberships = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const query = `
      SELECT 
        cm.client_id, 
        c.name AS client_name, 
        c.email AS client_email,
        cm.membership_id, 
        m.type AS membership_type, 
        m.price AS membership_price,
        cm.start_date, 
        cm.end_date
      FROM client_membership cm
      JOIN clients c ON cm.client_id = c.id
      JOIN memberships m ON cm.membership_id = m.id;
    `;

    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve client memberships" });
  }
};

export const createNewMembership = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { type, price, start_date, end_date, name, email } = req.body;
  const membershipId = generateRandomId();
  const clientId = generateRandomId();

  const createClientQuery = `
    INSERT INTO clients(id, name, email) 
    VALUES ($1, $2, $3) 
    ON CONFLICT (email) DO NOTHING 
    RETURNING *`;

  const clientValues = [clientId, name, email];

  const createMembershipQuery = `
    INSERT INTO memberships(id, type, price) 
    VALUES ($1, $2, $3) 
    RETURNING *`;

  const membershipValues = [membershipId, type, price];

  const clientMembershipQuery = `
    INSERT INTO client_membership(client_id, membership_id, start_date, end_date)
    VALUES ($1, $2, $3, $4) 
    RETURNING *`;

  const clientMembershipValues = [clientId, membershipId, start_date, end_date];

  try {
    // Inicia una transacción
    await pool.query("BEGIN");

    // Inserta el cliente
    let client = await pool.query(createClientQuery, clientValues);
    if (client.rows.length === 0) {
      // Si el cliente ya existe (por el email), búscalo
      const existingClientQuery = `SELECT * FROM clients WHERE email = $1`;
      client = await pool.query(existingClientQuery, [email]);
    }

    // Inserta la membresía
    const membership = await pool.query(
      createMembershipQuery,
      membershipValues
    );

    // Inserta en client_membership (relación)
    const clientMembership = await pool.query(
      clientMembershipQuery,
      clientMembershipValues
    );

    // Confirma la transacción
    await pool.query("COMMIT");

    res.status(201).json({
      message: "Membership created successfully",
      client: client.rows[0],
      membership: membership.rows[0],
      clientMembership: clientMembership.rows[0],
    });
  } catch (error) {
    // En caso de error, revierte la transacción
    await pool.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Failed to create membership" });
  }
};
