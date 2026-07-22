import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();


const allowedOrigin = process.env.ALLOWED_ORIGIN || 'https://app-sj311react-poc-test.azurewebsites.net/';
const backendApiUrl = process.env.BACKEND_API_URL || 'https://app-sj311react-api-poc-test.azurewebsites.net/';
const requestTimeoutMs = Number(process.env.REQUEST_TIMEOUT_MS || 5000);

app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-correlation-id'],
  })
);

app.use((req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] || uuidv4();
  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);

  console.log(
    JSON.stringify({
      event: 'request_received',
      correlationId,
      method: req.method,
      path: req.path,
      timestamp: new Date().toISOString(),
    })
  );

  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'Healthy',
    service: 'CSJ application service layer',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    correlationId: req.correlationId,
  });
});

app.get('/api/poc/status', (req, res) => {
  res.status(200).json({
    status: 'Running',
    application: 'CSJ Azure PaaS POC',
    serviceLayer: 'Application/business service layer',
    purpose:
      'Receives requests from React and calls backend, MuleSoft, or mock API.',
    correlationId: req.correlationId,
  });
});

app.post('/api/311-ticket/preview', async (req, res) => {
  const startTime = Date.now();

  try {
    const { requestType, description, submittedBy } = req.body;

    if (!requestType || !description || !submittedBy) {
      return res.status(400).json({
        error: 'ValidationError',
        message:
          'requestType, description, and submittedBy are required fields.',
        correlationId: req.correlationId,
      });
    }

    const backendResponse = await axios.get(backendApiUrl, {
      timeout: requestTimeoutMs,
    });

    const durationMs = Date.now() - startTime;

    console.log(
      JSON.stringify({
        event: 'backend_call_success',
        correlationId: req.correlationId,
        backendApiUrl,
        durationMs,
        timestamp: new Date().toISOString(),
      })
    );

    return res.status(200).json({
      message: 'POC ticket preview created successfully.',
      ticketPreview: {
        requestType,
        description,
        submittedBy,
        status: 'Draft',
        sourceSystem: 'React POC App',
      },
      backendResult: backendResponse.data,
      durationMs,
      correlationId: req.correlationId,
    });
  } catch (error) {
    const durationMs = Date.now() - startTime;

    console.error(
      JSON.stringify({
        event: 'backend_call_failed',
        correlationId: req.correlationId,
        message: error.message,
        durationMs,
        timestamp: new Date().toISOString(),
      })
    );

    return res.status(502).json({
      error: 'BackendCallFailed',
      message: 'The service layer could not complete the backend/mock API call.',
      detail: error.message,
      correlationId: req.correlationId,
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: 'NotFound',
    message: 'The requested API route was not found.',
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(
    JSON.stringify({
      event: 'service_started',
      service: 'CSJ application service layer',
      port,
      allowedOrigin,
      backendApiUrl,
      timestamp: new Date().toISOString(),
    })
  );
});
