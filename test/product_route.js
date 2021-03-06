const { expect } = require('chai');
const dotenv = require('dotenv');
const request = require('supertest');

dotenv.config();
const db = require('../dist/config/database').default;
const testDB = new db(process.env.MONGO_URI);
const app = require('../dist/src/server').default;

process.env.NODE_ENV = 'test';
let id;

describe('Product operations', () => {
    before(async() => {
        await testDB.init();
    });
    after(async() => {
        await testDB.closeDatabase();
    });

    describe('POST /product', () => {
        it('should create product', (done) => {
            const fields = { name: 'shoe', description: 'designers', category: 'footwear',
            quantity: 3, price: 18500 };
            request(app)
            .post('/product')
            .send(fields)
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                id = res._body.data._id;
                if(err) return done(err);
                return done();
            })
        })
    })
    describe('GET /product', () => {
        it('should get product', (done) => {
            request(app)
            .get('/product')
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(200, done)
        })
    })
    describe(`GET /product/${id}`, () => {
        it('should get a single product', (done) => {
            request(app)
            .get(`/product/${id}`)
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .expect(200, done)
        })
        
    })
    describe(`PUT /product/${id}`, () => {
        it('should update product', (done) => {
            const fields = {category: 'body spray'}
            request(app)
            .put(`/product/${id}`)
            .set('Accept', 'application/json')
            .send(fields)
            .expect('content-Type', /json/)
            .end((err, res) => {
                if(err) return done(err);
                expect(res._body.data.category).to.be.equal('body spray');
                expect(res.status).to.be.equal(200);
                return done();
            })
        })
    })
    describe(`DELETE /product/${id}`, () => {
        it('should delete a product', (done) => {
            request(app)
            .delete(`/product/${id}`)
            .set('Accept', 'application/json')
            .expect('content-Type', /json/)
            .end((err, res) => {
                if(err) return done(err);
                expect(res._body.data.deleted).to.be.equal(true);
                expect(res.status).to.be.equal(200);
                return done();
            })
        })
    })
    
})


