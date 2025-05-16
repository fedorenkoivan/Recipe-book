import './App.css'

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  fetch(`${API_URL}/api/recipes`)
    .then(res => res.json())
    .then(data => console.log(data));
  return (
    <>
     <h1>recipe book</h1>
    </>
  )
}

export default App
