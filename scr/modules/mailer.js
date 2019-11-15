const path = require('path');

const hbs = require('nodemailer-express-handlebars');

const nodemailer = require('nodemailer');

const {host,port,user,pass} = require('../config/mailer.json')

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {user, pass}
  });

  transport.use('compiler',hbs({
    viewEgine:'handlebars',
    viewPath:path.resolve('./src/resources/mail/'),
    extName:'html'
  }))
  module.exports = transport;