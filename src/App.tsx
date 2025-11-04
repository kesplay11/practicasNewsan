// App.tsx
import { Provider } from 'react-redux';

import AndonPlacasPage from './andon-placas/pages/AndonPlacasPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css";
import { store } from './store/store';

// ✅ Importa tu interfaz para tipar correctamente


function App() {
  return(
      <Provider store={store}>
        <AndonPlacasPage></AndonPlacasPage>
      </Provider>
  );
}

export default App;