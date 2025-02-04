import {
  FIND_POST_BY_ID_FAILURE,
  FIND_POST_BY_ID_REQUEST,
  FIND_POST_BY_ID_SUCCESS,
  GET_ALL_POST_SUCCESS,
  GET_USERS_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  POST_CREATE_FAILURE,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  REPLY_POST_SUCCESS,
  REPOST_FAILURE,
  REPOST_REQUEST,
  REPOST_SUCCESS,
  USER_LIKE_POST_FAILURE,
  USER_LIKE_POST_REQUEST,
  USER_LIKE_POST_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  data: null,
  error: null,
  posts: [],
  post: null,
};
export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
    case POST_DELETE_REQUEST:
    case USER_LIKE_POST_REQUEST:
    case LIKE_POST_REQUEST:
    case REPOST_REQUEST:
    case FIND_POST_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case POST_CREATE_FAILURE:
    case POST_DELETE_FAILURE:
    case USER_LIKE_POST_FAILURE:
    case LIKE_POST_FAILURE:
    case REPOST_FAILURE:
    case FIND_POST_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: [action.payload, ...state.posts]
      };
    case GET_ALL_POST_SUCCESS:
    case GET_USERS_POST_SUCCESS:
      return { ...state, loading: false, error: null, posts: action.payload };
    case USER_LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        likedPosts: action.payload,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        like: action.payload,
      };
    case POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case REPOST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        repost: action.payload,
      };
    case FIND_POST_BY_ID_SUCCESS:
    case REPLY_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        post: action.payload,
      };
    default:
      return state;
  }
};
