module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e0a652ca6c9dad3bd689010fd7e1988d'),
  },
});
