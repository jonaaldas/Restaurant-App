import Router from '@koa/router';
import search from '../controllers/search.js';
import all from '../controllers/all.js';
import save from '../controllers/save.js';
import _delete from '../controllers/delete.js';
import update from '../controllers/update.js';
import filter from '../controllers/filter.js';

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'test';
});

router.get('/search', search);

router.get('/all', all);

router.post('/save', save);

router.delete('/delete', _delete);

router.put('/update', update);

router.get('/filter', filter);

export default router;
