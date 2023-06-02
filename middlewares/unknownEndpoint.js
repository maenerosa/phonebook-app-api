export default function unknownEndpoint(error, _req, res, next) {
  return res.status(404).json({ error: "Unknown Endpoint" });
}
