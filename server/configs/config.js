export default {
  development: {
    use_env_variable: 'DATABASE_URL',
  },
  production: {
    use_env_variable: 'JAWSDB_URL',
  },
};
