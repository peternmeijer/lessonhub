import Navigation from "./components/Navigation/Navigation";
import Welcome from "./components/Welcome/Welcome"
import ParticlesBg from "particles-bg";

function App() {
  return (
    <div className="App">
      <ParticlesBg type = "cobweb" num = {200} color="#FFFFFF" bg={true} />
      <Navigation />
      <Welcome />
    </div>
  );
}

export default App;
