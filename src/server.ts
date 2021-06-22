import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import http from 'http';
import path from 'path';
import cors from 'cors';

import errorHandler from './utils/errors';
import db from './utils/database';
import logger from './utils/logger';
import AuthConfig from './auth/auth.config';
import usersRoutes from './users/users.routes';
import authRoutes from './auth/auth.routes';
import petReportsRoutes from './pet-reports/petReports.routes';
import petLocationsRoutes from './pet-locations/petLocations.routes';

export class Server {
  public app: any;

  public static bootstrap(): Server {
    const s = new Server();
    const httpserver = http.createServer(s.app);
    s.app.set('port', process.env.PORT || '3000');
    httpserver.listen(parseInt(process.env.PORT || 'asd', 10) || 3000, '0.0.0.0', 0);
    // tslint:disable-next-line
    logger.server('Started listening on port ' + (process.env.PORT || 3000));
    return s;
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.catchNotFound();
  }

  // define rotues
  routes() {
    const router = express.Router();
    this.app.use('/auth', authRoutes);
    this.app.use('/users', usersRoutes);
    this.app.use('/pet-reports', petReportsRoutes);
    this.app.use('/pet-locations', petLocationsRoutes);
  }

  config() {
    const options: cors.CorsOptions = {
      credentials: true,
      origin: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE'
    };

    // use cors middleware
    this.app.use(cors(options));

    // enable pre-flight
    this.app.options('*', cors(options));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(
      require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
      })
    );
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(express.static(path.join(__dirname, 'public')));

    // passport config
    const authConfig = new AuthConfig(this.app);

    db.then(() => {
      logger.msg('Connected to db');
    });

    // development error handler
    // will print stacktrace
    if (this.app.get('env') === 'development') {
      this.app.use((err: any, req: any, res: any, next: any) => {
        // console.warn('dev error', err);
        res.status(err.status || 500).send({
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    this.app.use((err: any, req: any, res: any, next: any) => {
      // console.warn('error 500', err);
      res.status(err.status || 500).send({
        message: err.message,
        error: {}
      });
    });
  }

  catchNotFound() {
    // catch 404 and forward to error handler
    this.app.use((req: any, res: any, next: any) => {
      const err: any = new Error('404 Not Found');
      err.status = 404;
      err.message = 'Not found';
      res.status(404).send(
        errorHandler({
          code: 'NOT_FOUND',
          message: 'Page not found'
        })
      );
    });
  }
}

// error handlers

export const server = Server.bootstrap();
