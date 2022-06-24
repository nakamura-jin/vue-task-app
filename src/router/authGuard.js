const authGuard = async (to, from, next) => {
  const storage = JSON.parse(sessionStorage.getItem('data'));

  if (!storage) {
    next('/login');
  } else {
    next();
  }
};

const rejectService = async (dialog) => {
  if (dialog) {
    location.href = '/login';
  }
};

export { rejectService, authGuard };
