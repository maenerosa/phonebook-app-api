export default function errorHandler(error, _req, res, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(500).json({ error: "Invalid ID format" });
  }
  next(error);
}
