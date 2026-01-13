import ROUTES from "./route";

export const DEFAULT_EMPTY = {
  title: "No Data found",
  message: "Looks like the database is talking a nap. Please try again later.",
  button: {
    text: "Add data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Something went wrong",
  message: "Even our code can have a bad day.Give it another shot.",
  button: {
    text: "Try again",
    href: ROUTES.HOME,
  },
};

export const EMPTY_QUESTION = {
  title: "Auth,No question found",
  message:
    " The question board is empty.Maybe it's waiting for your brilliant question to get things rolling",
  button: {
    text: "Ask a question",
    href: ROUTES.ASK_QUESTION,
  },
};
export const EMPTY_TAGS = {
  title: "No tags found",
  message: "It appears there are no tags yet. Be the first to create one!",
  button: {
    text: "Create Tag",
    href: ROUTES.TAGS,
  },
};
export const EMPTY_ANSWER = {
  title: "No Answers Found",
  message:
    "The answer board is empty. Maybe it's waiting for your brilliant answer to get things rolling",
};

export const EMPTY_COLLECTIONS = {
  title: "No saved questions found",
  message:
    "It appears you haven't saved any questions yet. Start exploring and save your favorites!",
  button: {
    text: "Explore Questions",
    href: ROUTES.COLLECTION,
  },
};

export const EMPTY_USER = {
  title: "No users found",
  message: "It appears there are no users yet. Be the first to create one!",
  button: {
    text: "Home",
    href: ROUTES.HOME,
  },
};
