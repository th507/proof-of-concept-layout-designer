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
            <div className="col-4 walnut">
              <Sidebar /> 
            </div>
            <div className="col-8"><Preview /></div>
        </div>
    </div>
    <hr /><br />
    
  </>
  )
}

export default App;
