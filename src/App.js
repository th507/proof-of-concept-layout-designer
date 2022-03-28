import './App.css'
import Nav from './components/nav'
import Sidebar from './components/sidebar'
import Preview from './components/preview'


function App() {
  return (
  <>
    <Nav /><br />
    <div className="container-fluid">
        <div className="row">
            <div className="col-3 walnut">
                <Sidebar /> 
            </div>
            <div className="col-9"><Preview /></div>
        </div>
    </div>
  </>
  )
}

export default App;
