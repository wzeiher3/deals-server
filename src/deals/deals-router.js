
'use strict';
const path = require('path');
const express = require('express');
const xss = require('xss');
const DealServices = require('./deals-service');
const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json();

const dealRouter = express.Router();
const serializeDeal = (deal) => ({
  id: deal.id,
  name: xss(deal.name),
  content: xss(deal.content),
  price: deal.price,
  day: deal.day, 
  distance: deal.distance
});

dealRouter
  .route('/')
  .all(requireAuth)
  .get( (req, res, next) => {
    const knexInstance = req.app.get('db');
    DealServices.getAllDeals(knexInstance)
      .then((deals) => {
        res.json(deals.map(serializeDeal));
      })
      .catch(next);
  })
  .post( jsonBodyParser, (req, res, next) => {
    const { name, content, day, distance, price } = req.body;
    const newDeal = { name, content, day, distance, price };

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(newDeal)) {
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
      }
    }

    newDeal.user_id = req.user.id;

    return DealServices.insertDeal(req.app.get('db'), newDeal)
      .then((deal) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${deal.id}`))
          .json(serializeDeal(deal));
      })
      .catch(next);
  });

dealRouter
  .route('/:deal_id')
  .all(requireAuth)
  .all((req, res, next) => {
    DealServices.getById(req.app.get('db'), req.params.deal_id)
      .then((deal) => {
        if (!deal) {
          return res.status(404).json({
            error: { message: 'deal does not exist'}
          });
        }
        res.deal = deal;
        return next();
      })
      .catch(next);
  })
  .get((req, res) => {
    res.json(serializeDeal(res.deal));
  })
  .delete((req, res, next) => {
    DealServices.deleteById(req.app.get('db'), req.params.deal_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch((req, res, next) => {
    const { name, content, day, distance, price } = req.body;
    const newDeal = { name, content, day, distance, price };

    const numberOfValues = Object.values(newDeal).filter(Boolean).length;
    if (numberOfValues < 4)
      return res.status(400).json({
        error: {
          message: 'Request body is missing a key value'
        }
      });

    return DealServices.updateById(req.app.get('db'), req.params.deal_id, newDeal)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = dealRouter;
