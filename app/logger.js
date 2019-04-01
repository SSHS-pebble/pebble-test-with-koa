const logger = require("pino")({
    level: "trace"
});

logger.info("Logger level is set as:", logger.level);

module.exports = logger;
