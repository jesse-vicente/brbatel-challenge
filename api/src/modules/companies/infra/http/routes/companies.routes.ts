import { Router } from 'express';

import CompaniesController from '../controllers/CompaniesController';

const companiesRouter = Router();

const companiesController = new CompaniesController();

companiesRouter.get('/', companiesController.index);
companiesRouter.post('/', companiesController.create);
companiesRouter.put('/:id', companiesController.update);
companiesRouter.get('/:id', companiesController.show);
companiesRouter.delete('/:id', companiesController.delete);

export default companiesRouter;
