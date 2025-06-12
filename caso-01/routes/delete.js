import pool from "../config/db.js";
import { FormatRes } from "../utils/formatRes.js";

// Valid resources and their associated tables
const validResources = {
  product: "products",
  user: "users",
  service: "services",
  // Add more resources here if needed
};

export async function deleteRoutes(req, res) {
  const response = new FormatRes(res);

  // Validate URL length
  if (req.url.length > 100) {
    return response.badRequest("URL is too long");
  }

  // Validate HTTP method
  if (req.method !== "DELETE") {
    return response.badRequest("HTTP method not allowed");
  }

  // Validate URL pattern: /resource/delete/:id
  const parts = req.url.split("/");
  // parts[0] = '', parts[1] = resource, parts[2] = 'delete', parts[3] = id
  if (parts.length !== 4 || parts[0] !== "" || parts[2] !== "delete") {
    return response.notFoundRoute();
  }

  const resource = parts[1];
  const idStr = parts[3];

  // Check for valid resources
  if (!Object.prototype.hasOwnProperty.call(validResources, resource)) {
    return response.notFoundRoute();
  }

  // Validate ID
  const id = Number(idStr);
  if (!Number.isInteger(id) || id <= 0) {
    return response.badRequest("Invalid ID");
  }

  // Get the table name safely
  const tableName = validResources[resource];

  try {
    // Prevent SQL Injection using parameters and validated tables
    const [result] = await pool.query(
      `DELETE FROM \`${tableName}\` WHERE id = ?`,
      [id]
    );

    // Clear response if resource was not found
    if (result.affectedRows === 0) {
      return response.notFound(
        `${resource.charAt(0).toUpperCase() + resource.slice(1)} not found`
      );
    }

    // Successful and consistent response
    return response.success({
      message: `${
        resource.charAt(0).toUpperCase() + resource.slice(1)
      } deleted successfully`,
      id,
    });
  } catch (err) {
    // Error handling and internal log for debugging
    console.error(err); // For internal debugging
    return response.serverError("Error deleting the resource");
  }
}
