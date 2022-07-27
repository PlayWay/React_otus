// import React from "react";
// import { ComponentMeta, ComponentStory } from "@storybook/react";
// import { Cards } from "./index";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { persistor } from "../../../store/store";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "../../../store/saga/rootSaga";
// import { gameInitialState } from "../../../store/reducers/game/gameSlice";
// import { authInitialState } from "../../../store/reducers/auth/authSlice";
// import { PersistGate } from "redux-persist/integration/react";
//
// export default {
//   title: "Cards",
//   component: Cards,
// } as ComponentMeta<typeof Cards>;
// const sagaMiddleware = createSagaMiddleware();
//
// const state = {
//   auth: authInitialState,
//   game: gameInitialState,
// };
// export const store = configureStore({
//   reducer: rootReducer,
//   preloadedState: state,
//   middleware: [sagaMiddleware],
// });
// sagaMiddleware.run(rootSaga);
// const Template: ComponentStory<typeof Cards> = (args) => (
//   <Provider store={store}>
//     <PersistGate persistor={persistor}>
//       <Cards {...args} />
//     </PersistGate>
//   </Provider>
// );
//
// export const Normal = Template.bind({});
