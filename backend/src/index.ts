import { config } from './config';
import { app } from './app';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Carrom Carrom API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API base: http://localhost:${PORT}/api/v1`);
  console.log(`Environment: ${config.nodeEnv}`);
});
