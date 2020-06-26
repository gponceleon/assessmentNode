const chai = require('chai');
const app = require('../app');
const request = require('supertest');
const { expect } = require('chai');


describe('Data from cliens', () => {
  test('Get client by id should return 200', done => {
    request(app)
      .get('/assessment/clients/a0ece5db-cd14-4f21-812f-966633e7be86')
      .set({ Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhMDU3M2ViLTU2ZDAtNDVkNS1hYjM2LWJlYmYzM2M1ZWIzNiIsImlhdCI6MTU5MzE4MTE3OH0.A4qPTmHpas9y-4IyTX1hvZzvQ0gRa5_m0EmAOLOD-0M" })
      .expect(200, done)
  });

  test('Get client by username should return 200  ', done => {
    request(app)
      .get('/assessment/clients/?username=inesblankenship@quotezart.com')
      .set({ Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhMDU3M2ViLTU2ZDAtNDVkNS1hYjM2LWJlYmYzM2M1ZWIzNiIsImlhdCI6MTU5MzE4MTE3OH0.A4qPTmHpas9y-4IyTX1hvZzvQ0gRa5_m0EmAOLOD-0M" })
      .expect(200, done);
  });

  test('Given /client/book should return 404', done => {
    request(app)
      .get('/client/book')
      .expect(404, done);
  });
});

describe('Data from polices', () => {
  test('Get policies by id should return 200', done => {
    request(app)
      .get('/assessment/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b')
      .set({ Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhMDU3M2ViLTU2ZDAtNDVkNS1hYjM2LWJlYmYzM2M1ZWIzNiIsImlhdCI6MTU5MzE4MTE3OH0.A4qPTmHpas9y-4IyTX1hvZzvQ0gRa5_m0EmAOLOD-0M" })
      .expect(200, done)
  });

  test('Get client by username should return 200  ', done => {
    request(app)
      .get('/assessment/policies/?username=inesblankenship@quotezart.com')
      .set({ Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRhMDU3M2ViLTU2ZDAtNDVkNS1hYjM2LWJlYmYzM2M1ZWIzNiIsImlhdCI6MTU5MzE4MTE3OH0.A4qPTmHpas9y-4IyTX1hvZzvQ0gRa5_m0EmAOLOD-0M" })
      .expect(200, done);
  });

  test('Given /policies/book should return 404', done => {
    request(app)
      .get('/client/book')
      .expect(404, done)
  });
});
