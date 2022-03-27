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
            <div className="col-2 walnut">
              <Sidebar /> 
            </div>
            <div className="col-10 grey"><Preview /></div>
        </div>
    </div>
    <br />
    <a className="btn btn-danger btn-lg" role="button" href="/">Clear Container</a>
    
  </>
  )
}

export default App;
