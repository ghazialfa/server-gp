let ErrorHandler = async (err, req, res, next) => {
  let name = err.name;
  let message = err.message;

  if (message === "jwt malformed" || message === "invalid signature") {
    res.status(401).json({ message: "Error authentication" });
    return;
  }

  switch (name) {
    case "validateError":
      res.status(400).json({ message });
      break;
    case "invalidInput":
      res.status(400).json({ message });
      break;
    case "validationError":
      res.status(401).json({ message });
      break;
    case "invalidToken":
      res.status(401).json({ message: "Error authentication" });
      break;
    case "forbidden":
      res.status(403).json({ message: "Forbidden" });
      break;
    case "MissingFile":
      res.status(400).json({ message });
      break;
    case "forbidden":
      res.status(403).json({ message: "Forbidden" });
      break;
    default:
      res.status(500).json({
        message: "Internal server error",
      });
      break;
  }
};

module.exports = ErrorHandler;
