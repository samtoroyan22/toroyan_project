import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Подставьте путь к вашему корневому редюсеру

const store = configureStore({
  reducer: rootReducer,
  // Дополнительные настройки хранилища, если требуется
});

export default store;
