/**
 * @file koa2 Routes
 */

import * as Router from 'koa-router';
import {Request} from 'koa';
import * as chalk from 'chalk';

const router = new Router();
let Heroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];

/**
 * Index page. Currently doesn't do anything. ¯\_(ツ)_/¯
 */
router.get('/', async (ctx, next) => {
  await next();
  ctx.body = '(This page intentionally left blank)';
  ctx.status = 200;
})
.get('/hero', async (ctx, next) => {
    await next();
    ctx.body = Heroes;
    ctx.status = 200;
})
.get('/search', async (ctx, next) => {
    await next();
    const name = ctx.request.query.name || '';
    ctx.body = Heroes.filter(item => {
        return -1 !== item.name.toLowerCase().indexOf(name.toLowerCase());
    });
    ctx.state = 200;
})
.put('/hero/:id', async (ctx, next) => {
    await next();
    const id = ctx.params.id;
    Heroes = Heroes.map(item => {
        if (+id === item.id) {
            item.name = ctx.request.body.name;
        }
        return item;
    });
    ctx.body = ctx.request.body;
    ctx.status = 200;

})
.post('/hero', async (ctx, next) => {
    await next();
    const newHero = {
        id: +Heroes[Heroes.length - 1].id + 1,
        name: ctx.request.body.name
    };
    Heroes.push(newHero);
    ctx.body = newHero;
    ctx.status = 200;
})
.delete('/hero/:id', async (ctx, next) => {
    await next();
    const id = ctx.params.id;
    const index = Heroes.findIndex(item => {
        return item.id === +id;
    });
    console.log('id:', id, 'index:', index);
    ctx.body = -1 !== index ? Heroes.splice(index, 1) : null;
    ctx.status = 200;
});

export default router;

interface IKoaRequestWithBody extends Router.IRouterContext {
  request: IKoaBodyParserRequest;
}

interface IKoaBodyParserRequest extends Request {
  body: any;
}