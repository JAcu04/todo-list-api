import { Router } from 'express';
import { supabase } from '../../lib/supabase.js';
import { validateSchema } from '../../middlewares/validate.js';
import { requireAuth } from '../../middlewares/auth.js';
import { createUsersRepository } from './users.repository.js';
import { createAuthService } from './auth.service.js';
import { createAuthController } from './auth.controller.js';
import { credentialsSchema } from './auth.schema.js';

const service = createAuthService(createUsersRepository(supabase));
const controller = createAuthController(service);

export const authRouter = Router();

authRouter.post('/register', validateSchema(credentialsSchema), controller.register);
authRouter.post('/login', validateSchema(credentialsSchema), controller.login);
authRouter.get('/me', requireAuth, controller.me);
