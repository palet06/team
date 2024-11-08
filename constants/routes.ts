const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PROFILE: (id: string) => `/profile/${id}`,
  TASKS: (id: string) => `/tasks/${id}`,
  ASSIGNEDTASKS: (id: string) => `/assigned-tasks/${id}`,
};

export default ROUTES;
