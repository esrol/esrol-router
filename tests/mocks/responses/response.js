'use strict';
module.exports = {
  url: '/response',
  getMultipleRecords(req, res) {
    res.status(401).end();
  },
  getSingleRecord(req, res) {
    res.json({record: req.record});
  },
  postMultipleRecords(req, res) {
    res.redirect('/response');
  },
  postSingleRecord(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json({record: req.record});
  },
};
