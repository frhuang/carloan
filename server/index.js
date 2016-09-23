var express = require('express')
var router = require('router')
var db = require('./db')

router.get('/', function(req, res, next) {
	res.render('index', {title: 'express'})
})

module.exports = router