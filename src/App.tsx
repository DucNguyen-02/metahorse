import { GlobalStyles, GlobalTheme } from 'assets/styles'
import GlobalRoute from 'routes'
import { store } from 'apps'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <GlobalTheme>
        <GlobalStyles />
        <div className='App'>
          <GlobalRoute />
        </div>
      </GlobalTheme>
    </Provider>
  )
}

export default App
