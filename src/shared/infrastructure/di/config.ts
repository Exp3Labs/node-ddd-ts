import { Container } from 'inversify';
import { TYPES } from '@/shared/infrastructure/di/types';
import JWT from '@/shared/domain/ports/jwt';
import JSONWebToken from '@/shared/infrastructure/jwt/jsonwebtoken';

const AppContainer = new Container();

// infrastructure
AppContainer.bind<JWT>(TYPES.JWT).to(JSONWebToken);

export default AppContainer;
